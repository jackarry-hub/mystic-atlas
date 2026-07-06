import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { MysticButton } from "./MysticButton";
import { MysticCard } from "./MysticCard";

export function LoginPanel() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <MysticCard className="login-panel" interactive={false}>
      <header className="login-panel__head">
        <h1>欢迎回来</h1>
      </header>
      <div className="segmented-control" role="tablist">
        <button
          aria-selected={mode === "login"}
          className={mode === "login" ? "is-active" : ""}
          onClick={() => setMode("login")}
          role="tab"
          type="button"
        >
          登录
        </button>
        <button
          aria-selected={mode === "register"}
          className={mode === "register" ? "is-active" : ""}
          onClick={() => setMode("register")}
          role="tab"
          type="button"
        >
          注册
        </button>
      </div>

      <form className="login-panel__form">
        <label>
          <span>邮箱</span>
          <div className="form-field">
            <Mail size={18} strokeWidth={1.35} />
            <input placeholder="oracle@mysticatlas.com" type="email" />
          </div>
        </label>
        <label>
          <span>密码</span>
          <div className="form-field">
            <LockKeyhole size={18} strokeWidth={1.35} />
            <input
              placeholder="输入你的访问密钥"
              type={showPassword ? "text" : "password"}
            />
            <button
              aria-label={showPassword ? "隐藏密码" : "显示密码"}
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.35} />
              ) : (
                <Eye size={18} strokeWidth={1.35} />
              )}
            </button>
          </div>
        </label>
        {mode === "register" ? (
          <label>
            <span>邀请口令</span>
            <div className="form-field">
              <input placeholder="可选，用于绑定专属顾问" type="text" />
            </div>
          </label>
        ) : null}
        <label className="check-row">
          <input
            checked={remember}
            onChange={() => setRemember((current) => !current)}
            type="checkbox"
          />
          <span>记住我与本机访问状态</span>
        </label>
        <MysticButton type="submit">
          {mode === "login" ? "进入我的星图" : "创建 Mystic ID"}
        </MysticButton>
      </form>
    </MysticCard>
  );
}
