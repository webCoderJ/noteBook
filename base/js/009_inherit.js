/**
 * 1. 原型继承
 */

function Person() {
    this.eye = "has eye";
    this.nose = "has nose";
}

Person.prototype.say = function() {
    console.log("hello");
};

function Student() {
    this.bag = "has a bag";
}

Student.prototype = new Person();

/**
 * 2. 借用构造函数继承
 * 不能继承父类构造器的 prototype
 * 可以向父类构造器传递参数
 */

function Student(...params) {
    Person.call(this, ...params);
}

/**
 * 3. 组合继承，组合原型继承与借用构造器的方式
 * 优点：可以传参 可以继承父类实例和原型方法并且避免多实例共享一个父类属性的问题
 * 缺点：调用了两次父类构造函数，生成了两份实例
 */

function Student(...params) {
    Person.call(this, ...params);
}

Student.prototype = new Person();

Student.prototype.constructor = Student;

/**
 * 组合继承最优版
 */

function Students(...params) {
    Person.call(this, ...params);
}

//  Object.create 创建一个 __proto__ 指向 Person.prototype 的新对象
Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Students;

/**
 * extends 继承
 */

class Person {
    constructor(){
        this.eye = "eye";
    }
    say(){
        console.log("hello");
    }
}

class Student extends Person {
    constructor(){
        super() // 调用父类构造函数 Person.call(this, ...params)
    }
}