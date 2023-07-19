## SwipeAction 滑动操作

:::warning
滑动操作组件对页面的功能隐藏较深，用户难以发现，建议使用其他交互方式来实现操作功能，比如列表项有个按钮，点击按钮弹出 ActionSheet。

如果坚持要使用滑动操作组件，建议在用户进入页面时加上操作提示以提示用户列表项可以左右滑动。
:::

### 引入

```json
{
  "usingComponents": {
    "wd-swipe-action": "/wot-design/swipeAction/index"
  }
}
```

### 基本用法

`wd-swipe-action`分为三部分：'自定义左按钮内容'、'自定义内容'、'自定义右按钮内容'。自定义按钮内容需要设置`slot`开启，自定义内容为默认插槽，无需手动开启。

因为小程序组件无法监听点击自己以外的地方，为了在点击页面其他地方时，可以自动关闭 swipeAction ，建议引入组件库的 clickoutside 函数（会关闭所有 dropmenu、popover、toast、swipeAction），在页面的根元素上监听点击事件的冒泡。

:::warning
如果存在用户手动点击 swipeAction 以外某个地方如按钮滑出 swipeAction 的场景，则需要在点击的元素（在这里上按钮）加上 catchtap 阻止事件冒泡到根元素上，避免触发 clickoutside 把要手动打开的 swipeAction 关闭了。
:::

```html
<view catchtap="clickoutside">
  <wd-swipe-action>
    <wd-cell title="标题文字" value="内容"/>
    <view slot="right" class="action">
      <view class="button" style="background: #C8C7CD;" bindtap="handleAction" data-action="操作1">操作1</view>
      <view class="button" style="background: #FFB300;" bindtap="handleAction" data-action="操作2">操作2</view>
      <view class="button" style="background: #E2231A;" bindtap="handleAction" data-action="操作3">操作3</view>
    </view>
  </wd-swipe-action>
</view>
```
```javascript
import Toast from '/wot-design/toast/toast'
import clickoutside from '/wot-design/common/clickoutside'

Page({
  handleAction (event) {
    Toast(`点击了${event.target.dataset.action}`)
  },
  clickoutside: clickoutside
})
```
```css
.action {
  height: 100%;
}
.button{
  display: inline-block;
  padding: 0 11px;
  height: 100%;
  color: white;
  line-height: 42px;
}
```

### 左右滑动

> `wd-swipe-action`组件提供`left`/`right`两个滑动按钮，通过设置插槽`slot="left"`和`slot="right"`开启

```html
<wd-swipe-action>
  <view slot="left" class="action">
    <view class="button" style="background: #C8C7CD;">操作1</view>
    <view class="button" style="background: #FFB300;">操作2</view>
    <view class="button" style="background: #E2231A;">操作3</view>
  </view>
  <wd-cell title="标题文字" value="内容" />
  <view slot="right" class="action">
    <view class="button" style="background: #cdb86e;">操作4</view>
    <view class="button" style="background: #42ffd1;">操作5</view>
    <view class="button" style="background: #383fe2;">操作6</view>
  </view>
</wd-swipe-action>
```

### 切换按钮

> 可以通过设置`value`来控制开启关闭滑动按钮，可选值为:`left`、`close`、`right`分别表示："打开左滑动按钮"、"关闭滑动按钮""打开右滑动按钮"

```html
<wd-swipe-action value="{{value}}">
  <view slot="left" class="action">
    <view class="button" style="background: #C8C7CD;">操作1</view>
    <view class="button" style="background: #FFB300;">操作2</view>
    <view class="button" style="background: #E2231A;">操作3</view>
  </view>
  <wd-cell title="标题文字" value="内容"/>
  <view slot="right" class="action">
    <view class="button" style="background: #cdb86e;">操作4</view>
    <view class="button" style="background: #42ffd1;">操作5</view>
    <view class="button" style="background: #383fe2;">操作6</view>
  </view>
</wd-swipe-action>

<view class="button-group">
  <wd-button data-value='left' bindclick="changeState">打开左边</wd-button>
  <wd-button data-value='close' bindclick="changeState">关闭所有</wd-button>
  <wd-button data-value='right' bindclick="changeState">打开右边</wd-button>
</view>
```
```javascript
Page({
  data: {
    value: 'close'
  },
  changeState (event) {
    const { value } = event.target.dataset
    this.setData({ value })
  }
})
```

