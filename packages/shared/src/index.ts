// isObject:判断value是否为对象
export const isObject = (value) => {
    return typeof value === 'object' && value !== null
}