
## 目标
按方向 C「景深剧场」改造首页，让整页有远近层次，但不动现有功能、配色与字体系统。

## 改动范围
仅 `src/routes/index.tsx`、`src/styles.css`，必要时新增 `src/components/DepthBackground.tsx`。其他页面（Harbor / Share / Intro）保持原样。

## 三个层次（由远到近）

**第 1 层 · 背景水印（远景，z=-2）**
- 新增 `DepthBackground` 组件，固定全屏（`fixed inset-0 -z-10`）。
- 三层叠加：
  1. 极淡的网格／罗盘线（CSS `repeating-linear-gradient`，opacity ≤ 0.04）
  2. 一两枚巨大的、模糊的外语词（例：`Saudade`、`物の哀れ`），字号 ~28rem，`blur(8px)`、opacity 0.06，错位放在左上 / 右下
  3. 一段极淡的中文长文残影（竖排，opacity 0.05），靠右边缘
- 随鼠标移动做轻微视差：监听 `pointermove`，三层位移幅度递增（远的动得最少，近的稍多 4–10px）。移动端用 `deviceorientation` 兜底或直接静态。

**第 2 层 · 内容（中景，z=0）**
- 现有 header / composer / tags / EmptyShelf / 结果卡片不动布局，只：
  - 整块内容外加 `relative z-10`
  - 滚动时 header 做极轻的上移视差（translateY 随 scrollY * -0.05）
  - composer 卡片悬停时投影由 `shadow-sm` 渐变到更深的 `shadow-xl`，给一点「浮起」反馈

**第 3 层 · 结果揭晓推近（近景，z=20）**
- 替换现有 `RevealOverlay` 的「字符逐个浮现」为「从深处推进」：
  - 结果卡片初始 `scale: 0.6`、`filter: blur(20px)`、`opacity: 0`、`translateZ` 模拟（实际用 scale + blur）
  - 1.2s 内推到 `scale: 1`、`blur: 0`、`opacity: 1`
  - 同时背景水印整体 `scale: 1.15` + `blur: 4px` 后退，制造「相机变焦」
- 退出（关闭结果）时反向，背景复位

## 技术细节
- 视差用 framer-motion `useMotionValue` + `useTransform`，不直接操作 DOM
- 所有动效尊重 `prefers-reduced-motion`：检测到就关掉视差和推近，只做 opacity fade
- 移动端（<768px）关闭鼠标视差（无指针），保留滚动视差和揭晓推近
- 水印词从一个小常量数组随机挑，刷新页面会换，制造一点惊喜

## 不做的事
- 不改色板、不改字体、不改文案、不动 Harbor / Share / Intro
- 不加新依赖（framer-motion 已装）
- 不改数据结构

做完你看效果，如果某层太抢戏或太弱我们再调透明度和位移幅度。
