export const APPNAME = 'cgwy-erp3.0'

export const RESOURCETYPE = ['', '模块', '菜单组', '菜单项', '子页面', '按钮']

export const spikeStatus = [
  {
    label: '未开始',
    value: 0
  },
  {
    label: '已结束',
    value: 1
  },
  {
    label: '已停用',
    value: 2
  },
  {
    label: '进行中',
    value: 3
  }
]

export const activities = [
  {
    label: '品牌推广',
    value: 1
  },
  {
    label: '秒杀活动',
    value: 2
  },
  {
    label: '买一赠一',
    value: 3
  },
  {
    label: '组合品',
    value: 4
  },
  {
    label: '仅图片',
    value: 5
  }
]

export const productTypes = [
  {
    label: '单品',
    value: 0
  },
  {
    label: '打包品',
    value: 1
  }
]

export const couponStatus = [
  {
    label: '未开始',
    value: 1
  },
  {
    label: '已过期',
    value: 2
  },
  {
    label: '已生效',
    value: 3
  },
  {
    label: '已失效',
    value: 4
  }
]
export const complainType = [
  { department: '商务运营', content: '价格问题' },
  { department: '商务运营', content: '地址、坐标错误' },
  { department: '商务运营', content: '下错单' },
  { department: '商务运营', content: '商务专员态度（对内）' },
  { department: '商务运营', content: '过度承诺' },
  { department: '商务运营', content: '虚假客户' },
  { department: '商务运营', content: '商务专员态度（对外）' },
  { department: '商务运营', content: '商务专员联系不上' },
  { department: '采购部', content: '质量问题' },
  { department: '采购部', content: '无货' },
  { department: '采购部', content: '采错货' },
  { department: '采购部', content: '秒杀或特价产品无货的' },
  { department: '采购部', content: '实物与APP图片不符' },
  { department: '采购部', content: '无货通知' },
  { department: '采购部', content: '采购入库时间' },
  { department: '采购部', content: '备货问题' },
  { department: '采购部', content: '调价通知' },
  { department: '采购部', content: '采购反馈时效' },
  { department: '采购部', content: '临采发车晚' },
  { department: '采购部', content: '冻货送货时间' },
  { department: '物流仓储部', content: '库房出错货' },
  { department: '物流仓储部', content: '未送到' },
  { department: '物流仓储部', content: '送迟' },
  { department: '物流仓储部', content: '配送司机态度问题' },
  { department: '物流仓储部', content: '冻货、蔬菜验货' },
  { department: '物流仓储部', content: '不送 无理由退货' },
  { department: '物流仓储部', content: '找不到地址 直接拉走' },
  { department: '物流仓储部', content: '往期退货超过3天的' },
  { department: '物流仓储部', content: '外观脏、破损' },
  { department: '物流仓储部', content: '丢货' },
  { department: '物流仓储部', content: '兑奖问题' },
  { department: '物流仓储部', content: '出仓晚' },
  { department: '物流仓储部', content: '司机APP点错' },
  { department: '物流仓储部', content: '库房收货时间' },
  { department: '客服部', content: '推诿、态度不好' },
  { department: '客服部', content: '区块审核错误' },
  { department: '客服部', content: '忘记录退货工单' },
  { department: '客服部', content: '无货通知客户' },
  { department: '客服部', content: '新品反馈客户' },
  { department: '客服部', content: '重单' },
  { department: '客服部', content: '内部微信事务' }
]
export const getActivityById = id => activities.find(item => item.value === id)

export const vehicleModel = [
  { name: '轻型封闭货车', id: 1 },
  { name: '面包', id: 2 },
  { name: '金杯', id: 3 }
]

export const statusTip = [{ name: '无效', id: 0 }, { name: '有效', id: 1 }]

export const logistics = {
  云鸟: '6%',
  一号货车: '6%',
  '58网': '6%',
  快狗: '6%',
  领翔货的: '6%',
  正时达物流: '6%',
  一运全城: '4%',
  运拉拉: '3.5%',
  快货平台: '11%',
  个人: '无',
  易货嘀: ''
}
