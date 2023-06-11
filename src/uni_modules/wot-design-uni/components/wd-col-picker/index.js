import VueComponent from '../common/component'
import { getType, debounce } from '../common/util'
import cell from '../mixins/cell'

const $container = '.wd-col-picker__selected-container'
const $item = '.wd-col-picker__selected-item'

VueComponent({
  externalClasses: [
    'custom-view-class',
    'custom-label-class',
    'custom-value-class'
  ],
  behaviors: [cell, 'jd://form-field'],
  relations: {
    '../cellGroup/index': {
      type: 'ancestor',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  data: {
    pickerShow: false,
    currentCol: 0,
    selectList: [],
    pickerColSelected: [],
    selectShowList: [],
    loading: false,
    showValue: '',
    isChange: false,
    lastSelectList: [],
    lastPickerColSelected: [],
    lineStyle: {},
    scrollLeft: 0
  },
  props: {
    value: {
      type: Array,
      observer (val) {
        if (val === this.data.pickerColSelected) return

        this.setData({
          pickerColSelected: val,
          selectShowList: val.map((item, colIndex) => {
            return this.getSelectedItem(item, colIndex, this.data.selectList)[this.data.labelKey]
          })
        })
        this.setShowValue(val)

        this.handleAutoComplete()
      }
    },
    columns: {
      type: Array,
      observer (val, oldVal) {
        if (val.length && !(val[0] instanceof Array)) {
          console.error('[wot design] error(wd-col-picker): the columns props of wd-col-picker should be a two-dimensional array')
          return
        }

        if (val.length === 0 && !oldVal) return

        const newSelectedList = val.slice(0)
        this.setData({
          selectList: newSelectedList,
          selectShowList: this.data.pickerColSelected.map((item, colIndex) => {
            return this.getSelectedItem(item, colIndex, newSelectedList)[this.data.labelKey]
          }),
          lastSelectList: newSelectedList
        })

        if (newSelectedList.length > 0) {
          this.setData({
            currentCol: newSelectedList.length - 1
          })
          this.setShowValue(this.data.value)
        }
      }
    },
    label: String,
    labelWidth: String,
    useLabelSlot: Boolean,
    useDefaultSlot: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    title: String,
    columnChange: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of columnChange must be Function')
        }
      }
    },
    // 外部展示格式化函数
    displayFormat: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function')
        }
      }
    },
    beforeConfirm: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of beforeConfirm must be Function')
        }
      }
    },
    alignRight: Boolean,
    error: Boolean,
    required: Boolean,
    size: String,
    valueKey: {
      type: String,
      value: 'value'
    },
    labelKey: {
      type: String,
      value: 'label'
    },
    tipKey: {
      type: String,
      value: 'tip'
    },
    loadingColor: {
      type: String,
      value: '#4D80F0'
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    autoComplete: Boolean,
    zIndex: {
      type: Number,
      value: 15
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    ellipsis: Boolean
  },
  methods: {
    // 对外暴露方法，打开弹框
    open () {
      this.showPicker()
    },
    // 对外暴露方法，关闭弹框
    close () {
      this.handlePickerClose()
    },
    handlePickerClose () {
      this.setData({
        pickerShow: false
      })
      const { isChange, lastSelectList, lastPickerColSelected } = this.data
      // 如果目前用户正在选择，需要在popup关闭时将数据重置回上次数据，popup 关闭时间 250
      if (isChange) {
        setTimeout(() => {
          this.setData({
            selectList: lastSelectList.slice(0),
            pickerColSelected: lastPickerColSelected.slice(0),
            selectShowList: lastPickerColSelected.map((item, colIndex) => {
              return this.getSelectedItem(item, colIndex, lastSelectList)[this.data.labelKey]
            }),
            currentCol: lastSelectList.length - 1,
            isChange: false
          })
        }, 250)
      }
      this.$emit('close')
    },
    showPicker () {
      const { disabled, readonly } = this.data

      if (disabled || readonly) return

      this.setData({
        pickerShow: true,
        lastPickerColSelected: this.data.pickerColSelected.slice(0),
        lastSelectList: this.data.selectList.slice(0)
      }, () => {
        setTimeout(() => {
          this.updateLineAndScroll()
        }, 30)
      })
    },
    getSelectedItem (value, colIndex, selectList) {
      const { valueKey, labelKey } = this.data

      if (selectList[colIndex]) {
        const selecteds = selectList[colIndex].filter(item => {
          return item[valueKey] === value
        })

        if (selecteds.length > 0) {
          return selecteds[0]
        }
      }

      return {
        [valueKey]: value,
        [labelKey]: ''
      }
    },
    chooseItem (event) {
      const { colIndex, index } = event.currentTarget.dataset
      const item = this.data.selectList[colIndex][index]
      if (item.disabled) return

      const { pickerColSelected, valueKey, selectList } = this.data

      const newPickerColSelected = pickerColSelected.slice(0, colIndex)
      newPickerColSelected.push(item[valueKey])
      this.setData({
        isChange: true,
        pickerColSelected: newPickerColSelected,
        selectList: selectList.slice(0, colIndex + 1),
        selectShowList: newPickerColSelected.map((item, colIndex) => {
          return this.getSelectedItem(item, colIndex, selectList)[this.data.labelKey]
        })
      })
      this.handleColChange(colIndex, item, index)
    },
    handleColChange (colIndex, item, index, callback) {
      this.setData({
        loading: true
      })
      const { columnChange, beforeConfirm } = this.data
      columnChange({
        selectedItem: item,
        index: colIndex,
        rowIndex: index,
        resolve: (nextColumn) => {
          if (!(nextColumn instanceof Array)) {
            console.error('[wot design] error(wd-col-picker): the data of each column of wd-col-picker should be an array')
            return
          }

          const newSelectList = this.data.selectList.slice(0)
          newSelectList[colIndex + 1] = nextColumn
          this.setData({
            selectList: newSelectList,
            loading: false,
            currentCol: colIndex + 1

          }, () => {
            this.updateLineAndScroll(true)
            if (typeof callback === 'function') {
              this.isCompleting = false
              this.setData({
                selectShowList: this.data.pickerColSelected.map((item, colIndex) => {
                  return this.getSelectedItem(item, colIndex, this.data.selectList)[this.data.labelKey]
                })
              })
              callback()
            }
          })
        },
        finish: (isOk) => {
        // 每设置展示数据回显
          if (typeof callback === 'function') {
            this.setData({
              loading: false
            })
            this.isCompleting = false
            return
          }
          if ((getType(isOk) === 'boolean' && !isOk)) {
            this.setData({
              loading: false
            })
            return
          }

          if (beforeConfirm) {
            beforeConfirm(this.data.pickerColSelected, this.data.pickerColSelected.map((item, colIndex) => {
              return this.getSelectedItem(item, colIndex, this.data.selectList)
            }), (isPass) => {
              if (isPass) {
                this.onConfirm()
              } else {
                this.setData({
                  loading: false
                })
              }
            })
          } else {
            this.onConfirm()
          }
        }
      })
    },
    onConfirm () {
      this.setData({
        isChange: false,
        loading: false,
        pickerShow: false,
        value: this.data.pickerColSelected
      })
      this.setShowValue(this.data.pickerColSelected)
      this.$emit('confirm', {
        value: this.data.pickerColSelected,
        selectedItems: this.data.pickerColSelected.map((item, colIndex) => {
          return this.getSelectedItem(item, colIndex, this.data.selectList)
        })
      })
    },
    handleColClick ({ target: { dataset: { index } } }) {
      this.setData({
        isChange: true,
        currentCol: index
      }, () => {
        this.updateLineAndScroll(true)
      })
    },
    /**
     * @description 更新navBar underline的偏移量
     * @param {Boolean} animation 是否伴随动画
     */
    setLineStyle (animation = true) {
      if (!this.inited) return
      const { currentCol } = this.data
      this.getRect($item, true).then((rects) => {
        const rect = rects[currentCol]
        // const width = lineWidth || (slidableNum < items.length ? rect.width : (rect.width - 14))
        const width = 16
        let left = rects.slice(0, currentCol).reduce((prev, curr) => prev + curr.width, 0)
        left += (rect.width - width) / 2
        const transition = animation
          ? 'transition: width 300ms ease, transform 300ms ease;'
          : ''

        const lineStyle = `
          transform: translateX(${left}px);
          ${transition}
        `
        // 防止重复绘制
        this.data.lineStyle !== lineStyle && this.setData({ lineStyle })
      })
    },
    /**
     * @description scroll-view滑动到active的tab_nav
     */
    lineScrollIntoView () {
      if (!this.inited) return
      const { currentCol } = this.data
      Promise.all([
        this.getRect($item, true),
        this.getRect($container)
      ]).then(([navItemsRects, navRect]) => {
        if (navItemsRects.length === 0) return
        // 选中元素
        const selectItem = navItemsRects[currentCol]
        // 选中元素之前的节点的宽度总和
        const offsetLeft = navItemsRects.slice(0, currentCol).reduce((prev, curr) => prev + curr.width, 0)
        // scroll-view滑动到selectItem的偏移量
        const scrollLeft = offsetLeft - (navRect.width - selectItem.width) / 2
        this.setData({ scrollLeft })
      })
    },
    setShowValue (value) {
      const selectedItems = value.map((item, colIndex) => {
        return this.getSelectedItem(item, colIndex, this.data.selectList)
      })

      if (this.data.displayFormat) {
        this.setData({
          showValue: this.data.displayFormat(selectedItems)
        })
      } else {
        this.setData({
          showValue: selectedItems.map(item => {
            return item[this.data.labelKey]
          }).join('')
        })
      }
    },
    // 递归列数据补齐
    diffColumns (colIndex) {
      // colIndex 为 -1 时，item 为空对象，>=0 时则具有 value 属性
      const item = colIndex === -1 ? {} : { [this.data.valueKey]: this.data.value[colIndex] }
      this.handleColChange(colIndex, item, -1, () => {
        // 如果 columns 长度还小于 value 长度，colIndex + 1，继续递归补齐
        if (this.data.selectList.length < this.data.value.length) {
          this.diffColumns(colIndex + 1)
        } else {
          this.setShowValue(this.data.pickerColSelected)
        }
      })
    },
    handleAutoComplete () {
      if (this.data.autoComplete) {
        // 如果 columns 数组长度为空，或者长度小于 value 的长度，自动触发 columnChange 来补齐数据
        if (this.data.selectList.length < this.data.value.length || this.data.selectList.length === 0) {
          // isCompleting 是否在自动补全，锁操作
          if (!this.isCompleting) {
            // 如果 columns 长度为空，则传入的 colIndex 为 -1
            const colIndex = this.data.selectList.length === 0 ? -1 : (this.data.selectList.length - 1)
            this.diffColumns(colIndex)
          }
          this.isCompleting = true
        }
      }
    }
  },
  beforeCreate () {
    this.updateLineAndScroll = debounce(function (animation = true) {
      this.setLineStyle(animation)
      this.lineScrollIntoView()
    }, 50)
  },
  mounted () {
    this.inited = true
  }
})