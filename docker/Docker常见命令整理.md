# Docker 常见命令整理

## 一、镜像操作（Image）

### 查看镜像
```bash
# 列出本地所有镜像
docker images

# 搜索 Docker Hub 上的镜像
docker search nginx

# 查看镜像详细信息
docker inspect <image-id>

# 查看镜像历史
docker history <image-name>
```

### 构建镜像
```bash
# 从 Dockerfile 构建镜像
docker build -t <image-name>:<tag> .

# 指定 Dockerfile 路径
docker build -f /path/to/Dockerfile -t <image-name>:<tag> .

# 构建时设置构建参数
docker build --build-arg VERSION=1.0 -t <image-name>:<tag> .
```

### 获取镜像
```bash
# 从 Docker Hub 拉取镜像
docker pull <image-name>:<tag>

# 拉取特定版本
docker pull ubuntu:20.04

# 拉取最新版本
docker pull ubuntu:latest
```

### 删除镜像
```bash
# 删除指定镜像
docker rmi <image-id>

# 删除指定镜像（按名称）
docker rmi <image-name>:<tag>

# 强制删除镜像
docker rmi -f <image-id>

# 删除所有未使用的镜像
docker image prune

# 删除所有镜像
docker rmi $(docker images -q)
```

### 镜像标签管理
```bash
# 为镜像添加标签
docker tag <image-id> <new-image-name>:<tag>

# 重新标记镜像
docker tag ubuntu:latest myubuntu:v1
```

### 上传镜像
```bash
# 登录 Docker Hub
docker login

# 上传镜像到 Docker Hub
docker push <username>/<image-name>:<tag>

# 登出
docker logout
```

---

## 二、容器操作（Container）

### 创建与运行容器
```bash
# 创建并运行容器
docker run [OPTIONS] <image-name> [COMMAND]

# 常用选项
docker run -d                          # 后台运行（detach）
docker run -it                         # 交互式运行
docker run --name <container-name>     # 指定容器名称
docker run -p 8080:80                  # 端口映射（主机:容器）
docker run -v /host/path:/container/path  # 挂载卷
docker run -e ENV_VAR=value           # 环境变量
docker run --restart=always            # 容器退出时自动重启

# 完整示例
docker run -d -p 8080:80 --name my-nginx -v /host/data:/data nginx:latest
```

### 查看容器
```bash
# 列出运行中的容器
docker ps

# 列出所有容器（包括停止的）
docker ps -a

# 查看容器详细信息
docker inspect <container-id>

# 查看容器日志
docker logs <container-id>

# 实时查看容器日志
docker logs -f <container-id>

# 查看容器进程
docker top <container-id>

# 查看容器资源占用
docker stats <container-id>
```

### 启动/停止/重启容器
```bash
# 启动容器
docker start <container-id>

# 停止容器
docker stop <container-id>

# 强制停止容器
docker kill <container-id>

# 重启容器
docker restart <container-id>

# 暂停容器
docker pause <container-id>

# 恢复暂停的容器
docker unpause <container-id>
```

### 删除容器
```bash
# 删除已停止的容器
docker rm <container-id>

# 强制删除运行中的容器
docker rm -f <container-id>

# 删除所有停止的容器
docker container prune

# 删除所有容器
docker rm $(docker ps -aq)
```

### 进入容器
```bash
# 进入运行中的容器（推荐）
docker exec -it <container-id> bash

# 进入容器内部（旧方法）
docker attach <container-id>

# 在容器内执行命令
docker exec <container-id> ls -la
```

### 容器复制
```bash
# 从容器复制文件到主机
docker cp <container-id>:/path/to/file /host/path

# 从主机复制文件到容器
docker cp /host/path <container-id>:/path/to/file
```

### 容器导出导入
```bash
# 导出容器为压缩包
docker export <container-id> > container.tar

# 从压缩包导入为镜像
docker import container.tar <image-name>:<tag>
```

---

## 三、数据卷操作（Volume）

### 卷管理
```bash
# 列出所有卷
docker volume ls

# 创建卷
docker volume create <volume-name>

# 查看卷详细信息
docker volume inspect <volume-name>

# 删除卷
docker volume rm <volume-name>

# 删除所有未使用的卷
docker volume prune
```

### 挂载卷
```bash
# 使用具名卷
docker run -v <volume-name>:/container/path <image>

# 使用主机路径
docker run -v /host/path:/container/path <image>

# 只读挂载
docker run -v /host/path:/container/path:ro <image>

# 读写挂载（默认）
docker run -v /host/path:/container/path:rw <image>
```

---

## 四、网络操作（Network）

