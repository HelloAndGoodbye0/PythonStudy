@REM 删除容器
docker rm -f redis
@REM 运行
docker run -d -p 6379:6379 --name redis centos_redis:latest
@REM 进入容器
docker exec -it redis redis-cli