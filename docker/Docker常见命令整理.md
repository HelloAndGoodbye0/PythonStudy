# Docker 常见命令整理

> 涵盖镜像、容器、网络、数据卷、Compose、仓库、系统清理等全场景命令速查

---

## 一、镜像管理

| 命令 | 说明 |
|------|------|
| `docker images` | 列出本地所有镜像 |
| `docker pull <镜像名>[:tag]` | 从仓库拉取镜像 |
| `docker push <镜像名>[:tag]` | 推送镜像到仓库 |
| `docker build -t <名称>[:tag] .` | 从 Dockerfile 构建镜像 |
| `docker rmi <镜像ID/名称>` | 删除镜像 |
| `docker rmi $(docker images -q)` | 删除所有镜像 |
| `docker tag <源镜像> <目标镜像>` | 给镜像打标签 |
| `docker save -o xxx.tar <镜像名>` | 导出镜像为 tar 文件 |
| `docker load -i xxx.tar` | 从 tar 文件导入镜像 |
| `docker inspect <镜像名>` | 查看镜像详细信息 |
| `docker history <镜像名>` | 查看镜像构建历史 |
| `docker image prune` | 清理未使用的镜像 |

---

## 二、容器管理

### 创建与运行

| 命令 | 说明 |
|------|------|
| `docker run <镜像名>` | 创建并启动容器 |
| `docker run -d <镜像名>` | 后台运行容器 |
| `docker run -it <镜像名> bash` | 交互式运行并进入终端 |
| `docker run --name <名称> <镜像>` | 指定容器名称 |
| `docker run -p 8080:80 <镜像>` | 端口映射（主机:容器） |
| `docker run -v /host:/container <镜像>` | 挂载数据卷 |
| `docker run -e KEY=VALUE <镜像>` | 设置环境变量 |
| `docker run --rm <镜像>` | 容器退出后自动删除 |
| `docker run --restart=always <镜像>` | 设置自动重启策略 |

### 查看与状态

| 命令 | 说明 |
|------|------|
| `docker ps` | 列出运行中的容器 |
| `docker ps -a` | 列出所有容器（含停止的） |
| `docker inspect <容器ID>` | 查看容器详细信息 |
| `docker stats` | 实时查看容器资源使用 |
| `docker top <容器ID>` | 查看容器内进程 |
| `docker logs <容器ID>` | 查看容器日志 |
| `docker logs -f <容器ID>` | 实时追踪容器日志 |
| `docker logs --tail 100 <容器ID>` | 查看最后 100 行日志 |

### 启停与删除

| 命令 | 说明 |
|------|------|
| `docker start <容器ID>` | 启动已停止的容器 |
| `docker stop <容器ID>` | 优雅停止容器（SIGTERM） |
| `docker kill <容器ID>` | 强制停止容器（SIGKILL） |
| `docker restart <容器ID>` | 重启容器 |
| `docker pause <容器ID>` | 暂停容器 |
| `docker unpause <容器ID>` | 恢复容器 |
| `docker rm <容器ID>` | 删除已停止的容器 |
| `docker rm -f <容器ID>` | 强制删除运行中容器 |
| `docker rm $(docker ps -aq)` | 删除所有容器 |
| `docker container prune` | 清理所有已停止容器 |

### 进入与操作

| 命令 | 说明 |
|------|------|
| `docker exec -it <容器ID> bash` | 进入运行中的容器 |
| `docker exec <容器ID> <命令>` | 在容器内执行命令 |
| `docker cp <容器ID>:/path /host` | 从容器复制文件到主机 |
| `docker cp /host <容器ID>:/path` | 从主机复制文件到容器 |
| `docker commit <容器ID> <镜像名>` | 将容器保存为新镜像 |
| `docker diff <容器ID>` | 查看容器文件系统变更 |

---

## 三、网络管理

| 命令 | 说明 |
|------|------|
| `docker network ls` | 列出所有网络 |
| `docker network create <名称>` | 创建自定义网络 |
| `docker network rm <名称>` | 删除网络 |
| `docker network inspect <名称>` | 查看网络详情 |
| `docker network connect <网络> <容器>` | 将容器加入网络 |
| `docker network disconnect <网络> <容器>` | 将容器从网络移除 |
| `docker network prune` | 清理未使用网络 |

---

## 四、数据卷管理

| 命令 | 说明 |
|------|------|
| `docker volume ls` | 列出所有数据卷 |
| `docker volume create <名称>` | 创建数据卷 |
| `docker volume rm <名称>` | 删除数据卷 |
| `docker volume inspect <名称>` | 查看数据卷详情 |
| `docker volume prune` | 清理未使用数据卷 |

---

## 五、Docker Compose

| 命令 | 说明 |
|------|------|
| `docker compose up` | 启动服务（前台） |
| `docker compose up -d` | 后台启动所有服务 |
| `docker compose down` | 停止并删除容器、网络 |
| `docker compose down -v` | 同时删除数据卷 |
| `docker compose ps` | 查看服务状态 |
| `docker compose logs -f` | 实时查看服务日志 |
| `docker compose build` | 构建/重建服务镜像 |
| `docker compose pull` | 拉取服务镜像 |
| `docker compose restart` | 重启所有服务 |
| `docker compose exec <服务> bash` | 进入指定服务容器 |
| `docker compose config` | 验证并显示配置 |
| `docker compose stop` | 停止服务（不删除容器） |

---

## 六、Registry 镜像仓库

| 命令 | 说明 |
|------|------|
| `docker login` | 登录 Docker Hub |
| `docker login <仓库地址>` | 登录私有仓库 |
| `docker logout` | 退出登录 |
| `docker search <关键词>` | 搜索镜像 |

---

## 七、系统清理

| 命令 | 说明 |
|------|------|
| `docker system df` | 查看 Docker 磁盘使用情况 |
| `docker system info` | 查看系统信息 |
| `docker system prune` | 清理所有未使用资源 |
| `docker system prune -a` | 清理所有资源（包括未使用镜像） |
| `docker system prune -a --volumes` | 清理所有资源含数据卷 |

---

## 八、常用组合技巧

```bash
# 停止所有运行中的容器
docker stop $(docker ps -q)

# 删除所有已停止的容器
docker rm $(docker ps -aq)

# 删除所有 <none> 悬空镜像
docker rmi $(docker images -f "dangling=true" -q)

# 进入容器并查看环境变量
docker exec -it <容器ID> env

# 查看容器 IP 地址
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <容器ID>

# 限制容器资源（内存 512M + CPU 0.5 核）
docker run -m 512m --cpus="0.5" <镜像名>

# 查看实时事件流
docker events
```

---

## 九、docker run 常用参数速查

| 参数 | 说明 |
|------|------|
| `-d` | 后台运行 |
| `-it` | 交互式 + 终端 |
| `--name` | 容器名称 |
| `-p 主机端口:容器端口` | 端口映射 |
| `-P` | 随机端口映射 |
| `-v 主机路径:容器路径` | 挂载目录 |
| `-e KEY=VAL` | 环境变量 |
| `--env-file <文件>` | 从文件读取环境变量 |
| `--rm` | 退出后自动删除 |
| `--restart=always` | 总是自动重启 |
| `--network <网络名>` | 指定网络 |
| `--link <容器名>` | 链接其他容器（旧方式） |
| `-u <用户>` | 指定运行用户 |
| `--privileged` | 特权模式 |
| `--workdir <路径>` | 设置工作目录 |
| `--memory 512m` | 限制内存 |
| `--cpus 1.5` | 限制 CPU |

---

*整理日期：2026-04-08*
