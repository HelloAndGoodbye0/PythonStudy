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