<template>
  <jds src="../calendarView/utils.jds" module="utils" />

  <view class="wd-calendar {{ border ? 'is-border' : '' }} custom-class">
    <view class="wd-calendar__field" bind:tap="open">
      <slot v-if="{{ useDefaultSlot }}"></slot>
      <view
        v-else
        class="wd-calendar__cell {{ disabled && 'is-disabled' }} {{ readonly && 'is-readonly' }} {{ alignRight && 'is-align-right' }} {{ error && 'is-error' }} {{ size && ('is-' + size) }} {{ center && 'is-center' }}"
      >
        <view
          v-if="{{ label || useLabelSlot }}"
          class="wd-calendar__label {{ required && 'is-required' }} custom-label-class"
          style="{{ labelWidth ? 'min-width:' + labelWidth + ';max-width:' + labelWidth + ';' : '' }}"
        >
          <block v-if="{{ label }}">{{ label }}</block>
          <slot v-else name="label"></slot>
        </view>
        <view class="wd-calendar__value {{ ellipsis && 'is-ellipsis' }} custom-value-class {{ showValue ? '' : 'wd-calendar__value--placeholder'  }}">
          {{ showValue || placeholder || '请选择' }}
        </view>
        <wd-icon v-if="{{!disabled && !readonly}}" custom-class="wd-calendar__arrow" name="arrow-right" />
      </view>
    </view>
    <wd-action-sheet
      show="{{ pickerShow }}"
      duration="{{ 250 }}"
      close-on-click-modal="{{ closeOnClickModal }}"
      safe-area-inset-bottom="{{ safeAreaInsetBottom }}"
      z-index="{{ zIndex }}"
      bind:close="close"
    >
      <view class="wd-calendar__header">
        <view v-if="{{ !showTypeSwitch && shortcuts.length === 0 }}" class="wd-calendar__title">{{ title || '选择日期' }}</view>
        <view v-if="{{ showTypeSwitch }}" class="wd-calendar__tabs">
          <wd-tabs id="tabs" value="{{ currentTab }}" bind:change="handleTypeChange">
            <wd-tab title="日" />
            <wd-tab title="周" />
            <wd-tab title="月" />
          </wd-tabs>
        </view>
        <view v-if="{{ shortcuts.length > 0 }}" class="wd-calendar__shortcuts">
          <wd-tag
            jd:for="{{ shortcuts }}"
            jd:key="index"
            custom-class="wd-calendar__tag"
            type="primary"
            plain
            round
            data-index="{{ index }}"
            bind:click="handleShortcutClick"
          >
            {{ item.text }}
          </wd-tag>
        </view>
        <wd-icon custom-class="wd-calendar__close" name="add" bind:tap="close" />
      </view>
      <view
        v-if="{{ inited }}"
        class="wd-calendar__view {{ currentType.indexOf('range') > -1 && 'is-range' }} {{ showConfirm && 'is-show-confirm' }}"
      >
        <view v-if="{{ utils.isRange(type) }}" class="wd-calendar__range-label {{ type === 'monthrange' && 'is-monthrange' }}">
          <view class="wd-calendar__range-label-item {{ (!calendarValue || !calendarValue[0]) && 'is-placeholder' }}" style="text-align: right">
            {{ rangeLabel[0] }}
          </view>
          <view class="wd-calendar__range-sperator">/</view>
          <view class="wd-calendar__range-label-item {{ (!calendarValue || !calendarValue[1]) && 'is-placeholder' }}">
            {{ rangeLabel[1] }}
          </view>
        </view>
        <wd-calendar-view
          id="calendarView"
          value="{{ calendarValue }}"
          type="{{ currentType }}"
          min-date="{{ minDate }}"
          max-date="{{ maxDate }}"
          first-day-of-week="{{ firstDayOfWeek }}"
          formatter="{{ formatter }}"
          panel-height="{{ panelHeight }}"
          max-range="{{ maxRange }}"
          range-prompt="{{ rangePrompt }}"
          allow-same-day="{{ allowSameDay }}"
          default-time="{{ defaultTime }}"
          time-filter="{{ timeFilter }}"
          hide-second="{{ hideSecond }}"
          show-panel-title="{{ !utils.isRange(type) }}"
          bind:change="handleChange"
        />
      </view>
      <view v-if="{{ showConfirm }}" class="wd-calendar__confirm">
        <wd-button block disabled="{{ confirmBtnDisabled }}" bind:click="handleConfirm">{{ confirmText || '确定' }}</wd-button>
      </view>
    </wd-action-sheet>
  </view>
