import { isObject } from "@vue/shared";
import { mutableHandlers, ReactiveFlags } from "./baseHandler";

const reactiveMap = new WeakMap(); // 弱引用版本的Map Key只能是对象 用于解决潜在的内存泄露问题

export function reactive(target) {
  // reactive:将数据转换为响应式
  if (!isObject(target)) {
    throw new TypeError(`目标${target}类型不为object!`);
  }
  // 判断target的是否为另外一个代理对象
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }
  // 利用reactiveMap进行缓存 防止一个对象
  let existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}
