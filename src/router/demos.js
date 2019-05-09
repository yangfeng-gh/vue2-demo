export default [
  {
    path: 'scopeSlot',
    name: 'scopeSlot',
    component: resolve => require(['../views/slot/slot-scope.vue'], resolve)
  },
  {
    path: 'event/native',
    name: 'eventNative',
    component: resolve => require(['../views/event/native.vue'], resolve)
  },
  {
    path: 'event/self',
    name: 'eventSelf',
    component: resolve => require(['../views/event/self.vue'], resolve)
  },
  {
    path: 'event/once',
    name: 'eventOnce',
    component: resolve => require(['../views/event/once.vue'], resolve)
  },
  {
    path: 'map/bmap',
    name: 'bmap',
    component: resolve => require(['../views/map/BMap.vue'], resolve)
  }
]
