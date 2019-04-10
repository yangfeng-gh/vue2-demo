import qs from 'qs'
import http from './http'
export { default } from './http'
export * from './http'

// 多个模块共用的接口
export const login = (data) => http.post('/admin/api/login', data)
export const logout = () => http.post('/admin/api/logout')
export const getMarketByCityId = cityId => http.get('/admin/api/city/' + cityId + '/warehouses/')
export const getDirectBlocks = cityId => http.get('/admin/api/directBlock/get', { params: { cityId } })
export const uploadImage = data => http.post('/admin/api/sku/media', data)
export const uploadSkuImage = '/admin/api/media/sku'
export const uploadActivityImage = '/admin/api/media/activity'
export const getVendors = params => http.get('/admin/api/vendor', { params })
export const getOrganizationsByCityId = id => http.get(`/admin/api/city/${id}/organizations`)
export const exportExcel = params => http.get('/admin/web/api/task/getExportTask', { params })
export const getAdminRoles = () => http.get('/admin/api/admin-roles/organization')
export const getDepotsTree = () => http.get('/admin/api/city/depotsTree')
export const getDepotsByCityId = id => http.get(`/admin/api/depot/list/${id}`)
export const getMarketByDepotId = id => http.get(`/admin/api/warehouse/depot/${id}`)
export const getBlocksTree = () => http.get('/admin/api/city/blocksTree')
export const getBlocksByCityId = cityId => http.get('/admin/api/city/' + cityId + '/blocks?status=true')
export const getBlocksByDepotId = id => http.get(`/admin/api/block/depot/${id}`)
export const getBlocksByMarketId = id => http.get(`/admin/api/block/warehouse/${id}`)
export const sendVerifyCode = () => http.get('/admin/api/admin-user/exportCode')

// 客户管理系统
export const getSellerGroup = cityId => http.get('/admin/api/sellergroup/querygroupbycity?cityId=' + cityId)
export const getSellerStatuses = () => http.get('/admin/api/seller/statuses')
export const getSellerJobs = () => http.get('/admin/api/seller/jobs')
export const getSellerGroupStatuses = () => http.get('/admin/api/sellergroup/statuses')
export const getCustomers = params => http.get('/admin/api/customer/listCustomer', { params })
export const getCustomerGrade = () => http.get('/admin/api/restaurant/grades')
export const getCustomerState = () => http.get('/admin/api/restaurant/status')
export const getRegisterType = () => http.get('/admin/api/restaurant/registType')
export const getRestaurantTypeWrapper = threeTypeId => http.get(`/admin/api/restaurantType/wrapper/${threeTypeId}`)
export const getRestaurantType = () => http.get('/admin/api/restaurantType/parent')

export const getUserToken = username => http.get('/admin/api/customer/token/' + username)
export const abandonCustomer = data => http.post('/admin/api/customer/abandoncustomer', data)
export const getRestaurant = restaurantId => http.get('/admin/api/restaurant/' + restaurantId)
export const getRestaurantUp = (id, curPage = 0) => http.get('/admin/api/restaurantUp/' + id + '/' + curPage)
export const getReceiveTime = () => http.get('/admin/api/restaurant/receiveTime')
export const getRestaurantAttr = () => http.get('/admin/api/restaurant/attribution')
export const getMainRestaurantLike = keyword =>
  http.get('admin/api/restaurant/candidatesExcludeOneself', {
    params: { main: true, name: keyword }
  })
export const getRestaurantTypeByParent = id =>
  http.get('/admin/api/restaurantType/' + id + '/child', {
    params: { status: 1 }
  })
