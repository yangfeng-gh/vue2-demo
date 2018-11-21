import LStorage from './LStorage'

/**
 * 代理二级属性
 * @param {*} lsKey 保存在localStorage中的key
 * @param {*} pk    一级属性的key
 */
function createHanlder(lsKey, pk) {
  return {
    set: function (target, key, value, receiver) {
      let item = LStorage.getItem(lsKey)
      if (item && item[pk]) {
        item[pk][key] = value
        LStorage.setItem(lsKey, item)
      }
      return Reflect.set(target, key, value, receiver)
    }
  }
}

/**
 * 仅仅存需要存放的数据
 * @param {*} source
 * @param {*} keys
 */
function copy(source, keys = []) {
  if (!source) {
    return source
  }
  let d = Object.create(null)
  keys.forEach(k => { d[k] = source[k] })
  return d
}

/**
 * 代理state
 * @param {*} initState 初始化的值
 * @param {*} lsKey  localStorage的key
 * @param {*} keys   需要存储的键
 */
const proxy = function (initState, lsKey, keys = []) {
  let ks = keys, obj = Object.assign({}, initState, LStorage.getItem(lsKey))

  // 代理二级属性
  keys.forEach(k => {
    obj[k] = new Proxy(obj[k], createHanlder(lsKey, k))
  })

  // 存入合并的值
  LStorage.setItem(lsKey, copy(obj, keys))

  // 返回代理对象
  return new Proxy(obj, {
    set: function (target, key, value, receiver) {
      ks.indexOf(key) >= 0 && LStorage.setItem(lsKey, copy(target, keys))
      return Reflect.set(target, key, value, receiver)
    }
  })
}

export { proxy }

/*
 这种方案的缺点也是很明显的，
1. 代码只能代理二级，对我一般情况应该是够用了，扁平化state
2. 代理二级属性和数组，要是属性频繁修改的时候，代理是会重复触发的，比如，添加30首歌曲的时候，是发生了30次存储。



优点我觉得是，
1. state的数据与localStorage的同步过程分离开
2. 对现有代码的注入是相当少的。

当然我上面代码本身也还是存在问题的
1. 二级监听不能在proxy执行的时候返回，因为如果属性默认值为null/undefined，或者初始化就没有设置默认值，是不会被监听到的，
应该是放到一级属性监听里面, 进行一个判断
*/