import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  getLanguageMeta,
  languages,
  localizeProduct,
  translate,
  translateInlineText,
  type LanguageCode
} from "../lib/i18n";
import type { Product } from "../data/products";

interface LanguageContextValue {
  currentLanguage: (typeof languages)[number];
  language: LanguageCode;
  localizeProduct: (product: Product) => Product;
  lt: (text: string) => string;
  setLanguage: (language: LanguageCode) => void;
  t: (key: Parameters<typeof translate>[1]) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const storageKey = "mystic-atlas-language";
const translatableAttributes = ["aria-label", "alt", "placeholder", "title"] as const;
const chinesePattern = /[\u4e00-\u9fff]/;

function readInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return "zh-Hans";
  }

  const saved = window.localStorage.getItem(storageKey);
  const found = languages.find((item) => item.code === saved);
  return found?.code ?? "zh-Hans";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(readInitialLanguage);
  const currentLanguage = getLanguageMeta(language);

  useEffect(() => {
    window.localStorage.setItem(storageKey, language);
    document.documentElement.lang = currentLanguage.htmlLang;
    document.documentElement.dataset.lang = language;
    window.dispatchEvent(
      new CustomEvent("mystic-atlas-language-change", {
        detail: { language }
      })
    );
  }, [currentLanguage.htmlLang, language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      currentLanguage,
      language,
      localizeProduct: (product) => localizeProduct(product, language),
      lt: (text) => translateInlineText(language, text),
      setLanguage,
      t: (key) => translate(language, key)
    }),
    [currentLanguage, language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <LocalizedDocumentText language={language} />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

function LocalizedDocumentText({ language }: { language: LanguageCode }) {
  const textOriginals = useMemo(() => new WeakMap<Text, string>(), []);
  const attributeOriginals = useMemo(
    () => new WeakMap<Element, Partial<Record<(typeof translatableAttributes)[number], string>>>(),
    []
  );
  const valueOriginals = useMemo(
    () => new WeakMap<HTMLInputElement | HTMLTextAreaElement, string>(),
    []
  );

  useEffect(() => {
    const root = document.getElementById("root");

    if (!root) {
      return undefined;
    }

    let scheduled = false;
    const observedIframes = new WeakSet<HTMLIFrameElement>();
    const observedDocuments = new WeakSet<Document>();
    const cleanups: Array<() => void> = [];
    const languageMeta = getLanguageMeta(language);

    const isElementNode = (node: Node): node is Element => node.nodeType === Node.ELEMENT_NODE;

    const shouldSkipTextNode = (node: Text) => {
      const parent = node.parentElement;

      if (!parent) {
        return true;
      }

      return ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"].includes(parent.tagName);
    };

    const syncDocumentLanguage = (doc: Document) => {
      doc.documentElement.lang = languageMeta.htmlLang;
      doc.documentElement.dataset.lang = language;

      try {
        doc.defaultView?.localStorage.setItem(storageKey, language);
      } catch {
        // Same-origin storage can still be blocked by browser privacy settings.
      }

      try {
        const FrameCustomEvent = doc.defaultView?.CustomEvent ?? CustomEvent;

        doc.defaultView?.dispatchEvent(
          new FrameCustomEvent("mystic-atlas-language-change", {
            detail: { language }
          })
        );
      } catch {
        // Older embedded documents can ignore the broadcast safely.
      }
    };

    const getTranslationRoots = () => {
      const roots: Node[] = [root];

      root.querySelectorAll<HTMLIFrameElement>("iframe").forEach((iframe) => {
        try {
          const body = iframe.contentDocument?.body;

          if (body) {
            roots.push(body);
          }
        } catch {
          // Cross-origin frames cannot be localized from the parent document.
        }
      });

      return roots;
    };

    const observeDocument = (doc: Document) => {
      if (observedDocuments.has(doc) || !doc.body) {
        return;
      }

      observedDocuments.add(doc);
      syncDocumentLanguage(doc);

      const Observer = doc.defaultView?.MutationObserver ?? MutationObserver;
      const observer = new Observer(scheduleTranslations);
      observer.observe(doc.body, {
        attributeFilter: [...translatableAttributes],
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      });
      cleanups.push(() => observer.disconnect());
    };

    const observeIframeLoads = () => {
      root.querySelectorAll<HTMLIFrameElement>("iframe").forEach((iframe) => {
        if (observedIframes.has(iframe)) {
          return;
        }

        observedIframes.add(iframe);
        iframe.addEventListener("load", scheduleTranslations);
        cleanups.push(() => iframe.removeEventListener("load", scheduleTranslations));
      });
    };

    const translateTextNodes = (translationRoot: Node) => {
      const rootDocument = translationRoot.ownerDocument ?? document;
      const walker = rootDocument.createTreeWalker(translationRoot, NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();

      while (current) {
        const node = current as Text;
        const value = node.nodeValue ?? "";
        const original = textOriginals.get(node);

        if (!shouldSkipTextNode(node) && value.trim()) {
          if (language === "zh-Hans") {
            if (original && value !== original) {
              node.nodeValue = original;
            }
          } else {
            const source = original ?? (chinesePattern.test(value) ? value : "");

            if (source) {
              if (!original) {
                textOriginals.set(node, source);
              }

              const nextValue = translateInlineText(language, source);

              if (value !== nextValue) {
                node.nodeValue = nextValue;
              }
            }
          }
        }

        current = walker.nextNode();
      }
    };

    const translateAttributes = (translationRoot: Node) => {
      if (!isElementNode(translationRoot)) {
        return;
      }

      translationRoot.querySelectorAll("*").forEach((element) => {
        translatableAttributes.forEach((attribute) => {
          const value = element.getAttribute(attribute);

          if (!value) {
            return;
          }

          const originals = attributeOriginals.get(element) ?? {};
          const original = originals[attribute];

          if (language === "zh-Hans") {
            if (original && value !== original) {
              element.setAttribute(attribute, original);
            }
            return;
          }

          const source = original ?? (chinesePattern.test(value) ? value : "");

          if (!source) {
            return;
          }

          if (!original) {
            attributeOriginals.set(element, {
              ...originals,
              [attribute]: source
            });
          }

          const nextValue = translateInlineText(language, source);

          if (value !== nextValue) {
            element.setAttribute(attribute, nextValue);
          }
        });
      });
    };

    const translateFormValues = (translationRoot: Node) => {
      if (!isElementNode(translationRoot)) {
        return;
      }

      translationRoot.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea").forEach((element) => {
        if (element.ownerDocument.activeElement === element) {
          return;
        }

        const value = element.value;
        const original = valueOriginals.get(element);

        if (language === "zh-Hans") {
          if (original && value !== original) {
            element.value = original;
          }
          return;
        }

        const source = original ?? (chinesePattern.test(value) ? value : "");

        if (!source) {
          return;
        }

        if (!original) {
          valueOriginals.set(element, source);
        }

        const nextValue = translateInlineText(language, source);

        if (value !== nextValue) {
          element.value = nextValue;
        }
      });
    };

    function applyTranslations() {
      scheduled = false;
      observeIframeLoads();

      getTranslationRoots().forEach((translationRoot) => {
        const rootDocument = translationRoot.ownerDocument ?? document;
        observeDocument(rootDocument);
        syncDocumentLanguage(rootDocument);
        translateTextNodes(translationRoot);
        translateAttributes(translationRoot);
        translateFormValues(translationRoot);
      });
    }

    function scheduleTranslations() {
      if (scheduled) {
        return;
      }

      scheduled = true;
      window.requestAnimationFrame(applyTranslations);
    }

    applyTranslations();

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [attributeOriginals, language, textOriginals, valueOriginals]);

  return null;
}
