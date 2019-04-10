const state = {
  selectedOrders: [],
  orderBrief: {
    realTotal: 0,
    orderCount: 0,
    quantity: 0,
    totalWight: 0,
    totalVolume: 0
  },
  vehicles: [],
  orderCustomerIds: [],
  orderGroup: {},
  unGroupOrders: []
}

const getters = {
  customerCnt(state) {
    return new Set(state.orderCustomerIds).size
  }
}

const mutations = {
  setSelectedOrders(state, payload) {
    state.selectedOrders = payload
  },
  addSelectedOrder(state, order) {
    state.selectedOrders.push(order)
  },
  removeSelectedOrder(state, index) {
    state.selectedOrders.splice(index, 1)
  },
  setOrderBrief(state, payload) {
    state.orderBrief = payload
  },
  clearOrderBrief(state) {
    state.orderBrief = {
      realTotal: 0,
      orderCount: 0,
      quantity: 0,
      totalWight: 0,
      totalVolume: 0
    }
  },
  setVehicles(state, payload) {
    state.vehicles = payload
  },
  addOrderCustomerIds(state, customerId) {
    state.orderCustomerIds.push(customerId)
  },
  removeOrderCustomerIds(state, customerId) {
    let index = state.orderCustomerIds.findIndex(item => item === customerId)
    if (index > -1) {
      state.orderCustomerIds.splice(index, 1)
    }
  },
  clearOrderCustomerIds(state) {
    state.orderCustomerIds = []
  },
  setOrderGroup(state, payload) {
    state.orderGroup = payload
  },
  addOrderGroupItem(state, items) {
    if (!(items instanceof Array)) {
      items = [items]
    }
    state.orderGroup.members.push(...items)
  },
  removeOrderGroupItem(state, index) {
    if (index > -1) {
      state.orderGroup.members.splice(index, 1)
    }
  },
  addUnGroupOrders(state, item) {
    state.unGroupOrders.push(item)
  },
  removeUnGroupOrders(state, orders) {
    if (!(orders instanceof Array)) {
      orders = [orders]
    }
    orders.forEach(order => {
      let index = state.unGroupOrders.findIndex(item => item.id === order.id)
      if (index > -1) {
        state.unGroupOrders.splice(index, 1)
      }
    })
  },
  clearUngroupOrders(state) {
    state.unGroupOrders = []
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
