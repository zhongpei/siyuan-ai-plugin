# SiYuan AI 插件开发计划与任务清单

本文档详细描述了基于 Notion AI 功能的 SiYuan 插件开发需求，包含功能点详解和开发任务清单。

## 项目概述

本项目旨在为 SiYuan 笔记开发一个类似 Notion AI 的智能写作助手插件，通过 API 调用提供多种 AI 功能，辅助用户在笔记中实现智能创作和数据处理。

---

## Notion AI 功能点详解

### ✨ 核心写作功能

- [ ] **改进写作（Improve writing）**
  - 针对已有文本块提供"一键改进"操作
  - 优化用词、句式与结构，提升可读性与专业度
  - 参考：[zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

- [ ] **语法拼写检查（Fix spelling & grammar）**
  - 自动检测并纠正拼写与语法错误
  - 免去手动校对烦恼
  - 参考：[notion.com](https://www.notion.com/help/guides/using-notion-ai), [zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

- [ ] **内容续写与扩展（Make longer / Continue writing）**
  - 根据上下文或自定义提示，续写当前段落或扩展文章内容
  - 助力克服写作瓶颈
  - 参考：[zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

- [ ] **文本缩写与摘要（Make shorter / Summarize）**
  - 将长文本提炼为简洁摘要，快速获取要点
  - 支持对数据库中长字段进行概括
  - 参考：[elegantthemes.com](https://www.elegantthemes.com/blog/business/notion-ai-review), [zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

### 🎨 文本处理功能

- [ ] **语气转换（Change Tone）**
  - 可在"正式、轻松、专业"等多种语气间切换
  - 适应不同场景需求
  - 参考：[elegantthemes.com](https://www.elegantthemes.com/blog/business/notion-ai-review)

- [ ] **文本简化（Simplify）**
  - 将复杂句子转换为更易理解的表达
  - 帮助非专业读者快速理解
  - 参考：[elegantthemes.com](https://www.elegantthemes.com/blog/business/notion-ai-review)

- [ ] **多语言翻译（Translate）**
  - 一键将选定文本翻译为多种语言
  - 简化跨语言协作流程
  - 参考：[notion.com](https://www.notion.com/help/guides/using-notion-ai)

### 🤖 智能交互功能

- [ ] **问答交互（Q&A）**
  - 内置 AI 助手，可基于工作区或指定页面内容回答用户问题
  - 支持聊天式交互
  - 参考：[zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

- [ ] **数据库自动填充（AI Autofill）**
  - 为数据库字段自动生成摘要、标签或自定义信息
  - 可批量填充表格列，大幅提升数据录入效率
  - 参考：[notion.com](https://www.notion.com/help/notion-academy/lesson/ai-autofill-property), [zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

- [x] **头脑风暴（Brainstorm）**
  - 生成主题创意、要点列表或推广文案等
  - 帮助用户激发灵感并快速成型初稿
  - 参考：[zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

---

## SiYuan 插件开发任务清单

### 🔧 Phase 1: 环境准备与基础配置

- [x] **环境准备**
  - [x] 克隆 SiYuan 官方插件模板（`plugin-sample`）
  - [x] 运行 `pnpm install` 安装依赖
  - [ ] 配置开发环境（IDE、调试工具等）
  - 参考：[plugin-sample](https://github.com/siyuan-note/plugin-sample), [plugin-sample-vite-svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte)

- [x] **插件清单配置（plugin.json）**
  - [x] 填写基本信息：`name`、`version`、`minAppVersion`、`author`、`description`
  - [x] 添加中英文 `i18n` 支持
  - [ ] 配置插件图标和预览图
  - [ ] 设置插件权限和依赖
  - 参考：[plugin-sample](https://github.com/siyuan-note/plugin-sample), [plugin-sample-vite-svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte)

### 🚀 Phase 2: 核心功能实现

- [x] **AI 接口集成**
  - [x] 选择 AI 服务提供商（OpenAI、Claude、本地大模型等）
  - [x] 实现 API 调用封装
  - [x] 添加错误处理和重试机制
  - [ ] 实现流式响应处理

- [x] **文本处理基础功能**
  - [x] 获取当前选中文本/块内容
  - [x] 实现文本替换和插入功能
  - [ ] 添加撤销/重做支持
  - [x] 实现文本格式保持

- [x] **续写功能实现**
  - [x] 监听当前文本块，提取内容
  - [x] 调用 AI 接口生成续写文本
  - [x] 将生成的续写文本插入编辑区
  - [ ] 添加续写历史记录
  - 参考：[zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

- [ ] **表格续写功能**
  - [ ] 解析表格块的 Markdown/JSON 结构
  - [ ] 构造 AI 提示生成新增行
  - [ ] 动态更新 SiYuan 表格显示
  - [ ] 支持批量生成多行数据
  - 参考：[AI Autofill property](https://www.notion.com/help/notion-academy/lesson/ai-autofill-property)

### 🎨 Phase 3: UI/UX 集成

- [x] **命令与 UI 集成**
  - [x] 在块级菜单中添加 AI 功能选项
  - [ ] 实现 `/ai` 命令面板
  - [x] 添加工具栏快捷按钮
  - [ ] 实现右键菜单集成
  - 参考：[zapier.com](https://zapier.com/blog/how-to-use-notion-ai/)

- [x] **交互界面设计**
  - [x] 设计功能选择界面
  - [ ] 实现进度指示器
  - [ ] 添加结果预览窗口
  - [x] 实现设置配置界面

### ⚙️ Phase 4: 高级功能

- [x] **写作改进功能**
  - [x] 实现文本优化算法
  - [x] 添加语法检查功能
  - [x] 实现语气转换
  - [x] 添加文本简化功能

- [x] **智能摘要功能**
  - [x] 实现长文本摘要
  - [ ] 支持自定义摘要长度
  - [ ] 添加关键词提取
  - [ ] 实现多级摘要

- [x] **翻译功能**
  - [x] 集成多语言翻译 API
  - [ ] 支持语言自动检测
  - [ ] 实现批量翻译
  - [ ] 添加翻译历史记录

- [x] **问答交互功能**
  - [ ] 实现基于文档的问答
  - [ ] 添加聊天界面
  - [ ] 支持上下文记忆
  - [ ] 实现问答历史管理

### 🧪 Phase 5: 测试与优化

- [ ] **本地调试与热更新**
  - [ ] 使用符号链接将开发目录链接到 SiYuan `data/plugins` 下
  - [ ] 实现热重载与实时调试
  - [ ] 配置调试日志系统
  - 参考：[SiYuan Plugin Development Guide](https://liuyun.io/article/1724560411861)

- [ ] **单元测试与 CI**
  - [ ] 使用 Jest 编写内容解析测试
  - [ ] 编写 API 请求测试
  - [ ] 在 GitHub Actions 中集成 Lint、Test、Build 流程
  - [ ] 添加代码覆盖率报告
  - 参考：[plugin-sample-vite-svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte)

### 📦 Phase 6: 发布与维护

- [ ] **性能优化**
  - [ ] 优化 API 调用频率
  - [ ] 实现本地缓存机制
  - [ ] 减少内存占用
  - [ ] 优化界面响应速度

- [ ] **打包发布**
  - [ ] 配置构建脚本生成 `.zip` 包
  - [ ] 更新 `package.json` 版本信息
  - [ ] 编写用户文档和使用说明
  - [ ] 在 SiYuan 社区 Bazaar 提交插件
  - 参考：[plugin-sample-vite-vue](https://github.com/siyuan-note/plugin-sample-vite-vue)

- [ ] **社区维护**
  - [ ] 收集用户反馈
  - [ ] 修复 bug 和问题
  - [ ] 定期更新功能
  - [ ] 维护文档和帮助

---

## 技术栈与依赖

### 前端技术
- TypeScript
- HTML/CSS/SCSS
- SiYuan Plugin API

### AI 服务集成
- OpenAI GPT API
- Anthropic Claude API
- 其他大语言模型 API

### 开发工具
- Webpack/Vite
- Jest (测试框架)
- ESLint/Prettier (代码规范)
- GitHub Actions (CI/CD)

---

## 里程碑与时间线

- **Week 1-2**: Phase 1 完成环境准备与基础配置
- **Week 3-6**: Phase 2 实现核心 AI 功能
- **Week 7-8**: Phase 3 完成 UI/UX 集成
- **Week 9-12**: Phase 4 开发高级功能
- **Week 13-14**: Phase 5 测试与优化
- **Week 15-16**: Phase 6 打包发布与维护

---

## 注意事项

1. **API 密钥管理**: 安全存储和管理 AI 服务的 API 密钥
2. **错误处理**: 完善的错误处理机制，避免插件崩溃
3. **性能考虑**: 避免频繁的 API 调用，实现合理的缓存策略
4. **用户体验**: 提供清晰的反馈和进度指示
5. **兼容性**: 确保与不同版本的 SiYuan 兼容

---

## 相关资源

- [SiYuan Plugin Sample](https://github.com/siyuan-note/plugin-sample)
- [SiYuan Plugin Sample with Vite & Svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte)
- [SiYuan Plugin Sample with Vite & Vue](https://github.com/siyuan-note/plugin-sample-vite-vue)
- [SiYuan Plugin Development Guide](https://liuyun.io/article/1724560411861)
- [Notion AI Guide](https://zapier.com/blog/how-to-use-notion-ai/)
