
@echo off
@REM 判断本地存在conf.d目录？删除
if exist conf.d (
    ECHO "delete conf.d dir"
    rmdir /s /q conf.d
) 

@REM 判断本地存在html目录？删除
if exist html (
    ECHO "delete html dir"
    rmdir /s /q html
)
@REM 导出配置文件到当前目录
docker create --name temp-container ubuntu-nginx
docker cp temp-container:/etc/nginx/conf.d ./conf.d
docker cp temp-container:/var/www/html/ ./html
docker rm temp-container
@REM 运行容器
docker run --rm -d -p 80:80 -p 443:443 -v %cd%/conf.d:/etc/nginx/conf.d -v %cd%/html:/var/www/html --name my-ubuntu-nginx ubuntu-nginx
pause