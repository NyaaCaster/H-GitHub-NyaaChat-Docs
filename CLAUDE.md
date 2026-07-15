# NyaaChat-Docs

## 交流语言

默认始终以**简体中文**与用户交流。代码、标识符、命令行参数、文件路径、提交信息等仍按惯例使用英文。

## 项目概述

NyaaChat 用户使用手册文档站，基于 VitePress 构建，Docker 容器化部署。

| 项目 | 说明 |
|------|------|
| 技术栈 | VitePress 1.6+ + Vue 3.5+ + Node.js 22 Alpine |
| 部署方式 | Docker 容器，跟随 NyaaChat 项目群的 build→push→pull→run 流程 |
| 内部端口 | 5173（VitePress 默认） |
| 外部端口 | 5112 |
| 网络 | `nyaachat-net`（NyaaChat 家族共享网络） |

## 文档编辑

文档 Markdown 文件存放在 `doc-files/` 目录。容器运行时通过 bind mount 挂载此目录，VitePress HMR 会即时反映修改，**无需重建镜像**。

```
doc-files/
├── index.md            # 首页
├── guide/              # 使用指南
├── features/           # 功能特性
├── faq.md              # 常见问题
└── public/             # 静态资源（logo、图片等）
```

编辑完文档后，通过 `commit-push` skill 提交和推送到 GitHub。

## 重新编译 Docker 镜像

当 Dockerfile、package.json、`.vitepress/` 配置等镜像内文件发生变更时，需要重建镜像：

```bash
python rebuild.py              # 构建 + 推送到私有仓库
python rebuild.py --no-cache   # 无缓存完全重建
python rebuild.py --skip-push  # 仅本地构建（离线/调试）
```

纯文档内容修改（`doc-files/*.md`）**不需要重建**，HMR 即时生效。

## macmini 部署端重启

在 macmini（`U-MacMini-1`，`192.168.31.141`）上部署/更新：

```bash
python3 restart.py              # 拉取最新镜像 + 重启
python3 restart.py --no-pull    # 使用本地已有镜像重启
```

## Git 提交与推送

使用项目 `commit-push` skill。要点：

- **未经用户明确请求，绝不自动 commit / push**
- 提交信息使用 **Conventional Commits**（英文，小写起首）
- 始终用 `git add <file>` 明确指定文件，**禁止** `git add -A` / `git add .`
- `.env`（含密钥）绝不入库
- 严禁 force push、`--amend` 已推送的 commit、`--no-verify`

## 安全约束

- 私有仓库地址（`PRIVATE_DOCKER_REGISTRY_HOST`）**绝不硬编码**在任何 Git 跟踪文件中
- 仅通过 `.env` 注入，`.env` 已加入 `.gitignore`
- `rebuild.py` 所有输出中的仓库地址必须掩码

## 参考

- NyaaChat 主项目（Docker 部署模式）：`H:\GitHub\NyaaChat\`
- AstrBot 文档站（VitePress 参考）：`H:\GitHub\AstrbotDev\.ref\AstrBot-docs\`
- macmini 迁移规范：`H:\GitHub\macmini-migration-guide.md`
