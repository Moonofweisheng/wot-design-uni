<frame/>

# Form 表单 <el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">0.2.0</el-tag>

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型，常见的 form 表单为`单元格`形式的展示，即左侧为表单的标题描述，右侧为表单的输入。

其中，`Input 输入框`、`Textarea 输入框`、`Picker 选择器`、 `Calendar 日历选择器`、 `ColPicker 多列选择器`、`SelectPicker 单复选选择器`、`Cell 单元格` 和 `DatetimePicker 日期时间选择器`具有`单元格`的展示形式，同时也支持 `prop` 和 `rules` 属性，我们称之为`表单项组件`，而 `InputNumber 计数器` 、 `Switch 开关` 和 `Upload 上传` 等组件则需要使用 `Cell 单元格` 进行包裹使用。

结合 `wd-form` 组件，可以实现对以上组件的规则校验。

> 对于表单组件，建议对 wd-cell-group 开启 border 属性，这样每条 cell 就会有边框线隔离开，这样表单的划分比较清晰。

## 基础用法

在表单中，使用 `model` 指定表单数据对象，每个 `表单项组件` 代表一个表单项，使用 `prop` 指定表单项字段 ，使用 `rules` 属性定义校验规则。

::: details 查看基础用法示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model">
  <wd-cell-group border>
    <wd-input
      label="用户名"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="请输入用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <wd-input
      label="密码"
      label-width="100px"
      prop="value2"
      show-password
      clearable
      v-model="model.value2"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
const { success: showSuccess } = useToast()

const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const form = ref()

function handleSubmit1() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 12px;
}
```

:::

## 校验错误提示方式

1. `message`：默认为输入框下方用文字进行提示
2. `toast`：以"toast"提示的方式弹出错误信息，每次只弹出最前面的那个表单域的错误信息
3. `none`：不会进行任何提示

::: details 错误提示方式
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :errorType="errorType">
  <wd-cell-group border>
    <wd-input
      label="用户名"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="请输入用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <wd-input
      label="密码"
      label-width="100px"
      prop="value2"
      show-password
      clearable
      v-model="model.value2"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
const { success: showSuccess } = useToast()
const errorType = ref<string>('message')
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

:::

## 校验规则

本章节演示四种自定义校验及提示规则：`正则校验`、`函数校验`、`函数返回错误提示`和`异步函数校验`。

::: details 查看校验规则示例
::: code-group

```html [vue]
<wd-form ref="form2" :model="model">
  <wd-cell-group border>
    <wd-input
      label="校验"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="正则校验"
      :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
    />
    <wd-input
      label="校验"
      label-width="100px"
      prop="value2"
      clearable
      v-model="model.value2"
      placeholder="函数校验"
      :rules="[
              {
                required: false,
                validator: validatorMessage,
                message: '请输入正确的玛卡巴卡'
              }
            ]"
    />
    <wd-input
      label="校验"
      label-width="100px"
      prop="value3"
      clearable
      v-model="model.value3"
      placeholder="校验函数返回错误提示"
      :rules="[
              {
                required: false,
                message: '请输入内容',
                validator: validator
              }
            ]"
    />
    <wd-input
      label="校验"
      label-width="100px"
      prop="value4"
      clearable
      v-model="model.value4"
      placeholder="异步函数校验"
      :rules="[{ required: false, validator: asyncValidator, message: '请输入1234' }]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
const model = reactive<{
  value1: string
  value2: string
  value3: string
  value4: string
}>({
  value1: '',
  value2: '',
  value3: '',
  value4: ''
})

const { success: showSuccess } = useToast()

const form = ref()

const validatorMessage = (val) => {
  return /1\d{10}/.test(val)
}

const validator = (val) => {
  if (String(val).length >= 4) {
    return Promise.resolve()
  } else {
    return Promise.reject('长度不得小于4')
  }
}

// 校验函数可以返回 Promise，实现异步校验
const asyncValidator = (val) =>
  new Promise((resolve) => {
    showLoading('验证中...')

    setTimeout(() => {
      closeToast()
      resolve(val === '1234')
    }, 1000)
  })

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '提交成功'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 12px;
}
```

:::

## 动态表单

表单项动态增减。

::: details 查看动态表单示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model">
  <wd-cell-group border>
    <wd-input
      label="用户名"
      label-width="100px"
      prop="name"
      clearable
      v-model="model.name"
      placeholder="请输入用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <wd-input
      v-for="(item, index) in model.phoneNumbers"
      :key="item.key"
      :label="'联系方式' + index"
      :prop="'phoneNumbers.' + index + '.value'"
      label-width="100px"
      clearable
      v-model="item.value"
      placeholder="联系方式"
      :rules="[{ required: true, message: '请填写联系方式' + index }]"
    />

    <wd-cell title-width="0px">
      <view class="footer">
        <wd-button size="small" type="info" plain @click="addPhone">添加</wd-button>
        <wd-button size="small" type="info" plain @click="removePhone">删除</wd-button>
        <wd-button size="small" type="info" plain @click="reset">重置</wd-button>
        <wd-button type="primary" size="small" @click="submit">提交</wd-button>
      </view>
    </wd-cell>
  </wd-cell-group>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { reactive, ref } from 'vue'

interface PhoneItem {
  key: number
  value: string
}

const model = reactive<{
  name: string
  phoneNumbers: PhoneItem[]
}>({
  name: '',
  phoneNumbers: [
    {
      key: Date.now(),
      value: ''
    }
  ]
})

const { success: showSuccess } = useToast()
const form = ref()

const removePhone = () => {
  model.phoneNumbers.splice(model.phoneNumbers.length - 1, 1)
}

const addPhone = () => {
  model.phoneNumbers.push({
    key: Date.now(),
    value: ''
  })
}

const reset = () => {
  form.value.reset()
}

const submit = () => {
  form.value.validate().then(({ valid, errors }) => {
    if (valid) {
      showSuccess('校验通过')
    }
  })
}
</script>
```

