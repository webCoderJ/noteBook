## Path

### path.normalize 路径整理

```javascript
    var path = require('path');
    var str = path.mormalize('./path//upload//data/index.html);
    // /path/upload/data/index.html
```

### path.join 拼接路径

```javascript
    var path = require('path');

    var str = path.join('./path/./', './upload', '/file', '123.jpg');
    console.log(str); // path/upload/file/123.jpg

    var str = path.join('path', 'upload', 'file', '123.jpg');
    console.log(str); // path/upload/file/123.jpg

    var arr = ['path', 'upload', 'file', '123.jpg'];
    var str = path.join.apply(null, arr);
    console.log(str); // path/upload/file/123.jpg

    path.join('a','b','c','d.html');
    // a/b/c/d/html
```

### path.resolve 绝对路径

```javasctipt
    path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
     |
     V
    bash
    cd foo/bar
    cd /tmp/file/
    cd ..
    cd a/../subfile
    pwd
```

### path.relative 相对路径

```javascript
    path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
    // 相对于第一个参数的相对路径
    // ../../impl/bbb
```

### path.dirname 当前文件夹路径

```javascript   
    let str = path.dirname('a/b/c/d.html');
    // a/b/c
    // 相当于 __dirname
```

### path.basename 获取文件名

```javascript 
    var str = path.basename('path/upload/file/123.txt.jpg');
    console.log(str); // 123.txt.jpg

    var str = path.basename('path/upload/file/123.txt.jpg', '.jpg');
    console.log(str); // 123.txt
```

### path.extname 文件后缀

```javascript
    var str = path.extname('path/upload/file/123.txt.jpg');
    console.log(str); // '.jpg'
```

### path.parse 解析路径

```javascript
    path.parse('/home/user/dir/file.txt');

    // returns

    {
        root: '/' // 根目录
        dir: '/home/user/dir' // 文件夹
        base: 'file.txt' // 文件名
        name: 'file' // 文件名
        ext: '.txt' // 后缀名
    }
```