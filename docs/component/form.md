<frame/>

#  Form 表单组合

本章节主要讲如何将多个 form 表单组件进行组合，形成一个完整的表单页面。

常见的 form 表单为`单元格`形式的展示，即左侧为表单的标题描述，右侧为表单的输入。

其中，`Input 输入框`、`Picker 选择器`、 `Calendar 日历选择器`, `ColPicker 多列选择器`、`SelectPicker 单复选选择器` 和 `DatetimePicker 日期时间选择器`具有`单元格`的展示形式，而 `InputNumber 计数器`和 `Switch 开关`需要使用 `Cell 单元格`进行包裹使用。

所有的表单组件都支持 `name` 属性，可以结合小程序原生的 `form` 组件，监听 `submit` 事件，统一获取到所有表单组件的 `value`，也可以单独对每个表单组件监听 `change` 事件来获取单个表单组件的 `value`。

> 对于表单组件，建议对 wd-cell-group 开启 border 属性，这样每条cell就会有边框线隔离开，这样表单的划分比较清晰。

下面是 Demo 示例：

html 文件代码：

```html
  <wd-message-box />
  <wd-toast />
  <form @submit="formSubmit">
    <wd-cell-group custom-class="group" title="基础信息" border>
      <wd-input
        label="优惠券名称"
        label-width="100px"
        :maxlength="20"
        show-word-limit
        name="couponName"
        required
        suffix-icon="warn-bold"
        clearable
        v-model="couponName"
        placeholder="请输入优惠券名称"
        @change="handleCouponName"
        @clicksuffixicon="handleIconClick"
      />
      <wd-select-picker
        label="推广平台"
        label-width="100px"
        name="platform"
        v-model="platform"
        :columns="platformList"
        placeholder="请选择推广平台"
        @confirm="handlePlatform"
      />
      <wd-picker label="优惠方式" label-width="100px" name="promotion" align-right v-model="promotion" :columns="promotionlist" />
      <wd-cell title="券面额" required title-width="100px" custom-value-class="cell-left">
        <view style="text-align: left">
          <view class="inline-txt" style="margin-left: 0">满</view>
          <wd-input
            no-border
            custom-style="display: inline-block; width: 70px; vertical-align: middle"
            placeholder="请输入金额"
            v-model="threshold"
            name="threshold"
            @change="handleThreshold"
          />
          <view class="inline-txt">减</view>
          <wd-input
            no-border
            custom-style="display: inline-block; width: 70px; vertical-align: middle"
            placeholder="请输入金额"
            v-model="price"
            name="price"
            @change="handlePrice"
          />
        </view>
      </wd-cell>
    </wd-cell-group>
    <wd-cell-group custom-class="group" title="时间和地址" border>
      <wd-datetime-picker label="时间" label-width="100px" name="date" v-model="date" @confirm="handleDate" />
      <wd-col-picker
        label="地址"
        label-width="100px"
        name="address"
        v-model="address"
        :columns="area"
        :column-change="areaChange"
        @confirm="handleAddress"
      />
    </wd-cell-group>
    <wd-cell-group custom-class="group" title="其他信息" border>
      <wd-input
        label="活动细则"
        label-width="100px"
        type="textarea"
        v-model="content"
        :maxlength="300"
        show-word-limit
        placeholder="请输入活动细则信息"
        clearable
        name="content"
        @change="handleContent"
      />
      <wd-cell title="发货数量" center>
        <wd-input-number v-model="count" name="count" @change="handleCount" />
      </wd-cell>
      <wd-cell title="这里显示的是多文字标题包含非常的文字" title-width="240px" center>
        <wd-switch v-model="switchVal" name="switchVal" @change="handleSwitch" />
      </wd-cell>
      <wd-input
        label="卡号"
        label-width="100px"
        name="cardId"
        suffix-icon="camera"
        placeholder="请输入卡号"
        clearable
        v-model="cardId"
        @change="handleCardId"
      />
      <wd-input label="手机号" label-width="100px" name="phone" placeholder="请输入手机号" clearable v-model="phone" @change="handlePhone" />
    </wd-cell-group>
    <view class="tip">
      <wd-checkbox v-model="read" name="read" @change="handleRead" custom-label-class="label-class">
        已阅读并同意
        <text style="color: #4d80f0">《借款额度合同及相关授权》</text>
      </wd-checkbox>
    </view>
    <view class="footer">
      <button class="wd-button is-primary is-block is-round is-large" form-type="submit">提交</button>
    </view>
  </form>
```

