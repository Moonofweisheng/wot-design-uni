<frame/>

#  Input 输入框

::: tip 提示
`0.2.0`版本已将 `Input` 组件的 `textarea 文本域`功能迁移至 [Textarea](/component/textarea)组件，所有API保持一致。
:::

## 基本用法

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

```typescript
const value = ref<string>('')
function handleChange(event) {
  console.log(event)
}
```
```html
<wd-input type="text" v-model="value" placeholder="请输入用户名" @change="handleChange" />
```

## 禁用

设置 `disabled` 属性。

```html
<wd-input v-model="value" disabled />
```

## 只读

设置 `readonly` 属性。

```html
<wd-input v-model="value" readonly />
```

## 清空按钮

设置 `clearable` 属性。

```html
<wd-input v-model="value" clearable @change="handleChange"/>
```

## 有值且聚焦时展示清空按钮
设置 `clear-trigger` 属性，可以控制是否聚焦时才展示清空按钮。

:::warning 注意
支付宝小程序暂不支持 `clear-trigger` 属性，且某种情况下清空按钮无法点击，原因参考此[issue](https://github.com/ant-design/ant-design-mini/issues/1255)（希望可以早点解决，所以直接给蚂蚁的组件库提了个issue）。
:::


```html
<wd-input v-model="value" clear-trigger="focus" clearable @change="handleChange"/>
```

## 点击清除按钮时不自动聚焦

设置`focus-when-clear` 属性，可以控制点击清除按钮时是否自动聚焦。

```html
<wd-input type="text" :focus-when-clear="false" v-model="value" clearable />
```

## 密码输入框

设置 `show-password` 属性。

```html
<wd-input v-model="value" clearable show-password @change="handleChange"/>
```

## 前后icon

设置前置icon `prefix-icon`，设置后置icon `suffix-icon`，icon 为 [icon](/component/icon) 章节中的图标，如果没有你需要的图标，则使用 `prefix`、`suffix` 插槽进行自定义插入。

```html
<wd-input
  v-model="value"
  prefix-icon="dong"
  suffix-icon="list"
  @change="handleChange"/>
```

## 限制字数输入

设置 `maxlength` 属性，如果要显示字数限制，设置 `show-word-limit` 属性。

```html
<wd-input v-model="value" :maxlength="20" show-word-limit @change="handleChange"/>
```

## 设置label标题

设置 `label` 标题，可以和 `cell-group` 组合使用，形成 `cell` 展示类型。可以通过 `label-width` 设置标题宽度，默认为 '33%'。

```html
<wd-input type="text" label="基本用法" v-model="value" placeholder="请输入..." />
```

## 必填样式

设置了 `label` 的情况下，设置 `required` 属性，展示必填样式。

```html
<wd-input v-model="value" placeholder="请输入..." label="必填" required></wd-input>
```

## 输入框大小

通过设置 `size` 修改输入框大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-input type="text" label="基本用法" size="large" v-model="value" placeholder="请输入..." />
```

## 错误状态

设置 `error` 属性，输入框的值显示为红色。

```html
<wd-input type="text" v-model="value" placeholder="请输入用户名" error />
```

## 垂直居中

当设置 `label` 标题时，默认为顶部居中，设置 `center` 属性可以使标题和输入框垂直居中。

```html
<wd-input type="text" label="基本用法" v-model="value" center />
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| type | 类型 | string | text / number / digit / idcard | text | - |
| v-model |	绑定值 | string / number | - | - | - |
| placeholder	| 占位文本 |	string | - |	请输入... | - |
| clearable | 显示清空按钮 | boolean | - | false | - |
| maxlength | 原生属性，最大长度 | number | - | 支付宝小程序无默认值，其余平台默认为-1 | - |
| showPassword | 显示为密码框 | boolean | - | false | - |
| disabled | 原生属性，禁用 | boolean | - | false | - |
| readonly | 只读 | boolean | - | false | - |
| prefixIcon | 前置图标，icon组件中的图标类名 | string | - | - | - |
| suffixIcon | 后置图标，icon组件中的图标类名 | string | - | - | - |
| showWordLimit | 显示字数限制，需要同时设置 maxlength | boolean | - | false | - |
| confirm-type | 设置键盘右下角按钮的文字，仅在type='text'时生效 | string | done / go / next / search / send | done | - |
| confirm-hold | 点击键盘右下角按钮时是否保持键盘不收起	 | Boolean | - | false | - |
| always-embed	 | 微信小程序原生属性，强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)	 | Boolean | - | false | - |
| placeholderStyle | 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight | string | - | - | - |
| placeholderClass | 原生属性，指定 placeholder 的样式类 | string | - | - | - |
| focus | 原生属性，获取焦点 | boolean | - | false | - |
| cursorSpacing | 原生属性，指定光标与键盘的距离。取 input 距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离 | number | - | 0 | - |
| cursor | 原生属性，指定focus时的光标位置 | number | - | -1 | - |
| selectionStart | 原生属性，光标起始位置，自动聚集时有效，需与selection-end搭配使用 | number | - | -1 | - |
| selectionEnd | 原生属性，光标结束位置，自动聚集时有效，需与selection-start搭配使用 | number | - | -1 | - |
| adjustPosition | 原生属性，键盘弹起时，是否自动上推页面 | boolean | - | true | - |
| label | 设置左侧标题 | string | - | - | - |
| size | 设置输入框大小 | string | - | - | - |
| error | 设置输入框错误状态，错误状态时为红色 | boolean | - | false | - |
| center | 当有label属性时，设置标题和输入框垂直居中，默认为顶部居中 | boolean | - | false | - |
| label-width | 设置左侧标题宽度 | string | - | 33% | - |
| use-label-slot | 使用 label 插槽 | boolean | - | false | - |
| use-suffix-slot | 使用 后置图标 插槽 | boolean | - | false | - |
| use-prefix-slot | 使用 前置图标 插槽 | boolean | - | false | - |
| required | cell 类型下必填样式 | boolean | - | false | - |
| no-border | 非 cell 类型下是否隐藏下划线 | boolean | - | false | - | - |
| prop | 表单域 `model` 字段名，在使用表单校验功能的情况下，该属性是必填的 | string | - | - | - |
| rules | 表单验证规则，结合`wd-form`组件使用	 | `FormItemRule []`	 | - | `[]` | - |
| clearTrigger | 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示	 | `InputClearTrigger`	 | `focus` / `always` | `always` | 1.3.7 |
| focusWhenClear | 是否在点击清除按钮时聚焦输入框 | boolean | -      | true  | 1.3.7   |



