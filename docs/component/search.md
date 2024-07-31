<frame/>

# Search 搜索框

## 基本用法

`v-model`设置输入框绑定值、`focus`绑定聚焦事件、`change` 绑定输入事件，`blur`绑定失焦事件，`search` 绑定搜索事件，`cancel` 绑定取消事件，`clear` 绑定清空事件。

```html
<wd-search v-model="value" @focus="focus" @blur="blur" @search="search" @clear="clear" @cancel="cancel" @change="change" maxlength="10" />
```

```typescript
const value = ref<string>('')

function focus() {
  console.log('聚焦')
}
function blur() {
  console.log('失焦')
}
function search() {
  console.log('搜索')
}
function clear() {
  console.log('重置')
}
function cancel() {
  console.log('取消')
}
function change({ value }) {
  console.log('输入', value)
}
```

## 浅色主题

设置 `light` 属性，将组件背景色和输入框背景色反转。

```html
<wd-search light />
```

## 输入框提示文案靠左

设置 `placeholder-left` 属性。

```html
<wd-search placeholder-left />
```

## 隐藏取消按钮

设置 `hide-cancel` 属性。

```html
<wd-search hide-cancel />
```

## 禁用

设置 `disabled` 属性。

```html
<wd-search disabled />
```

可以和 `hide-cancel` 结合使用，用于在本页只展示搜索框，当点击搜索框时，将页面路由切换进搜索页，在搜索页中再使用搜索功能。

```html
<wd-search hide-cancel disabled />
```

## 自定义左侧插槽

通过使用 `prefix` 插槽自定义搜索框左侧内容。

```html
<wd-search v-model="value">
  <template #prefix>
    <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
      <view class="search-type">
        <text>{{ searchType }}</text>
        <wd-icon custom-class="icon-arrow" name="fill-arrow-down"></wd-icon>
      </view>
    </wd-popover>
  </template>
</wd-search>
```

```typescript
const searchType = ref<string>('全部')
const value = ref<string>('')
const menu = ref([
  {
    content: '全部'
  },
  {
    content: '订单号'
  },
  {
    content: '退款单号'
  }
])

function changeSearchType({ item, index }) {
  searchType.value = item.content
}
```

```scss
.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;
}
.search-type::after {
  position: absolute;
  content: '';
  width: 1px;
  right: 0;
  top: 5px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.25);
}
.search-type {
  :deep(.icon-arrow) {
    display: inline-block;
    font-size: 20px;
    vertical-align: middle;
  }
}
```

## 自定义文案

通过设置 `placeholder` 修改输入框提示文案，`cancel-txt` 修改取消按钮文案。

```html
<wd-search placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
```


## Attributes

| 参数                | 说明                                                                                      | 类型            | 可选值 | 默认值 | 最低版本 |
| ------------------- | ----------------------------------------------------------------------------------------- | --------------- | ------ | ------ | -------- |
| placeholder         | 搜索框占位文本                                                                            | string          | -      | 搜索   | -        |
| placeholder-left    | placeholder 居左边                                                                        | boolean         | -      | false  | -        |
| cancel-txt          | 搜索框右侧文本                                                                            | string          | -      | 取消   | -        |
| light               | 搜索框亮色（白色）                                                                        | boolean         | -      | false  | -        |
| hide-cancel         | 是否隐藏右侧文本                                                                          | boolean         | -      | false  | -        |
| disabled            | 是否禁用搜索框                                                                            | boolean         | -      | false  | -        |
| maxlength           | 原生属性，设置最大长度。-1 表示无限制                                                     | string / number | -      | -1     | -        |
| v-model             | 输入框内容，双向绑定                                                                      | string          | -      | -      | -        |
| ~~use-suffix-slot~~ | ~~是否使用输入框右侧插槽~~**（已废弃，将在下一个 minor 版本被移除，直接使用插槽即可）** | boolean         | -      | false  | -        |
| focus               | 是否自动聚焦                                                                              | boolean         | -      | false  | 0.1.63   |
| focusWhenClear      | 是否在点击清除按钮时聚焦输入框                                                            | boolean         | -      | false  | 0.1.63   |

## Events

| 事件名称 | 说明                       | 参数        | 最低版本 |
| -------- | -------------------------- | ----------- | -------- |
| focus    | 输入框聚焦事件             | `{ value }` | -        |
| blur     | 监听输入框失焦事件         | `{ value }` | -        |
| search   | 监听输入框搜索事件         | `{ value }` | -        |
| clear    | 监听输入框清空按钮事件     | -           | -        |
| cancel   | 监听输入框右侧文本点击事件 | `{ value }` | -        |
| change   | 监听输入框内容变化事件     | `{ value }` | -        |

## Slots

| name   | 说明                 | 最低版本 |
| ------ | -------------------- | -------- |
| prefix | 输入框左侧自定义内容 | -        |
| suffix | 输入框右侧自定义内容 | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
