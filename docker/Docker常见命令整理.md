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
| `docker build --no-cache -t <名称> .` | 无缓存构建镜像 |
| `docker build -f <Dockerfile路径> -t <名称> .` | 指定 Dockerfile 构建 |
| `docker rmi <镜像ID/名称>` | 删除镜像 |
| `docker rmi $(docker images -q)` | 删除所有镜像 |
| `docker tag <源镜像> <目标镜像>` | 给镜像打标签 |
| `docker save -o xxx.tar <镜像名>` | 导出镜像为 tar 文件 |
| `docker load -i xxx.tar` | 从 tar 文件导入镜像 |
| `docker inspect <镜像名>` | 查看镜像详细信息 |
| `docker history <镜像名>` | 查看镜像构建历史 |
| `docker image prune` | 清理未使用的镜像 |
| `docker image ls` | 列出镜像（新语法风格） |

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
| `docker rename <旧名> <新名>` | 重命名容器 |
| `docker port <容器ID>` | 查看容器端口映射 |
| `docker attach <容器ID>` | 连接到容器主进程（区别于 exec） |
| `docker wait <容器ID>` | 阻塞直到容器退出，返回退出码 |
| `docker create <镜像>` | 创建容器但不启动 |

---

## 三、网络管理

| 命令 | 说明 |
|------|------|
| `docker network ls` | 列出所有网络 |
| `docker network create <名称>` | 创建自定义网络 |
| `docker network create --driver bridge --subnet 172.18.0.0/16 --gateway 172.18.0.1 <名称>` | 创建网络（指定子网/网关） |
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
| `docker compose run <服务> <命令>` | 对服务执行一次性命令 |
| `docker compose config` | 验证并显示配置 |
| `docker compose stop` | 停止服务（不删除容器） |
| `docker compose start <服务>` | 启动指定服务 |
| `docker compose rm <服务>` | 删除已停止的服务容器 |
| `docker compose images` | 列出 Compose 使用的镜像 |
| `docker compose top` | 查看服务内进程 |
| `docker compose pause` | 暂停服务 |
| `docker compose unpause` | 恢复服务 |

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
| `--hostname <主机名>` | 设置容器主机名 |
| `--add-host <host:ip>` | 添加 hosts 映射 |
| `--dns <DNS服务器>` | 指定 DNS 服务器 |
| `--shm-size 256m` | 共享内存大小 |
| `--log-driver json-file` | 日志驱动 |
| `--log-opt max-size=10m` | 日志驱动选项 |
| `--health-cmd "curl -f http://localhost/"` | 健康检查命令 |
| `--health-interval 30s` | 健康检查间隔 |
| `--health-timeout 3s` | 健康检查超时 |
| `--health-retries 3` | 健康检查重试次数 |
| `--read-only` | 只读文件系统 |
| `--tmpfs <挂载点>` | 挂载 tmpfs |
| `--memory 512m` | 限制内存 |
| `--cpus 1.5` | 限制 CPU |

---

## 十、Dockerfile 指令速查

| 指令 | 说明 | 示例 |
|------|------|------|
| `FROM <镜像>` | 指定基础镜像 | `FROM python:3.11-slim` |
| `RUN <命令>` | 构建时执行命令 | `RUN pip install -r requirements.txt` |
| `CMD ["exec","param"]` | 容器默认启动命令 | `CMD ["python", "app.py"]` |
| `ENTRYPOINT ["exec"]` | 容器入口点（不可被覆盖） | `ENTRYPOINT ["nginx"]` |
| `COPY <源> <目标>` | 复制文件到镜像 | `COPY . /app` |
| `ADD <源> <目标>` | 复制文件（支持 URL 和 tar 自动解压） | `ADD archive.tar.gz /app` |
| `WORKDIR <路径>` | 设置工作目录 | `WORKDIR /app` |
| `ENV KEY=VALUE` | 设置环境变量 | `ENV PYTHONUNBUFFERED=1` |
| `EXPOSE <端口>` | 声明容器监听端口 | `EXPOSE 8080` |
| `VOLUME ["/data"]` | 声明匿名数据卷 | `VOLUME ["/data"]` |
| `USER <用户>` | 切换运行用户 | `USER nobody` |
| `ARG <变量名>` | 构建参数（`--build-arg` 传入） | `ARG VERSION=1.0` |
| `LABEL key=value` | 添加元数据标签 | `LABEL maintainer="xxx"` |
| `HEALTHCHECK CMD <命令>` | 健康检查 | `HEALTHCHECK CMD curl -f http://localhost/` |
| `SHELL ["/bin/bash", "-c"]` | 指定 Shell | `SHELL ["/bin/bash", "-c"]` |
| `STOPSIGNAL <信号>` | 设置停止信号 | `STOPSIGNAL SIGQUIT` |
| `.dockerignore` 文件 | 排除不需要复制到镜像的文件 | 类似 `.gitignore` 语法 |

---

## 十一、Swarm 集群与 Stack 部署

| 命令 | 说明 |
|------|------|
| `docker swarm init` | 初始化 Swarm 集群 |
| `docker swarm join --token <token> <ip>:2377` | 加入 Swarm 集群 |
| `docker swarm leave` | 离开 Swarm 集群 |
| `docker swarm leave --force` | 强制离开（Manager 节点） |
| `docker node ls` | 查看集群节点 |
| `docker service create` | 创建服务 |
| `docker service ls` | 列出所有服务 |
| `docker service ps <服务>` | 查看服务任务分布 |
| `docker service scale <服务>=N` | 扩缩容服务 |
| `docker service update <服务>` | 更新服务配置 |
| `docker service rm <服务>` | 删除服务 |
| `docker stack deploy -c docker-compose.yml <名称>` | 部署 Stack |
| `docker stack ls` | 列出所有 Stack |
| `docker stack services <名称>` | 查看 Stack 中的服务 |
| `docker stack rm <名称>` | 删除 Stack |
| `docker secret create <名称> <文件>` | 创建密钥 |
| `docker config create <名称> <文件>` | 创建配置 |
| `docker secret ls` / `docker config ls` | 列出密钥/配置 |

---

*整理日期：2026-04-08*
*更新日期：2026-06-03*