```css [css]
.footer {
  text-align: left;
  :deep(.wd-button) {
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}
```

:::

## 指定字段校验

`validate` 方法可以传入一个 `prop` 参数，指定校验的字段，可以实现在表单组件的`blur`、`change`等事件触发时对该字段的校验。

::: details 查看指定字段校验示例
::: code-group

```html [vue]
<wd-form ref="form" :model="model" errorType="toast">
  <wd-cell-group border>
    <wd-input
      label="用户名"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="请输入用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <wd-input
      label="密码"
      label-width="100px"
      prop="value2"
      show-password
      clearable
      v-model="model.value2"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { FormInstance } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { reactive, ref } from 'vue'

const { success: showSuccess } = useToast()
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const form = ref<FormInstance>()

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 12px;
}
```

:::

## 复杂表单

结合`Input 输入框`、`Textarea 输入框`、`Picker 选择器`、 `Calendar 日历选择器`、 `ColPicker 多列选择器`、`SelectPicker 单复选选择器`、`Cell 单元格` 和 `DatetimePicker 日期时间选择器`实现一个复杂表单。

::: details 查看复杂表单示例
::: code-group

```html [vue]
<view>
  <wd-message-box />
  <wd-toast />
  <wd-form ref="form" :model="model" :rules="rules">
    <wd-cell-group custom-class="group" title="基础信息" border>
      <wd-input
        label="优惠券名称"
        label-width="100px"
        :maxlength="20"
        show-word-limit
        prop="couponName"
        required
        suffix-icon="warn-bold"
        clearable
        v-model="model.couponName"
        placeholder="请输入优惠券名称"
        @clicksuffixicon="handleIconClick"
      />
      <wd-select-picker
        label="推广平台"
        label-width="100px"
        prop="platform"
        v-model="model.platform"
        :columns="platformList"
        placeholder="请选择推广平台"
      />
      <wd-picker
        label="优惠方式"
        placeholder="请选择优惠方式"
        label-width="100px"
        prop="promotion"
        v-model="model.promotion"
        :columns="promotionlist"
      />
      <wd-cell prop="threshold" title="券面额" required title-width="100px" custom-value-class="cell-left">
        <view style="text-align: left">
          <view class="inline-txt" style="margin-left: 0">满</view>
          <wd-input
            no-border
            custom-style="display: inline-block; width: 70px; vertical-align: middle"
            placeholder="请输入金额"
            v-model="model.threshold"
          />
          <view class="inline-txt">减</view>
          <wd-input
            no-border
            custom-style="display: inline-block; width: 70px; vertical-align: middle"
            placeholder="请输入金额"
            v-model="model.price"
          />
        </view>
      </wd-cell>
    </wd-cell-group>
    <wd-cell-group custom-class="group" title="时间和地址" border>
      <wd-datetime-picker label="时间" label-width="100px" placeholder="请选择时间" prop="time" v-model="model.time" />
      <wd-calendar label="日期" label-width="100px" placeholder="请选择日期" prop="date" v-model="model.date" />

      <wd-col-picker
        label="地址"
        placeholder="请选择地址"
        label-width="100px"
        prop="address"
        v-model="model.address"
        :columns="area"
        :column-change="areaChange"
      />
    </wd-cell-group>
    <wd-cell-group custom-class="group" title="其他信息" border>
      <wd-textarea
        label="活动细则"
        label-width="100px"
        type="textarea"
        v-model="model.content"
        :maxlength="300"
        show-word-limit
        placeholder="请输入活动细则信息"
        clearable
        prop="content"
      />
      <wd-cell title="发货数量" title-width="100px" prop="count">
        <view style="text-align: left">
          <wd-input-number v-model="model.count" />
        </view>
      </wd-cell>
      <wd-cell title="开启折扣" title-width="100px" prop="switchVal" center>
        <view style="text-align: left">
          <wd-switch v-model="model.switchVal" />
        </view>
      </wd-cell>
      <wd-input
        label="歪比巴卜"
        label-width="100px"
        prop="cardId"
        suffix-icon="camera"
        placeholder="请输入歪比巴卜"
        clearable
        v-model="model.cardId"
      />
      <wd-input label="玛卡巴卡" label-width="100px" prop="phone" placeholder="请输入玛卡巴卡" clearable v-model="model.phone" />
      <wd-cell title="活动图片" title-width="100px" prop="fileList">
        <wd-upload :file-list="model.fileList" action="https://ftf.jd.com/api/uploadImg" @change="handleFileChange"></wd-upload>
      </wd-cell>
    </wd-cell-group>
    <view class="tip">
      <wd-checkbox v-model="model.read" prop="read" custom-label-class="label-class">
        已阅读并同意
        <text style="color: #4d80f0">《巴拉巴拉吧啦协议》</text>
      </wd-checkbox>
    </view>
    <view class="footer">
      <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
    </view>
  </wd-form>
</view>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { isArray } from '@/uni_modules/wot-design-uni/components/common/util'
import { FormRules } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { reactive, ref } from 'vue'
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const model = reactive<{
  couponName: string
  platform: any[]
  promotion: string
  threshold: string
  price: string
  time: number | string
  date: null | number
  address: string[]
  count: number
  content: string
  switchVal: boolean
  cardId: string
  phone: string
  read: boolean
  fileList: Record<string, string>[]
}>({
  couponName: '',
  platform: [],
  promotion: '',
  threshold: '',
  price: '',
  date: null,
  time: '',
  address: [],
  count: 1,
  content: '',
  switchVal: true,
  cardId: '',
  phone: '',
  read: false,
  fileList: []
})

const rules: FormRules = {
  couponName: [
    {
      required: true,
      pattern: /\d{6}/,
      message: '优惠券名称6个字以上',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject('请输入优惠券名称')
        }
      }
    }
  ],
  content: [
    {
      required: true,
      message: '请输入活动细则信息',
      validator: (value) => {
        if (value && value.length > 2) {
          return Promise.resolve()
        } else {
          return Promise.reject('请输入活动细则信息')
        }
      }
    }
  ],
  threshold: [
    {
      required: true,
      message: '请输入满减金额',
      validator: (value) => {
        if (value && model.price) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ],
  platform: [
    {
      required: true,
      message: '请选择推广平台',
      validator: (value) => {
        if (value && isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择推广平台')
        }
      }
    }
  ],
  promotion: [
    {
      required: true,
      message: '请选择推广平台',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择推广平台')
        }
      }
    }
  ],
  time: [
    {
      required: true,
      message: '请选择时间',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择时间')
        }
      }
    }
  ],
  date: [
    {
      required: true,
      message: '请选择日期',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ],
  address: [
    {
      required: true,
      message: '请选择地址',
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择地址')
        }
      }
    }
  ],
  count: [
    {
      required: true,
      message: '发货数量需要大于1',
      validator: (value) => {
        if (Number(value) > 1) {
          return Promise.resolve()
        } else {
          return Promise.reject('发货数量需要大于1')
        }
      }
    }
  ],
  cardId: [
    {
      required: true,
      message: '请输入歪比巴卜',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject('请输入歪比巴卜')
        }
      }
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入玛卡巴卡',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ],
  fileList: [
    {
      required: true,
      message: '请选择活动图片',
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ]
}

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

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])
const areaChange: ColPickerColumnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

const toast = useToast()
const form = ref()

function handleFileChange({ fileList }) {
  model.fileList = fileList
}

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      console.log(valid)
      console.log(errors)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleIconClick() {
  toast.info('优惠券提示信息')
}
</script>
```

