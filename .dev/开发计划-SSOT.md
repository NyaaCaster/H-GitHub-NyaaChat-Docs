# NyaaChat-Docs 文档开发计划（SSOT · V1）

> 本文件是 NyaaChat 用户文档站 **V1 版内容建设**的唯一事实来源（Single Source of Truth）。
> 所有文档结构、章节归属、编写进度、阶段划分以本文件为准。任何结构调整先改本文件，再改代码。

| 元信息 | 值 |
|--------|----|
| 文档版本 | V1 |
| 目标产物 | NyaaChat 终端用户使用手册（非技术性） |
| 技术载体 | VitePress（`doc-files/`，bind mount，改 `.md` 即时生效） |
| 线上入口 | 文档站已部署上线；NyaaChat 应用入口 `http://h.nyaa.host:3095/` |
| 组织脉络 | NyaaChat 主界面四大功能板块：开始使用 / 角色扮演 / 知识库 / 账号系统 |
| 排除范围 | `扩展` 功能（`EXTENSIONS_UI_ENABLED = false`，暂不开放，不写） |
| 撰写方法论 | Diátaxis 四象限（教程 / 操作指南 / 参考 / 解释），见「文档类型定位」 |
| 创建日期 | 2026-07-15 |

---

## 状态图例

- ⬜ 未开始
- 🟡 进行中
- ✅ 已完成

---

## 1. 目标与范围

### 1.1 目标

为 NyaaChat 的终端使用者（非开发者）提供一份完整、清晰、以实际界面操作为脉络的使用手册，覆盖从「第一次打开」到「熟练使用角色扮演 + 知识库 + 账号体系」的全流程。

### 1.2 范围边界

- ✅ 纳入：开始使用、角色扮演、知识库、账号系统四大板块的全部面向用户的操作与概念。
- ❌ 排除：`扩展` 功能（暂不开放）。
- ❌ 排除：部署、构建、Docker、私有仓库等技术运维内容（那是主项目 README / TECHNICAL 的职责）。
- ⚠️ 边界说明：涉及外部站点 NyaaAcount（`h.nyaa.host:5110`）的注册 / 充值 / 找回密码等流程，本文档只做「引导跳转」说明，不复刻其内部界面。

### 1.3 关键事实校正（探索结论）

- NyaaChat 是**单页聊天应用**，没有「模块页」式导航；四大板块是**概念划分**，功能全部通过**顶栏两行图标按钮唤起弹窗（Modal）**使用。文档保留四大板块作为章节骨架，但正文须以「顶栏图标 → 弹窗」的真实交互来描述，不得暗示存在独立模块页。
- 「开始使用」在源码中并非模块，而是一次性数据迁移对话框上的按钮文字；文档中的「开始使用」= 首次进入 → 欢迎屏 → 配置模型 → 首次对话 的引导流程。

---

## 2. 受众与文档类型定位

| 板块 | 主要受众 | Diátaxis 定位 | 说明 |
|------|----------|---------------|------|
| 开始使用 | 全新用户 | 教程（Tutorial）为主 | 手把手带到「成功发出第一条对话」 |
| 角色扮演 | 已上手用户 | 操作指南 + 参考混合 | 每个界面「怎么做」，进阶字段「是什么/取什么值」 |
| 知识库 | 进阶用户 | 解释 + 操作指南 | 先讲清 RAG 概念，再教配置与使用 |
| 账号系统 | 需付费/同步的用户 | 参考 + 操作指南 | 额度/猫粮/扩容偏参考，登录/同步偏操作 |

---

## 3. 关键决策

| 决策 | 结论 | 依据 |
|------|------|------|
| 组织脉络 | 保留「开始使用 / 角色扮演 / 知识库 / 账号系统」四大板块 | 用户拍板；贴合主界面认知 |
| 交互描述方式 | 以「顶栏图标 → 弹窗」真实交互描述，不写成模块页 | 单页应用事实 |
| API 配置示例 | 以 QinyAPI 为主线示例，其他供应商简述 | 用户指定 |
| 云同步归属 | 归入「账号系统」章节（登录门控），但正文注明 UI 入口在「设置 → 备份与恢复」 | 功能登录依赖 |
| 嵌入模型归属 | 归入「知识库」章节，注明其独立于对话/图片的 QinyAPI 供应商体系 | 探索结论 |
| 撰写批次排序 | 按依赖关系：账号系统先于角色扮演进阶与知识库 | 经济/登录概念被多处引用 |
| 本次会话产物 | 仅结构骨架（标题 + 段落标题），不写正文 | 用户指定 |

---

## 4. 文档信息架构（目标目录树）

