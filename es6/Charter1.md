## Charter 1

### let

1. 无变量提升
2. 暂时性死区（可看做不提升导致的结果）
3. 不允许重复声明
4. 代码快内只要有let声明的变量都不提升，在赋值之前调用都会报语法错误错

### 块级作用域

1. 只要在代码块中都不能被外层代码块访问
2. 只能访问外层

### const

1. 声明的变量指针不可变
2. 对于引用类型的数据，无法保证数据内部的数的改变
3. 如果要引用类型的数据也保证不可变，那么就要使用`Object.freeze()`