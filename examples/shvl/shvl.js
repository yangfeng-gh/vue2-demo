/* eslint-disable */
!function (root, factory) {
  "object" == typeof exports && "undefined" != typeof module ?
    factory(exports) :
    "function" == typeof define && define.amd ?
      define(["exports"], factory) :
      factory(root.shvl = {})
}(this, function (shvl) {
  shvl.get = function (obj, props, defaultValue) {
      return void 0 === (value = (props.split ? props.split(".") : props).reduce(function (e, t) {
          return e && e[t]
      }, obj)) ? defaultValue : value
  }, shvl.set = function (obj, props, value) {
      return (_props = props.split ? props.split(".") : props).slice(0, -1).reduce(function (e, t) {
          return e[t] = e[t] || {}
      }, obj)[_props.pop()] = value, obj
  }
});
/* eslint-enable */
