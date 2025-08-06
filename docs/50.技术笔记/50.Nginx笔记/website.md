## 站点配置

### 定位配置文件nginx.conf

```shell
nginx -t
# 输出：
# nginx: the configuration file /home/soft/nginx/conf/nginx.conf syntax is ok
# nginx: configuration file /home/soft/nginx/conf/nginx.conf test is successful
# 可以看到，nginx.conf位于/home/soft/nginx/conf/
```

### 设置独立目录管理站点

- 创建站点conf.d目录（以后所有站点都以单个文件的形式在此目录下配置）

```shell
mkdir /home/soft/nginx/conf/conf.d
```

- 配置nginx.conf，引入站点配置目录conf.d

```shell
vi /home/soft/nginx/conf/nginx.conf

# 添加以下代码：
http {
  ... # 省略部分配置参数
  
  include conf.d/*.conf;
}
```

### 创建一个新的站点

```shell
cd conf.d
vi www_foo_com.conf
```

**www_foo_com.conf配置如下：**

- 简易 示例：

```shell
server {
    listen 80;
    server_name www.foo.com;
}
```

- 负载均衡 示例：

```shell
# 负载均衡
upstream www_proxy {
    # 可通过 pm2 + node 快速创建两个端口号的单应用
    server 127.0.0.1:4321;
    server 127.0.0.1:4322;
}

server {
    listen 80;
    server_name www.foo.com;

    # Gzip Compression
    gzip on;
    gzip_comp_level 6;
    gzip_vary on;
    gzip_min_length  1000;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_buffers 16 8k;
    
    location / {
        # remote_addr 代表客户端的 IP
        proxy_set_header X-Real-IP $remote_addr;
        # proxy_add_x_forwarded_for 获取真实的 IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # http_host 表示请求的 host 头
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
      
        # proxy_pass 指令实现代理。把域名代理到集群名上面
        proxy_pass http://www_proxy;
        proxy_redirect off;
    }
}
```

### 重新载入配置文件

```shell
nginx -s reload
```

### 查看站点

浏览器打开：`http://www.foo.com`

## 使用SSL证书

### SSL参数说明

```shell
server {
  listen 443; # SSL 访问端口号为 443
  server_name www.domain.com; # 填写绑定证书的域名
  
  # 如果不是 https 协议，重定向到 https，同时带上所有参数
  if ($ssl_protocol = "") {
    return 301 https://$server_name$request_uri;
  }
  # 也可以直接重写到新的 https 地址
  rewrite ^(.*) https://$host$1 permanent;
  ssl on; # 启用SSL功能
  ssl_certificate 1_www.domain.com_bundle.crt; # 证书文件
  ssl_certificate_key 2_www.domain.com.key; # 私钥文件
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 使用的协议
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; #配置加密套件
  ssl_prefer_server_ciphers on;
  location / {
      root   html; # 对外提供内容访问的站点目录
      index  index.html index.htm;
  }
}
```

### SSL配置

```shell
server {
  listen 0.0.0.0:80;
  server_name www.foo.com;
  rewrite ^(.*) https://$host$1 permanent;
  # return 301 https://www.foo.com$request_uri;
}
server {
  listen      443 default ssl;
  server_name www.foo.com;

  ssl on;
  ssl_certificate  /www/cert/foo.pem;
  ssl_certificate_key  /www/cert/foo.key;

  if ($ssl_protocol = "") {
    rewrite ^ https://$host$request_uri? permanent;
  }
}
```