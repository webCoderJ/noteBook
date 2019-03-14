```ts
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data
  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    /* 将Observer实例绑定到data的__ob__属性上面去，之前说过observe的时候会先检测是否已经有__ob__对象存放Observer实例了，def方法定义可以参考/src/core/util/lang.js*/
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      /*如果是数组，将修改后可以截获响应的数组方法替换掉该数组的原型中的原生方法，达到监听数组数据变化响应的效果。这里如果当前浏览器支持__proto__属性，则直接覆盖当前数组对象原型上的原生数组方法，如果不支持该属性，则直接覆盖数组对象的原型。*/
      const augment = hasProto
        ? protoAugment  /*直接覆盖原型的方法来修改目标对象*/
        : copyAugment   /*定义（覆盖）目标对象或数组的某一个方法*/
      augment(value, arrayMethods, arrayKeys)
      /*如果是数组则需要遍历数组的每一个成员进行observe*/
      this.observeArray(value)
    } else {
      /*如果是对象则直接walk进行绑定*/
      this.walk(value)
    },
    walk (obj: Object) {
      const keys = Object.keys(obj)
      /*walk方法会遍历对象的每一个属性进行defineReactive绑定*/
      for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]])
      }
    }
  }


  export function defineReactive (
    obj: Object,
    key: string,
    val: any,
    customSetter?: Function
    ) {
    /*在闭包中定义一个dep对象*/
    const dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }
    /*如果之前该对象已经预设了getter以及setter函数则将其取出来，新定义的getter/setter中会将其执行，保证不会覆盖之前已经定义的getter/setter。*/
    // cater for pre-defined getter/setters
    const getter = property && property.get
    const setter = property && property.set
    /*对象的子对象递归进行observe并返回子节点的Observer对象*/
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
        /*如果原本对象拥有getter方法则执行*/
        const value = getter ? getter.call(obj) : val
        if (Dep.target) {
            /*进行依赖收集*/
            dep.depend()
            if (childOb) {
            /*子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend*/
            childOb.dep.depend()
            }
            if (Array.isArray(value)) {
            /*是数组则需要对每一个成员都进行依赖收集，如果数组的成员还是数组，则递归。*/
            dependArray(value)
            }
        }
        return value
        },
        set: function reactiveSetter (newVal) {
        /*通过getter方法获取当前值，与新值进行比较，一致则不需要执行下面的操作*/
        const value = getter ? getter.call(obj) : val
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
            return
        }
        /* eslint-enable no-self-compare */
        if (process.env.NODE_ENV !== 'production' && customSetter) {
            customSetter()
        }
        if (setter) {
            /*如果原本对象拥有setter方法则执行setter*/
            setter.call(obj, newVal)
        } else {
            val = newVal
        }
        /*新的值需要重新进行observe，保证数据响应式*/
        childOb = observe(newVal)
        /*dep对象通知所有的观察者*/
        dep.notify()
        }
    })
    }
```
