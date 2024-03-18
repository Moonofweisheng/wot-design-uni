<frame/>

#  Switch 开关


## 基本用法

`v-model` 为绑定值，默认为 boolean 类型。

```html
<wd-switch v-model="checked" />
```

```typescript
const checked = ref<boolean>(true)
```

## 修改值

通过 `active-value` 属性修改开关打开时的值，`inactive-value` 属性修改开关关闭时的值。

```html
<wd-switch v-model="checked" active-value="沃特" inactive-value="商家后台" />
```

## 修改颜色

通过 `active-color` 属性修改开关打开时的颜色，`inactive-color` 属性修改开关关闭时的颜色。

```html
<wd-switch v-model="checked" active-color="#13ce66" inactive-color="#f00" />
```

## 自定义大小

设置 `size` 修改开关大小。

```html
<wd-switch v-model="checked" size="24px" />
```

## 禁用

设置 `disabled` 属性。

## 修改前钩子

设置 `before-change` 属性，修改前钩子，接收 { value, resolve } 参数，`resolve(true)` 表示修改通过，`resolve(false)` 表示不修改。

```html
<wd-switch v-model="checked" :before-change="beforeChange" @change="handleChange" />
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'

const message = useMessage()

const beforeChange = ({ value, resolve }) => {
  message
    .confirm('是否切换开关')
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      resolve(false)
    })
}
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| v-model |	绑定值 |	boolean / string / number | - |	-  | - |
| disabled | 禁用 | boolean | - | false | - |
| active-value | 打开时的值 | boolean / string / number | - | true | - |
| inactive-value | 关闭时的值 | boolean / string / number | - | false | - |
| active-color | 打开时的背景色 | string | - | #4D80F0 | - |
| inactive-color | 关闭时的背景色，默认为白色，所以有灰色边框，如果设置了该值，则会自动去除灰色边框 | string | - | #fff | - |
| size | 开关大小，可以为任何单位的字符串尺寸 | string/number | - | 28px | - |
| before-change | 修改前钩子 | function | - | - | - |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| change | 值修改事件 | `{ value }` | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | 根节点样式 | - |
