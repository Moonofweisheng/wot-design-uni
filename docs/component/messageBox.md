<frame/>

# MessageBox 弹框

弹框有三种：alert、confirm 和 prompt。

## Alert 弹框

alert 弹框只有确定按钮，用于强提醒。

```html
<wd-message-box></wd-message-box>
<wd-button @click="alert">alert</wd-button>
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()

function alert() {
  message.alert('操作成功')
}
```

显示标题的 alert 弹框。

```html
<wd-message-box />
<wd-button @click="alert">alert</wd-button>
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()

function alert() {
  message.alert({
    msg: '提示文案',
    title: '标题'
  })
}
```

如果内容文案过长，弹框高度不再增加，而是展示滚动条。

```html
<wd-message-box />
<wd-button @click="alert">alert</wd-button>
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()

function alert() {
  message.alert({
    msg: '以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文',
    title: '标题'
  })
}
```

## Confirm 弹框

用于提示用户操作。

```html
<wd-message-box />
<wd-button @click="confirm">confirm</wd-button>
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()

function confirm() {
  message
    .confirm({
      msg: '提示文案',
      title: '标题'
    })
    .then(() => {
      console.log('点击了确定按钮')
    })
}

```

## Prompt 弹框

prompt 会展示一个输入框，并可以进行输入校验。

```html
<wd-message-box />
<wd-button @click="prompt">prompt</wd-button>
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()

function prompt() {
  message
    .prompt({
      title: '请输入邮箱',
      inputValue: value1.value,
      inputPattern: /.+@.+\..+/i
    })
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error)
    })
}

```

## 插槽

如果提供的弹框内容不满足需求，可以使用插槽自定义弹框内容。可以通过指定唯一标识`selector`的方式，在一个页面中使用多个`MessageBox`,`useMessage(selector)`会返回一个指定了`selector`的组件实例。

```html
<wd-message-box selector="wd-message-box-slot" use-slot>
  <wd-rate custom-class="custom-rate-class" v-model="value"/>
</wd-message-box>

 <wd-button @click="withSlot">custom</wd-button>
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'
const value = ref<number>(1)
const message = useMessage('wd-message-box-slot')

function withSlot() {
  message1.show({
    title: '评分'
  })
}

```

```scss
:deep(.custom-rate-class) {
  display: block;
  height: 22px;
}
```

---

弹框在点击确定和取消按钮时，会返回一个 promise 对象，用 then 接收“确定”按钮事件，用 catch 接收“取消”按钮事件。传入的 action 值为:'confirm'、'cancel'、'modal'。

`MessageBox.show(msg)`在调用时直接传入字符串，`MessageBox.show(options)` 在调用时，需传入 options 参数。alert、confirm 和 prompt 都支持快捷调用：

```typescript
MessageBox.show(msg)

MessageBox.show(options)

MessageBox.alert(options)

MessageBox.confirm(options)

MessageBox.prompt(options)
```


## Options Attributes

| 参数              | 说明                                                          | 类型            | 可选值                   | 默认值           | 最低版本 |
| ----------------- | ------------------------------------------------------------- | --------------- | ------------------------ | ---------------- | -------- |
| title             | 标题                                                          | string          | -                        | -                | -        |
| msg               | 消息文案                                                      | string          | -                        | -                | -        |
| type              | 弹框类型                                                      | string          | alert / confirm / prompt | alert            | -        |
| closeOnClickModal | 是否支持点击蒙层进行关闭，点击蒙层回调传入的 action 为'modal' | boolean         | -                        | true             | -        |
| inputType         | 当 type 为 prompt 时，输入框类型                              | string          | -                        | text             | -        |
| inputValue        | 当 type 为 prompt 时，输入框初始值                            | string / number | -                        | -                | -        |
| inputPlaceholder  | 当 type 为 prompt 时，输入框 placeholder                      | string          | -                        | 请输入内容       | -        |
| inputPattern      | 当 type 为 prompt 时，输入框正则校验，点击确定按钮时进行校验  | regex           | -                        | -                | -        |
| inputValidate     | 当 type 为 prompt 时，输入框校验函数，点击确定按钮时进行校验  | function        | -                        | -                | -        |
| inputError        | 当 type 为 prompt 时，输入框检验不通过时的错误提示文案        | string          | -                        | 输入的数据不合法 | -        |
| confirmButtonText | 确定按钮文案                                                  | string          | -                        | 确定             | -        |
| cancelButtonText  | 取消按钮文案                                                  | string          | -                        | 取消             | -        |
| selector          | 组件的 id                                                     | string          | -                        | #wd-message-box  | -        |
| context           | 引用 `wd-message-box` 的页面实例或自定义组件实例              | object          | -                        | 当前页面实例     | -        |
| zIndex            | 弹窗层级                                                      | number          | -                        | 99               | -    |
| lazyRender        | 弹层内容懒渲染，触发展示时才渲染内容                          | boolean         | -                        | true             | -    |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根结点样式 | -        |
