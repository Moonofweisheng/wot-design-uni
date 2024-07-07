<frame/>

# Cell 单格

## 基本用法

`Cell` 可以单独使用，也可以和 `CellGroup` 组合使用。

```html
<wd-cell title="标题文字" value="内容" />

<wd-cell-group>
  <wd-cell title="标题文字" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

## 图标设置

设置 `icon` 属性，值可以为 Icon 章节中的图标名，也可以通过 icon 的 slot 自定义图标位置。

> 自定义图标，如果有多个 cell，需保证所有图标的宽度是一致的且垂直居中。使用 icon 属性且为 Icon 章节的字体图标，则宽度会自动一致且垂直居中；cell 图标的大小是宽 16px，高 16px，large 尺寸图标宽度 18px，高度 18px，距离右侧文字距离 15px。如果使用插槽，可以通过`custom-icon-class`进行设置。

```html
<wd-cell-group>
  <wd-cell title="标题文字" value="内容" icon="setting" />
  <wd-cell title="标题文字" value="内容">
    <template #icon>
      <view class="cell-icon"></view>
    </template>
  </wd-cell>
</wd-cell-group>
```

```scss
.cell-icon {
  display: block;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png') no-repeat;
  background-size: cover;
}
```

## 分组标题

可以在 `cell-group` 上设置 `title` 和 `value` 属性。

```html
<wd-cell-group title="交易管理" value="内容">
  <wd-cell title="标题文字" value="内容" />
  <wd-cell title="标题文字" label="描述信息" value="内容" />
</wd-cell-group>
```

## 单元格大小

通过设置 `size` 修改单元格大小，将 `size` 设置为 'large' 时左侧标题字号为 16px。

```html
<wd-cell size="large" title="标题文字" value="内容" />
```

## 展示边框线

在 `wd-cell-group` 上设置 `border` 属性，会给每个 cell 加上边框，最后一个 cell 则不展示边框，其他具有 `cell` 类型的表单组件也支持边框展示，如 input、picker。

```html
<wd-cell-group title="交易管理" border>
  <wd-cell title="标题文字" value="内容"></wd-cell>
  <wd-cell title="标题文字" label="描述信息" value="内容"></wd-cell>
</wd-cell-group>
```

## 点击反馈

通过设置 `clickable` 开启点击反馈，之后可以监听`click`事件。

```html
<wd-toast />
<wd-cell title="标题文字" value="内容" clickable @click="toast" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()

function showToast() {
  toast.show('点击')
}
```

## 页面跳转

通过设置 `is-link` 属性显示导航箭头和点击态，设置 `to` 属性，指定跳转地址，可以设置 replace 替换掉历史堆栈中的当前页面。

`is-link`会默认开启`clickable`。

```html
<wd-cell title="帮助与反馈" is-link to="/pages/index/index" />
<wd-cell title="设置" value="内容" is-link to="/pages/button/index" replace></wd-cell>
```

可以只设置 `is-link` 用于展示右箭头和点击态。

```html
<wd-cell title="帮助与反馈" is-link></wd-cell>
```

## 垂直居中

通过设置 `center` 设置内容垂直居中对齐，默认顶部居中。

```html
<wd-cell title="标题文字" value="内容" center></wd-cell>
```

## 表单属性 - 必填

设置 `required` 属性。

```html
<wd-cell title="必填" required>
  <wd-rate v-model="rate" change="handleRateChange"></wd-rate>
</wd-cell>
```

```typescript
const rate = ref(0)

function handleRateChange({ value }) {
  console.log(value)
}
```

## 表单属性 - 上下结构

设置 `vertical` 属性。

```html
<wd-cell title="上下结构" vertical>
  <wd-slider v-model="slider" change="handleSliderChange"></wd-slider>
</wd-cell>
```

```typescript
const slider = ref('')
function handleSliderChange({ value }) {
  console.log(value)
}
```

## 设置左侧宽度

设置 `title-width` 属性，label 内容超出则会 ... 隐藏，如果有个性化需求，使用插槽实现。

```html
<wd-cell title="标题文字" label="这里是文字描述这里是文字描述这里是文字描述" title-width="200px" value="内容" />
```

## 自定义内容

`cell` 提供了 `icon`、`title`、`label`和默认 value 的插槽。

```html
<wd-cell-group>
  <wd-cell title="标题文字" center>
    <wd-button custom-class="custom-value" size="small" plain>按钮</wd-button>
  </wd-cell>
  <wd-cell title="标题文字" center>
    <view class="custom-value" style="height: 32px;">
      <wd-switch v-model="switchValue" change="handleSwitchChange" />
    </view>
  </wd-cell>
  <wd-cell title="标题文字" is-link to="/pages/index/index">
    <view class="custom-text">订购</view>
  </wd-cell>
  <wd-cell>
    <template #title>
      <view>
        <view style="display: inline-block">标题文字</view>
        <view class="end-time">25天后到期</view>
      </view>
    </template>
  </wd-cell>
