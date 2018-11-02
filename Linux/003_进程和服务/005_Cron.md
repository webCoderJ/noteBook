> Cron 是一个进程，用于周期性执行某一命令

```shell
crontab 		# 控制cron行为
-u				# 查看某一用户周期性工作，需要root
-e				# 编辑工作内容
-l				# 查阅crontab内容
-r				# 移除所有crontab工作内容

systemcrl restart crond.service		# 重启cron服务
```

格式：一行代表一个命令

- 时间参数，顺序：min hour day mon week + commad
  - \* 代表任何时候
  - ，和 `15,30 * * * *` 任何时候的15，35分执行
  - \- 范围
  - /n 每隔n个单位

- 使用crontab来创建作业计划后，该计划就会被记录到 `/var/spool/cron` 中，是以账号判别
- Crontab 的工作会被记录到 `/var/log/cron`
- Crond.service 每分钟检测一次，所以每隔一分钟去检测 `/etc/crontab /var/spool/cron ` 读取内容并且执行， 然后把日志记录到 `var/log/cron/[username]`

