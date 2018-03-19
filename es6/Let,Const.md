### LET

#### 不存在变量提升

#### 暂时性死区TDZ

+ 只要块级作用域内存在`let`命令，它所声明的变量就绑定这个区域，不再受外部影响

  ```javascript
  1. 
  if(true){
    tmp = 'abc' //ReferenceError
    console.log(temp) //ReferenceError
    
    let temp //TDZ结束
    console.log(temp) //undefined
    
    temp = 123
    console.log(temp) //123
  }

  2. 
  typeof x
  let x

  3. function(x=y, y=2){} // x=y 时，y还没有声明，报错

  4. let x = x // 声明和赋值同时进行
  ```

#### 不允许重复声明

+ `let`不允许在相同作用域内，重复声明一个相同变量

  ```javascript
  function foo(){
    let a = 10
    var a = 1
  }

  // 报错
  function foo(){
    let a = 10
    let a = 1
  }
  ```

#### 块级作用域

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10; // 只在if语句内生效
  }
  console.log(n); // 5
}
```

+ 可以在块级作用域声明同名函数(但存在兼容性问题)


















