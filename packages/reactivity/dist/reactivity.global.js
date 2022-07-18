var VueReactivity = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/reactivity/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    reactive: () => reactive
  });

  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };

  // packages/reactivity/src/reactive.ts
  function reactive(target) {
    if (!isObject(target)) {
      throw new TypeError(`\u76EE\u6807${target}\u7C7B\u578B\u4E0D\u4E3A\u5BF9\u8C61!`);
    }
    return new Proxy(target, {
      get(target2, key, receiver) {
        return Reflect.get(target2, key, receiver);
      },
      set(target2, key, value, receiver) {
        target2[key] = value;
        return Reflect.set(target2, key, value, receiver);
      }
    });
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=reactivity.global.js.map
