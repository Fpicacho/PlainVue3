export let activeEffect = undefined;

class ReactiveEffect {
  public active = true; // effect默认激活
  public deps = []; //记录所有的依赖属性
  public parent = null; // 用于记录effect父子关系
  constructor(public fn) {
    this.fn = fn;
  }

  run() {
    if (!this.active) {
      // 如果非机活状态 只需要执行fn即可 不需要进行依赖收集
      this.fn();
    }
    try {
      // 这里需要进行依赖收集 将effect 和
      this.parent = activeEffect;
      activeEffect = this;
      return this.fn(); // 调用取值操作时 就可以获取到全局的activeEffect
    } finally {
      activeEffect = this.parent;
      this.parent = null;
    }
  }
}

export function effect(fn) {
  // 这里的fn会根据状态变化重新执行,且effect可嵌套
  const _effect = new ReactiveEffect(fn); // 创建响应式effect
  _effect.run(); //默认先执行一次
}

const targetMap = new WeakMap();

export function track(target, type, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  let shouldTrack = !dep.has(activeEffect);
  if (shouldTrack) {
    dep.add(activeEffect);
    debugger
    activeEffect.deps.push(dep);
  }
}
