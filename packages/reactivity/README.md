# reactivity

响应式相关方法

## reactive(target)

方法返回一个"响应式对象"

```typescript
const {reactive} = VueReactivity
const state = reactive({
      name: "F_picacho",
      age: 18,
      get nextAge() {
          return this.age + 1
      }
})
console.log(state)
console.log(state.nextAge)
```