### FormItemRule 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否为必选字段	 | `boolean` |
| message | 错误提示文案	 | `string` |
| validator | 通过函数进行校验，可以返回一个 `Promise` 来进行异步校验 | `(value, rule) => boolean \| Promise` |
| pattern | 通过正则表达式进行校验，正则无法匹配表示校验不通过 | `RegExp` |


## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| input | 监听输入框input事件 | ` {value, cursor, keyCode}` | - |
| focus | 监听输入框focus事件 | ` { value, height }`, height 为键盘高度 | - |
| blur | 监听输入框blur事件 | ` { value }` | - |
| change | 监听输入框修改事件 | ` { value }` | - |
| clear | 监听输入框清空按钮事件 | - | - |
| confirm | 点击完成时， 触发 confirm 事件 | ` { value }` | - |
| keyboardheightchange | 键盘高度发生变化的时候触发此事件 | ` { height, duration }` | - |
| clickprefixicon | 点击前置图标时触发 | - | - |
| clicksuffixicon | 点击后置图标时触发 | - | - |

## Slot
:::tip 提示
使用插槽需要配置是否启用对应的插槽，分别对应`use-label-slot`、`use-suffix-slot`、`use-prefix-slot`。
:::

| name | 说明 | 最低版本 |
|------|-----|---------|
| label | 左侧标题插槽 | - |
| prefix | 前置插槽 | - |
| suffix | 后置插槽 | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
| custom-input-class | input 外部自定义样式 | - |
| custom-label-class | label 外部自定义样式 | - |