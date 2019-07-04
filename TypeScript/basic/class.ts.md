#### 静态属性修饰符

-   **public** 公有的，可以在任何地方访问到，类的属性默认都是 `public`
-   **private** 私有的，只能在类的内部访问、子类中也无法访问
-   **protected** 受保护的，可以在子类中被访问
-   **readonly** 只读属性
-   **static** 静态属性，仅当类被实例化的时候才会被初始化
-   **abstract** 抽象属性，必需在派生类中实现

#### 抽象类 abstract

> 类似于声明了一个类模板

-   抽象类不允许被实例化，使用 abstract 声明

    ```ts
    abstract class Animal {
        public name;
        public constructor(name) {
            this.name = name;
        }
        public abstract sayHi();
    }

    let a = new Animal("TOM"); // Error
    ```

-   抽象类定义的方法必需被子类实现

    > 上个例子中，定义了 `abstract sayHi` 如果子类没有实现这个方法，会报错

    ```ts
    class Cat extends Animal {
        public eat() {
            console.log(`${this.name} is eating.`);
        }
    }

    // class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'
    ```

#### 类的类型

```ts
class Animal {
  	name: string,
    constructor(name: string) {
      this.name = name;
    }
	sayHi(): string {
    return `this.name`
  }
}
```

#### 类与接口

> 类对接口定义的 `Shape` 作出相应实现，也可以实现多个接口

```ts
interface Alarm {
  alert(info: string)
}

interface Lock {
  lock()
}

class Door {
  public material: string;
  public hasLocked: boolean;
  constructor(material: string){
    this.material = material;
  }
}

class AlarmDoor extends Door implements Alarm, Lock {
  
  alert(info: string) {
    console.log(info)
  }
  
  lock(){
    this.hasLocked = true;
  }
  
}
```

