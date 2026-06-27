<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
## 省额度工作规则

本项目优先节省上下文和工具调用成本。除非用户明确要求完整验收，否则按以下规则工作：

1. 不要默认读取完整方案文档、大型 Markdown、构建产物、lock 文件或 `node_modules`。
2. 搜索时优先用 `rg` 精确定位，只读取和当前任务直接相关的文件片段。
3. 不要为了确认背景反复扫描全项目；若任务很小，只看相关文件。
4. 不要默认进行浏览器验证。只有以下情况才使用浏览器：
   - 用户明确要求浏览器验收；
   - 改动涉及 UI 布局、交互流程或移动端适配；
   - `npm run build` 通过但页面仍疑似运行异常。
5. 默认只跑必要验证：
   - 代码/类型改动：优先跑 `npm run build`。
   - 小文案或数据改动：可说明未跑完整验证，除非用户要求。
6. 不要重复读取已安装 skill 或外部文档，除非当前任务明确依赖最新内容。
7. 避免长篇计划和长篇总结。普通任务最终回复控制在 5-8 行内。
8. 不要把无关问题顺手一起修。只完成用户本轮明确要求的最小正确改动。
9. 如果发现额外问题，先简短说明，不要自动展开大范围排查。
10. 在长线程中，如果上下文明显过大，建议用户开启新线程处理单个小任务。
