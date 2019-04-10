import { get } from './shvl'

/**
 * 应用：城市，市场
 */
export function transformTree(treeData, checkedIds) {
  if (!(treeData instanceof Array) || treeData.length <= 0) {
    return []
  }
  return treeData.map(item => {
    let _item = Object.create(null)
    _item.title = item.text
    _item.id = item.id
    _item.expand = false
    if (checkedIds && checkedIds.length) {
      _item.checked = checkedIds.includes(item.id)
    } else {
      _item.checked = false
    }
    if (item.children && item.children.length) {
      _item.children = transformTree(item.children, checkedIds)
      _item.children.forEach(child => {
        child.parentId = item.id
      })
    }
    return _item
  })
}

/**
 * 应用：编辑部门－所属上级部门
 * 查找部门所有子部门
 */
export function findChildIds(departments, id) {
  let descendantIds = [id]

  ;(function _findChildren(_departments, _id) {
    let childIds = []
    let notChild = []
    _departments.forEach(item => {
      if (item.parentId === _id) {
        childIds.push(item.id)
        descendantIds.push(item.id)
      } else {
        notChild.push(item)
      }
    })
    if (childIds.length && notChild.length) {
      childIds.forEach(item => {
        _findChildren(notChild, item)
      })
    }
  })(departments, id)

  return descendantIds
}

export function findNotChildDeparments(departments, id) {
  let childIds = findChildIds(departments, id)
  let notChild = []
  departments.forEach(item => {
    if (!childIds.includes(item.id)) {
      notChild.push(item)
    } else if (item.id === id) {
      notChild.push(item)
    }
  })
  return notChild
}

/**
 * 应用：城市，市场
 * 获取已选中的城市和市场
 */
export function filterCheckedNodes(treeData, checkedNods) {
  if (!(treeData instanceof Array) || treeData.length <= 0) {
    return []
  }
  if (!(checkedNods instanceof Array) || checkedNods.length <= 0) {
    return []
  }
  let checkedIds = checkedNods.map(node => node.id)
  let _checkedIds = []
  ;(function _filterIds(treeData, checkedIds) {
    treeData.forEach(item => {
      if (checkedIds.includes(item.id) && (!item.parentId || !checkedIds.includes(item.parentId))) {
        _checkedIds.push(item.id)
      }
      if (item.children && item.children.length) {
        _filterIds(item.children, checkedIds)
      }
    })
  })(treeData, checkedIds)

  return _checkedIds
}

/**
 * 应用：系统设置-部门
 */
export function findValidDepartment(treeData) {
  if (!(treeData instanceof Array) || treeData.length <= 0) {
    return []
  }

  let _treeData = []

  treeData.forEach(item => {
    if (item.status === 1) {
      let _item = Object.assign({}, item)
      if (item.children && item.children.length > 0) {
        _item.children = findValidDepartment(item.children)
      }
      _treeData.push(_item)
    }
  })

  return _treeData
}
/**
 * 应用：系统设置-部门
 */
export function findInvalidDepartment(treeData) {
  if (!(treeData instanceof Array) || treeData.length <= 0) {
    return []
  }

  let _treeData = []

  treeData.forEach(item => {
    let _item = Object.assign({}, item)
    if (item.children && item.children.length > 0) {
      _item.children = findInvalidDepartment(item.children)
    } else {
      if (_item.status === 2) {
        _treeData.push(_item)
      }
    }
    if (_item.children && _item.children.length) {
      _treeData.push(_item)
    }
  })

  return _treeData
}
/**
 * 构造权限树
 */
export function transformPrivilegeTree(treeData, checkedIds) {
  if (!(treeData instanceof Array) || treeData.length <= 0) {
    return []
  }
  return treeData.map(item => {
    let _item = Object.create(null)
    _item.id = item.id
    _item.name = item.name
    _item.displayName = item.displayName
    _item.expand = false
    _item.type = item.type.value
    if (item.children && item.children.length) {
      _item.children = transformPrivilegeTree(item.children, checkedIds)
      _item.children.forEach(child => {
        child.parentId = item.id
      })
    }
    if (checkedIds && checkedIds.length) {
      let checked = checkedIds.includes(item.id)
      if (item.children && item.children.length) {
        _item.checkedChildren = _item.children.filter(child => checkedIds.includes(child.id)).map(child => child.id)
        _item.checked = checked && _item.children.length === _item.checkedChildren.length
        _item.indeterminate =
          (_item.checkedChildren.length && _item.checkedChildren.length < item.children.length) ||
          _item.children.some(child => child.indeterminate)
      } else {
        _item.indeterminate = false
        _item.checked = checked
      }
    } else {
      _item.checked = false
      if (item.children && item.children.length) {
        _item.checkedChildren = []
        _item.indeterminate = false
      }
    }
    return _item
  })
}
/**
 * 应用：权限树
 * 构造权限树
 */
export function transformPrivilegeTree2(treeData, properties = {id: 'id', title: 'title'}, selectedIds) {
  if (!(treeData instanceof Array) || treeData.length <= 0) {
    return []
  }

  return treeData.map(item => {
    let _item = Object.create(null)
    for (let [k, v] of Object.entries(properties)) {
      _item[k] = get(item, v)
    }
    // _item.id = item.id
    // _item.name = item.name
    // _item.displayName = item.displayName
    // item.type && (_item.type = item.type.value)
    _item.expand = false
    if (item.children && item.children.length) {
      _item.children = transformPrivilegeTree2(item.children, properties, selectedIds)
      _item.checkedChildren = _item.children.filter(child => child.checked).map(child => child.id)
      if (selectedIds) {
        _item.checked = selectedIds.includes(_item.id)
      } else {
        _item.checked = _item.checkedChildren.length > 0 && _item.children.length === _item.checkedChildren.length
      }
      _item.indeterminate =
        (_item.checkedChildren.length > 0 && _item.checkedChildren.length < _item.children.length) ||
        _item.children.some(c => c.indeterminate)
    } else {
      _item.checked = item.active
    }
    return _item
  })
}
/**
 * 应用：权限树
 * 处理父级联动
 */
export function changeParentCascade(current, parent) {
  if (current.checked) {
    parent.checkedChildren.push(current.id)
  } else {
    let index = parent.checkedChildren.findIndex(item => item === current.id)
    if (index > -1) {
      parent.checkedChildren.splice(index, 1)
    }
  }
  parent.checked = parent.children.length === parent.checkedChildren.length
  parent.indeterminate =
    (parent.checkedChildren.length < parent.children.length && parent.checkedChildren.length > 0) ||
    parent.children.some(child => child.indeterminate)
}
/**
 * 应用：权限树
 * 获取权限树中已选中的
 */
export function getCheckedPrivileges(treeData) {
  if (!(treeData instanceof Array) || treeData.length <= 0) {
    return []
  }
  let _checkedIds = []
  ;(function _getCheckedIds(_treeData) {
    _treeData.forEach(item => {
      if (item.checked || item.indeterminate) {
        _checkedIds.push(item.id)
      }
      switch (item.type) {
        case 1:
        case 2:
          item.children && item.children.length && _getCheckedIds(item.children)
          break
        case 3:
          item.checkedChildren && item.checkedChildren.length && _checkedIds.push(...item.checkedChildren)
      }
    })
  })(treeData)
  return _checkedIds
}
