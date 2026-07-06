# Liuyao Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone immersive Liuyao divination page with the supplied background image, opening/climax videos, six-line coin casting, and detailed result interpretation.

**Architecture:** Keep the deliverable static and consistent with the existing project pages. Put the reusable Liuyao rules in `assets/liuyao/liuyao-engine.js`, verify them with a Node smoke test, and compose the product experience in `index_liuyao.html`.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, local media assets, Node for rule-engine tests.

---

### Task 1: Assets

**Files:**
- Create: `assets/liuyao/bg.png`
- Create: `assets/liuyao/opening.mp4`
- Create: `assets/liuyao/climax.mp4`

- [x] Copy the supplied Liuyao background and videos into the project so the page uses stable relative paths.
- [x] Confirm the copied files are present under `assets/liuyao`.

### Task 2: Rule Engine TDD

**Files:**
- Create: `scripts/test_liuyao_engine.js`
- Create: `assets/liuyao/liuyao-engine.js`

- [ ] Write tests for coin-line resolution, hexagram creation, changed hexagram creation, and question-purpose interpretation.
- [ ] Run `node scripts/test_liuyao_engine.js` and confirm it fails because the engine is not implemented.
- [ ] Implement `resolveLine`, `buildHexagram`, `buildReading`, and the public `LiuyaoEngine` API.
- [ ] Re-run `node scripts/test_liuyao_engine.js` and confirm it passes.

### Task 3: Page Shell And Home UI

**Files:**
- Create: `index_liuyao.html`

- [ ] Build the full-screen dark-gold page shell using `assets/liuyao/bg.png`.
- [ ] Add top navigation, project menu, side rail, step card, feature cards, daily tip, quote, and primary start plaque.
- [ ] Keep the first viewport aligned with the supplied UI reference: black translucent panels, fine gold lines, centered master image, and compact product navigation.

### Task 4: Ritual Flow

**Files:**
- Modify: `index_liuyao.html`

- [ ] Implement stages: `home`, `opening`, `intent`, `casting`, `climax`, `result`.
- [ ] On blank-space click in `home`, fade out UI and play `assets/liuyao/opening.mp4`.
- [ ] Show bottom guidance with question type selection, custom question input, and professional Liuyao rules.
- [ ] Let the user cast six coin lines from bottom to top and show live line results.
- [ ] Play `assets/liuyao/climax.mp4` after casting completes, then reveal the result.

### Task 5: Result Experience

**Files:**
- Modify: `index_liuyao.html`

- [ ] Render the original hexagram, changed hexagram, moving lines, useful god, six relatives, six spirits, world/response positions, and line table.
- [ ] Render interpretation blocks: overall judgement, useful-god analysis, world-response relationship, moving-line advice, timing cue, and action guidance.
- [ ] Add copy, restart, and home actions.

### Task 6: Verification

**Files:**
- Read: `index_liuyao.html`
- Read: `assets/liuyao/liuyao-engine.js`
- Read: `scripts/test_liuyao_engine.js`

- [ ] Run `node scripts/test_liuyao_engine.js`.
- [ ] Serve the static page locally.
- [ ] Verify desktop page load, blank-space start, opening video, intent selection, six casts, climax video, and result rendering.
- [ ] Verify a mobile viewport for readable text and no obvious overlap.
