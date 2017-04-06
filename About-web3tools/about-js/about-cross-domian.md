### cross domain ways

```js
1. JSONP
主要通过script标签的src属性，与服务器交互，服务器返回一个带有参数（数据）的函数调用，从而实现跨域。

1.1 jQuery中的jsonp
$.getJSJON('http://www.tigerwit.com/data.php?callback=?',function(jsonData){
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

其中2.3.4都可基于iframe来实现、contentWindow是获取别的页面的window对象的唯一方法

5. 服务器通过修改Allow-cross-origin字段来同意跨域
    + 会有option预请求
    + Allow-cross-origin只可以设置两个（* || 某一个域名）
```


