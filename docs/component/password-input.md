<frame/>

# PasswordInput 密码输入框 <el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">0.2.0</el-tag>

带网格的输入框组件，可以用于输入密码、短信验证码等场景，通常与[数字键盘](./number-keyboard.md)组件配合使用。

## 基础用法

搭配数字键盘组件来实现密码输入功能。

```html
<!-- 密码输入框 -->
<wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
<!-- 数字键盘 -->
<wd-number-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="4" @blur="showKeyboard = false" />
```

```typescript
import { ref } from 'vue'

const value = ref<string>('123')
const showKeyboard = ref<boolean>(true)
```

### 自定义长度

通过`length`属性来设置密码长度。

```html
<!-- 密码输入框 -->
<wd-password-input v-model="value" :length="4" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-number-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="4" @blur="showKeyboard = false"></wd-number-keyboard>
```

### 格子间距

通过`gutter`属性来设置格子之间的间距。

```html
<!-- 密码输入框 -->
<wd-password-input v-model="value" :gutter="10" :focused="showKeyboard" @focus="showKeyboard = true" />
```

### 明文展示

将`mask`设置为`false`可以明文展示输入的内容，适用于短信验证码等场景。

```html
<!-- 密码输入框 -->
<wd-password-input v-model="value" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true" />
```

### 提示信息

通过`info`属性设置提示信息，通过`error-info`属性设置错误提示，例如当输入六位时提示密码错误。

```html
<!-- 密码输入框 -->
<wd-password-input v-model="value" info="密码为 6 位数字" :error-info="errorInfo" :focused="showKeyboard" @focus="showKeyboard = true" />
<!-- 数字键盘 -->
<wd-number-keyboard v-model="value" :show="showKeyboard" :maxlength="6" @blur="showKeyboard = false" />
```

```typescript
import { ref, watch } from 'vue'

const value = ref('123')
const errorInfo = ref('')
const showKeyboard = ref(true)

watch(value, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误'
  } else {
    errorInfo.value = ''
  }
})
```

## Attributes

| 参数       | 说明                                             | 类型             | 可选值 | 默认值 | 最低版本 |
| ---------- | ------------------------------------------------ | ---------------- | ------ | ------ | -------- |
| v-model    | 密码值                                           | string           | -      | -      | -        |
| info       | 输入框下方文字提示                               | string           | -      | -      | -        |
| error-info | 输入框下方错误提示                               | string           | -      | -      | -        |
| length     | 密码最大长度                                     | number           | -      | 6      | -        |
| gutter     | 输入框格子之间的间距，如 20px 2em，默认单位为 px | number \| string | -      | 0      | -        |
| mask       | 是否隐藏密码内容                                 | boolean          | -      | true   | -        |
| focused    | 是否已聚焦，聚焦时会显示光标                     | boolean          | -      | false  | -        |

## Events

| 事件名 | 说明             | 参数        | 最低版本 |
| ------ | ---------------- | ----------- | -------- |
| focus  | 输入框聚焦时触发 | `event:Event` | -        |
