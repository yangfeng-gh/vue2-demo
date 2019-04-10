/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
  return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) == '[object Array]'
}

export function flattenArray(arr) {
  arr = arr || []
  return arr.reduce(function (prev, next) {
    return isArray(next) ? prev.concat(flatten(next)) : prev.concat(next)
  }, [])
}

/**
 * 去重
 */
export function dedupe(array) {
  return Array.from(new Set(array))
}


/**
 * Map<String, Object> 转换为对象
 * @param {Map<String, Object>} strMap
 * @returns {Object}
 */
export function strMapToObj(strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}

/**
 * 对象转换为Map
 * @param {Object} obj
 * @returns {Map}
 */
export function objToStrMap(obj) {
  let strMap = new Map()
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}

/**
 * map转换为数组序列化字符串
 * @param {Map} map
 * @returns {String}
 */
export function mapToArrayJson(map) {
  return JSON.stringify([...map])
}

export function flattenObj(obj) {
  var result = {}
  function process(key, value) {
    if (Object(value) !== value) {
      if (key) {
        result[key] = value
      }
    } else if (Array.isArray(value)) {
      for (var i = 0, len = value.length; i < len; i++) {
        process(key + '[' + i + ']', value[i])
      }
      if (value.length === 0 && key) {
        result[key] = []
      }
    } else {
      var isEmpty = true
      for (var prop in value) {
        isEmpty = false
        process((key ? key + '.' : key) + prop, value[prop])
      }
      if (isEmpty && key) {
        result[key] = {}
      }
    }
  }
  process('', obj)
  return result
}

export function unflattenObj(obj) {
  if (Object(obj) !== obj || Array.isArray(obj)) {
    return obj
  }
  var result = {}
  var r = /\.?([^.[\]]+)|\[(\d+)\]/g
  var matches
  for (var prop in obj) {
    var cur = result
    var p = ''
    matches = r.exec(prop)
    while (matches) {
      cur = cur[p] || (cur[p] = matches[2] ? [] : {})
      p = matches[2] || matches[1]
      matches = r.exec(prop)
    }
    cur[p] = obj[prop]
  }
  return result[''] || result
}

export function findFlatProps(source) {
  source = source || {}
  let target = {}
  for (let [key, value] of Object.entries(source)) {
    if (value === null) {
      target[key] = ''
      continue
    }
    if (typeof value === 'object') {
      continue
    }
    target[key] = value
  }
  return target
}

/**
 * @param n: Number | String, 要转换的数字
 * @param precision: Number | String, 精度
 * @return :Number 指定精度的小数
 */
export const round = (n, precision = 2) => {
  n = parseFloat(n) || 0
  let p = Math.pow(10, precision)
  return Math.round(n * p) / p
}

export function currency(value, precision = 6) {
  return `¥ ${round(value, precision)}`
}

export function capitalize(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * @param cost: Number | String 成本价
 * @param salePrice: Number | String 销售价
 * @return :Number 毛利率
 */
export const computeProfitRate = (cost, salePrice) => {
  return round(((salePrice - cost) * 100) / salePrice, 2)
}

/**
 * @param cost: Number | String 成本价
 * @param rate: Number | String 毛利率
 * @return :Number 销售价
 */
export const computeSalePrice = (cost, rate) => {
  return round((cost * 100) / (100 - rate), 2)
}

export const reduceReturnAmount = rows => {
  return rows
    .map(row => {
      let returnQuantity = row.returnQuantity ? parseInt(row.returnQuantity) : 0
      let returnPrice = row.returnPrice ? parseFloat(row.returnPrice) : 0
      return returnQuantity * returnPrice
    })
    .reduce((previous, current) => previous + current)
}
export const reducePurchaseAmount = rows => {
  return rows
    .map(row => {
      if (row.purchaseOrderItem && row.purchaseOrderItem.purchaseTotalPrice) {
        return parseFloat(row.purchaseOrderItem.purchaseTotalPrice)
      } else {
        return 0
      }
    })
    .reduce((previous, current) => previous + current)
}

/**
 * 清除无效的属性值（null, undefined, ''等）
 */
export function deassignAndTrimProperties(target, obj1, obj2) {
  if (typeof obj2 === 'undefined') {
    obj2 = obj1
    obj1 = target
    target = Object.create(null)
  }
  for (let key of Object.keys(obj1)) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] === '' || obj2[key] === undefined || obj2[key] === null) {
        target[key] = obj2[key]
      } else if (obj1[key] === '' || obj1[key] === undefined || obj1[key] === null) {
        target[key] = obj1[key]
      }
    }
  }
  return target
}

export function dateFormat(value = new Date(), formatter) {
  if (value === null) {
    return ''
  }
  formatter = /^[y|M|d|H|h|m|s].*/.test(formatter) ? formatter : 'yyyy-MM-dd HH:mm:ss'
  if (typeof value === 'string' || typeof value === 'number') {
    try {
      value = new Date(value)
    } catch (e) {
      throw e
    }
  }
  if (!(value instanceof Date)) {
    throw new Error('不支持的格式')
  }

  let patterns = {
    'M+': value.getMonth() + 1, // 月份
    'd+': value.getDate(), // 日
    'H+': value.getHours(), // 小时
    'h+': value.getUTCHours() - value.getTimezoneOffset() / 60, // 小时
    'm+': value.getMinutes(), // 分
    's+': value.getSeconds(), // 秒
    'q+': Math.floor((value.getMonth() + 3) / 3), // 季度
    S: value.getMilliseconds() // 毫秒
  }

  // 处理年份短格式
  if (/(y+)/.test(formatter)) {
    formatter = formatter.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let i in patterns) {
    if (new RegExp('(' + i + ')').test(formatter)) {
      formatter = formatter.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? patterns[i] : ('00' + patterns[i]).substr(('' + patterns[i]).length)
      )
    }
  }

  return formatter
}

export function getDay(day = 0) {
  var today = new Date()
  var targetday_ms = today.getTime() + day * 1000 * 60 * 60 * 24
  today.setTime(targetday_ms)
  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = padMonth(tMonth + 1)
  tDate = padMonth(tDate)
  return tYear + '-' + tMonth + '-' + tDate + ' 00:00'
}

function padMonth(month) {
  var m = month
  if (month.toString().length == 1) {
    m = '0' + month
  }
  return m
}

export function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
