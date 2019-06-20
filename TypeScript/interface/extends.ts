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
