# 使用最新 Ubuntu 镜像
FROM ubuntu:latest

# 避免交互式安装提示
ENV DEBIAN_FRONTEND=noninteractive

# 替换为阿里云镜像源（兼容 Ubuntu 22.04 及 24.04+）
RUN if [ -f /etc/apt/sources.list ] && grep -q "archive.ubuntu.com" /etc/apt/sources.list; then \
        sed -i 's|http://archive.ubuntu.com/ubuntu/|http://mirrors.aliyun.com/ubuntu/|g' /etc/apt/sources.list && \
        sed -i 's|http://security.ubuntu.com/ubuntu|http://mirrors.aliyun.com/ubuntu|g' /etc/apt/sources.list; \
    fi && \
    if [ -f /etc/apt/sources.list.d/ubuntu.sources ]; then \
        sed -i 's|http://archive.ubuntu.com/ubuntu/|http://mirrors.aliyun.com/ubuntu/|g' /etc/apt/sources.list.d/ubuntu.sources && \
        sed -i 's|http://security.ubuntu.com/ubuntu|http://mirrors.aliyun.com/ubuntu|g' /etc/apt/sources.list.d/ubuntu.sources; \
    fi

# 更新包列表并安装 OpenSSH Server
RUN apt-get update && \
    apt-get install -y openssh-server && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 设置 root 密码为 123456
RUN echo 'root:123456' | chpasswd

# 允许 root 用户通过密码进行 SSH 登录
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config

# 创建 SSH 运行所需的目录
RUN mkdir -p /var/run/sshd

# 生成 SSH Host Keys
RUN ssh-keygen -A

# 暴露 SSH 端口
EXPOSE 22

# 启动 SSH 服务（前台运行，防止容器退出）
CMD ["/usr/sbin/sshd", "-D"]
