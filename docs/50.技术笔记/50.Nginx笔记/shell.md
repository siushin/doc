## Nginx常用命令

### 查看nginx版本

```shell
nginx -v
```

### 重新载入配置文件

```shell
nginx -s reload
```

### 重启 Nginx

```shell
nginx -s reopen
```

### 停止 Nginx

- 快速停止，此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程

```shell
nginx -s stop
```

- 完整停止（建议使用）,此方式停止步骤是待nginx进程处理任务完毕进行停止

```shell
nginx -s quit
```

### 检查配置文件nginx.conf的正确性命令

```shell
nginx -t
# 输出：
# nginx: the configuration file /home/soft/nginx/conf/nginx.conf syntax is ok
# nginx: configuration file /home/soft/nginx/conf/nginx.conf test is successful
```

### 查看nginx运行进程信息

```shell
ps -ef|grep nginx
# 输出：
# root      91768      1  0 17:44 ?        00:00:00 nginx: master process /home/soft/nginx/sbin/nginx -c /home/soft/nginx/conf/nginx.conf
# nobody   114999  91768  0 18:08 ?        00:00:00 nginx: worker process
# root     115262   9546  0 18:09 pts/0    00:00:00 grep --color=auto nginx
```