### 按钮关闭前的钩子函数

> 通过`before-close`属性传入一个函数，注意传入的变量必须定义在`data`在。回调函数会在滑动按钮关闭前执行。

钩子函数接收两个参数:`reason`、`position`。
`reason`表示滑动按钮关闭的原因，值为:`click`、`swipe`、`value`，分别代表:点击关闭按钮、滑动关闭按钮、通过控制`value`关闭按钮;
`position`代表被关闭的操作按钮，值为：`left`、`right`。当`reason`为`click`时，表示点击`position`位置关闭滑动按钮，值为：`left`、`right`、`inside`。

```html
<demo-block transparent title="切换按钮">
  <wd-swipe-action value="{{value}}" before-close="{{beforeClose}}">
    <view slot="left" class="action">
      <view class="button" style="background: #C8C7CD;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #E2231A;">操作3</view>
    </view>
    <wd-cell title="标题文字" value="内容"/>
    <view slot="right" class="action">
      <view class="button" style="background: #cdb86e;">操作4</view>
      <view class="button" style="background: #42ffd1;">操作5</view>
      <view class="button" style="background: #383fe2;">操作6</view>
    </view>
  </wd-swipe-action>

  <view class="button-group">
    <wd-button data-value='left' bindclick="changeState">打开左边</wd-button>
    <wd-button data-value='close' bindclick="changeState">关闭所有</wd-button>
    <wd-button data-value='right' bindclick="changeState">打开右边</wd-button>
  </view>
</demo-block>
```
```javascript
import Toast from '../../dist/toast/toast'

Page({
  data: {
    value: 'close',
    beforeClose (reason, position) {
      Toast(`${reason}导致${position}操作按钮关闭`)
    }
  },
  changeState (event) {
    const { value } = event.target.dataset
    this.setData({ value: value })
  }
})
```

### 点击事件

> `click`事件只会在关闭滑动按钮时触发。

回调函数的参数表示点击的位置，其中`left`、`right`表示点击了左右滑动按钮，`inside`表示点击了容器内按钮以外的地方。

```html
  <wd-swipe-action bind:click="handleClick">
    <wd-cell title="标题文字" value="内容"/>
    <view slot="right" class="action">
      <view class="button" style="background: #C8C7CD;">操作1</view>
      <view class="button" style="background: #FFB300;">操作2</view>
      <view class="button" style="background: #E2231A;">操作3</view>
    </view>
  </wd-swipe-action>
```
```javascript
import Toast from '../../dist/toast/toast'

Page({
  handleClick (event) {
    Toast(`点击${event.detail.value}关闭操作按钮`)
  }
})
```

### 禁用滑动按钮

> 设置`disabled`属性禁用滑动

```html
<wd-swipe-action disabled>
  <wd-cell title="标题文字" value="内容" />
  <view slot="right" class="action">
    <view class="button" style="background: #C8C7CD;">操作1</view>
    <view class="button" style="background: #FFB300;">操作2</view>
    <view class="button" style="background: #E2231A;">操作3</view>
  </view>
</wd-swipe-action>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| value | 滑动按钮的状态 | string | left / close / right | close | - |
| disabled | 是否禁用滑动操作 | boolean | - | false | - |
| before-close | 关闭滑动按钮前的钩子函数 | function | - | - | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| bind:click | 当滑动按钮打开时，点击整个滑动操作容器触发click事件 | event.detail= {value}, value 可能为 'left'、'inside'、'right' | - |

### Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| left | 自定义左按钮 | - |
| default | 自定义内容 | - |
| right | 自定义右按钮 | - |

### Cell 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | 根结点样式 | - |
