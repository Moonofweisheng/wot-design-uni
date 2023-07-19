## Input 输入框

### 引入

```json
{
  "usingComponents": {
    "wd-input": "/wot-design/input/index"
  }
}
```

### 基本用法

`value` 为绑定值。
`bindChange`为绑定change事件。
**小程序非双向绑定，需要手动赋值到当前页面。**

```javascript
page({
  data: {
    value: '',
  },
  handleChange (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```
```html
<wd-input type="text" value="{{ value }}" placeholder="请输入用户名" bind:change="handleChange"/>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-input value="input" disabled />
```

### 只读

设置 `readonly` 属性。

```html
<wd-input value="{{ value }}" readonly />
```

### 清空按钮

设置 `clearable` 属性。

```html
<wd-input value="{{ value }}" clearable bind:change="handleChange"/>
```

### 密码输入框

设置 `show-password` 属性。

```html
<wd-input value="{{ value }}" clearable show-password bind:change="handleChange"/>
```

### 前后icon

设置前置icon `prefix-icon`，设置后置icon `suffix-icon`，icon 为 [icon](/#/components/icon) 章节中的图标，如果没有你需要的图标，则使用 `prefix`、`suffix` 插槽进行自定义插入。

```html
<wd-input
  value="{{ value }}"
  prefix-icon="dong"
  suffix-icon="list"
  bind:change="handleChange"/>
```

### 限制字数输入

设置 `maxlength` 属性，如果要显示字数限制，设置 `show-word-limit` 属性。

```html
<wd-input value="{{ value }}" maxlength="20" show-word-limit bind:change="handleChange"/>
```

### 文本域

设置 `type` 为 'textarea`。

:::warning
当 `wd-input` 的 `type` 为 'textarea' ，并嵌入 `wd-message-box`、`wd-popup`、`wd-action-sheet` 这类弹层组件时，textarea 的 placeholder 样式会失效，需要手动给 `wd-message-box`、`wd-popup`、`wd-action-sheet` 组件设置 `lazy-render="{{ false }}"` 属性，textarea 原生组件在这块实现有些问题，对于页面非立即渲染的 textarea 无法成功设置 placeholder 样式
:::

```html
<wd-input type="textarea" value="{{ value }}" placeholder="请输入..." bind:change="handleChange"/>
```

设置清空，字数限制。

```html
<wd-input
  type="textarea"
  value="{{ value }}"
  placeholder="请输入..."
  maxlength="120"
  clearable
  show-word-limit
  bind:change="handleChange"/>
```
也可以设置`auto-height`使高度自增加。

```html
<wd-input value="{{ value }}" auto-height bind:change="handleChange" clearable/>
```

### 设置label标题

设置 `label` 标题，可以和 `cell-group` 组合使用，形成 `cell` 展示类型。可以通过 `label-width` 设置标题宽度，默认为 '33%'。

```html
<wd-input type="text" label="基本用法" value="{{ value }}" placeholder="请输入..." />
```

### 必填样式

设置了 `label` 的情况下，设置 `required` 属性，展示必填样式。

```html
<wd-input value="{{ value }}" placeholder="请输入..." label="必填" required></wd-input>
```

### 输入框大小

通过设置 `size` 修改输入框大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-input type="text" label="基本用法" size="large" value="{{ value }}" placeholder="请输入..." />
```

### 错误状态

设置 `error` 属性，输入框的值显示为红色。

```html
<wd-input type="text" value="{{ value }}" placeholder="请输入用户名" error />
```

### 垂直居中

当设置 `label` 标题时，默认为顶部居中，设置 `center` 属性可以使标题和输入框垂直居中。

```html
<wd-input type="text" label="基本用法" value="{{ value }}" center />
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| type | 类型 | string | text / textarea / number / digit / idcard | text | - |
| value |	绑定值 | string / number | - | - | - |
| placeholder	| 占位文本 |	string | - |	请输入... | - |
| clearable | 显示清空按钮 | boolean | - | false | - |
| maxlength | 原生属性，最大长度 | string | - | - | - |
| showPassword | 显示为密码框 | boolean | - | false | - |
| disabled | 原生属性，禁用 | boolean | - | false | - |
| readonly | 只读 | boolean | - | false | - |
| prefixIcon | 前置图标，icon组件中的图标类名 | string | - | - | - |
| suffixIcon | 后置图标，icon组件中的图标类名 | string | - | - | - |
| showWordLimit | 显示字数限制，需要同时设置 maxlength | boolean | - | false | - |
| confirm-type | 设置键盘右下角按钮的文字，仅在type='text'时生效 | string | done / go / next / search / send | done | - |
| placeholderStyle | 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight | string | - | - | - |
| placeholderClass | textarea指定 placeholder 的样式类 | string | - | textarea-placeholder | - |
| focus | 原生属性，获取焦点 | boolean | - | false | - |
| cursorSpacing | 原生属性，指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离 | number | - | 0 | - |
| fixed | textarea原生属性，如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | boolean | - | false | - |
| cursor | 原生属性，指定focus时的光标位置 | number | - | -1 | - |
| showConfirmBar | 原生属性，是否显示键盘上方带有”完成“按钮那一栏 | boolean | - | true | - |
| selectionStart | 原生属性，光标起始位置，自动聚集时有效，需与selection-end搭配使用 | number | - | -1 | - |
| selectionEnd | 原生属性，光标结束位置，自动聚集时有效，需与selection-start搭配使用 | number | - | -1 | - |
| adjustPosition | 原生属性，键盘弹起时，是否自动上推页面 | boolean | - | true | - |
| autoHeight | textarea原生属性，textarea 行数自适应，从1行开始显示 | string | - | - | - |
| label | 设置左侧标题 | string | - | - | - |
| size | 设置输入框大小 | string | - | - | - |
| error | 设置输入框错误状态，错误状态时为红色 | boolean | - | false | - |
| center | 当有label属性时，设置标题和输入框垂直居中，默认为顶部居中 | boolean | - | false | - |
| label-width | 设置左侧标题宽度 | string | - | 33% | - |
| use-label-slot | 使用 label 插槽 | boolean | - | false | - |
| required | cell 类型下必填样式 | boolean | - | false | - |
| name | form 表单中的字段名 | string | - | - | - |
| no-border | 非 cell 类型下是否隐藏下划线 | boolean | - | false | - | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:input | 监听输入框input事件 | event.detail = {value, cursor, keyCode} | - |
| bind:focus | 监听输入框focus事件 | event.detail = { value, height }, height 为键盘高度 | - |
| bind:blur | 监听输入框blur事件 | event.detail = { value, cursor }，仅在type="textarea"时存在cursor | - |
| bind:change | 监听输入框修改事件 | event.detail = { value } | - |
| bind:clear | 监听输入框清空按钮事件 | - | - |
| bind:linechange | 监听输入框行数变化(仅限textarea) | event.detail = { height: 0, heightRpx: 0, lineCount: 0 } | - |
| bind:confirm | 点击完成时， 触发 confirm 事件 | event.detail = { value } | - |
| bind:keyboardheightchange | 键盘高度发生变化的时候触发此事件 | event.detail = { height, duration } | - |
| bind:clickprefixicon | 点击前置图标时触发 | - | - |
| bind:clicksuffixicon | 点击后置图标时触发 | - | - |

### Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| label | 左侧标题插槽 | - |
| prefix | 前置插槽 | - |
| suffix | 后置插槽 | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
| custom-textarea-container-class | textarea 容器外部自定义样式 | 2.3.0 |
| custom-textarea-class | textarea 外部自定义样式 | - |
| custom-input-class | input 外部自定义样式 | - |
| custom-label-class | label 外部自定义样式 | - |