> 自定义按钮组件的 form-type 无法触发小程序官方form组件的submit事件，微信要求小程序基础库 2.10.3 才支持，京东小程序的则暂时不支持，因此需要用小程序自带的官方 button 组件，样式上可以引入 wot-design 中 button 的样式文件，使用 `wd-button` , `is-primary` , `is-suck` , `is-block`, `is-plain` , `is-disabled` 等类名进行组合使用来展示 wot-design 组件库的按钮样式。

index.js 文件代码：

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni/components/wd-message-box'
import { useToast } from '@/uni_modules/wot-design-uni'
import { areaData } from '@/utils/area'
import { ref } from 'vue'

const couponName = ref<string>('')
const couponNameErr = ref<boolean>(false)
const platform = ref<any>([])
const platformList = ref<any>([
  {
    value: '1',
    label: '京东'
  },
  {
    value: '2',
    label: '开普勒'
  },
  {
    value: '3',
    label: '手Q'
  },
  {
    value: '4',
    label: '微信'
  },
  {
    value: '5',
    label: '1号店'
  },
  {
    value: '6',
    label: '十元街'
  },
  {
    value: '7',
    label: '京东极速版'
  }
])
const promotion = ref<string>('1')
const promotionlist = ref<any[]>([
  {
    value: '1',
    label: '满减'
  },
  {
    value: '2',
    label: '无门槛'
  }
])
const threshold = ref<string>('')
const price = ref<string>('')
const date = ref<number>(Date.now())
const address = ref<any[]>([])

const count = ref<number>(1)

const area = ref<any[]>([
  Object.keys(areaData[86]).map((key) => {
    return {
      value: key,
      label: areaData[86][key]
    }
  })
])
const areaChange = ({ selectedItem, resolve, finish }) => {
  if (areaData[selectedItem.value]) {
    resolve(
      Object.keys(areaData[selectedItem.value]).map((key) => {
        return {
          value: key,
          label: areaData[selectedItem.value][key]
        }
      })
    )
  } else {
    finish()
  }
}
const content = ref<string>('')
const coun = ref<number>(1)
const read = ref<boolean>(false)
const switchVal = ref<boolean>(true)
const cardId = ref<string>('')
const phone = ref<string>('')

const toast = useToast()
const messageBox = useMessage()

function handleCouponName({ value }) {
  console.log(value)

  couponNameErr.value = false
}
function handlePlatform({ value }) {
  console.log(value)
}
function handleThreshold({ value }) {
  console.log(value)
}
function handlePrice({ value }) {
  console.log(value)
}
function handleAddress({ value }) {
  console.log(value)
}
function handleContent({ value }) {
  console.log(value)
}
function handleCount({ value }) {
  console.log(value)
}
function handleSwitch({ value }) {
  console.log(value)
}
function handleRead({ value }) {
  read.value = value
}
function handleCardId({ value }) {
  console.log(value)
}
function handlePhone({ value }) {
  console.log(value)
}
function formSubmit() {
  if (!couponName.value) {
    toast.error('请填写优惠券名称')
    return
  }
  messageBox.alert('提交成功')
}
function handleIconClick() {
  toast.info('优惠券提示信息')
}
function handleDate({ value }) {
  console.log(value)
}
```

css 文件代码：

```scss
.inline-txt {
  display: inline-block;
  font-size: 14px;
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
}
:deep(.group) {
  margin-top: 12px;
}
.tip {
  margin: 10px 15px 21px;
  color: #999;
  font-size: 12px;
}
.footer {
  padding: 0 25px 21px;
}
:deep(.label-class) {
  color: #999 !important;
  font-size: 12px !important;
}
```
