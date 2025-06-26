FROM centos:centos8



# 安装阿里云的Yum源
RUN sed -e 's|^mirrorlist=|#mirrorlist=|g' \
        -e 's|^#baseurl=http://mirror.centos.org|baseurl=https://mirrors.aliyun.com|g' \
        -i.bak \
        /etc/yum.repos.d/CentOS-*.repo

RUN yum clean all \
    && yum makecache \
    && yum install -y wget gcc make

ENV redis_version=6.0.8
RUN wget http://download.redis.io/releases/redis-${redis_version}.tar.gz \
    && tar xzf redis-${redis_version}.tar.gz \
    && cd redis-${redis_version} && make \
    && cp src/redis-server /usr/local/bin/  \
    && cp src/redis-cli /usr/local/bin/

    
# 后台运行
EXPOSE 6379


CMD ["redis-server"]