</wd-cell-group>
```

```typescript
const switchValue = ref('')
function handleSwitchChange({ value }) {
  console.log(value)
}
```

```scss
.cell-icon {
  display: block;
  box-sizing: border-box;
  padding: 4px 0;
  width: 16px;
  height: 24px;
  margin-right: 4px;
  background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png') no-repeat;
  background-size: cover;
}
:deep(.custom-value) {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  white-space: nowrap;
}
.custom-text {
  color: #f0883a;
}
.end-time {
  display: inline-block;
  margin-left: 8px;
  border: 1px solid #faa21e;
  padding: 0 4px;
  font-size: 10px;
  color: #faa21e;
}
```

## CellGroup Attributes

| 参数     | 说明           | 类型    | 可选值 | 默认值 | 最低版本 |
| -------- | -------------- | ------- | ------ | ------ | -------- |
| title    | 分组标题       | string  | -      | -      | -        |
| value    | 分组右侧内容   | string  | -      | -      | -        |
| border   | 是否展示边框线 | string  | -      | -      | -        |
| use-slot | 分组启用插槽   | boolean | -      | false  | -        |

## Cell Attributes

| 参数        | 说明                           | 类型    | 可选值 | 默认值 | 最低版本 |
| ----------- | ------------------------------ | ------- | ------ | ------ | -------- |
| title       | 标题                           | string  | -      | -      | -        |
| value       | 右侧内容                       | string  | -      | -      | -        |
| icon        | 图标类名                       | string  | -      | -      | -        |
| label       | 描述信息                       | string  | -      | -      | -        |
| is-link     | 是否为跳转链接                 | boolean | -      | false  | -        |
| to          | 跳转地址                       | string  | -      | -      | -        |
| clickable   | 开启点击反馈，is-link 默认开启 | boolean | -      | false  | -        |
| replace     | 跳转时是否替换栈顶页面         | boolean | -      | false  | -        |
| size        | 设置单元格大小                 | string  | large  | -      | -        |
| title-width | 设置左侧标题宽度               | string  | -      | -      | -        |
| center      | 是否垂直居中，默认顶部居中     | boolean | -      | false  | -        |
| required    | 表单属性，必填                 | boolean | -      | false  | -        |
| vertical    | 表单属性，上下结构             | boolean | -      | false  | -        |
| prop | 表单域 `model` 字段名，在使用表单校验功能的情况下，该属性是必填的 | string | - | - | - |
| rules | 表单验证规则，结合`wd-form`组件使用	 | `FormItemRule []`	 | - | `[]` | - |

### FormItemRule 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否为必选字段	 | `boolean` |
| message | 错误提示文案	 | `string` |
| validator | 通过函数进行校验，可以返回一个 `Promise` 来进行异步校验 | `(value, rule) => boolean \| Promise` |
| pattern | 通过正则表达式进行校验，正则无法匹配表示校验不通过 | `RegExp` |


## Cell Events

| 事件名称 | 说明                                             | 参数 | 最低版本 |
| -------- | ------------------------------------------------ | ---- | -------- |
| click    | 当 clickable 或 is-link 为 true 时点击单元格触发 | -    | -        |

## CellGroup Slot

> CellGroup 必须首先开启`use-slot`,插槽才生效。使用插槽时请通过外部自定义样式类来控制样式。

| name  | 说明         | 最低版本 |
| ----- | ------------ | -------- |
| title | 分组标题     | -        |
| value | 分组右侧内容 | -        |

## Cell Slot

| name    | 说明                                      | 最低版本 |
| ------- | ----------------------------------------- | -------- |
| title   | 标题                                      | -        |
| default | 右侧内容，使用时不需要设置 `#default` | -        |
| icon    | 图标                                      | -        |
| label   | 描述信息                                  | -        |

## CellGroup 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |

## Cell 外部样式类

| 类名               | 说明                           | 最低版本 |
| ------------------ | ------------------------------ | -------- |
| custom-class       | 根节点样式                     | -        |
| custom-icon-class  | icon 使用 slot 时的自定义样式  | -        |
| custom-label-class | label 使用 slot 时的自定义样式 | -        |
| custom-value-class | value 使用 slot 时的自定义样式 | -        |
| custom-title-class | title 使用 slot 时的自定义样式 | -        |