```css [css]
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

:::

## Attributes

| 参数          | 说明                                                                                | 类型                  | 可选值 | 默认值    | 最低版本         |
| ------------- | ----------------------------------------------------------------------------------- | --------------------- | ------ | --------- | ---------------- |
| model         | 表单数据对象                                                                        | `Record<string, any>` | -      | -         | 0.2.0            |
| rules         | 表单验证规则                                                                        | `FormRules`           | -      | -         | 0.2.0            |
| resetOnChange | 表单数据变化时是否重置表单提示信息（设置为 false 时需要开发者单独对变更项进行校验） | `boolean`             | -      | `true`    | 0.2.16           |
| errorType     | 校验错误提示方式                                                                    | `toast/message/none`  | -      | `message` | $LOWEST_VERSION$ |

### FormItemRule 数据结构

| 键名      | 说明                                                    | 类型                                  |
| --------- | ------------------------------------------------------- | ------------------------------------- |
| required  | 是否为必选字段                                          | `boolean`                             |
| message   | 错误提示文案                                            | `string`                              |
| validator | 通过函数进行校验，可以返回一个 `Promise` 来进行异步校验 | `(value, rule) => boolean \| Promise` |
| pattern   | 通过正则表达式进行校验，正则无法匹配表示校验不通过      | `RegExp`                              |

## Events

| 事件名称 | 说明                                                                           | 参数            | 最低版本 |
| -------- | ------------------------------------------------------------------------------ | --------------- | -------- |
| validate | 验证表单，支持传入一个 prop 来验证单个表单项，不传入 prop 时，会验证所有表单项 | `prop?: string` | 0.2.0    |
| reset    | 重置校验结果                                                                   | -               | 0.2.0    |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | 0.2.0    |
