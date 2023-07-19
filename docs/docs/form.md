## Form 表单组合

本章节主要讲如何将多个 form 表单组件进行组合，形成一个完整的表单页面。

常见的 form 表单为`单元格`形式的展示，即左侧为表单的标题描述，右侧为表单的输入。

其中，`Input 输入框`、`Picker 选择器`、 `Calendar 日历选择器`, `ColPicker 多列选择器`、`SelectPicker 单复选选择器` 和 `DatetimePicker 日期时间选择器`具有`单元格`的展示形式，而 `InputNumber 计数器`和 `Switch 开关`需要使用 `Cell 单元格`进行包裹使用。

所有的表单组件都支持 `name` 属性，可以结合小程序原生的 `form` 组件，监听 `submit` 事件，统一获取到所有表单组件的 `value`，也可以单独对每个表单组件监听 `change` 事件来获取单个表单组件的 `value`。

> 对于表单组件，建议对 wd-cell-group 开启 border 属性，这样每条cell就会有边框线隔离开，这样表单的划分比较清晰。

下面是 Demo 示例：

index.json 文件代码：

```json
{
  "navigationBarTitleText": "Form 表单组件组合",
  "usingComponents": {
    "demo-block": "../../components/demo-block/index",
    "wd-button": "../../dist/button/index",
    "wd-cell": "../../dist/cell/index",
    "wd-cell-group": "../../dist/cellGroup/index",
    "wd-datetime-picker": "../../dist/datetimePicker/index",
    "wd-input": "../../dist/input/index",
    "wd-picker": "../../dist/picker/index",
    "wd-checkbox": "../../dist/checkbox/index",
    "wd-switch": "../../dist/switch/index",
    "wd-toast": "../../dist/toast/index",
    "wd-message-box": "../../dist/messageBox/index",
    "wd-input-number": "../../dist/inputNumber/index",
    "wd-col-picker": "../../dist/colPicker/index"
  }
}
```

html 文件代码：

```html
<wd-message-box id="wd-message-box" />
<wd-toast id="wd-toast"/>
<form bindsubmit="formSubmit">
  <wd-cell-group custom-class="group" title="基础信息" border>
    <wd-input label="优惠券名称" label-width="120px" maxlength="20" show-word-limit name="couponName" required suffix-icon="warn-bold" clearable value="{{ couponName }}" placeholder="请输入优惠券名称" bind:change="handleCouponName" bind:clicksuffixicon="handleIconClick" />
    <wd-select-picker label="推广平台" label-width="120px" name="platform" value="{{platform}}" columns="{{platformList}}" placeholder="请选择推广平台" bind:confirm="handlePlatform" />
    <wd-picker label="优惠方式" label-width="120px" name="promotion" align-right value="{{promotion}}" columns="{{promotionlist}}" bind:confirm="handlePromotion" />
    <wd-cell title="券面额" required title-width="120px" custom-value-class="cell-left">
      <view style="text-align: left;">
        <view class="inline-txt" style="margin-left: 0;">满</view>
        <wd-input
          no-border
          style="display: inline-block; width: 70px; vertical-align: middle;"
          placeholder="请输入金额"
          value="{{threshold}}"
          name="threshold"
          bind:change="handleThreshold"
        />
        <view class="inline-txt">减</view>
        <wd-input
          no-border
          style="display: inline-block; width: 70px; vertical-align: middle;"
          placeholder="请输入金额"
          value="{{price}}"
          name="price"
          bind:change="handlePrice"
        />
      </view>
    </wd-cell>
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="时间和地址" border>
    <wd-datetime-picker label="时间" label-width="120px" name="date" value="{{date}}" bind:confirm="handleDate" />
    <wd-col-picker label="地址" label-width="120px" name="address" value="{{address}}" columns="{{area}}" column-change="{{areaChange}}" bind:confirm="handleAddress" />
  </wd-cell-group>
  <wd-cell-group custom-class="group" title="其他信息" border>
    <wd-input
      label="活动细则"
      label-width="120px"
      type="textarea"
      value="{{content}}"
      maxlength="300"
      show-word-limit
      placeholder="请输入活动细则信息"
      clearable
      name="content"
      bind:change="handleContent"
    />
    <wd-cell title="发货数量" center>
      <wd-input-number value="{{count}}" name="count" bind:change="handleCount" />
    </wd-cell>
    <wd-cell title="这里显示的是多文字标题包含非常的文字" title-width="240px" center>
      <wd-switch value="{{switchVal}}" name="switchVal" bind:change="handleSwitch" />
    </wd-cell>
    <wd-input label="卡号" label-width="120px" name="cardId" suffix-icon="camera" placeholder="请输入卡号" clearable value="{{ cardId }}" bind:change="handleCardId" />
    <wd-input label="手机号" label-width="120px" name="phone" placeholder="请输入手机号" clearable value="{{ phone }}" bind:change="handlePhone" />
  </wd-cell-group>
  <view class="tip">
    <wd-checkbox value="{{read}}" name="read" bind:change="handleRead">
      已阅读并同意<text style="color: #4D80F0">《借款额度合同及相关授权》</text>
    </wd-checkbox>
  </view>
  <button class="wd-button is-primary is-suck" form-type="submit">提交</button>
</form>
```

