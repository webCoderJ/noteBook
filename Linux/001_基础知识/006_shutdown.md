```shell
# 关机
# 注意
	- 观察系统的使用状态
	- 在线通知使用者关机时间
# 把数据同步写入磁盘
sync
# 关机
shutdown
-t		关机延迟
-k		发出关机警告
-r		在系统服务停止后 重启
-h		在系统服务停止后 关机
-f		关机并且开机后，略过磁盘检查，用于磁盘有坏道的情况
-F		关机并且重启后，略过磁盘检查，用于磁盘有坏道的情况
-c

shutdown -h now
shutdown -h 12:00
shutdown -h +10		10分钟后
shutdown -r now
shutdown -r +30 'the system will reboot'
```

