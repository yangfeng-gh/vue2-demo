/**
 * @param n: Number, 要转换的数字
 * @param precision: Number, 精度
 * @return :Number 指定精度的小数
 */
const round = (n, precision) => {
  let p = Math.pow(10, precision)
  return Math.round(n * p) / p
}

/**
 * @param cost: Number 成本价
 * @param salePrice: Number 销售价
 * @return :Number 毛利率
 */
const computeProfitRate = (cost, salePrice) => {
  return round((salePrice - cost) * 100 / salePrice, 2)
}

/**
 * @param cost: Number 成本价
 * @param rate: Number 毛利率
 * @return :Number 销售价
 */
const computeSalePrice = (cost, rate) => {
  return round(cost * 100 / (100 - rate), 2)
}

export default {
  round,
  computeProfitRate,
  computeSalePrice
}
