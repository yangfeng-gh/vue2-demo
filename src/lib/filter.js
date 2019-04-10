export function capitalize(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function currency(value) {
  value = parseFloat(value)
  if (isNaN(value)) return ''
  return `¥ ${value.toFixed(2)}`
}

/**
 * @param n: Number, 要转换的数字
 * @param precision: Number, 精度
 * @return :Number 指定精度的小数
 */
export const round = (n, precision = 2) => {
  let p = Math.pow(10, precision)
  return Math.round(n * p) / p
}

/**
 * @param cost: Number 成本价
 * @param salePrice: Number 销售价
 * @return :Number 毛利率
 */
export const computeProfitRate = (cost, salePrice) => {
  return round(((salePrice - cost) * 100) / salePrice, 2)
}

/**
 * @param cost: Number 成本价
 * @param rate: Number 毛利率
 * @return :Number 销售价
 */
export const computeSalePrice = (cost, rate) => {
  return round((cost * 100) / (100 - rate), 2)
}
