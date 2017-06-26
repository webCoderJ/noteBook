## Async-await

```javascript
    let sleep = function(){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve('im sleep done');
                console.log('sleep done')
            },3000);
        });
    }

    let waitSleep = async function(){
        console.log('before sleep');
        var result = await sleep();
        result == 'im sleep done';
        console.log('eat breakfast')
    }
```

### 基本规则

+ async声明一个等待异步函数，await智能在async声明的函数中使用。
+ await会阻塞后面代码的执行。
+ await后面跟的应该是一个promise对象。

### 捕捉错误

```javascript
    var sleep = function (time) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // 模拟出错了，返回 ‘error’
                reject('error');
            }, time);
        })
    };

    var start = async function () {
        try {
            console.log('start');
            await sleep(3000); // 这里得到了一个返回错误
            
            // 所以以下代码不会被执行了
            console.log('end');
        } catch (err) {
            console.log(err); // 这里捕捉到错误 `error`
        }
    };
```

### 根据文件名拉取海报

```javascript
    const fs = require('fs');    
    const path = require('path');
    const request = require('request');path.parse

    let exts = ['.avi', '.mp4', '.rmvb'];
    let readFiles = (dirPath) => {
        return new Promise((resolve, reject) => {
            fs.readDir(dirPath, (err, files) => {
                resolve(files.filter(v => {
                    exts.includes(path.parse(v).ext);
                }));
            });
        );
    }

    let getPoster = () => {
        let url = 'test.com/getPoster'
        return new Promise((resolve, reject) => {
            request({ url : url, method: 'GET' },(err, res, body) => {
                if( err ){
                    reject(err);
                } else {
                    resolve({
                        res: res,
                        body: body
                    });
                }
            });
        });
    }

    let savePoster = (name, url)=> {
        request.get(url).pipe(fs.createWriteStream(path.join(MovieDir, movieName + '.jpg')));
    }

    (async () => {
        // todo
    })
```

