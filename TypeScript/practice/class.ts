class Person {
    private DNA: string
    constructor(DNA){
        this.DNA = DNA;
    }
}

class Student extends Person {
    name: string
    constructor(name) {
        super(name);
        this.name = name;
    }
    homework() {
        console.log("writing homework")
    }
}

let xiaoming = new Student("xiaoming")
console.log("TCL: xiaoming", Person.constructor)

// 抽象类，包含实现细节
abstract class Department {
    constructor(public name: string) {

    }
    abstract getHeight(layer: number): number{
        return 10
    }
}

class Tower extends Department {
    constructor(name){
        super(name);
    }
    // 这里必需跟抽象类定义的 getHeight 函数签名 保持一致
    getHeight(layer: number): string{
        return '123'
    }
}