> 括号内为对应源码组件 / 关键界面，供后续正文撰写查证，不出现在正文中。

```
doc-files/
├── index.md                          首页（home 布局：hero + feature 卡片）
│
├── guide/                            【开始使用】
│   ├── what-is-nyaachat.md           NyaaChat 是什么（定位/隐私模型/自带 API）
│   ├── quick-start.md                快速开始（打开 h.nyaa.host:3095 → 三步上手）
│   ├── interface-tour.md             界面导览（顶栏两行图标 / 聊天区 / 输入区）
│   ├── configure-model.md            配置对话模型（以 QinyAPI 为例）
│   └── first-chat.md                 开始第一次对话
│
├── roleplay/                         【角色扮演】
│   ├── index.md                      角色扮演总览
│   ├── character-selection.md        角色选择界面（CharacterSelectionModal）
│   ├── create-character.md           创建角色·基础（CharacterEditModal 基础字段 + 宏）
│   ├── world-info.md                 角色规则·世界书（WorldInfoRuleModal）
│   ├── regex.md                      正则规则（RegexModal）
│   ├── variables.md                  角色变量
│   ├── user-role.md                  用户角色·你的人设（UserRoleSelectionModal）
│   ├── import-export.md              角色导入与导出（NyaaChat / SillyTavern 格式）
│   └── shared-library.md             共享角色库（SharedLibraryModal）
│
├── knowledge-base/                   【知识库】
│   ├── index.md                      什么是知识库（RAG 概念·通俗解释）
│   ├── prerequisites.md              前置准备（登录 + 嵌入模型配置 EmbeddingConfigModal）
│   ├── manage.md                     创建与管理知识库（KnowledgeBaseModal）
│   ├── documents.md                  上传与管理文档（KnowledgeBaseEditModal）
│   ├── link-to-character.md          绑定角色与检索注入（含共享角色跨账号只读检索）
│   └── quota.md                      知识库栈额度与扩容
│
├── account/                          【账号系统】
│   ├── index.md                      账号系统总览（UserAccountModal）
│   ├── login-register.md             登录与注册（跳转 NyaaAcount）
│   ├── profile.md                    账号面板（账号/用户名/注册时间/共享统计）
│   ├── catfood-recharge.md           猫粮与充值
│   ├── quota-expand.md               额度与扩容（各扩容项一览）
│   └── cloud-sync.md                 云同步（设置备份与恢复）
│
└── faq.md                            常见问题
```

保留资源（**不得删除**）：`doc-files/public/logo.svg`、`doc-files/.vitepress/config.mjs`、`doc-files/.vitepress/theme/**`。

### 4.1 侧边栏 / 顶部导航映射（config.mjs 目标）

顶部 nav（阅读顺序 = 四大板块）：

```
首页 / 开始使用 / 角色扮演 / 知识库 / 账号系统 / 常见问题
```

sidebar 按四个路径分组：`/guide/`、`/roleplay/`、`/knowledge-base/`、`/account/`，各组 items 与上方目录树一致。

---

## 5. 阶段（P）批次划分

> 本次会话完成 **P0（结构骨架）**。P1–P6 为后续「逐段填充正文」的内容编写批次，按依赖关系排序。
> 依赖关系原则：被多处引用的基础概念（界面术语、账号/经济）先写，强依赖它们的板块（知识库）后写。

### 依赖关系图

```
P0 结构骨架（本次）
  │
  ▼
P1 开始使用 ───────────────┐（确立界面术语/顶栏图标/弹窗交互，全站复用）
  │                        │
  ▼                        ▼
P2 账号系统           P3 角色扮演·基础
（登录/猫粮/额度概念）   （选择/创建/用户角色/导入导出/共享库）
  │        │              │
  │        └──────┬───────┘
  │               ▼
  │          P4 角色扮演·进阶（世界书/正则/变量）
  │               │
  └──────┬────────┘
         ▼
    P5 知识库（依赖：账号额度 + 角色绑定 + 嵌入配置）
         │
         ▼
    P6 收尾（首页终稿 / FAQ / 导航校对 / 全站交叉链接）
```

### 批次明细

#### P0 · 结构骨架（本次会话）✅

| 交付项 | 状态 |
|--------|------|
| 删除临时占位文档（旧 quick-start / features / faq / index 占位内容） | ✅ |
| 按目标目录树创建全部骨架文档（仅一级标题 + 段落标题，无正文） | ✅ |
| 更新 `config.mjs` 的 nav / sidebar | ✅ |
| 写入本 SSOT + 阶段交接文档（`.dev/阶段交接-001.md`） | ✅ |

