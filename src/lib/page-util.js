import store from '@/store'
import { default as router, routes, mainRoutes, mainMenus, mainMenuNames } from '@/router'

export function setTitle(title) {
  title = title || '米树电商管理平台'
  window.document.title = title
}

function hasPrivilege(routeName) {
  let user = store.state.activeUser
  let routes = user ? (user.routes instanceof Array ? user.routes : []) : []
  return user.id === 949 || routes.includes(routeName)
}

export function openPage(to, from, next) {
  try {
    if (!to.meta.auth) {
      next()
    } else {
      if (!hasPrivilege(to.name)) {
        next('/401')
      } else {
        let toRootRoute = mainRoutes.find(r => r.name === to.matched[0].name)
        if (toRootRoute) {
          let fromRootName = from.matched[0] ? from.matched[0].name : ''
          let lastOPenedPage = store.state.app.activeLeftMenuObj[toRootRoute.name]
          switch (to.matched.length) {
            case 1:
              if (toRootRoute.children) {
                route2Loop: for (let r2 of toRootRoute.children) {
                  if (!hasPrivilege(r2.name)) {
                    continue
                  }
                  if (r2.children) {
                    if (lastOPenedPage) {
                      next(lastOPenedPage)
                    } else {
                      for (let route3 of r2.children) {
                        if (hasPrivilege(route3.name)) {
                          next(route3)
                          break route2Loop
                        }
                      }
                    }
                  } else {
                    next()
                    break route2Loop
                  }
                }
              } else {
                next()
              }
              break
            case 2:
              if (toRootRoute.children) {
                if (lastOPenedPage) {
                  next(lastOPenedPage)
                } else {
                  for (let { name, meta, params, query } of toRootRoute.children) {
                    if (!hasPrivilege(name2)) {
                      continue
                    }
                    next({ name, params, query, title: meta.title })
                  }
                }
              } else {
                next()
              }
              break
            default:
              // 仅在头部主菜单切换时更新左侧菜单
              if (toRootRoute.name !== fromRootName) {
                updateLeftMenus(toRootRoute.name)
              }

              let newRoute = {
                name: to.name,
                title: to.meta.title,
                params: to.params,
                query: to.query
              }
              // 添加标签页
              store.commit('app/addOpenedPage', newRoute)
              updateActiveLeftMenu(toRootRoute.name, to)

              // 更新缓存
              if (to.meta.cache) {
                store.commit('app/addCachedPage', to.name)
              }

              let currentPath = store.state.app.currentPath
              // if修复刷新页面时4级页面面包屑导航丢失第3级路径的问题
              if (currentPath.length && to.name !== currentPath[currentPath.length - 1].name) {
                // 更新导航
                updateCurrentPath(to, from)
              }
              next()
          }
        } else {
          next()
        }
      }
    }
  } catch (e) {
    next(e)
  }
}

export function closePage(current, next) {
  store.commit('app/removeOpenedPage', current)
  if (store.state.app.openedPages.length < 1 && !next) {
    router.push({
      name: 'home'
    })
    return false
  }
  if (typeof next === 'string') {
    router.push({
      name: next
    })
  } else if (typeof next === 'object' && next.name) {
    router.push(next)
  } else {
    router.push(store.state.app.openedPages[store.state.app.openedPages.length - 1])
  }
}

export function updateMainMenus() {
  let menus = mainMenus.filter(route => {
    if (route.auth) {
      return hasPrivilege(route.name)
    } else {
      return true
    }
  })
  store.commit('app/setMainMenus', menus)
}

export function updateLeftMenus(routeName) {
  let mainRoute = mainRoutes.find(route => route.name === routeName)
  let leftMenus = JSON.parse(JSON.stringify(mainRoute.children))
  if (hasPrivilege(routeName)) {
    leftMenus = leftMenus.filter(route => hasPrivilege(route.name))
  }
  leftMenus.forEach(menu => {
    menu.children = menu.children.filter(subMenu => {
      if (subMenu.meta.inMenu && subMenu.meta.auth) {
        return hasPrivilege(subMenu.name)
      } else {
        return false
      }
    })
  })
  store.commit('app/setLeftMenus', leftMenus)
}

export function updateActiveLeftMenu(mainMenuName, route) {
  let routeObj = {
    name: route.meta.parent ? route.meta.parent : route.name
  }

  if (typeof route.params === 'object' && Object.keys(route.params).length > 0) {
    routeObj.params = route.params
  }

  if (typeof route.query === 'object' && Object.keys(route.query).length > 0) {
    routeObj.query = route.query
  }

  let activeLeftMenuObj = {
    ...store.state.app.activeLeftMenuObj,
    ...{
      [mainMenuName]: routeObj
    }
  }
  store.commit('app/setActiveLeftMenuObj', activeLeftMenuObj)
}

export function updateCurrentPath(to, from) {
  // 只有3级及以上页面才有面包屑导航
  if (to.matched.length < 3) {
    return
  }
  const paths = []
  // 1，2级导航没有对应页面，不可点击
  for (let i = 0; i < to.matched.length - 1; i++) {
    let item = to.matched[i]
    paths.push({
      // path: item.path,
      name: item.name,
      title: item.meta.title
    })
  }
  // 3级页面的子页面
  if (from && (to.meta.parent === from.name || to.query.backPage === from.name)) {
    paths.push({
      path: from.path,
      name: from.name,
      title: from.meta.title
    })
  }
  // 当前页面（最后一级）
  paths.push({
    path: to.path,
    name: to.name,
    title: to.meta.title
  })
  store.commit('app/setCurrentPath', paths)
}
