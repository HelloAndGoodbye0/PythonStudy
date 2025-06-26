# 基于 CentOS 8
FROM centos:centos8


# 切换阿里云 yum 源
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

# 安装 openssh-server 和 passwd
RUN yum install -y openssh-server passwd && \
    yum clean all

# 设置 root 密码为 123456
RUN echo "root:123456" | chpasswd

# 允许 root 通过 SSH 登录
RUN sed -i 's/^#PermitRootLogin yes/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

# 创建 SSH 运行目录
RUN mkdir -p /var/run/sshd

# 生成 SSH 主机密钥，避免 sshd 启动报错
RUN ssh-keygen -A

# 开放 22 端口
EXPOSE 22

# 启动 sshd 服务
CMD ["/usr/sbin/sshd", "-D"]
