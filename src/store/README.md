# [页面刷新vuex数据消失问题解决方案](http://www.cnblogs.com/cloud-/p/7103054.html)

## 问题

vuex是vue用于数据存储的，和redux充当同样的角色。页面刷新或者关闭浏览器再次打开的时候数据归零。

## 代码

 **ES6的Proxy**

这里有两个问题

1. 初始值的问题。
2. 我要可以配置哪些字段需要持久化，store里面的数据，不代表我都需要持久化。

首先解决是 localStorage存储的问题，因为需要转换字符串，简单封装一个 LStorage.js。用 <https://github.com/tsironis/lockr> , [https://github.com/nbubna/store ](https://github.com/nbubna/store%20)或者你喜欢的，小轮子我就自己写了。

```js
const ls = window.localStorage
// https://github.com/tsironis/lockr
export default {
  getItem(key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch (err) {
      return null
    }
  },
  setItem(key, val) {
    ls.setItem(key, JSON.stringify(val))
  },
  clear() {
    ls.clear()
  },
  keys() {
    return ls.keys()
  },
  removeItem(key) {
    ls.removeItem(key)
  }
}
```

其次就是代理的简单封装，LSproxy.js

**这个版本还是有问题的，现在只能代理二级属性**，对现在的我而言已经是够用了的。

**createHanlder 创建二级属性的代理**

**copy 复制对象，当然你可以写更加兼容优雅的方法**

**proxy  创建state的代理**

```js
import LStorage from './LStorage'

/**
 * 代理二级属性
 * @param {*} lsKey 存在localStorage的key
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
  return new Proxy(obj, {
    set: function (target, key, value, receiver) {
      ks.indexOf(key) >= 0 && LStorage.setItem(lsKey, copy(target, keys))
      return Reflect.set(target, key, value, receiver)
    }
  })
}

export { proxy }
```

调用这边，基本就没有什么变化, 就多了一句  **state** **= proxy(state, 'playing', ['list'])**

```js
import { proxy } from '../utils/LSProxy'
let state = {
  list: [],
  current: null
}
state = proxy(state, 'playing', ['list'])

const mutations = {

  /**
   * 添加歌曲
   * @param {*} state 
   * @param {*} song 歌曲信息 
   */
  addSong(state, song) {
    let index = state.list.findIndex(s => s.songmid === song.songmid)
    if (index < 0) {
      state.list.push(song)
    }
  },

  /**
   * 添加歌曲
   * @param {*} state  内置
   * @param {*} songs  歌曲列表
   */
  addSongs(state, songs) {
    let index = -1
    songs.forEach(song => {
      index = state.list.findIndex(s => s.songmid === song.songmid)
      if (index < 0) {
        state.list.push(song)
      }
    })
  },

  /**
   * 删除歌曲
   * @param {*} state 
   * @param {*} songmid  歌曲媒体id 
   */
  removeSong(state, songmid) {
    let index = state.list.findIndex(s => s.songmid === songmid)
    index >= 0 && state.list.splice(index, 1)
  },

  /**
   * 批量删除歌曲
   * @param {*} state 
   * @param {*} songmids 歌曲媒体列表 
   */
  removeSongs(state, songmids = []) {
    let index = -1
    songmids.forEach(songmid => {
      index = state.list.findIndex(s => s.songmid === songmid)
      index >= 0 && state.list.splice(index, 1)
    })
  },

  /**
   * 播放下一首，
   * @param {*} state 
   * @param {*} song 为空
   */
  next(state, song) {
    // 如果song不为空，表示是插放，（前提是已经添加到playing）
    if (song) {
      let index = state.list.findIndex(s => s.songmid === song.songmid)
      if (index >= 0) {
        state.current = state.list[index]
        return
      }
      return
    }
    // 如果current为空，表示没有播放的歌曲
    if (!state.current && state.list && state.list.length > 0) {
      state.current = state.list[0]
      return
    }
    // 如果不是插放，并且current不为空
    if (!song && state.current) {
      // 播放的歌曲是不是在当前的列表
      let index = state.list.findIndex(s => s.songmid === state.current.songmid)
      // 如果在歌曲列表里面，接着播放下首
      if (index >= 0) {
        state.current = (index === state.list.length - 1 ? state.list[0] : state.list[index + 1])
      } else {
        state.current = state.list[0]
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
```

