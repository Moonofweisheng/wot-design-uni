---
url: 'https://wot-design-uni.cn/component/keyboard.md'
---
# Keyboard 虚拟键盘 1.3.10

虚拟数字键盘，用于输入数字、密码、身份证或车牌号等场景。

## 基本用法

可以通过 `v-model:visible` 控制键盘是否展示。

```html
<wd-cell title="默认键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 带右侧栏的键盘

将 `mode` 属性设置为 `custom` 来展示键盘的右侧栏，常用于输入金额的场景。

```html
<wd-cell title="带右侧栏的键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" extra-key="." close-text="完成" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 身份证键盘

通过 `extra-key` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extra-key` 设置为 `X`。

```html
<wd-cell title="身份证键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="X" close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 车牌号键盘

将 `mode` 属性设置为 `car` 来展示车牌号键盘，常用于输入车牌号的场景。

```html
<wd-cell title="车牌号键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 带标题的键盘

通过 `title` 属性可以设置键盘标题。

```html
<wd-cell title="带标题的键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" title="输入密码" extra-key="." close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 使用 slot 自定义标题

```html
<wd-cell title="使用 slot 自定义标题" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="." close-text="完成" @input="onInput" @delete="onDelete">
  <template #title>
    <text style="color: red">自定义标题</text>
  </template>
</wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 多个额外按键

当 `mode` 为 `custom` 时，支持以数组的形式配置两个 `extra-key`。

```html
<wd-cell title="多个额外按键" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" :extra-key="['00', '.']" close-text="完成" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 随机数字键盘

通过 `random-key-order` 属性可以随机排序数字键盘，常用于安全等级较高的场景。

```html
<wd-cell title="随机数字键盘" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" random-key-order @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 双向绑定

可以通过 `v-model` 绑定键盘当前输入值，并通过 `maxlength` 属性来限制输入长度。

```html
<wd-cell title="双向绑定" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard
  v-model="value1"
  :maxlength="6"
  v-model:visible="visible"
  title="键盘标题"
  extra-key="."
  close-text="完成"
  @input="onInput"
  @delete="onDelete"
></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## 展示蒙层遮罩

`hideOnClickOutside`控制键盘弹窗是否有遮罩，通过`modal`控制遮罩是否为透明。

::: tip 提示
当前`modal`仅控制遮罩是否为透明，`hideOnClickOutside`控制弹窗是否有遮罩，当存在遮罩时，点击遮罩就可以关闭键盘，但是键盘展开时必须点击遮罩关闭当前键盘后才可以再点击别的按钮。也可以关闭`hideOnClickOutside`，手动控制键盘是否展示来实现点击外部时收起键盘，这样更灵活。
:::

```html
<wd-cell title="双向绑定" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard :modal="true" :hide-on-click-outside="true" v-model:visible="visible" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('删除')
```

## Attributes

| 参数                | 说明                     | 类型                  | 可选值                     | 默认值     | 最低版本         |
| ------------------- | ------------------------ | --------------------- | -------------------------- | ---------- | ---------------- |
| v-model:visible     | 是否展开                 | `boolean`             | -                          | `false`    | 1.3.10           |
| v-model             | 绑定的值                 | `string`              | -                          | -          | 1.3.10           |
| title               | 标题                     | `string`              | -                          | -          | 1.3.10           |
| mode                | 键盘模式                 | `string`              | `default`, `car`, `custom` | `default`  | 1.3.10 |
| zIndex              | 层级                     | `number`              | -                          | `100`      | 1.3.10           |
| maxlength           | 最大长度                 | `number`              | -                          | `Infinity` | 1.3.10           |
| showDeleteKey       | 是否显示删除键           | `boolean`             | -                          | `true`     | 1.3.10           |
| randomKeyOrder      | 是否随机键盘按键顺序     | `boolean`             | -                          | `false`    | 1.3.10           |
| closeText           | 确认按钮文本             | `string`              | -                          | -          | 1.3.10           |
| deleteText          | 删除按钮文本             | `string`              | -                          | -          | 1.3.10           |
| closeButtonLoading  | 关闭按钮是否显示加载状态 | `boolean`             | -                          | `false`    | 1.3.10           |
| modal               | 是否显示蒙层遮罩         | `boolean`             | -                          | `false`    | 1.3.10           |
| hideOnClickOutside  | 是否在点击外部时收起键盘 | `boolean`             | -                          | `true`     | 1.3.10           |
| lockScroll          | 是否锁定滚动             | `boolean`             | -                          | `true`     | 1.3.10           |
| safeAreaInsetBottom | 是否在底部安全区域内     | `boolean`             | -                          | `true`     | 1.3.10           |
| extraKey            | 额外按键                 | `string` / `string[]` | -                          | -          | 1.3.10           |

## Slot

| name  | 说明 | 类型 | 最低版本 |
| ----- | ---- | ---- | -------- |
| title | 标题 | -    | 1.2.12   |

## Events

| 事件名称 | 说明                           | 参数        | 最低版本 |
| -------- | ------------------------------ | ----------- | -------- |
| input    | 点击按键时触发                 | key: string | -        |
| delete   | 点击删除键时触发               | -           | -        |
| close    | 点击关闭按钮或非键盘区域时触发 | -           | -        |

## 外部样式类

| 类名         | 说明         | 最低版本 |
| ------------ | ------------ | -------- |
| custom-class | 根节点样式类 | 1.3.10   |
| custom-style | 根节点样式   | 1.3.10   |