> P0 全部子项已完成。
> 骨架落地记录：`features/` 目录已删除；`index.md`（去除「扩展系统」卡片、四大板块 feature）、`faq.md`、`guide/quick-start.md` 由占位内容改写为骨架；新建 guide×5 / roleplay×9 / knowledge-base×6 / account×6，共 28 个 `.md`；`config.mjs` nav/sidebar 已按四大板块重排。

#### P1 · 开始使用 ✅
- 依赖：无
- 文档：`guide/what-is-nyaachat.md`、`guide/quick-start.md`、`guide/interface-tour.md`、`guide/configure-model.md`、`guide/first-chat.md`
- 关键产出：确立全站通用术语（顶栏两行图标名、弹窗、猫粮等首次出现的名词），QinyAPI 配置主线示例。

#### P2 · 账号系统 ✅
- 依赖：P1
- 文档：`account/index.md`、`account/login-register.md`、`account/profile.md`、`account/catfood-recharge.md`、`account/quota-expand.md`、`account/cloud-sync.md`
- 关键产出：登录/注册（NyaaAcount 跳转）、猫粮、各扩容项数值表、云同步流程。为后续板块提供可引用的经济/额度概念。

#### P3 · 角色扮演·基础 ✅
- 依赖：P1（界面术语）、P2（共享库/保存引用登录与卡槽）
- 文档：`roleplay/index.md`、`roleplay/character-selection.md`、`roleplay/create-character.md`、`roleplay/user-role.md`、`roleplay/import-export.md`、`roleplay/shared-library.md`

#### P4 · 角色扮演·进阶 ✅
- 依赖：P3
- 文档：`roleplay/world-info.md`、`roleplay/regex.md`、`roleplay/variables.md`
- 关键产出：世界书触发方式/插入位置/约束强度/递归、SillyTavern 迁移对照。

#### P5 · 知识库 ✅
- 依赖：P1、P2（额度/猫粮）、P3–P4（角色绑定、世界书关联入口）
- 文档：`knowledge-base/index.md`、`knowledge-base/prerequisites.md`、`knowledge-base/manage.md`、`knowledge-base/documents.md`、`knowledge-base/link-to-character.md`、`knowledge-base/quota.md`
- 关键产出：RAG 通俗概念解释、嵌入模型配置指南（含健康检查流程+更换模型警告）、知识库 CRUD+用量条三态、文档上传限制与分块嵌入流程、世界书规则 KB 绑定全链路（含 `<search_context>` 注入格式+跨账号只读检索）、KB 栈额度系统（3/10/+2/50）

#### P6 · 收尾 ✅
- 依赖：P1–P5
- 交付：`index.md` 首页终稿（feature 卡片文本优化）、`faq.md`（28 个 Q&A 覆盖 7 个主题）、全站审计（55 链接 0 断链、28 侧边栏条目全匹配）、CLAUDE.md 修复
- V1 全部 6 个阶段完成，28 篇文档全部有正文

---

## 6. 术语约定（撰写时须统一）

| 概念 | 统一用词 | 备注 |
|------|----------|------|
| 顶栏 | 顶部工具栏（两行） | 不用「导航栏/菜单栏」 |
| 弹窗 | 弹窗 | 对应 Modal，不用「对话框/面板」混称 |
| 虚拟货币 | 猫粮 | 不用「积分/金币」 |
| 外部账号中心 | NyaaAcount | 注册/充值/找回密码所在站点 |
| 对话模型供应商示例 | QinyAPI | 界面个别处源码拼作 "QingAPI"，正文一律写 QinyAPI 并可加注 |
| 世界书 | 角色规则（世界书） | 首次出现给出括注，之后可简称世界书 |
| 约束强度 | 软设定 / 硬约束 | NyaaChat 特有概念 |

---

## 7. 约束与红线

- 内容修改仅动 `doc-files/*.md` 与 `config.mjs`，**不重建镜像**（HMR 即时生效）。
- **禁止**删除 `public/logo.svg`、`.vitepress/theme/**`。
- 私有仓库地址、`.env` 密钥等**禁止**写入任何文档。
- 提交遵循项目 `commit-push` skill：Conventional Commits、`git add <file>` 明确指定、禁止 `-A`/`.`、禁止 force push。
- 未经用户明确请求，不 commit / push。

---

## 8. 参考

- 探索结论已固化于本 SSOT 第 1–4 节；正文撰写时的界面文案与 `file_path:line` 索引见各阶段交接文档。
- 主项目：`H:\GitHub\NyaaChat\`（组件源码为界面文案权威来源）。
- 撰写方法论：Diátaxis（https://diataxis.fr/）。