> 自定义按钮组件的 form-type 无法触发小程序官方form组件的submit事件，微信要求小程序基础库 2.10.3 才支持，京东小程序的则暂时不支持，因此需要用小程序自带的官方 button 组件，样式上可以引入 wot-design 中 button 的样式文件，使用 `wd-button` , `is-primary` , `is-suck` , `is-block`, `is-plain` , `is-disabled` 等类名进行组合使用来展示 wot-design 组件库的按钮样式。

index.js 文件代码：

```javascript
import Toast from '../../dist/toast/toast.js'
import MessageBox from '../../dist/messageBox/messageBox.js'
import areaData from '../../utils/area'

Page({
  data: {
    couponName: '',
    platform: [],
    platformList: [
      {
        value: '1',
        label: '京东'
      }, {
        value: '2',
        label: '开普勒'
      }, {
        value: '3',
        label: '手Q'
      }, {
        value: '4',
        label: '微信'
      }, {
        value: '5',
        label: '1号店'
      }, {
        value: '6',
        label: '十元街'
      }, {
        value: '7',
        label: '京东极速版'
      }
    ],
    promotion: '1',
    promotionlist: [
      {
        value: '1',
        label: '满减'
      }, {
        value: '2',
        label: '无门槛'
      }
    ],
    threshold: '',
    price: '',
    date: Date.now(),
    address: [],
    area: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    })],
    areaChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    },
    content: '',
    count: 1,
    read: false,
    switchVal: true,
    cardId: '',
    phone: ''
  },
  handleCouponName (event) {
    this.setData({
      couponName: event.detail.value,
      couponNameErr: false
    })
  },
  handlePlatform (event) {
    this.setData({
      platform: event.detail.value
    })
  },
  handleThreshold (event) {
    this.setData({
      threshold: event.detail.value
    })
  },
  handlePrice (event) {
    this.setData({
      price: event.detail.value
    })
  },
  handleAddress (event) {
    this.setData({
      address: event.detail.value
    })
  },
  handleContent (event) {
    this.setData({
      content: event.detail.value
    })
  },
  handleCount (event) {
    this.setData({
      count: event.detail.value
    })
  },
  handleSwitch (event) {
    this.setData({
      switchVal: event.detail.value
    })
  },
  handleRead (event) {
    this.setData({
      read: event.detail.value
    })
  },
  handleCardId (event) {
    this.setData({
      cardId: event.detail.value
    })
  },
  handlePhone (event) {
    this.setData({
      phone: event.detail.value
    })
  },
  formSubmit (event) {
    if (!detail.value.couponName) {
      Toast.error('请填写优惠券名称')
      return
    }
    MessageBox.alert(`获取的数据为 ${JSON.stringify(event.detail.value)}`)
  },
  handleIconClick () {
    Toast.info('优惠券提示信息')
  },
  handleDate (event) {
    this.setData({
      date: event.detail.value
    })
  }
})
```

css 文件代码：

```css
@import "../../wot-design/button/index.jxss";

page {
  padding-bottom: 16px;
}
.inline-txt {
  display: inline-block;
  font-size: 14px;
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
}
.group {
  margin-top: 12px;
}
.tip {
  margin: 10px 15px 25px;
  color: #999;
  font-size: 12px;
}
```
