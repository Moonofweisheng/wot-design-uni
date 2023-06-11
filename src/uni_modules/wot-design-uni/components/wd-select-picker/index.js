import VueComponent from '../common/component'
import { getType } from '../common/util'
import cell from '../mixins/cell'
import cellProps from './cellProps'
import selectProps from './selectProps'

VueComponent({
  externalClasses: [
    'custom-content-class',
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
    selectList: '',
    showValue: '',
    isConfirm: false,
    lastSelectList: [],
    filterVal: '',
    filterColumns: []
  },

  props: {
    value: {
      type: null,
      observer (val) {
        if (val === this.data.selectList) return
        this.setData({
          selectList: this.valueFormat(val),
          lastSelectList: this.valueFormat(val)
        })
        this.setShowValue(this.valueFormat(val))
      }
    },
    ...cellProps,
    ...selectProps,
    columns: {
      type: Array,
      value: [],
      observer (val) {
        if (this.data.filterable && this.data.filterVal) {
          this.formatFilterColumns(val, this.data.filterVal)
        } else {
          this.setData({
            filterColumns: val
          })
        }
      }
    },
    // type: checkbox/radio
    type: {
      type: String,
      value: 'checkbox'
    },
    valueKey: {
      type: String,
      value: 'value'
    },
    labelKey: {
      type: String,
      value: 'label'
    },
    confirmButtonText: {
      type: String,
      value: '确定'
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
    zIndex: {
      type: Number,
      value: 15
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    filterable: Boolean,
    filterPlaceholder: String,
    ellipsis: Boolean
  },

  created () {
    this.setData({
      selectList: this.valueFormat(this.data.value),
      filterColumns: this.data.columns
    })
  },

  methods: {
    getSelectedItem (value) {
      const { valueKey, labelKey, columns } = this.data

      const selecteds = columns.filter(item => {
        return item[valueKey] === value
      })

      if (selecteds.length > 0) {
        return selecteds[0]
      }

      return {
        [valueKey]: value,
        [labelKey]: ''
      }
    },

    valueFormat (value) {
      return this.data.type === 'checkbox' ? Array.prototype.slice.call(value) : value
    },

    handleChange (event) {
      this.setData({
        selectList: event.detail.value
      })
      this.$emit('change', event.detail)
    },

    close () {
      this.setData({
        pickerShow: false
      })
      // 未确定选项时，数据还原复位
      if (!this.data.isConfirm) {
        this.setData({
          selectList: this.valueFormat(this.data.lastSelectList)
        })
      }
      this.$emit('cancel')
    },

    open () {
      if (this.data.disabled || this.data.readonly) return
      this.setData({
        selectList: this.valueFormat(this.data.value),
        pickerShow: true,
        isConfirm: false
      })
    },

    onConfirm () {
      if (this.data.loading) {
        this.setData({
          pickerShow: false
        })
        this.$emit('confirm')
        return
      }
      if (this.data.beforeConfirm) {
        this.data.beforeConfirm(this.data.selectList, isPass => {
          isPass && this.handleConfirm()
        })
      } else {
        this.handleConfirm()
      }
    },

    handleConfirm () {
      this.setData({
        isConfirm: true,
        pickerShow: false,
        lastSelectList: this.valueFormat(this.data.selectList)
      })
      let selectedItems
      if (this.data.type === 'checkbox') {
        selectedItems = this.data.lastSelectList.map(item => {
          return this.getSelectedItem(item)
        })
      } else {
        selectedItems = this.getSelectedItem(this.data.lastSelectList)
      }
      this.$emit('confirm', {
        value: this.data.lastSelectList,
        selectedItems
      })
      this.setShowValue(this.data.lastSelectList)
    },

    setShowValue (value) {
      let showValue = ''

      if (this.data.displayFormat) {
        showValue = this.data.displayFormat(value, this.data.columns)
      } else {
        const { type, labelKey } = this.data
        if (type === 'checkbox') {
          const selectedItems = value.map(item => {
            return this.getSelectedItem(item)
          })
          showValue = selectedItems.map(item => {
            return item[labelKey]
          }).join(', ')
        } else if (type === 'radio') {
          const selectedItem = this.getSelectedItem(value)
          showValue = selectedItem[labelKey]
        } else {
          showValue = value
        }
      }
      this.setData({
        showValue
      })
    },

    getFilterText (label, filterVal) {
      const reg = new RegExp(`(${filterVal})`, 'g')

      return label.split(reg).map((text) => {
        return {
          type: text === filterVal ? 'active' : 'normal',
          label: text
        }
      })
    },

    handleFilterChange ({ detail: { value } }) {
      if (value === '') {
        this.setData({
          filterColumns: [],
          filterVal: value
        }, () => {
          this.setData({
            filterColumns: this.data.columns
          })
        })
      } else {
        this.setData({
          filterVal: value
        })
        this.formatFilterColumns(this.data.columns, value)
      }
    },

    formatFilterColumns (columns, filterVal) {
      const filterColumns = columns.filter((item) => {
        return item[this.data.labelKey].indexOf(filterVal) > -1
      })

      const formatFilterColumns = filterColumns.map((item) => {
        return {
          ...item,
          [this.data.labelKey]: this.getFilterText(item[this.data.labelKey], filterVal)
        }
      })

      this.setData({
        filterColumns: []
      }, () => {
        this.setData({
          filterColumns: formatFilterColumns
        })
      })
    }
  }
})