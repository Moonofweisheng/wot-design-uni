<frame/>

# Popover 气泡

常用于展示提示信息。

## 基本用法

Popover 的属性与 [Tooltip](/component/tooltip.html) 很类似，因此对于重复属性，请参考 [Tooltip](/component/tooltip.html) 的文档，在此文档中不做详尽解释。

因为`uni-app`组件无法监听点击自己以外的地方，为了在点击页面其他地方时，可以自动关闭 `popover` ，建议使用组件库的 `useQueue` hook（会关闭所有 dropmenu、popover、toast、swipeAction、fab），在页面的根元素上监听点击事件的冒泡。

:::warning
如果存在用户手动点击 `popover` 以外某个地方如按钮弹出 `popover` 的场景，则需要在点击的元素（在这里上按钮）加上 click 阻止事件冒泡到根元素上，避免触发 `closeOutside` 把要手动打开的 `popover` 关闭了。
:::

```html
<view @click="closeOutside">
  <wd-popover content="这是一段信息。" @change="handleChange">
    <wd-button>点击展示</wd-button>
  </wd-popover>
</view>
```

```typescript
import { useQueue } from '@/uni_modules/wot-design-uni'

const { closeOutside } = useQueue()
function handleChange1({ show }) {
  console.log(show)
}
```

## 模式 mode

使用 `mode` 属性控制当前文字提示的展示模式。`mode` 可选参数为 `normal` / `menu`：

- **normal**（普通文字模式）:

  - 当 `mode` 处于默认状态，`content` 属性传入要显示的 `String` 字符串。

- **menu**（列表模式）:
  - 文字提示框会展示成列表形式，此时 `content` 属性传入 `Array` 类型，数组内对象数据结构如下方列表所示。
  - 绑定事件 `menuclick`，在选择结束后，执行操作，列表关闭。

列表模式下 `content` 数组内对象的数据结构：

| 键名                                  | 说明   | 类型   | 是否必填 | 最低版本 |
| ------------------------------------- | ------ | ------ | -------- | -------- |
| content                               | 选项名 | string | 是       | -        |
| iconClass（不设置该属性时只展示标题） | 选项值 | string | 否       | -        |

**注意：iconClass 属性值为组件库内部的 icon 图标名。**

```html
<wd-popover mode="menu" :content="menu" @menuclick="link" @change="handleChange">
  <wd-button>列表</wd-button>
</wd-popover>
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const menu = ref<Array<Record<string, any>>>([
  {
    iconClass: 'read',
    content: '全部标记已读'
  },
  {
    iconClass: 'delete',
    content: '清空最近会话'
  },
  {
    iconClass: 'detection',
    content: '消息订阅设置'
  },
  {
    iconClass: 'subscribe',
    content: '消息异常检测'
  }
])

function link(e) {
  toast.show('选择了' + e.item.content)
}
```

## 嵌套信息

开启属性 `use-content-slot`，使用插槽 `content`， 可以在 Popover 中嵌套多种类型信息。
:::warning 注意
目前使用`content`插槽时，组件内部无法正确获取气泡的宽高，此时设置偏移的`placement`无法生效，例如`bottom-end`。
:::

```html
<wd-popover use-content-slot>
  <template #content>
    <view class="pop-content">这是一段自定义样式的内容。</view>
  </template>
  <wd-button>点击展示</wd-button>
</wd-popover>
```

```scss
.pop-content {
  /* 必填 开始 */
  position: relative;
  z-index: 500;
  border-radius: 4px;
  /* 必填 结束 */
  background: #fff;
  color: #8268de;
  font-weight: bolder;
  padding: 10px;
  width: 150px;
}
```

## Popover Attributes

| 参数          | 说明                                       | 类型                                                         | 可选值                                                                                                                          | 默认值 | 最低版本 |
| ------------- | ------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- |
| v-model         | 手动状态是否可见                           | boolean                                                      | -                                                                                                                               | false  | -        |
| content       | 显示的内容，也可以通过 `slot#content` 传入 | string/array（当模式为菜单模式时，content 属性格式为 Array） | -                                                                                                                               | -      | -        |
| mode          | 当前显示的模式，决定内容的展现形式         | string                                                       | normal（普通模式）/ menu（菜单模式）                                                                                            | normal | -        |
| placement     | popover 的出现位置                         | string                                                       | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom | -        |
| visible-arrow | 是否显示 popover 箭头                      | boolean                                                      | -                                                                                                                               | true   | -        |
| disabled      | popover 是否可用                           | boolean                                                      | -                                                                                                                               | false  | -        |
| offset        | 出现位置的偏移量                           | number                                                       | -                                                                                                                               | 0      | -        |

## Slot

| name    | 说明                     | 最低版本 |
| ------- | ------------------------ | -------- |
| content | 多行内容或用户自定义样式 | -        |

## Events

| 事件名称       | 说明                        | 回调参数          | 最低版本 |
| -------------- | --------------------------- | ----------------- | -------- |
| open      | 显示时触发                  | -                 | -        |
| close     | 隐藏时触发                  | -                 | -        |
| change    | pop 显隐值变化时触发        | -                 | -        |
| menuclick | menu 模式下点击某一选项触发 | `{ item, index }` | -        |

## Methods

| 方法名称 | 说明             | 参数 | 最低版本 |
| -------- | ---------------- | ---- | -------- |
| open     | 打开文字提示弹框 | -    | -        |
| close    | 关闭文字提示弹框 | -    | -        |

## Popover 外部样式类

| 类名         | 说明         | 最低版本 |
| ------------ | ------------ | -------- |
| custom-class | 根节点样式   | -        |
| custom-arrow | 尖角样式     | -        |
| custom-pop   | 文字提示样式 | -        |
