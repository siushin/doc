---
date: 2025-08-16 13:02:11
categories:
  - Nginx
tags:
  - Nginx
---

## 部署报错

### 找不到nginx.pid

报错：

```text
nginx: [error] open() "/home/soft/nginx/logs/nginx.pid" failed (2: No such file or directory)
```

解决办法：

- 重新生成nginx.pid

```shell
# 注意：本服务器Nginx安装在/home/soft/nginx/
/home/soft/nginx/sbin/nginx -c /home/soft/nginx/conf/nginx.conf
```

- 检查nginx.pid是否创建

```shell
cd logs/
ll
# 此时，nginx.pid文件已经有了
```