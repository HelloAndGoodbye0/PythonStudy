### gitea部署

1 docker pull gitea/gitea:latest

docker run -d --name=gitea -p 3000:3000 -p 2222:22 -v /home/gitea/:/data --restart=always gitea/gitea:latest

http://43.153.141.14:3000/

<!-- windows docker -->
docker run -d --name=gitea -p 3691:3000 -p 2222:22 -v F:\gitea\:/data --restart=always gitea/gitea:latest

### garethflowers/svn-server 部署

docker pull garethflowers/svn-server

docker run -d --restart=always --name my-svn-server  -v /home/svn:/var/opt/svn -p 3690:3690 garethflowers/svn-server



## docker jenkins
docker run -d --restart=always --name myJenkins -p 8080:8080 -p 50000:50000  -v F:\docker-jenkins:/var/jenkins_home jenkins/jenkins:2.528.2-lts-jdk21


### nginx
//复制配置文件出来
docker cp nginx:/etc/nginx/conf.d F:\docker-nignx
docker cp nginx:/usr/share/nginx/html/ F:\docker-nignx\html
docker cp nginx:/var/log/nginx/ F:\docker-nignx\logs
docker cp nginx:/etc/nginx/nginx.conf F:\docker-nignx


//运行
docker run -d --name nginx -p 8080:80 \  
-v F:\docker-nignx\nginx.conf:/etc/nginx/nginx.conf \
-v F:\docker-nignx\html:/usr/share/nginx/html \
-v F:\docker-nignx\logs:/var/log/nginx \
-v F:\docker-nignx\conf.d:/etc/nginx/conf.d \
nginx:latest



--rm 参数：停止运行后自动删除容器

### ubuntu  ssh 安装
docker run --hostname=963f40483d5d --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --network=bridge -p 80:80 --restart=no --label='org.opencontainers.image.ref.name=ubuntu' --label='org.opencontainers.image.version=24.04' --runtime=runc -t -d ubuntu
1 运行
docker run -itd --name my-ubuntu -p 22:22 ubuntu

docker run -itd --name my-ubuntu1 --privileged=true -p 22:22 ubuntu 
# 安装 SSH 服务
apt-get update
apt-get install -y openssh-server

# 设置 root 密码
passwd root

# 修改 SSH 配置允许 root 登录
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# 启动 SSH 服务
service ssh start



### docker 提交镜像

docker commit  -a "Lee" -m "remove openssh-client"  ubuntu unbntu-ssh:v3 

docker commit  ubuntu1 ubuntu1

docker run -it --rm unbntu-ssh:v3
