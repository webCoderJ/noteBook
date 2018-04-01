# Git
## git checkout 文件从版本库(.git)中检出
	+ `--` file 把一个文件在工作区的修改全部撤销，也可以对删除的文件恢复
	+ `branch` 切换分支
	+ `-b branchName` 新建一个`branchName`的分支并切换到该分支
	
## git reset 版本回退
	+ `HEAD file` 将添加到暂存区的file撤销(unstage)
	+ `git reset --soft + log` 撤销上次提交，回到add状态
	+ `git reset --hard + log` 撤销上次提交，删除上次修改	
	
## git rm 文件删除

## git remote repo
	1. create keygen
		+ ssh-keygen -t ras -c`email` to create two files -> `id_rsa.pub` + `id_rsa`
	2. login to github paste your `id_rsa.pub`	
	3. git remote add john git@github.com:johnsomeone/someproject.git 添加一个远程仓库

## git origin
	+ 查看remote信息
		 1. git config get --remote.origin.url
		 2. git remote -v
		 3. git remote show origin
	 + 删除origin
		 1. git remote rm origin  

## git rebase `--contiue`
		1. 当pull的代码分支线与本地分支线有两个并行的commit，git会提醒$rebase$操作
		2. rebase 把本地分支commit先移入一个咱特殊暂存区，把冲突的本地commit从分支线删除，将master的提交合并到分支线，然后取出暂存区的commit放到分支线后面。

## git stash
		1. 当要切换分支时发现现在有很多修改又不想提交，使用stash把工作区的修改储藏起来，同事清空了工作区。
		2. `stash list` 可以查看队列中存了多少WIP
		3. `stash pop` 当切换回来之后，想要恢复现场，那么使用这么命令可帮助你把之前的工作内容存储藏的修改放回工作区。

## git log
		1. `git config --global alias.ls 'log --name-status --oneline --graph'` //将命令参数设置别名 `alias.nickName`

## git特殊命令
	1. `git log --graph --pretty=oneline --abbrev-commit` 查看分支情况

