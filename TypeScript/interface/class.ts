/**
 * 类的接口
 * 类是具有两个类型的
 * 静态部分的类型 && 实例的类型
 */

type Color = 'black' | 'yellow'

interface MyPerson {
    name: string;
    // constructor(nose: string, hair: Color) // constructor 属于类的静态部分
    new(nose: string, hair: Color) // 构造器签名: 对实例进行检查
    say(word: string): void
}

class Student implements MyPerson {
    public name: string;
    public nose: string;
    public hair: Color;
    constructor(nose: string) {
        this.nose = nose;
        this.hair = hair;
    }
    say(word: string) {
        console.log(word)
    }
}
