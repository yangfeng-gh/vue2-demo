import Cookies from 'js-cookie'

const state = {
  mainMenus: [],
  leftMenus: [],
  activeLeftMenuObj: {},
  mainMenuShrink: false,
  leftMenuShrink: false,
  currentPath: [],
  openedPages: [],
  cachedPages: []
}
const getters = {}
const mutations = {
  resetApp(state) {
    state.mainMenus = []
    state.leftMenus = []
    state.activeLeftMenuObj = {}
    state.mainMenuShrink = false
    state.leftMenuShrink = false
    state.currentPath = []
    state.openedPages = []
    state.cachedPages = []
  },
  setMainMenus(state, menus) {
    state.mainMenus = menus
  },
  setLeftMenus(state, menus) {
    state.leftMenus = menus
  },
  setActiveLeftMenuObj(state, LeftMenuObj) {
    state.activeLeftMenuObj = LeftMenuObj
  },
  setMainMenuShrink(state, mainMenuShrink) {
    state.mainMenuShrink = mainMenuShrink
  },
  setLeftMenuShrink(state, leftMenuShrink) {
    state.leftMenuShrink = leftMenuShrink
  },
  addOpenedPage(state, route) {
    let index = state.openedPages.findIndex(item => item.name === route.name)

    if (state.openedPages.length > 8) {
      state.openedPages.shift()
    }

    if (index === -1) {
      state.openedPages.push(route)
    }
  },
  replaceOpenedPage(state, route) {
    state.openedPages.pop()
    this.commit('app/addOpenedPage', route)
  },
  removeOpenedPage(state, routeName) {
    let index = state.openedPages.findIndex(item => item.name === routeName)

    if (index > -1) {
      state.openedPages.splice(index, 1)
    }
  },
  addCachedPage(state, pageName) {
    if (!state.cachedPages.includes(pageName)) {
      state.cachedPages.push(pageName)
    }
  },
  clearAllTags(state) {
    state.cachedPages = []
    state.openedPages = []
    state.currentPath = []
  },
  clearOtherTags(state, vm) {
    let currentName = vm.$route.name
    let currentIndex = 0
    state.openedPages.forEach((item, index) => {
      if (item.name === currentName) {
        currentIndex = index
      }
    })
    if (currentIndex === 0) {
      state.openedPages.splice(1)
    } else {
      state.openedPages.splice(currentIndex + 1)
      state.openedPages.splice(0, currentIndex)
    }
    let newCachepage = state.cachedPages.filter(item => {
      return item === currentName
    })
    state.cachedPages = newCachepage
  },
  setCurrentPath(state, paths) {
    state.currentPath = paths
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
