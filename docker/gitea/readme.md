# Gitea Docker 部署

基于 Docker / Docker Compose 部署 Gitea，所有数据统一放在项目根目录的 `data/` 下，便于备份和迁移。

## 目录结构

```
docker/gitea/
├── data/                  # Gitea 数据目录（仓库、数据库、配置、SSH 密钥）
│   ├── git/               # Git 仓库数据
│   ├── gitea/             # 数据库、附件、app.ini 配置
│   └── ssh/               # SSH 密钥
├── docker-compose.yml     # 推荐：Compose 部署文件
├── build.bat              # Windows 一键启动脚本
└── readme.md
```

## 镜像说明

- 官方镜像仓库已迁移到 `docker.gitea.com/gitea`，本目录的 `docker-compose.yml` 使用该地址；Docker Hub 的 `gitea/gitea` 仍可用于旧版本。
- 建议固定版本号（当前 `28.4.0`），避免 `latest` 自动升级带来不兼容。
- 容器内端口固定：Web 为 `3000`，SSH 为 `22`（**不是** `2222`）；宿主机映射端口可自定义。

## 方式一：Docker Compose（推荐）

在 `docker/gitea` 目录下执行。

**Linux / macOS**

```bash
cd /path/to/docker/gitea
mkdir -p data && sudo chown -R 1000:1000 data
docker compose up -d
```

**Windows（PowerShell）**

```powershell
cd F:\PythonStudy\docker\gitea
docker compose up -d
```

也可直接双击 `build.bat` 启动。

默认映射为 `3000:3000`（Web）和 `222:22`（SSH）。如需修改宿主机 SSH 端口，编辑 `docker-compose.yml` 的 `ports`，例如 `"2222:22"`，并同步修改安装向导中的 SSH 端口。

> 时区通过 `TZ=Asia/Shanghai` 环境变量设置，兼容 Windows / macOS / Linux。若 Linux 下希望直接挂载宿主机时区文件，可把 `environment` 中的 `TZ` 换成：
>
> ```yaml
> volumes:
>   - /etc/timezone:/etc/timezone:ro
>   - /etc/localtime:/etc/localtime:ro
> ```

## 方式二：docker run 快速部署

**Linux 服务器**（示例 IP `43.153.141.14`）

```bash
docker pull docker.gitea.com/gitea:28.4.0
mkdir -p /home/gitea && chown -R 1000:1000 /home/gitea
docker run -d --name=gitea \
  -p 3000:3000 -p 2222:22 \
  -v /home/gitea:/data \
  -e TZ=Asia/Shanghai \
  --restart=always \
  docker.gitea.com/gitea:28.4.0
```

**Windows（PowerShell）**

```powershell
docker run -d --name=gitea `
  -p 3691:3000 -p 2222:22 `
  -v F:\gitea:/data `
  -e TZ=Asia/Shanghai `
  --restart=always `
  docker.gitea.com/gitea:28.4.0
```

> 原文档中的 `2222:2222` 有误：容器 SSH 监听的是 `22`，`2222` 只是宿主机映射端口。

## 首次初始化

浏览器打开 Web 地址：

- Linux 服务器：<http://43.153.141.14:3000/>
- 本机 Windows（Compose）：<http://localhost:3000/>
- Windows docker run 示例：<http://localhost:3691/>

首次访问会进入安装向导，关键配置：

| 配置项 | 建议值 |
| --- | --- |
| 数据库 | SQLite3（小型站点够用，数据库文件为 `/data/gitea/gitea.db`） |
| 站点名称 | 自定义 |
| 站点 URL | 实际访问地址，如 `http://43.153.141.14:3000/`；端口映射变更时必须同步修改 |
| SSH 服务域名 | 服务器 IP 或域名 |
| SSH 服务端口 | 宿主机映射的 SSH 端口，如 `2222`（Compose 默认 `222`） |
| 管理员账号 | 第一个注册的用户自动成为管理员，建议立即注册 |

安装完成后配置保存在 `data/gitea/conf/app.ini`，修改该文件后需重启容器生效。

## 常用运维

Compose 部署：

```bash
docker compose ps                            # 查看状态
docker compose logs -f server                # 实时日志
docker compose restart                       # 重启
docker compose down                          # 停止并移除容器（数据不丢）
docker compose pull && docker compose up -d  # 升级镜像
```

docker run 部署：

```bash
docker start|stop|restart gitea              # 启停 / 重启
docker logs -f gitea                         # 实时日志
docker rm -f gitea                           # 升级：删除旧容器后，用新镜像重新执行上面的 run 命令，data 目录不变
```

## 备份与恢复

`data/` 目录包含仓库、数据库、配置和 SSH 密钥，直接打包即可：

```bash
tar czf gitea-backup-$(date +%F).tar.gz data/
```

恢复时先停止容器，解压覆盖 `data/`，再启动容器。

## 常见问题

1. **容器反复重启 / 权限报错**：Linux 下确认 `data/` 属主为 `1000:1000`，执行 `sudo chown -R 1000:1000 data`。
2. **Web 页面打不开**：检查服务器安全组 / 防火墙是否放行 Web 端口（默认 `3000`）。
3. **SSH 克隆失败**：客户端连接的是宿主机映射端口，需与 `app.ini` 中的 `SSH_PORT` 一致；Windows 防火墙也要放行该端口。
4. **改了配置不生效**：`data/gitea/conf/app.ini` 修改后需要重启容器。
5. **升级后异常**：先备份 `data/`，再把镜像版本回退到升级前的版本。
