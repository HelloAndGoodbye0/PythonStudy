
@echo off


@REM 判断本地存在conf.d目录？不存在就导出一次
if not exist conf.d (
    @REM 导出配置文件到当前目录
    echo "copying config files..."
    docker create --name temp-container ubuntu-nginx
    docker cp temp-container:/etc/nginx/conf.d ./conf.d
    docker cp temp-container:/var/www/html/ ./html
    docker rm temp-container
    ) 


@REM 运行容器
docker run --rm -d -p 80:80 -p 443:443 -v %cd%/conf.d:/etc/nginx/conf.d -v %cd%/html:/var/www/html --name my-ubuntu-nginx ubuntu-nginx
pause