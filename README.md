# NyaaChat-Docs

NyaaChat 用户文档站，VitePress + Docker 容器化部署。

## 目录结构

```
NyaaChat-Docs/
├── doc-files/                  # 🔑 文档根目录（bind mount 到容器）
│   ├── .vitepress/             #   VitePress 配置与主题（也在卷中！）
│   │   ├── config.mjs          #     站点配置
│   │   └── theme/              #     自定义主题
│   ├── index.md                #   首页
│   ├── guide/                  #   使用指南
│   ├── features/               #   功能特性
│   ├── faq.md                  #   常见问题
│   └── public/                 #   静态资源（logo、图片等）
├── Dockerfile                  # 镜像构建（node:22-alpine + git + vitepress）
├── docker-compose.yml          # 本地开发 compose
├── docker-compose.publish.yml  # macmini 部署 compose（模板）
├── rebuild.py                  # 构建镜像 → 推送到私有仓库
├── restart.py                  # macmini 端拉取镜像 → 重启容器
├── package.json                # npm 依赖（vitepress + vue）
├── .env.example                # 环境变量模板
└── CLAUDE.md                   # Claude Code 项目指令
```

## 端口

| 环境 | 端口 | 说明 |
|------|------|------|
| 容器内部 | 5173 | VitePress 默认端口 |
| 宿主机外部 | 5112 | docker-compose 映射 |

## 两套 compose 文件

| 文件 | 用途 | 运行位置 |
|------|------|----------|
| `docker-compose.yml` | 本地开发，`build: .` 从 Dockerfile 构建 | Windows 开发机 |
| `docker-compose.publish.yml` | macmini 部署，从私有仓库拉取镜像 | macmini |

macmini 端部署时将 `docker-compose.publish.yml` **重命名**为 `docker-compose.yml` 使用。`restart.py` 默认引用 `docker-compose.yml`。

## 环境变量

`.env` 文件不入 Git，仅 `.env.example` 模板入库。

| 变量 | Windows 值 | macmini 值 |
|------|-----------|------------|
| `PRIVATE_DOCKER_REGISTRY_HOST` | `localhost:5000` | `192.168.31.142:5000` |

> **安全红线**：仓库地址绝不硬编码在任何 Git 跟踪文件中。

---

## 内容发布流程（⚠️ 最重要）

### 理解 bind mount

容器通过 bind mount 将宿主机 `./doc-files` 映射到容器内 `/app/doc-files`。**这覆盖了镜像内同名目录**。

这意味着：
- **镜像内的 `doc-files/` 仅在 macmini 宿主机对应目录为空时才生效**
- 一旦 macmini 上有 `doc-files/` 内容，镜像内的版本就被覆盖
- `.vitepress/config.mjs` 等配置文件**也在 `doc-files/` 内**——同样会被 bind mount 覆盖

### 首次部署

```bash
# Windows（构建 + 推送）
cd H:\GitHub\NyaaChat-Docs
python rebuild.py

# macmini（首次）
mkdir -p /root/DockerContainer/NyaaChat-Docs/doc-files

# 传输部署文件
scp -r doc-files/*                    U-MacMini-1:/root/DockerContainer/NyaaChat-Docs/doc-files/
scp    docker-compose.publish.yml     U-MacMini-1:/root/DockerContainer/NyaaChat-Docs/docker-compose.yml
scp    restart.py                     U-MacMini-1:/root/DockerContainer/NyaaChat-Docs/
scp    .env.macmini                   U-MacMini-1:/root/DockerContainer/NyaaChat-Docs/.env

# macmini（启动）
ssh U-MacMini-1
cd /root/DockerContainer/NyaaChat-Docs
python3 restart.py
```

### 日常内容更新（仅文档，不改配置/依赖）

```
Windows 编辑 Markdown → git push → macmini git pull → 自动 HMR 生效
```

**不需要重建镜像，不需要重启容器。** VitePress dev server 监听文件变更，HMR 即时热更新。

```bash
# Windows（开发机）
cd H:\GitHub\NyaaChat-Docs
# 编辑 doc-files/*.md ...
git add doc-files/xxx.md
git commit -m "docs: 更新 xxx 文档"
git push origin master

# macmini（部署机）
ssh U-MacMini-1
cd /root/DockerContainer/NyaaChat-Docs/doc-files
git pull origin master
# HMR 自动生效，无需其他操作
```

