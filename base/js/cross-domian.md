### Cross Domain Ways
[跨域](https://www.cnblogs.com/roam/p/7520433.html)

```js
1. JSONP
主要通过script标签的src属性，与服务器交互，服务器返回一个带有参数（数据）的函数调用，从而实现跨域。

1.1 jQuery中的jsonp
$.getJSON('http://www.tigerwit.com/data.php?callback=?',function(jsonData){
    // do something
})

2. 修改document.domain
- 修改页面中子iframe标签的document.domain属性，但有如下限制：
    - 只能把document.domain设置成自身或更高一级的父级，并且主域名必须相同。
    // a.html
    <iframe src="http://www.baidu.com" id="iframe" onload="test()"></iframe>
    <script>
        document.domain = 'tigerwit.com'
        function test(){
            alert(document.getElementById('iframe').contentWindow) // 获取window对象
        }
    </script>

3. 修改window.name

4. postMessage
    - a.html
        iframe.contentWindow.postMessage(data)
        window.onmessage = function(data){
            alert(data)
        }
    - b.html 
        window.onmessage = function(){
            window.parent.postMessage('data')
        }

其中2.3.4都基于iframe来实现、contentWindow是获取别的页面的window对象的唯一方法，从页面入手实现跨域时，一般都是访问自己能控制的域或者说页面是自己编写维护的, 如果要访问的数据不再自己控制范围，并且又不能要求设置 allow-cross-origin 头时，跨域只能考虑从服务器配置转发

5. 服务器通过修改Allow-cross-origin字段来同意跨域
    + 会有option预请求
    + Allow-cross-origin只可以设置两个（* || 某一个域名）
    + 前端需要在发送请求时候设置 withcredentail: true
```


