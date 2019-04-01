### About nginx

0. 本地默认端口为80

1. nginx的作用
    + 作为前端暂时只需要用到nginx的转发功能

2. 服务器nginx配置

```nginx
    # 将80端口转到8080
    server {
       listen 80;
       server_name global.tigerwit.com;
       #root /data/web/global;
       #index index.php index.html index.htm;
       #include php_sock.conf;
       access_log  /data/logs/nginx/global.access.log;
       error_log   /data/logs/nginx/global.error.log;
       #include php_sock.conf;

        location /{
            proxy_set_header        X-Forwarded-For   $remote_addr;
            proxy_set_header        X-Real-IP         $remote_addr;
            proxy_pass_header Server;
            proxy_set_header Host $http_host;
            proxy_pass "http://127.0.0.1:8080";
        }
    }
```

3. 本地nginx配置
```nginx
    #global
    server {
            listen          80;
            server_name      global.dev.tigerwit.com;
            location /{
            proxy_pass   "http://127.0.0.1:5000";
            }
            # 转接
            location ~ ^/(api|action|avatar|financing|files|blog|id_pic)/{
                proxy_pass "https://proxy.tigerwit.com";
            }
        }
```

4. nginx配置重启测试
    - $ 查看当前进程位置: ps -ef | grep nginx
    root      1199     1  0 Mar13 ?        00:00:00 nginx: master process /usr/local/nginx-1.10.1/sbin/nginx
    adminhk   3256  2811  0 11:52 pts/3    00:00:00 grep --color=auto nginx
    adminhk  31210  1199  0 10:28 ?        00:00:00 nginx: worker process
    adminhk  31211  1199  0 10:28 ?        00:00:00 nginx: worker process

    sudo /usr/local/nginx-1.10.1/sbin/nginx -t 测试配置是否可以成功

    nginx: the configuration file /usr/local/nginx-1.10.1/conf/nginx.conf syntax is ok
    nginx: configuration file /usr/local/nginx-1.10.1/conf/nginx.conf test is successful

5. 测试配置成功后,重启服务
    sudo /usr/local/nginx-1.10.1/sbin/nginx -s reload