#### git pull 鉴权原理

macmini 上 `doc-files/.git/config` 的 remote URL 嵌入了 GitHub PAT，格式为：

```
https://<GITHUB_PAT>@github.com/NyaaCaster/H-GitHub-NyaaChat-Docs.git
```

PAT 从 `.env` 的 `GITHUB_PAT` 变量注入。首次初始化：

```bash
# macmini（仅首次，已配置则跳过）
cd /root/DockerContainer/NyaaChat-Docs/doc-files
git init
git remote add origin https://<GITHUB_PAT>@github.com/NyaaCaster/H-GitHub-NyaaChat-Docs.git
git fetch --depth=1 origin master
git reset --hard FETCH_HEAD
```

#### 验证更新

```bash
# macmini — 检查当前版本
cd /root/DockerContainer/NyaaChat-Docs/doc-files
git log --oneline -3

# 检查 HMR 是否生效（查看是否有文件变更日志）
docker logs nyaachat-docs 2>&1 | tail -5
```

### 配置变更（`.vitepress/config.mjs`、主题、Dockerfile、package.json）

这些文件在 `doc-files/` 内或影响镜像构建，需要**重建镜像 + 重启容器**：

```bash
# Windows
git push
python rebuild.py

# macmini
python3 restart.py
```

> **特别注意**：如果配置在 `doc-files/.vitepress/` 内，重建镜像后还必须把新配置 **scp 到 macmini 的 doc-files/**，因为 bind mount 会覆盖镜像内的旧配置！

### 不需要重建的操作

| 操作 | 需要重建？ | 需要重启？ |
|------|-----------|-----------|
| 编辑 Markdown 文档 | ❌ | ❌ HMR 自动 |
| 添加/删除文档页面 | ❌ | ❌ HMR 自动 |
| 修改 `.vitepress/config.mjs` | ❌（但需 scp 到 macmini） | ✅ `docker compose restart` |
| 修改主题 CSS | ❌（但需 scp 到 macmini） | ✅ `docker compose restart` |
| 修改 Dockerfile | ✅ | ✅ |
| 修改 package.json（依赖） | ✅ | ✅ |
| 修改 docker-compose.yml | ✅ | ✅ |
| 修改 rebuild.py / restart.py | ❌（scp 脚本即可） | ❌ |

---

## 重建与部署命令速查

### Windows（开发机）

```bash
cd H:\GitHub\NyaaChat-Docs

# 完整构建+推送
python rebuild.py

# 无缓存构建
python rebuild.py --no-cache

# 仅构建（不推送）
python rebuild.py --skip-push
```

### macmini（部署机）

```bash
cd /root/DockerContainer/NyaaChat-Docs

# 拉取最新镜像 + 重启
python3 restart.py

# 仅重启（不拉取）
python3 restart.py --no-pull

# 仅重启容器（保留镜像）
docker compose -f docker-compose.yml restart
```

---

## Docker 网络

容器加入 `nyaachat-net` 外部网络，与 NyaaChat 家族其他服务互通。首次部署前需创建：

```bash
docker network create nyaachat-net
```

---

## 域名的额外配置

VitePress dev server 默认拒绝非 localhost 的 Host 头。外部域名需在 `doc-files/.vitepress/config.mjs` 中配置：

```js
vite: {
  server: {
    allowedHosts: ['h.nyaa.host', 'h.hony-wen.com'],
  },
},
```

新增域名时在此列表追加即可。

---

## 常见问题

### 页面 404

检查 macmini 上 `doc-files/` 目录是否有内容：

```bash
ssh U-MacMini-1 "ls /root/DockerContainer/NyaaChat-Docs/doc-files/"
```

如果为空，需要 scp 文档内容过去（首次部署遗漏）。

### 配置改了但不生效

检查 bind mount 是否覆盖了镜像内的配置：

```bash
ssh U-MacMini-1 "grep allowedHosts /root/DockerContainer/NyaaChat-Docs/doc-files/.vitepress/config.mjs"
```

如果 macmini 上的配置文件是旧版，需要 scp 最新版过去。

### 访问被拒："Blocked request. This host is not allowed"

`doc-files/.vitepress/config.mjs` 中 `vite.server.allowedHosts` 未包含该域名。添加后 scp 到 macmini 并重启容器。
