export function dateFormat (value, formatter) {
  value = value || new Date()
  formatter = /^[y|M|d|H|h|m|s].*/.test(formatter) ? formatter : 'yyyy-MM-dd HH:mm:ss'
  if (typeof value === 'string' || typeof value === 'number') {
    try {
      value = new Date(value)
    } catch (e) {
      throw e
    }
  } else if (!(value instanceof Date)) {
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

  for (var i in patterns) {
    if (new RegExp('(' + i + ')').test(formatter)) {
      formatter = formatter.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? patterns[i] : ('00' + patterns[i]).substr(('' + patterns[i]).length)
      )
    }
  }

  return formatter
}
