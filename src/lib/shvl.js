export default {
  get: function (obj, key, defaultValue) {
    return void 0 ===
      (obj = (key.split ? key.split('.') : key).reduce(function (obj, key) {
        return obj && obj[key]
      }, obj)) ?
      defaultValue
      : obj
  },
  set: function (obj, key, value, i) {
    return (
      ((key = key.split ? key.split('.') : key).slice(0, -1).reduce(function (obj, key) {
        return (obj[key] = obj[key] || {})
      }, obj)[key.pop()] = value),
      obj
    )
  }
}
