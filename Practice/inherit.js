

function Person(name, age){
    this.name = name;
    this.age = age;
}

Person.prototype = {
    constructor: Person,
    speak(word){
        console.log(`${this.name} say: ${word}`)
    }
}

// 构造函数继承
function Student(score){
    this.score = score;
    Person.call(this);
}

// 原型继承
Student.prototype = new Person('TOM', 18);

Student.prototype.constructor = Student;

// 组合继承
function Student(score){
    this.score = score;
    Person.call(this);
}

Student.prototype = obj.create(Person.prototype); /*!important*/

Student.prototype.constructor = Student;
