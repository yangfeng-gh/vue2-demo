function justifyTableHeight(tolerance, selector) {
  tolerance = tolerance || 156
  selector = selector || '.criteria-box'
  this.$nextTick(function () {
    let documentHeight = document.documentElement.clientHeight
    let criteriaHeight = document.querySelector(selector).offsetHeight
    let tableHeader = document.querySelector('.table-header')
    let pagination = document.querySelector('.pagination')
    let tableHeight = documentHeight - criteriaHeight - tolerance
    if (tableHeader) {
      tableHeight -= tableHeader.offsetHeight
    }
    if (pagination) {
      tableHeight -= pagination.offsetHeight
    }
    if (tableHeight > criteriaHeight * 2) {
      this.tableHeight = tableHeight
    }
  })
}

export default {
  methods: {
    justifyTableHeight(tolerance, selector) {
      justifyTableHeight.call(this, tolerance, selector)
    }
  }
}
