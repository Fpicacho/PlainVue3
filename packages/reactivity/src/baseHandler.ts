// 代理核心逻辑
import { activeEffect, track } from "./effect";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}

export const mutableHandlers = {
  /*  new Proxy(代理目标,代理行为)
      https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy */
  get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
    track(target, "get", key);
    // 这里监控用户进行取值操作
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    // 这里监控用户设置值操作
    return Reflect.set(target, key, value, receiver);
  },
};
