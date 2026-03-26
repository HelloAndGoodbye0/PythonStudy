# 使用最新Ubuntu基础镜像
FROM ubuntu:latest

# 设置环境变量避免交互式安装提示
ENV DEBIAN_FRONTEND=noninteractive

# 更新软件包列表并安装Nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# 暴露80和443端口
EXPOSE 80
EXPOSE 443

# 配置Nginx在容器启动时自动运行（daemon off模式保持前台进程）
CMD ["nginx", "-g", "daemon off;"]
