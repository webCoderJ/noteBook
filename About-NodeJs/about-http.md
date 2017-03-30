## HTTP

```js
// demo1
var http = require('http');

//bootstrap
http.createServer(function(req,res){
    res.writeHead(200,{
        'ContentTye':'text-plain'
    })
    res.end('hello world');
})
.listen(8080)
```

