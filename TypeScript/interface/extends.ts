/**
 * 接口是可以像类一样被子接口继承
 */

interface Alarm {
    alert(info: string)
}

interface LightableAlarm extends Alarm {
    toggleLight(light: boolean);
}

class Alarmer implements LightableAlarm {
    public light: boolean;
    alert(info: string) {
        alert(info);
    }
    toggleLight(light: boolean) {
        this.light = light;
    }
}

/**
 * 接口也可以继承一个类
 * 继承成员的类型信息，但不包括实现
 * 接口同样会继承到类的 private 和 protected 成员
 * 当继承了拥有私有获保护的成员类的时候，这个接口只能被这个嘞获子类实现
 */

class Control {
    private state: any
}

interface SelectabelCtrl extends Control {
    select(name: string): void
}

class Button extends Control implements SelectabelCtrl {
    select(name: string): string{
        return name
    }
}

// 无法实现 SelectabelCtrl， 因为这里的 state 已经不是 Control 中的 state 了
class OtherClass implements SelectabelCtrl {
    private state: any
    select(name: string): string{
        return name
    }
}
