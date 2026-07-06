# Mystic Atlas

Mystic Atlas 是一个暗黑黑金风格的玄学服务前端项目，包含首页、服务总览、知识宇宙、神秘商城、报告中心、账户中心，以及 12 个沉浸式玄学互动项目。

## 在线访问

正式网页地址：

[https://jackarry-hub.github.io/mystic-atlas/](https://jackarry-hub.github.io/mystic-atlas/)

代码仓库地址：

[https://github.com/jackarry-hub/mystic-atlas](https://github.com/jackarry-hub/mystic-atlas)

## 主要功能

- 首页主视觉与服务入口
- 12 个玄学互动项目接入
- 神秘商城、购物车、结算、支付结果、售后入口
- 报告中心、报告详情、历史归档
- 账户中心、订单、会员等级
- 多语言切换基础框架
- GitHub Pages 自动部署

## 技术栈

- React
- Vite
- TypeScript
- React Router
- GitHub Pages

## 本地运行

```bash
npm install
npm run dev
```

默认本地地址：

[http://127.0.0.1:5173/](http://127.0.0.1:5173/)

## 构建

```bash
npm run build
```

GitHub Pages 构建模式：

```bash
npm run build -- --mode github-pages
```

## 部署

项目已经配置 `.github/workflows/deploy.yml`。推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。

## 素材说明

项目素材位于：

```text
public/assets/mystic-atlas/
public/mystic-projects/
```

其中 `references` 目录仅作为 UI 参考，不应作为整页截图直接渲染到页面中。