### 网络管理
```bash
# 列出所有网络
docker network ls

# 创建网络
docker network create <network-name>

# 查看网络详细信息
docker network inspect <network-name>

# 删除网络
docker network rm <network-name>

# 容器连接到网络
docker network connect <network-name> <container-id>

# 容器断开网络连接
docker network disconnect <network-name> <container-id>
```

### 端口映射
```bash
# 暴露容器端口
docker run -p 8080:80 <image>          # 主机端口:容器端口

# 暴露多个端口
docker run -p 8080:80 -p 8443:443 <image>

# 随机端口映射
docker run -P <image>

# 查看端口映射
docker port <container-id>
```

---

## 五、多容器编排（Docker Compose）

### 基本命令
```bash
# 启动服务（需要 docker-compose.yml 文件）
docker-compose up

# 后台启动
docker-compose up -d

# 停止服务
docker-compose down

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs

# 执行命令
docker-compose exec <service-name> bash

# 构建镜像
docker-compose build

# 重启服务
docker-compose restart
```

---

## 六、系统管理

### 系统信息
```bash
# 查看 Docker 系统信息
docker info

# 查看 Docker 版本
docker --version

# 查看详细版本信息
docker version
```

### 清理系统
```bash
# 删除未使用的容器、镜像、网络
docker system prune

# 强制删除所有未使用资源
docker system prune -a

# 查看磁盘使用情况
docker system df
```

### 日志驱动
```bash
# 配置 Docker 日志驱动
# 编辑 /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

---

## 七、常用快速命令

```bash
# 查看所有容器的大小
docker ps -as

# 停止所有运行中的容器
docker stop $(docker ps -q)

# 删除所有停止的容器
docker container prune -f

# 查看容器网络信息
docker inspect -f '{{.NetworkSettings.IPAddress}}' <container-id>

# 重命名容器
docker rename <old-name> <new-name>

# 查看容器变更
docker diff <container-id>

# 保存容器为镜像
docker commit <container-id> <image-name>:<tag>

# 查看镜像分层信息
docker history <image-name>

# 统计容器使用资源
docker stats

# 查看容器启动命令
docker inspect -f '{{.Config.Cmd}}' <container-id>
```

---

## 八、Dockerfile 常用指令

```dockerfile
FROM ubuntu:20.04              # 基础镜像
WORKDIR /app                   # 工作目录
RUN apt-get install nginx      # 执行命令
COPY file /app/                # 复制文件
ADD archive.tar.gz /app/       # 复制并解压
ENV KEY=value                  # 环境变量
EXPOSE 80                      # 暴露端口
VOLUME ["/data"]               # 挂载点
USER username                  # 运行用户
CMD ["nginx"]                  # 默认命令
ENTRYPOINT ["docker"]          # 入口点
ARG VERSION=1.0                # 构建参数
LABEL version="1.0"            # 标签
HEALTHCHECK --interval=30s CMD curl localhost  # 健康检查
```

---

## 九、故障排查

```bash
# 查看容器日志（包括错误）
docker logs -f <container-id>

# 进入容器调试
docker exec -it <container-id> bash

# 查看容器进程
docker top <container-id>

# 查看容器资源使用
docker stats <container-id>

# 检查镜像分层
docker history <image-name>

# 查看容器网络配置
docker inspect <container-id> | grep -A 10 NetworkSettings

# 测试容器连接
docker exec <container-id> ping <ip>

# 查看 Docker 守护进程日志
journalctl -u docker

# 验证 Dockerfile 语法
docker build --dry-run -t test .
```

---

## 十、性能优化建议

```bash
# 使用多阶段构建减小镜像大小
# Dockerfile 示例：
FROM node:14 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]

# 使用 .dockerignore 排除不需要的文件
# 使用 alpine 基础镜像减小镜像大小
FROM alpine:latest

# 合并 RUN 指令减少层数
RUN apt-get update && \
    apt-get install -y package1 package2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

---

## 常用快速参考表

| 操作 | 命令 |
|------|------|
| 查看镜像 | `docker images` |
| 查看容器 | `docker ps -a` |
| 运行容器 | `docker run -d -p 8080:80 <image>` |
| 进入容器 | `docker exec -it <container> bash` |
| 查看日志 | `docker logs -f <container>` |
| 停止容器 | `docker stop <container>` |
| 删除容器 | `docker rm <container>` |
| 删除镜像 | `docker rmi <image>` |
| 构建镜像 | `docker build -t <name> .` |
| 上传镜像 | `docker push <image>` |

---

**更新时间**: 2026-03-26  
**版本**: 1.0
