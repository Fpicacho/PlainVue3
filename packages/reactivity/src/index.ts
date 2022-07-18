import {isObject} from '@vue/shared'

// reactive:将数据转换为响应式
export function reactive(target) {
    if (!isObject(target)) {
        throw new TypeError(`目标${target}类型不为对象!`)
    }
    /*  new Proxy(代理目标,代理行为)
        https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy */
    return new Proxy(target, {
        get(target, key, receiver) {
            return target[key]
        },
        set(target, key, value, receiver) {
            target[key] = value
            return true
        }
    })
}