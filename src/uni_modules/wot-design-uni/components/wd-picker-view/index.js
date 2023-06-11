import VueComponent from '../common/component'
import { getType, range, isEqual } from '../common/util'
import selfProps from './props'

VueComponent({
  props: {
    // 初始值
    value: {
      type: null,
      observer (value, oldValue) {
        if (!isEqual(oldValue, value)) {
          this.selectWithValue(value)
        }
      }
    },
    // 选择器数据
    columns: {
      type: Array,
      value: [],
      observer (columns) {
        // props初始化的时候格式化formatColumns交给value的observer来做
        this.setData({ formatColumns: this.formatArray(columns) })
        /**
         * 每次改变都要重置选中项
         * 1.选中每列的第一个
         * 2.原来的value再选一次
         */
        // this.data.formatColumns.forEach((no, col) => this.selectWithIndex(col, 0))
        this.selectWithValue(this.data.value)
      }
    },
    ...selfProps,
    // 多级联动
    columnChange: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of columnChange must be Function')
        }
      }
    },
    // 格式化之后，每列选中的下标集合
    selectedIndex: {
      type: Array,
      value: [],
      observer (val) {
        if (isEqual(val, this.preSelectedIndex)) return
        if (!isEqual(this.getValues(), this.data.value)) {
          this.handleChange(this, 0)
        }
      }
    }
  },

  data: {
    // 格式化之后，用于render 列表的数据
    formatColumns: [],
    itemHeight: 35
  },

  methods: {
    /**
     * @description 根据传入的value，寻找对应的索引，并传递给原生选择器。
     * 会保证formatColumns先设置，之后会修改selectedIndex。
     * @param {String|Number|Boolean|Array<String|Number|Boolean|Array<any>>}value
     */
    selectWithValue (value) {
      if (this.data.columns.length === 0) return

      // 使其默认选中首项
      if (value === '' || value === null || value === undefined || (getType(value) === 'array' && value.length === 0)) {
        value = this.data.formatColumns.map(col => {
          return col[0][this.data.valueKey]
        })
      }
      const valueType = getType(value)
      const type = ['string', 'number', 'boolean', 'array']
      if (type.indexOf(valueType) === -1) throw Error(`value must be one of ${type.toString()}`)
      // 在props初始化的时候有可能会调用此函数，此时需要保证formatColumns已经被设置，关于此问题更多详情参考/ISSUE.md。
      if (this.data.formatColumns.length === 0) {
        this.setData({
          formatColumns: this.formatArray(this.data.columns)
        })
      }
      /**
       * 1.单key转为Array<key>
       * 2.根据formatColumns的长度截取Array<String>，保证下面的遍历不溢出
       * 3.根据每列的key值找到选项中value为此key的下标并记录
       */
      value = value instanceof Array ? value : [value]
      value = value.slice(0, this.data.formatColumns.length)

      if (value.length === 0) {
        value = this.data.formatColumns.map(() => 0)
      }

      let selectedIndex = this.data.selectedIndex
      value.forEach((target, col) => {
        let row = this.data.formatColumns[col].findIndex(row => {
          return row[this.data.valueKey].toString() === target.toString()
        })
        row = row === -1 ? 0 : row
        selectedIndex = this.selectWithIndex(col, row)
      })
      /** 根据formatColumns的长度去除selectWithIndex无用的部分。
       * 始终保持value、selectWithIndex、formatColumns长度一致
       */
      this.setData({
        selectedIndex: selectedIndex.slice(0, value.length)
      })
    },

    /**
     * @description 根据传入的col,row，传递给原生选择器
     * @param {Number} columnIndex 要操作的列索引
     * @param {Number} rowIndex 要选中的行索引
     * @return {Boolean} 是否设置成功
     */
    selectWithIndex (columnIndex, rowIndex) {
      const { selectedIndex, formatColumns } = this.data
      const col = formatColumns[columnIndex]
      if (!col || !col[rowIndex]) {
        throw Error(`The value to select with Col:${columnIndex} Row:${rowIndex} is correct`)
      }
      // 被禁用的无法选中，选中距离它最近的未被禁用的
      if (col[rowIndex].disabled) {
        // 寻找值为0或最最近的未被禁用的节点的索引
        const prev = col.slice(0, rowIndex).reverse().findIndex(s => !s.disabled)
        const next = col.slice(rowIndex + 1).findIndex(s => !s.disabled)
        if (prev !== -1) {
          selectedIndex[columnIndex] = rowIndex - 1 - prev
        } else if (next !== -1) {
          selectedIndex[columnIndex] = rowIndex + 1 + next
        } else if (selectedIndex[columnIndex] === undefined) {
          selectedIndex[columnIndex] = 0
        }
      } else {
        selectedIndex[columnIndex] = rowIndex
      }
      return selectedIndex
    },

    /**
     * @description 为props的value为array类型时提供format
     * @param {Array<String|Number|Boolean|Object>} array
     */
    formatArray (array) {
      array = array instanceof Array ? array : [array]
      // 检测第一层的type
      const firstLevelTypeList = new Set(array.map(getType))
      /**
       * 存在三种类型的合法数据
       * 1.数组是一维元素，所有元素都是原始值
       * 2.数组是一维元素，所有元素都是object
       * 3.数组是二维元素，二维元素可以是任意内容
       */
      if (
        firstLevelTypeList.size !== 1 &&
        firstLevelTypeList.has('object')
      ) {
        // 原始值和引用类型不用混用
        throw Error('The columns are correct')
      }
      /**
       * 数组的所有一维子元素都不是array，说明是它是一个一维数组
       * 所以需要把一维的转成二维，这样方便统一处理
       */
      if (!(array[0] instanceof Array)) {
        array = [array]
      }
      // 经过上述处理，都已经变成了二维数组，再把每一项二维元素包装成object
      return array.map(col => col.map(row => {
        const isObj = getType(row)
        const { valueKey, labelKey } = this.data
        /* 针对原始值，包装成{valueKey,labelKey} */
        if (isObj !== 'object') {
          return {
            [valueKey]: row,
            [labelKey]: row
          }
        }
        /**
         * 针对已经是object的，修补成{valueKey,labelKey}
         * 如果没有labelKey，用valueKey代替
         * 如果没有valueKey，用labelKey代替
         * valueKey,labelKey都没有，直接抛错
         */
        if (
          !row.hasOwnProperty(valueKey) &&
          !row.hasOwnProperty(labelKey)
        ) {
          throw Error('Can\'t find valueKey and labelKey in columns')
        }
        if (!row.hasOwnProperty(labelKey)) {
          row[labelKey] = row[valueKey]
        }
        if (!row.hasOwnProperty(valueKey)) {
          row[valueKey] = row[labelKey]
        }
        return row
      }))
    },

    /**
     * @description 滚动选中时更新选中的索引、触发change事件
     * @return {Number|Array<Number>}选中项的下标或者集合
     * @return {Object}实例本身
     */
    onChange ({ detail: { value } }) {
      const index = this.getChangeDiff(value)
      const picker = this
      // 执行多级联动
      if (this.data.columnChange) {
        // columnsChange 可能有异步操作，需要添加 resolve 进行回调通知，形参小于4个则为同步
        if (this.data.columnChange.length < 4) {
          this.data.columnChange(picker, this.getSelects(), index)
          this.handleChange(picker, index)
        } else {
          this.data.columnChange(picker, this.getSelects(), index, () => {
            // 如果selectedIndex只有一列，返回此项；如果是多项，返回所有选中项。
            this.handleChange(picker, index)
          })
        }
      } else {
        // 如果selectedIndex只有一列，返回此项；如果是多项，返回所有选中项。
        this.handleChange(picker, index)
      }
    },

    getChangeIndex (now, origin) {
      if (!now || !origin) return
      const index = now.findIndex((row, index) => row !== origin[index])
      return index
    },

    getChangeDiff (value) {
      // 小程序bug 1. 修改原生pickerView的columns，滑动触发change事件回传的数组长度为未改变columns之前的,并不会缩减
      // 小程序bug 2. 当点击速度过快时，会出现负数列项的操作，需要将value进行限制
      value = value.slice(0, this.data.formatColumns.length)

      // 保留选中前的
      const origin = this.data.selectedIndex.slice(0)
      // 存储赋值旧值，便于外部比较
      let selectedIndex = this.data.selectedIndex
      // 开始应用最新的值
      value.forEach((row, col) => {
        row = range(row, 0, this.data.formatColumns[col].length - 1)
        if (row === origin[col]) return
        selectedIndex = this.selectWithIndex(col, row)
      })

      this.setData({
        selectedIndex
      })
      this.preSelectedIndex = origin

      // diff出变化的列
      // const diffCol = selectedIndex.findIndex((row, index) => row !== origin[index])
      const diffCol = this.getChangeIndex(selectedIndex, origin)
      if (diffCol === -1) return

      // 获取变化的的行
      const diffRow = selectedIndex[diffCol]

      // 如果selectedIndex只有一列，返回选中项的索引；如果是多项，返回选中项所在的列。
      return selectedIndex.length === 1 ? diffRow : diffCol
    },

    handleChange (picker, index) {
      const value = this.getValues()

      // 避免多次触发change
      if (isEqual(value, this.data.value)) return

      this.setData({
        value
      })
      // 延迟一下，避免组件刚渲染时调用者的事件未初始化好
      setTimeout(() => {
        this.$emit('change', {
          picker,
          value,
          index
        })
      }, 0)
    },

    /**
     * @description 获取所有列选中项，返回值为一个数组
     */
    getSelects () {
      const { selectedIndex, formatColumns } = this.data
      const selects = selectedIndex.map((row, col) => formatColumns[col][row])
      // 单列选择器，则返回单项
      if (selects.length === 1) {
        return selects[0]
      }

      return selects
    },

    /**
     * @description 获取所有列选中项的value，返回值为一个数组
     */
    getValues () {
      const { selectedIndex, formatColumns, valueKey } = this.data
      const values = selectedIndex.map((row, col) => formatColumns[col][row][valueKey])

      if (values.length === 1) {
        return values[0]
      }

      return values
    },

    /**
     * @description 获取所有列选中项的label，返回值为一个数组
     * @return {Array} 每列选中的label
     */
    getLabels () {
      const { selectedIndex, formatColumns, labelKey } = this.data
      return selectedIndex.map((row, col) => formatColumns[col][row][labelKey])
    },

    /**
     * @description 获取某一列的选中项下标
     * @param {Number} columnIndex 列的下标
     * @returns {Number} 下标
     */
    getColumnIndex (columnIndex) {
      return this.data.selectedIndex[columnIndex]
    },

    /**
     * @description 获取某一列的选项
     * @param {Number} columnIndex 列的下标
     * @returns {Array<{valueKey,labelKey}>} 当前列的集合
     */
    getColumnData (columnIndex) {
      return this.data.formatColumns[columnIndex]
    },

    /**
     * @description 获取某一列的选项
     * @param {Number} columnIndex 列的下标
     * @param {Array<原始值|Object>} 一维数组，元素仅限对象和原始值
     * @param {Number} jumpTo 更换列数据后停留的地点
     */
    setColumnData (columnIndex, data, jumpTo = 0) {
      /**
       * @注意 以下为pickerView的坑
       * 如果某一列(以下简称列)中有10个选项，而且当前选中第10项。
       * 如果此时把此列的选项修改后还剩下3个，那么选中项会由第10项滑落到第3项，同时出发change事件
       */
      // 为了防止上述情况发生，修改数据前先将当前列选中0
      const selectedIndex = this.selectWithIndex(columnIndex, jumpTo)
      this.setData({
        selectedIndex
      })
      // 经过formatArray处理的数据会变成二维数组，一定要拍成一维的。
      // ps 小程序基础库v2.9.3才可以用flat
      const formatColumns = this.data.formatColumns
      formatColumns[columnIndex] = this.formatArray(data).reduce((acc, val) => acc.concat(val), [])
      this.setData({
        formatColumns: formatColumns
      })
    },

    getColumnsData () {
      return this.data.formatColumns.slice(0)
    },

    onPickStart () {
      this.$emit('pickstart')
    },

    onPickEnd () {
      this.$emit('pickend')
    }
  }
})