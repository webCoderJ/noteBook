/**
 * type 
 * - 可以定义具体选项
 * - 可以定义别名
 */

type propName = 'tom' | 'jerry';

type Name = string;

type NameResolver = () => string;

type strOrFn = Name | NameResolver;

function getName(name: strOrFn): Name {
    if (typeof name === 'string') {
        return name;
    } else {
        return name();
    }
}