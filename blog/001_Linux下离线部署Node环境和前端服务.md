## 背景说明
前端项目开发完成，需要部署在第三方服务器。由于第三方服务器是脱离公网的环境，所有的前端服务和所有的依赖都需要在离线环境中部署。记录下解决方案，希望可以帮助到由类似需求的旁友。会涉及到基础的Linux知识，对Linux不熟悉的童鞋可以先看看资料入门。

## 基本解决思路
1. 把Node环境下载下来作为离线包备用。
2. 本地构建前端代码，将所有前端构建产出以及node_modules依赖，node离线包全部打包成一个`output.tar.gz`。
3. 上传到服务器。
4. 解压，运行。
5. 要是都是脚本控制就更完美了~

## 最终产出的output目录内容
```javascript
output
  bin      		// pm2 控制脚本
  config 		// 配置文件
  dist     		// webpack 产出
  node_modules  // 项目所有依赖，当然这里面的内容可以只保留服务器需要的依赖，根据需求定
  server  		// 代理服务器，我想你的项目应该会用到
  thirdparty  	// 运行环境目录，这里是node-v8.x
  install.sh   	// 自动安装node环境脚本
```

## 离线包制作步骤
这里关于前端的webpack构建就不赘述了，直接看关键点：
1. 准备node离线包。直接在[Node官网](https://nodejs.org/en/download/)下载图示版本(这里要根据需要下载Node的具体版本，我的项目用的是`Node-LTS`)，这里下载的是linux通用的可执行文件，直接解压就可执行，方便后续脚本化操作。
     ![image.png](https://upload-images.jianshu.io/upload_images/9572601-361af6b4538a3523.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

     1. 有了离线包，在上传到服务器之后肯定还要手动安装啊，这个过程很机械，机械的东西就交给机器干吧。准备一个node环境安装脚本`output/install.sh`，让它来完成这些事情。由于下载的是可执行文件，解压后就相当于直接把node安装到了 `output/thirdparty`目录下，需要做的就是把node暴露给操作系统，让它拥有node运行环境。常用的有两种方法：
        2. 添加全局环境变量
        2. 添加软链接

     - 脚本中有个问题，希望有大神能帮忙解答下，我把node环境变量添加到 `/etc/profile`后，使用 `soure` 调用了它，但是没有生效，所以采用了软链接的方法将node暴露在系统中。
     - 脚本是在 `CentOS7` 中运行测试，开发时需要安装虚拟机模拟真实Linux环境，如果是mac，可能不能正常执行。具体安装步骤，可自行百度。

     ```shell
     #!/bin/bash
     # install nodejs
     base_dir=$(dirname $(readlink -f $0))
     node_dir="node-v8.12.0-linux-x64"
     
     # 第一步：将node解压到thirdparty,也就是当前文件夹
     
     if [ ! -d ${base_dir}/thirdparty/${node_dir} ]; then
       echo -e "\033[33m 正在解压Node \033[0m"
       tar -xvf ${base_dir}/thirdparty/node-env.tar.xz -C ${base_dir}/thirdparty
       echo -e "\033[32m Node 解压完成 \033[0m"
     else
       echo -e "\033[32m Node 已解压完成 \033[0m"
     fi
     
     # 赋予执行权限
     chmod u+x ${base_dir}/thirdparty/${node_dir}/bin/*
     
     #######问题########
     # 添加环境变量
     # export PATH=$PATH:${base_dir}/thirdparty/${node_dir}/bin
     # if [[ ! $PATH =~ "${base_dir}/thirdparty/${node_dir}/bin" ]]
     # then
     #   echo "export PATH=$PATH:${base_dir}/thirdparty/${node_dir}/bin" >> /etc/profile
     #   echo "Node 环境变量已添加"
     # fi
     
     # echo $PATH
     # source /etc/profile
     # echo $PATH
     #######问题########
     
     # 软链接
     ln -sf ${base_dir}/thirdparty/${node_dir}/bin/node /usr/bin/node
     
     if [ -f /usr/bin/node ]; then
       echo -e "\033[32m Node 软链接已添加 \033[0m"
     else
       echo -e "\033[31m Error: Node 软链接添加失败，确认是否以ROOT身份运行 \033[0m"
       exit
     fi
     
     # 联动pm2控制
     if [ -f ./bin/control ]; then
       echo -e "\033[33m 启动Server... \033[0m"
       ./bin/control start
       echo -e "\033[32m Server启动成功，可使用./bin/control维护当前服务 \033[0m"
       ./bin/control help
     fi
     ```

2. 在前端构建完成后把node压缩包拷贝至output中。贴上我的构建脚本`build.sh`（项目根目录中），让脚本去执行npm install balabala... 可以参考下：
    ```shell
    #!/bin/sh
    echo $(date +"%Y-%m-%d %H:%M:%S") 'build begin'
    rm -rf node_modules
    echo $(date +"%Y-%m-%d %H:%M:%S") 'rm -rf node_modules end'
    npm install
    echo $(date +"%Y-%m-%d %H:%M:%S") 'install end'
    mkdir output
    echo $(date +"%Y-%m-%d %H:%M:%S") 'mkdir output end'
    npm run build
    echo $(date +"%Y-%m-%d %H:%M:%S") 'npm build end'
    # 将所有需要的文件通通塞到output下
    cp -r build config node_modules server dist yunyi/bin thirdparty install output
    echo $(date +"%Y-%m-%d %H:%M:%S") 'move files end'
    # 给脚本添加运行权限
    chmod +x output/bin/control
    chmod +x output/install
    echo $(date +"%Y-%m-%d %H:%M:%S") 'build end'
    # GZ压缩output
    tar -czvf output.tar.gz output
    ```

3. 如果顺利的话，执行完以上脚本，你会在项目根目录中发现一个`output.tar.gz`的文件。至此，前端的离线部署包就完成了。

## 「真实」环境操作

1. 这里采用已经安装好的虚拟环境`CentOS7` , 有了虚拟环境，再把离线包复制到虚拟环境中，解压...
2. 进入解压出来的output中，你会看到 `install` , `tar`解压之...
3. 运行`install`脚本安装node，这里注意要以root权限运行，不然会报错。如果终端中显示 `Node 软链接已添加`就说明node已经安装完成了。
4. 启动你的server脚本，我把维护server的脚本(pm2操作)都放在了`bin/control`。`install`脚本执行完毕后会调用这个文件的`start`方法，这里根据需求自行修改吧，运行如图：
  ![image.png](https://upload-images.jianshu.io/upload_images/9572601-a9583e19b8797602.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. pm2控制脚本
```shell
   #!/bin/sh
   cd "$(dirname $0)"/.. || exit 1
   PROC_NAME='proxy-server'
   
   help(){
       echo "${0} <start|stop|restart|status|monit|list|delete>"
       exit 1
   }
   
   status(){
       status=$(node_modules/pm2/bin/pm2 show $PROC_NAME | grep status | awk '{print $4}')
       echo $status
       if [ X"$status" == X"online" ]; then
           return 0
       else
           return 1
       fi
   }
   
   start(){
       node_modules/pm2/bin/pm2 set pm2-logrotate:max_size 100M
       node_modules/pm2/bin/pm2 set pm2-logrotate:retain 15
       node_modules/pm2/bin/pm2 start ./server/app.js --name $PROC_NAME -l "../log/nf1-server"
   }
   
   list(){
       node_modules/pm2/bin/pm2 list $PROC_NAME
   }
   restart(){
       node_modules/pm2/bin/pm2 restart $PROC_NAME
   }
   monit(){
       node_modules/pm2/bin/pm2 monit $PROC_NAME
   }
   stop(){
       node_modules/pm2/bin/pm2 stop $PROC_NAME
   }
   delete(){
       node_modules/pm2/bin/pm2 delete $PROC_NAME
   }
   
   case "${1}" in
       monit)
           monit
           ;;
       list)
           list
           ;;
       start)
           start
           ;;
       stop)
           stop
           ;;
       delete)
           delete
           ;;
       status|health|checkhealth|st)
           status
           ;;
       restart)
           restart
           ;;
       *)
           help
           ;;
   esac
   
```


### 参考资料

[Shell脚本入门](https://www.jianshu.com/p/e1c8e5bfa45e)

[Linux环境变量](https://blog.csdn.net/stpeace/article/details/45567977)

[Node服务一键离线部署](https://www.cnblogs.com/chyingp/p/node-deploy-offline.html)
