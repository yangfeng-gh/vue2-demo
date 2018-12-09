import store from '@/store'
import { default as router, routes, mainRoutes, mainMenus, mainMenuNames } from '@/router'

export function setTitle (title) {
  title = title || '米树电商管理平台'
  window.document.title = title
}

export function getRoleIds () {
  let user = store.state.activeUser
  let roleIds = []
  if (user && user.adminRoles instanceof Array) {
    roleIds = user.adminRoles.map(item => item.id)
  }
  return roleIds
}

export function getPrivileges () {
  let user = store.state.activeUser
  let privileges = []
  if (user && user.adminAuthoritys instanceof Array) {
    privileges = user.adminAuthoritys.map(item => item.route)
  }
  return privileges
}

export function hasPrivilege (routeName) {
  let roleIds = getRoleIds()
  if (roleIds.includes(1)) {
    return true
  } else {
    let privileges = getPrivileges()
    return privileges.includes(routeName)
  }
}

export function openPage (to, from, next) {
  try {
    // 验证权限
    // if (!hasPrivilege(to.name)) {
    //   next(false)
    //   return
    // }
    let toRootRoute = mainRoutes.find(r => r.name === to.matched[0].name)
    let fromRootName = from.matched[0] ? from.matched[0].name : null
    if (toRootRoute) {
      let lastOPenedPage = store.state.app.activeLeftMenuObj[toRootRoute.name]
      switch (to.matched.length) {
        case 1:
          next(lastOPenedPage || toRootRoute.children[0].children[0])
          break
        case 2:
          next(lastOPenedPage || toRootRoute.children.find(r => r.name === to.name).children[0])
          break
        default:
          if (!fromRootName || fromRootName !== toRootRoute.name) {
            updateLeftMenus(toRootRoute.name)
          }
          updateActiveLeftMenu(toRootRoute.name, to)

          store.commit('app/addOpenedPage', {
            name: to.name,
            title: to.meta.title,
            params: to.params,
            query: to.param
          })

          if (to.meta.cache) {
            store.commit('app/addCachedPage', to.name)
          }

          updateCurrentPath(to)
          next()
      }
    } else {
      next()
    }
  } catch (e) {
    next(false)
    console.log(e)
  }
}

export function closePage (current, next) {
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

export function updateMainMenus () {
  let menus = mainMenus.filter(route => {
    if (route.auth) {
      return hasPrivilege(route)
    } else {
      return true
    }
  })
  store.commit('app/setMainMenus', menus)
}

export function updateLeftMenus (routeName) {
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

export function updateActiveLeftMenu (mainMenuName, route) {
  let routeObj = {
    name: route.name
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

export function updateCurrentPath (route) {
  if (route.matched.length < 3) {
    return
  }
  const paths = []
  route.matched.forEach(r => {
    if (r.meta.parent) {
      paths.push(getParentRoute(route, r.meta.parent))
    }
    paths.push({
      path: r.path,
      name: r.name,
      title: r.meta.title
    })
  })
  store.commit('app/setCurrentPath', paths)
}

function getParentRoute (childRoute, parentName) {
  let parent = mainRoutes
    .find(r1 => r1.name === childRoute.matched[0].name)
    .children.find(r2 => r2.name === childRoute.matched[1].name)
    .children.find(r3 => r3.name === parentName)
  return {
    path: parent.path,
    name: parent.name,
    title: parent.meta.title
  }
}