</template>

<script>
const current = new Date()
const currentYear = current.getFullYear()
const currentMonth = current.getMonth()
const currentDay = current.getDate()

const defaultDisplayFormat = (value, type) => {
  switch (type) {
    case 'date':
      return dayjs(value).format('YYYY-MM-DD')
    case 'dates':
      return value
        .map((item) => {
          return dayjs(item).format('YYYY-MM-DD')
        })
        .join(', ')
    case 'daterange':
      return `${value[0] ? dayjs(value[0]).format('YYYY-MM-DD') : '开始时间'} 至 ${value[1] ? dayjs(value[1]).format('YYYY-MM-DD') : '结束时间'}`
    case 'datetime':
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    case 'datetimerange':
      return `${value[0] ? dayjs(value[0]).format('YY年MM月DD日 HH:mm:ss') : '开始时间'} 至\n${
        value[1] ? dayjs(value[1]).format('YY年MM月DD日 HH:mm:ss') : '结束时间'
      }`
    case 'week': {
      const year = new Date(value).getFullYear()
      const week = getWeekNumber(value)
      return `${year} 第 ${padZero(week)} 周`
    }
    case 'weekrange': {
      const year1 = new Date(value[0]).getFullYear()
      const week1 = getWeekNumber(value[0])
      const year2 = new Date(value[1]).getFullYear()
      const week2 = getWeekNumber(value[1])
      return `${value[0] ? `${year1} 第 ${padZero(week1)} 周` : '开始周'} - ${value[1] ? `${year2} 第 ${padZero(week2)} 周` : '结束周'}`
    }
    case 'month':
      return dayjs(value).format('YYYY / MM')
    case 'monthrange':
      return `${value[0] ? dayjs(value[0]).format('YYYY / MM') : '开始月'} 至 ${value[1] ? dayjs(value[1]).format('YYYY / MM') : '结束月'}`
  }
}

