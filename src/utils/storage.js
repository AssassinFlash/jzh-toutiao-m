// 本地存储封装模块
const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    // 尝试把data转成js对象
    return JSON.parse(data)
  } catch (err) {
    // 如果data不是JSON格式字符串，JSON.parse就会报错
    // 由catch捕获这个异常，直接返回data
    return data
  }
}
const setItem = (key, value) => {
  let data = null
  try {
    // 尝试将data对象转换成JSON格式的字符串
    data = JSON.stringify(value)
  } catch (err) {
    // 如果data并不是一个对象，JSON.stringify会报错
    // 由catch捕获异常
    data = value
  } finally {
    window.localStorage.setItem(key, data)
  }
}
const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
export { getItem, setItem, removeItem }