## 缺点

1. 代码只能代理二级，对我一般情况应该是够用了，扁平化state
2. 代理二级属性和数组，要是属性平凡修改的时候，代理是会重复触发的，比如，添加30首歌曲的时候，是发生了30次存储。 当然我觉得也是有方案可以优化的。

 

## 优点

1. state的数据与localStorage的同步过程分离开
2. 对现有代码的注入是相当少的。

当然上面代码本身也还是存在问题的：

1. 二级监听不能在proxy执行的时候返回，因为如果属性默认值为null/undefined，或者初始化就没有设置默认值，是不会被监听到的，应该是放到一级属性监听里面, 进行一个判断



# [页面刷新vuex数据消失问题解决方案 之 vuex中间件](https://www.cnblogs.com/cloud-/p/7116402.html)

## 基本方案和步骤如下

1. 简单的按照键复制对象
2. localStorage存储的封装
3. vuex插件编写
4. localStorage的数据还原和初始化 Vuex.Store

## 代码

**第一：简单的按照键复制对象**

```js
/**
 * 数据简单复制
 * @param {*} source 
 * @param {*} keys 
 */
const copy = function (source, keys = []) {
  if (!source) {
    return source
  }
  let d = Object.create(null)
  keys.forEach(k => { d[k] = source[k] })
  return d
}

export {
  copy
}
```

**第二：localStorage的简单封装**

```js
const ls = window.localStorage
// https://github.com/tsironis/lockr
export default {
  getItem(key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch (err) {
      return null
    }
  },
  setItem(key, val) {
    ls.setItem(key, JSON.stringify(val))
  },
  clear() {
    ls.clear()
  },
  keys() {
    return ls.keys()
  },
  removeItem(key) {
    ls.removeItem(key)
  }
}
```

**第三：vuex插件**

 主要是一个lsKey，存到localStorage的key，

另外一个是 mutation白名单，白名单内的触发不会触发数据同步

实际上这里是存在一定问题的，**这里适用模块后的store**

*无法快速有效便捷的定位什么时候该触发同步* 

```js
mport ls from '../utils/LStorage'
import { copy } from '../utils/utils'

export const createLSPlugin = function (lsKey, mappings, whitelist = []) {
  let k = lsKey || 'lsKey'
  return store => {
    store.subscribe((mutation, state) => {
      if (whitelist.findIndex(m => m === mutation.type) < 0) {
        let cd = Object.create(null)
        Object.keys(state).forEach(k => {
          if (mappings[k]) {
            cd[k] = copy(state[k], mappings[k])
          }
        })
        ls.setItem(k, cd)
      }
    })
  }
}
```

**第四：初始化Vuex.Store**

主要是从localStore里面还原数据合并到state里面，如果state没有分模块还是比较简单的。

```js
import Vue from 'vue'
import Vuex from 'vuex'

import playing from './playing'
import player from './player'
import searchHistory from './searchHistory'

import { createLSPlugin } from '../plugin/syncls'
import ls from '../utils/LStorage'

const LS_KEY = 'vbox'

const lsData = ls.getItem(LS_KEY)
let mapping = {
  playing: ['list', 'current'],
  player: ['mode'],
  searchHistory: ['list']

}
let mWhiteList = ['player/timeUpdate', 'player/setState']
if (lsData) {
  let { playing: ls_playing, player: ls_player, searchHistory: ls_searchHistory } = lsData
  Object.assign(playing, { state: ls_playing })
  Object.assign(player, { state: ls_player })
  Object.assign(searchHistory, { state: ls_searchHistory })
}

Vue.use(Vuex)
const plugin = createLSPlugin(LS_KEY, mapping, mWhiteList)
const store = new Vuex.Store({
  modules: {
    playing,
    player,
    searchHistory
  },
  plugins: [plugin]
})

export default store
```



## 优点

1. 代码简单，对代码改动不大
2. 对原始的state没有额外干预



## 缺点

1. 触发存储条件不好控制
2. 存储限制实现会相对复杂