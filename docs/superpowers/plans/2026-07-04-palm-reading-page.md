# Palm Reading Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone immersive palm-reading page that follows the existing Xuanjing tarot/mystic visual system and supports camera or uploaded palm photos.

**Architecture:** Create `index_palm.html` as a single static page, matching the repo's existing one-file module pattern. Store palm media in `assets/palm/`, and add a focused static verifier in `scripts/check_palm_page.js`.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, local browser APIs for camera/upload/canvas, Node.js for verification.

---

### Task 1: Resource Setup

**Files:**
- Create: `assets/palm/bg.png`
- Create: `assets/palm/ui-reference.png`
- Create: `assets/palm/opening.mp4`
- Create: `assets/palm/climax.mp4`

- [ ] Copy the user-provided palm background, UI reference, opening video, and climax video into `assets/palm/`.
- [ ] Confirm all four files exist and are non-empty.

### Task 2: Static Verification

**Files:**
- Create: `scripts/check_palm_page.js`

- [ ] Write a Node verifier that checks `index_palm.html` exists.
- [ ] Assert required palm assets are referenced.
- [ ] Assert stages `home`, `intro`, `capture`, `select`, `climax`, and `result` exist.
- [ ] Assert camera, upload, focus selection, climax, result, copy, and navigation controls exist.
- [ ] Run the verifier before implementation and confirm it fails because the page is missing.

### Task 3: Palm Page

**Files:**
- Create: `index_palm.html`

- [ ] Build the top navigation, project menu, side module menu, home panels, and palm-specific copy.
- [ ] Add video layers and stage transitions matching `home -> intro -> capture -> select -> climax -> result`.
- [ ] Implement camera capture, photo upload, fallback sample palm, local canvas analysis, scan animation, and selected state.
- [ ] Generate a professional palm-reading report covering major lines, hand shape, mounts, timing, focus reading, and advice.
- [ ] Keep all UI text code-native and all media referenced from `assets/palm/`.

### Task 4: Verification

**Files:**
- Modify: `index_palm.html` only if verification finds issues.

- [ ] Run `node scripts/check_palm_page.js`.
- [ ] Run a local static server and inspect the page in browser tooling where available.
- [ ] Check desktop and mobile screenshots against `D:\玄境\ui参考图\22_手相解读.png` and `assets/palm/ui-reference.png`.
- [ ] Fix layout, text, or interaction issues found during verification.