const formatRange = (value, rangeType, type) => {
  switch (type) {
    case 'daterange':
      if (!value) {
        return rangeType === 'end' ? '结束时间' : '开始时间'
      }
      return dayjs(value).format('YYYY年MM月DD日')
    case 'datetimerange':
      if (!value) {
        return rangeType === 'end' ? '结束时间' : '开始时间'
      }
      return dayjs(value).format('YY年MM月DD日 HH:mm:ss')
    case 'weekrange': {
      if (!value) {
        return rangeType === 'end' ? '结束周' : '开始周'
      }
      const date = new Date(value)
      const year = date.getFullYear()
      const week = getWeekNumber(value)
      return year + '年第' + week + '周'
    }
    case 'monthrange':
      if (!value) {
        return rangeType === 'end' ? '结束月' : '开始月'
      }
      return dayjs(value).format('YYYY年MM月')
  }
}
export default {
  props: {
    value: {
      type: [null, Number, Array],
      observer(val, oldVal) {
        if (isEqual(val, oldVal)) return

        this.setData(
          {
            calendarValue: val,
            confirmBtnDisabled: this.getConfirmBtnStatus(val)
          },
          () => {
            this.scrollIntoView()
          }
        )

        this.setShowValue()

        if (this.data.type.indexOf('range') > -1) {
          this.setInnerLabel()
        }
      }
    },
    type: {
      type: String,
      value: 'date',
      observer(val) {
        if (this.data.showTypeSwitch) {
          const tabs = ['date', 'week', 'month']
          const rangeTabs = ['daterange', 'weekrange', 'monthrange']

          const index = val.indexOf('range') > -1 ? rangeTabs.indexOf(val) || 0 : tabs.indexOf(val)
          this.setData({
            currentTab: index
          })
        }

        this.setData({
          panelHeight: this.data.showConfirm ? 338 : 400,
          currentType: val
        })

        if (this.data.type.indexOf('range') > -1) {
          this.setInnerLabel()
        }
      }
    },
    minDate: {
      type: Number,
      value: new Date(currentYear, currentMonth - 6, currentDay).getTime()
    },
    maxDate: {
      type: Number,
      value: new Date(currentYear, currentMonth + 6, currentDay, 23, 59, 59).getTime()
    },
    firstDayOfWeek: {
      type: Number,
      value: 0
    },
    formatter: null,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    defaultTime: {
      type: [String, Array],
      observer(val) {
        this.setData({
          formatDefauleTime: getDefaultTime(val)
        })
      }
    },
    timeFilter: null,
    hideSecond: Boolean,
    label: String,
    labelWidth: String,
    useLabelSlot: Boolean,
    useDefaultSlot: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    title: String,
    alignRight: Boolean,
    error: Boolean,
    required: Boolean,
    size: String,
    center: Boolean,
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 15
    },
    showConfirm: {
      type: Boolean,
      value: true,
      observer(val) {
        this.setData({
          panelHeight: val ? 338 : 400
        })
      }
    },
    confirmText: String,
    displayFormat: null,
    innerDisplayFormat: null,
    ellipsis: Boolean,
    showTypeSwitch: Boolean,
    shortcuts: Array,
    onShortcutsClick: null,
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    beforeConfirm: null
  },
  data: function () {
    return {
      pickerShow: false,
      calendarValue: '',
      lastCalendarValue: '',
      panelHeight: 338,
      confirmBtnDisabled: true,
      showValue: '',
      currentTab: 0,
      lastTab: 0,
      currentType: 'date',
      lastCurrentType: 'date',
      inited: false,
      rangeLabel: []
    }
  },
  methods: {
    scrollIntoView() {
      const calendarView = this.selectComponent('#calendarView')
      calendarView && calendarView.scrollIntoView()
    },
    // 对外暴露方法
    open() {
      const { disabled, readonly } = this.data

      if (disabled || readonly) return

      this.setData(
        {
          inited: true,
          pickerShow: true,
          lastCalendarValue: this.data.calendarValue,
          lastTab: this.data.currentTab,
          lastCurrentType: this.data.currentType
        },
        () => {
          setTimeout(() => {
            this.scrollIntoView()

            if (this.data.showTypeSwitch) {
              const tab = this.selectComponent('#tabs')
              tab.scrollIntoView()
              tab.updateLineStyle(false)
            }
          }, 250)
        }
      )
    },
    // 对外暴露方法
    close() {
      this.setData({
        pickerShow: false
      })
      setTimeout(() => {
        const confirmBtnDisabled = this.getConfirmBtnStatus(this.data.lastCalendarValue)

        this.setData({
          calendarValue: this.data.lastCalendarValue,
          currentTab: this.data.lastTab,
          currentType: this.data.lastCurrentType,
          confirmBtnDisabled
        })
      }, 250)
      this.$emit('cancel')
    },
    handleTypeChange({ detail: { index } }) {
      const tabs = ['date', 'week', 'month']
      const rangeTabs = ['daterange', 'weekrange', 'monthrange']
      const type = this.data.type.indexOf('range') > -1 ? rangeTabs[index] : tabs[index]

      this.setData({
        currentTab: index,
        currentType: type
      })
    },
    getConfirmBtnStatus(value) {
      let confirmBtnDisabled = false
      // 范围选择未选择满，或者多日期选择未选择日期，按钮置灰不可点击
      if (
        (this.data.type.indexOf('range') > -1 && (!value[0] || !value[1] || !value)) ||
        (this.data.type === 'dates' && (value.length === 0 || !value)) ||
        !value
      ) {
        confirmBtnDisabled = true
      }

      return confirmBtnDisabled
    },
    handleChange({ detail: { value } }) {
      const confirmBtnDisabled = this.getConfirmBtnStatus(value)
      this.setData({
        calendarValue: value,
        confirmBtnDisabled
      })

      this.$emit('change', {
        value
      })

      if (this.data.type.indexOf('range') > -1) {
        this.setInnerLabel()
      }

      if (!this.data.showConfirm && !confirmBtnDisabled) {
        this.handleConfirm()
      }
    },
    handleConfirm() {
      if (this.data.beforeConfirm) {
        this.data.beforeConfirm({
          value: this.data.calendarValue,
          resolve: (isPass) => {
            isPass && this.onConfirm()
          }
        })
      } else {
        this.onConfirm()
      }
    },
    onConfirm() {
      this.setData({
        pickerShow: false,
        value: this.data.calendarValue
      })
      this.$emit('confirm', {
        value: this.data.calendarValue
      })
      this.setShowValue()
    },
    setInnerLabel() {
      const [start, end] = this.data.calendarValue || []
      this.setData({
        rangeLabel: [start, end].map((item, index) => {
          return (this.data.innerDisplayFormat || formatRange)(item, index === 0 ? 'start' : 'end', this.data.currentType)
        })
      })
    },
    setShowValue() {
      if (
        (!(this.data.calendarValue instanceof Array) && this.data.calendarValue) ||
        (this.data.calendarValue instanceof Array && this.data.calendarValue.length)
      ) {
        this.setData({
          showValue: (this.data.displayFormat || defaultDisplayFormat)(this.data.calendarValue, this.data.currentType)
        })
      } else {
        this.setData({
          showValue: ''
        })
      }
    },
    handleShortcutClick(event) {
      const { index } = event.target.dataset

      if (this.data.onShortcutsClick && typeof this.data.onShortcutsClick === 'function') {
        const calendarValue = this.data.onShortcutsClick({
          item: this.data.shortcuts[index],
          index
        })
        const confirmBtnDisabled = this.getConfirmBtnStatus(calendarValue)
        this.setData({
          calendarValue,
          confirmBtnDisabled
        })
      }

      if (!this.data.showConfirm) {
        this.handleConfirm()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common/abstracts/variable';
@import '../common/abstracts/mixin';

@include b(calendar) {
  @include when(border) {
    .wd-calendar__cell {
      @include halfPixelBorder('top', $-cell-padding);
    }
  }
  @include e(cell) {
    position: relative;
    display: flex;
    padding: 0 $-cell-padding;
    background-color: $-color-white;
    text-decoration: none;
    color: $-cell-title-color;
    font-size: $-cell-title-fs;
    overflow: hidden;
    line-height: $-cell-ling-height;
  }
  @include e(cell) {
    @include when(disabled) {
      .wd-calendar__value {
        color: $-input-disabled-color;
      }
    }
    @include when(align-right) {
      .wd-calendar__value {
        text-align: right;
      }
    }
    @include when(error) {
      .wd-calendar__value {
        color: $-input-error-color;
      }
      .wd-calendar__arrow {
        color: $-input-error-color;
      }
    }
    @include when(large) {
      font-size: $-cell-title-fs-large;

      .wd-calendar__arrow {
        font-size: $-cell-icon-size-large;
      }
    }
    @include when(center) {
      align-items: center;

      .wd-calendar__arrow {
        margin-top: 0;
      }
    }
  }
  @include e(label) {
    position: relative;
    width: $-input-cell-label-width;
    padding: $-cell-wrapper-padding 0;
    margin-right: $-cell-padding;
    box-sizing: border-box;

    @include when(required) {
      padding-left: 12px;

      &::after {
        position: absolute;
        left: 0;
        top: $-cell-wrapper-padding + 2px;
        content: '*';
        font-size: $-cell-required-size;
        line-height: 1.1;
        color: $-cell-required-color;
      }
    }
  }
  @include e(value) {
    flex: 1;
    padding: $-cell-wrapper-padding 0;
    margin-right: 10px;
    color: $-cell-value-color;
    white-space: pre-wrap;

    @include when(ellipsis) {
      @include lineEllipsis;
    }
    @include m(placeholder) {
      color: $-input-placeholder-color;
    }
  }
  @include e(arrow) {
    display: block;
    margin-top: $-cell-wrapper-padding;
    font-size: $-cell-icon-size;
    color: $-cell-arrow-color;
    line-height: 1.25;
  }

  @include e(header) {
    position: relative;
    overflow: hidden;
  }
  @include e(title) {
    color: $-action-sheet-color;
    height: $-action-sheet-title-height;
    line-height: $-action-sheet-title-height;
    text-align: center;
    font-size: $-action-sheet-title-fs;
    font-weight: $-action-sheet-weight;
  }
  @include e(close) {
    position: absolute;
    top: $-action-sheet-close-top;
    right: $-action-sheet-close-right;
    color: $-action-sheet-close-color;
    font-size: $-action-sheet-close-fs;
    transform: rotate(-45deg);
    line-height: 1.1;
  }
  @include e(tabs) {
    width: 222px;
    margin: 10px auto 12px;
  }
  @include e(shortcuts) {
    padding: 20px 0;
    text-align: center;
  }
  @include e(tag) {
    margin-right: 8px;
  }
  @include e(view) {
    @include when(show-confirm) {
      height: 394px;

      @include when(range) {
        height: 384px;
      }
    }
  }
  @include e(range-label) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    @include when(monthrange) {
      padding-bottom: 10px;
      box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.02);
    }
  }
  @include e(range-label-item) {
    flex: 1;
    color: rgba(0, 0, 0, 0.85);

    @include when(placeholder) {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  @include e(range-sperator) {
    margin: 0 24px;
    color: rgba(0, 0, 0, 0.25);
  }
  @include e(confirm) {
    padding: 12px 25px 14px;
  }
}
</style>