export const saveRestaurantUp = data => http.post('/admin/api/restaurantUp/insert', data)
export const getRestaurantReasons = () => http.get('/admin/api/restaurant/reasons')
export const getBlockByLocation = params => http.get('/admin/api/restaurant/getRestaurantBlock', { params })
export const getSellerbygroup = params => http.get('/admin/api/seller/querysellerbygroup', { params })
export const getRestaurantTemp = params => http.get('/admin/api/restaurant-temps', { params })
export const getRestaurantTmp = examineId => http.get('admin/api/restaurant-temp/' + examineId)
export const adoptRestaurantTmp = (examineId, status) => {
  return http({
    url: `/admin/api/restaurant/status/${examineId}?status=${status}`,
    method: 'post',
    contentType: 'application/x-www-form-urlencode'
  })
}
export const getExamineStatus = () => http.get('/admin/api/check/status')
export const createSellerGroup = data => http.post('/admin/api/sellergroup/create', qs.stringify(data), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
export const updateSellerGroup = data => http.post('admin/api/sellergroup/update', qs.stringify(data), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
export const getSellerGroups = params => http.get('/admin/api/sellergroup/query', { params })
export const getSellers = params => http.get('/admin/api/seller/query', { params })
export const checkSeller = params => http.get('/admin/api/seller/check', { params })
export const querysellerbysuperiorjob = params => http.get('/admin/api/seller/querysellerbysuperiorjob', { params })
export const createSeller = data => http.post('/admin/api/seller/create', qs.stringify(data), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
export const updateSeller = data => http.post('/admin/api/seller/update', qs.stringify(data), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
export const checkSellerStatus = (params) => http.get('/admin/api/seller/checkstatus', { params })
export const getAdminUserByRestaurantId = params => http.get('/admin/api/restaurant/getAdminUserByRestaurantId', { params })
export const batchUpdateAdmin = data => http.post('/admin/api/restaurant/batchUpdateAdmin', qs.stringify(data, { indices: false }), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 运营管理系统
export const getSpikeList = params => http.get('/admin/api/spike/queryParma', { params })
export const queryDynamicPriceLike = params => http.get('/admin/api/dynamic-price/candidatesPlus', { params })
export const queryDynamicPriceById = id => http.get(`/admin/api/dynamic-price/${id}`)
export const queryDynamicPriceSku = params => http.get('/admin/api/dynamic-price/sku', { params })
export const addSpike = data => http.post('/admin/api/spike/add', data)
export const getSpikeById = id => http.get('/admin/api/spike/queryNew/' + id)
export const changeSpikeState = data =>
  http.post('/admin/api/spike/state/change', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
export const modifySpike = data => http.put('/admin/api/spike/modify', data)
export const getScore = params => http.get('admin/api/score/query', { params })
export const getScoreLog = params => http.get('admin/api/scoreLog/query', { params })
export const getGlobalAdminUser = () => http.get('/admin/api/admin-user/global?role=CustomerService')
export const getOrderSum = params => http.get('admin/api/score/order/sum', { params })
export const getHomePage = (cityId, warehouseId, manageType) => {
  if (manageType) {
    return http.get('/admin/api/homePage/' + cityId + '/' + warehouseId + '/' + manageType)
  } else {
    return http.get('/admin/api/homePage/' + cityId + '/' + warehouseId)
  }
}
export const saveActivity = data => http.post('/admin/api/homePage/save', data)
export const saveBanners = data => http.post('/admin/api/homePage/saveBatch', data)
export const getBrandPromotions = params => http.get('/admin/api/brandProduct/findAllList', { params })

// 商品管理系统
export const getSkuSingleUnits = params => http.get('/admin/api/sku/skuSingleUnit', { params })
export const getSkuBundleUnits = params => http.get('/admin/api/sku/skuBundleUnit', { params })
export const getSkuStatuses = params => http.get('/admin/api/sku/status', { params })
export const getRateValues = () => http.get('/admin/api/sku/rateValues')
export const getOrganizations = params => http.get('/admin/api/organization', { params })
export const getProductCategories = () => http.get('/admin/api/category/treeJson')
export const getProductCategoriesNew = params => http.get('/admin/api/category/new/treeJson', { params })
export const updateCategoriyOrder = data => http.put('/admin/api/category/new/order', data)
export const updateProductCategoryChildren = (id, data) =>
  http.put('/admin/api/category/' + id + '/children', qs.stringify(data, { indices: false }))
export const updateProductCategory = (id, data) => http.put('/admin/api/category/' + id, data)
export const updateCategoryCityShow = (id, data) =>
  http.put('/admin/api/category/' + id + '/changeCity', qs.stringify(data))
export const getCategoriesByLevel = params => http.get('/admin/api/category/getCategoriesByLevel', { params })
export const addCategory = data => http.post('admin/api/category', data)
export const getCategoryById = id => http.get('admin/api/category/' + id)
export const fetchSkuStatuses = () => http.get('/admin/api/sku/status')
export const fetchSkuPriceList = params => http.get('/admin/api/skuPrice/list', { params })
export const getBrandCandidates = params => http.get('/admin/api/brand/candidates', { params })
export const getBrandList = params => http.get('/admin/api/brand/list', { params })
export const getProductById = id => http.get(`/admin/api/product/${id}`)
export const getSkuById = id => http.get(`/admin/api/sku/${id}`)
export const addProduct = data => http.post(`/admin/api/product-temp`, data)
export const editProduct = (id, data) => http.put(`/admin/api/productTemp/${id}`, data)
export const getSimpleBlocks = (id, params) => http.put(`/admin/api/city/${id}/simpleBlocks`, { params })
export const getOrderDetail = id => http.get(`/admin/api/order/${id}`)
export const getOrderReasons = () => http.get('/admin/api/order/reason')
export const getRefundReasons = () => http.get('/admin/api/sellReturn/reasons')
export const getOrderByIdAndCombinationId = (orderId, combinationId) => http.get(`/admin/api/order/${orderId}/${combinationId}`)
export const newPromotion = data => http.post('/admin/api/order/newPromotion', data)
export const sellCancel = data => http.post('/admin/api/sellCancel', data)
export const sellReturn = data => http.post('/admin/api/sellReturn', data)
export const auditSellReturn = (id, data) => http.put(`/admin/api/sellReturn/${id}`, qs.stringify(data), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
export const getWarehousesById = id => http.get(`/admin/api/city/warehouses/${id}`)
export const getDynamicPriceUnique = params => http.get('/admin/api/dynamic-price/unique', { params })
export const updateDynamicPriceTemp = data => http.post('/admin/api/dynamic-price-temp', data)

// 采购管理系统
export const getPurchasePreItems = params => http.get('/admin/api/purchase/order/preItems', { params })
export const savePurchasePreItems = data => http.post('/admin/api/purchase/order/add', data)
export const queryPurchaseSku = params =>
  http.get('/admin/api/purchase/order/sku', {
    params: { ...{ tatus: 2 }, ...params }
  })
export const queryPurchaseSkuCandidates = params => http.get('/admin/api/sku/candidates', { params })
export const getPurchaseItems = params => http.get('/admin/api/purchase/order/list', { params })
export const getPurchaseOrderStatuses = () => http.get('/admin/api/purchase/order/statuses')
export const cancelPurchaseOrder = id => http.get(`admin/api/purchase/order/cancel/${id}`)
export const submitPurchaseOrder = id => http.get(`/admin/api/purchase/order/submit/${id}`)
export const getPurchaseOrder = id => http.get(`admin/api/purchase/order/${id}`)
export const auditPurchaseOrder = data => http.post('/admin/api/purchase/order/audit', data)
export const getPurchaseStatuses = () => http.get('/admin/api/accounting/payment/apply/status')
export const findPaymentApply = params => http.get('/admin/api/accounting/payment/apply/find', { params })
export const findPaymentApplyById = id => http.get(`/admin/api/accounting/payment/apply/${id}`)
export const auditPaymentApply = data => http.post('/admin/api/accounting/payment/apply/audit', data)
export const getPurchaseOrderInfo = id => http.get(`/admin/api/purchase/order/info/${id}`)
export const getSignList = id => http.get('/admin/api/purchase/order/item/signList')
export const createAccordingResult = data => http.post('/admin/api/purchase/order/createAccordingResult', data)
export const getPurchaseOrderItems = params => http.get('/admin/api/purchase/order/items', { params })
export const getCutOrderList = params => http.get('/admin/api/purchase/order/cut-order-list', { params })
export const changePurchaseOrderItemSign = data => http.post('/admin/api/purchase/order/changePurchaseOrderItemSign', data)
export const purchaseAccordingResult = data => http.post('/admin/api/purchase/order/accordingResult', data)
export const purchaseCheckPrice = data => http.post('/admin/api/purchase/order/checkPrice', data)
export const submitAccordingResult = data => http.post('/admin/api/purchase/order/submitAccordingResult', data)
export const getReturnNoteTmp = id => http.get(`/admin/api/purchase/order/returnNote/tmp/${id}`)
export const createReturnNote = data => http.post('/admin/api/purchase/order/returnNote/create', data)
export const updateSkuVendor = data => http.post('/admin/api/sku/updateSkuVendor', data)
export const getSkuVendor = id => http.get(`/admin/api/skuVendor/${id}`)
export const getPayableList = params => http.get('/admin/api/accounting/payable/list', { params })
export const getPayableTypes = params => http.get('/admin/api/accounting/payable/types', { params })
export const getVendorByCode = code => http.get(`/admin/api/vendor/code/${code}`)
export const createPaymentApply = data => http.post('/admin/api/accounting/payment/apply/create', data)
export const getBuyerList = params => http.get('/admin/api/buyer/list', { params })
export const getBuyerStatuses = () => http.get('/admin/api/buyer/statuses')
export const getAdminUserNotBuyer = () => http.get('/admin/api/buyer/getAdminUserNotBuyer')
export const updateBuyer = data => http.post('/admin/api/buyer/update', qs.stringify(data, { indices: false }), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
export const createBuyer = data => http.post('/admin/api/buyer/create', qs.stringify(data, { indices: false }), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 仓储物流系统
export const getTrackers = params => http.get('/admin/api/accounting/tracker/list', { params })
export const getCarRoute = params => http.get('/admin/api/carRoute/list', { params })
export const getStockOutStatus = params => http.get('/admin/api/stockOut/status/list', { params })
export const getStockPrint = params => http.get('/admin/api/stockPrint/status/list', { params })
export const getStockOutList = params => http.get('/admin/api/stockOut/query', { params })
export const getCars = params => http.get('/admin/api/car/cars', { params })
export const findCarById = id => http.get(`/admin/api/car/${id}`)
export const saveOrUpdateCar = data => http.post('/admin/api/car/saveOrUpdate', data)
export const getAdminUsers = params => http.get('/admin/api/organization/adminUsers', { params })
export const getVehicleDispatcheDetail = id => http.get(`admin/api/order-group/${id}`)
export const getUnGroupedOrders = params => http.get('/admin/api/ungrouped-order', { params })
export const getUnallocatedOrders = params => http.get('/admin/api/unallocated-order', { params })
export const findCarRouteById = id => http.get(`/admin/api/carRoute/${id}`)
export const saveOrderGroup = data => http.post('/admin/api/order-group', data)
export const updateOrderGroup = (id, data) => http.put(`/admin/api/order-group/${id}`, data)

// 系统设置
export const getDepartmentTree = () => http.get('/admin/api/department/treeJson')
export const getDepartments = () => http.get('/admin/api/department')
export const setMainDepot = id => http.put(`admin/api/depot/main/${id}`)
export const setDefaultMarket = id => http.put(`admin/api/warehouse/isDefault/${id}`)
export const getDepartmentById = id => http.get(`/admin/api/department/${id}`)
export const saveDepartment = data => http.post('/admin/api/department/add', data)
export const updateDepartment = data => http.put('/admin/api/department', data)
export const getJobsByParams = params => http.get('/admin/api/jobs', { params })
export const getCustomerClassifyCategories = () => http.get('/admin/api/restaurantType/treeJson')
export const getAllJobs = () => http.get('/admin/api/job/all')
export const getAllAdminRoles = () => http.get('/admin/api/admin-role/all')
export const getJobDetail = id => http.get(`/admin/api/job/${id}`)
export const saveJob = data => http.post('/admin/api/job/add', data)
export const updateJob = data => http.put('/admin/api/job', data)
export const getRolesByParams = params => http.get('/admin/api/authority/admin-role/list', { params })
export const getRoleDetail = id => http.get(`/admin/api/authority/admin-role/${id}`)
export const saveRole = data => http.post('/admin/api/admin-role', data)
export const updateRole = data => http.put('/admin/api/authority/admin-role', data)
export const queryAdminUsers = params => http.get('/admin/api/admin-user', { params })
export const getAllBelong = () => http.get('/admin/api/city/belongCity')
export const getDepartmentsByParams = params => http.get('/admin/api/department', { params })
export const getJobsByDeptId = deptId => http.get(`/admin/api/department/${deptId}/jobs`)
export const saveAdminUser = data => http.post('/admin/api/admin-user', data)
export const updateAdminUser = (data, id) => http.put(`/admin/api/admin-user/${id}`, data)
export const getAdminUserById = id => http.get(`/admin/api/admin-user/${id}`)
export const initAdminUserPassword = data =>
  http.post('/admin/api/admin-user/initPassword', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
export const getPriviegeTree = () => http.get('/admin/api/authority/tree')
export const updatePriviege = data => http.post('/admin/api/admin-authority/role-auth', data)
export const getPrivieges = id => http.get(`/admin/api/admin-authority/role-auth/${id}`)
export const updateResource = data => http.put('/admin/api/admin-authority', data)
export const addResource = data => http.post('/admin/api/admin-authority', data)

// 财务管理
export const getPayment = params => http.get('/admin/api/accounting/payment/list', { params })
export const getAccountingStatuses = () => http.get('/admin/api/accounting/payment/statuses')
export const getPaymentMehtods = id => http.get(`/admin/api/accounting/payment/methods/${id}`)
export const getAccountReceivableTypes = () => http.get('/admin/api/accountReceivable/type/list')
export const getPaymentMethods = () => http.get('/admin/api/account/collectionPaymentMethod/list')
export const getCollectionmentList = params => http.get('/admin/api/collectionment/list', { params })
export const confirmCollectionment = data => http.post('/admin/api/collectionment/confirm', data)
export const cancelPayment = id => http.post('/admin/api/accounting/payment/cancel?id=' + id)
export const queryPayableList = params => http.get('/admin/api/accounting/payable/list', { params })
export const getPayableStatuses = () => http.get('/admin/api/accounting/payable/statuses')
export const getOrderPayTypes = () => http.get('/admin/api/order/orderPayType/get')
export const getPrepayCandidate = () => http.get('/admin/api/accounting/prepay/candidates', { params })
export const getStockOutSend = (id) => http.get(`/admin/api/stockOut/send/${id}`)
export const checkCoupon = data => http.post('/admin/api/checkCoupon', data)
export const finishStockOutSend = data => http.post('/admin/api/stockOut/send/finish', data)
export const getPaypalInfo = params => http.get('/admin/api/orderPaypal/paypal/', { params })
export const getPrePayInfo = stockOutId => http.get(`/admin/api/accounting/prepay/account/${stockOutId}`)
export const getMethodsInfo = cityId => http.get(`/admin/api/accounting/payment/methods/${cityId}`)
export const getWriteOffList = params => http.get('/admin/api/accounting/payable/writeOff/list', { params })
