import {isObject} from '@vue/shared'

const reactiveMap = new WeakMap(); // 弱引用版本的Map Key只能是对象 用于解决潜在的内存泄露问题
const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}


export function reactive(target) {
    // reactive:将数据转换为响应式
    if (!isObject(target)) {
        throw new TypeError(`目标${target}类型不为object!`)
    }
    // 判断target的是否为另外一个代理对象
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    // 利用reactiveMap进行缓存 防止一个对象
    let existingProxy = reactiveMap.get(target)
    if (existingProxy) {
        return existingProxy
    }

    /*  new Proxy(代理目标,代理行为)
        https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy */
    const proxy = new Proxy(target, {
        get(target, key, receiver) {
            if(key === ReactiveFlags.IS_REACTIVE){
                return true
            }
            console.log(1)
            // 这里监控用户进行取值操作
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            // 这里监控用户设置值操作
            return Reflect.set(target, key, value, receiver)
        }
    })
    reactiveMap.set(target, proxy)
    return proxy
}