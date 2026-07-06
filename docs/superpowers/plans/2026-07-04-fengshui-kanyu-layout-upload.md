# Feng Shui Kanyu Layout Upload Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Feng Shui Kanyu page that matches the existing Xuanjing immersive module style and supports local layout photo upload, manual marking, ceremonial animation, and a professional Feng Shui reading.

**Architecture:** Create a static single-file HTML app at `D:/沉浸式塔罗牌/index_fengshui.html`, with assets under `D:/沉浸式塔罗牌/assets/fengshui`. The app uses a local stage machine: `home -> intro -> burst -> reading`, with a guided Kanyu wizard embedded in the intro stage.

**Tech Stack:** HTML, CSS, vanilla JavaScript, local media assets, FileReader for local-only image preview.

---

### Task 1: Asset Setup

**Files:**
- Create: `D:/沉浸式塔罗牌/assets/fengshui/bg.png`
- Create: `D:/沉浸式塔罗牌/assets/fengshui/ui-reference.png`
- Create: `D:/沉浸式塔罗牌/assets/fengshui/opening.mp4`
- Create: `D:/沉浸式塔罗牌/assets/fengshui/climax.mp4`

- [x] **Step 1: Copy supplied visual assets into a Feng Shui module directory**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'D:\沉浸式塔罗牌\assets\fengshui'
Copy-Item -LiteralPath 'C:\Users\Djy\Downloads\沉浸式模块底图\风水背景图.png' -Destination 'D:\沉浸式塔罗牌\assets\fengshui\bg.png' -Force
Copy-Item -LiteralPath 'D:\玄境\ui参考图\23_风水堪舆.png' -Destination 'D:\沉浸式塔罗牌\assets\fengshui\ui-reference.png' -Force
Copy-Item -LiteralPath 'C:\Users\Djy\Downloads\沉浸式视频\风水开场.mp4' -Destination 'D:\沉浸式塔罗牌\assets\fengshui\opening.mp4' -Force
Copy-Item -LiteralPath 'C:\Users\Djy\Downloads\沉浸式视频\风水高潮部分.mp4' -Destination 'D:\沉浸式塔罗牌\assets\fengshui\climax.mp4' -Force
```

Expected: four files exist in `assets/fengshui`.

### Task 2: Static Page

**Files:**
- Create: `D:/沉浸式塔罗牌/index_fengshui.html`

- [ ] **Step 1: Build the home screen**

Implement a Xuanjing-style shell: fixed background, video layer, gold frame, top navigation, project menu, left Feng Shui project rail, Kanyu steps panel, feature cards, and "开启堪舆" gate.

- [ ] **Step 2: Build the guided Kanyu wizard**

Add choices for Kanyu purpose, sitting/facing direction, external form, focus zone, and an upload/photo step. The upload step uses `<input type="file" accept="image/*" capture="environment">` and FileReader.

- [ ] **Step 3: Build manual layout marking**

Render the chosen image inside a bounded stage. Provide markers for 大门, 窗, 床, 灶, 书桌, 卫生间, 阳台, 财位, 北向. Clicking a marker type then the image creates or moves a local annotation at percentage coordinates.

- [ ] **Step 4: Build the ceremonial flow**

After the user confirms the wizard, play `assets/fengshui/climax.mp4`. When the video ends or the skip button is clicked, transition to the result page.

- [ ] **Step 5: Build the professional report**

Generate a local reading with: 宅运总评, 八卦九宫, 四象形势, 布局图标注分析, 五行调和, and 七日行动建议. Include copy, restart, and home actions.

### Task 3: Verification

**Files:**
- Test: `D:/沉浸式塔罗牌/index_fengshui.html`

- [ ] **Step 1: Static checks**

Run:

```powershell
Select-String -LiteralPath 'D:\沉浸式塔罗牌\index_fengshui.html' -Pattern 'TODO|TBD|undefined|null'
```

Expected: no accidental placeholders in visible implementation.

- [ ] **Step 2: Browser checks**

Open the local page in the in-app browser or a static browser path. Verify: app loads, home UI appears, start transitions to wizard, upload preview works, markers can be placed, climax transition reaches result, copy/restart/home actions respond.

### Self Review

- Spec coverage: covers the user's requested Feng Shui module, reference style, opening animation, guided professional play, upload/photo direction, climax animation, and result interpretation.
- Placeholder scan: this plan contains no unresolved implementation placeholders.
- Scope check: one static page plus one local asset directory is an appropriate first version. AI image recognition is intentionally deferred; manual marking provides a reliable product loop now.
