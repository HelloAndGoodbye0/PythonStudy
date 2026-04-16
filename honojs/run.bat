@REM 删除容器
docker rm -f myhonojs
@REM 启动容器
docker run -p 3000:3000 --name myhonojs myhonojs:1.0.0
pause