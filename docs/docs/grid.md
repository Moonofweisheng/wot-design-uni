# Grid 宫格

### 引入

```json
{
  "usingComponents": {
    "wd-grid": "/wot-design/grid/index",
    "wd-grid-item": "/wot-design/gridItem/index"
  }
}
```

## 代码演示

### 基础用法

基础用法需要绑定 `icon` 值以及 `text` 属性。默认显示一行。

`icon` 为 `wd-icon` 标签中的 `name` 属性。

```html
<wd-grid>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
</wd-grid>
```

### 自定义列数

`column` 可以用来自定义宫格列数。未定义 `column` 属性时，默认显示为一行，定义该属性后，组件内部根据 `column` 属性自行划分行数。

```html
<wd-grid column="3">
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
</wd-grid>
```

### 自定义背景颜色

`bg-color` 可以用来自定义宫格背景颜色。

```html
<wd-grid bg-color="rgba(0, 0, 0, 0.02)">
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
</wd-grid>
```

### 开启边框

`border` 可以用来开启边框线展示。

```html
<wd-grid border column="3">
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
</wd-grid>
```

### 内容插槽

通过默认插槽可以自定义 `GridItem` 的内容。

使用默认插槽过程中, 开启 `GridItem` 上的属性 `use-slot`。

```html
<wd-grid>
  <wd-grid-item use-slot>
    <image class="img" src="{{ joy }}" />
  </wd-grid-item>
  <wd-grid-item use-slot>
    <image class="img" src="{{ joy }}" />
  </wd-grid-item>
  <wd-grid-item use-slot>
    <image class="img" src="{{ joy }}" />
  </wd-grid-item>
</wd-grid>
```

```css
.img{
  width: 100%;
  height: 90px;
}
```

### 单个插槽

通过插槽 `icon` 可以插入 `GridItem` 中的图标位。通过 `use-icon-slot` 开启图标插槽。

通过插槽 `text` 可以插入 `GridItem` 中的文字位。通过 `use-text-slot` 开启文字插槽。

注意:

1. 使用单个插槽或者自定义样式时，需要用户使用 `custom-class` 控制 每一个  `GridItem` 的高度，保证每一个 `GridItem` 的高度相同且符合用户预期。

2. 使用icon插槽时，如果插槽大小超过`icon-size`设置的值时，需要调整`icon-size`属性使其大小等于插槽尺寸。

```html
<wd-grid >
  <wd-grid-item use-icon-slot text="文字" wx:for="{{ 3 }}" wx:key="*this" icon-size="36px">
    <image slot="icon" class="slot-img" src="{{ joy }}" />
  </wd-grid-item>
</wd-grid>
<wd-grid>
  <wd-grid-item use-text-slot icon="picture" wx:for="{{ 3 }}" wx:key="*this" >
    <view slot="text" class="text">自定义文字插槽</view>
  </wd-grid-item>
</wd-grid>
```

```css
.slot-img{
  height: 36px;
  width: 36px;
  border-radius: 4px;
}
.text{
  color: #ffb300;
  margin-top: 8px;
}
```

### 自定义样式

通过设置 `custom-class` 可以自定义 `GridItem` 的样式。

可以在 `custom-class` 样式属性中设定 `GridItem` 的宽、高度等属性。

注意:

* 设定宽高这类可能会影响布局的属性时，请将 `custom-class` 作用到当前 `Grid` 下的所有 `GridItem` 以确保所有 `GridItem` 样式相同。

* **如果想改变 `GridItem` 高度, 不要直接设置 `Grid` 的高度, 修改单独的** `GridItem`。

* **如果想改变 `icon` 大小设置 `icon-size` 属性, `custom-icon` 不能改变当前icon宽高。**

```html
<wd-grid>
  <wd-grid-item custom-class="custom-item" icon="search" text="京东JD.COM-专业的综合网上购物商城，销售超数万品牌、4020万种商品，囊括家电、手机、电脑、母婴、服装等13大品类。" />
  <wd-grid-item custom-class="custom-item" icon="person" text="秉承客户为先的理念，京东所售商品为正品行货、全国联保、机打发票。" />
</wd-grid>
```

```css
.custom-item{
  height: 80px !important;
  color: #e2231a;
  padding-left: 20px;
  text-align: left !important;
}
```

### 正方形格子

通过 `square` 属性开启正方形格属性。此时显示每一个 `GridItem` 都为正方形。

注意: 使用 `square` 不要自定义 `GridItem` 的高度样式。

```html
<wd-grid square column="3">
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
</wd-grid>
```

### 设定格间隙

通过 `gutter` 属性设置格子之间的距离。

```html
<wd-grid gutter="10" column="3">
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
  <wd-grid-item icon="picture" text="文字"/>
</wd-grid>
```

### 页面导航

通过 `clickable` 属性开启可点击状态, 可以绑定 `click` 事件。

通过 `link-type` 属性设置页面跳转方式。

通过 `url` 属性设置跳转链接, 通过 `url` 属性设置 URL 跳转链接。

```html
<wd-grid clickable>
  <wd-grid-item link-type="redirectTo" url="/pages/button/index" bind:itemclick="click" icon="search" text="Redirect to ..." />
  <wd-grid-item link-type="navigateTo" url="/pages/button/index" bind:itemclick="click" icon="setting" text="Navigate to ..." />
</wd-grid>
```

### 提示信息

设置 `is-dot` 属性后，会在图标右上角展示一个小红点。

设置 `type` | `max` | `value` , 使用方式同组件 `wd-badge` 中的同名属性。

```html
<wd-grid>
  <wd-grid-item is-dot icon="goods" text="文字" />
  <wd-grid-item value="100" max="99" icon="computer" text="文字" />
</wd-grid>
```

### Grid Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| column | 列数 | number | - | - | - |
| border | 是否显示边框 | boolean | - | false | - |
| gutter | 格子之间的间距，默认单位为`px` | number | - | - | - |
| square | 是否将格子固定为正方形 | boolean | - | false | - |
| clickable | 是否开启格子点击反馈 | boolean | - | false | - |
| bg-color | 背景颜色设置 | string | - | #ffffff | - |

### GridItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| text | 文字 value | string | - | - | - |
| icon | 图标名称，可选值见 `wd-icon` 组件 | string | - | - | - |
| is-dot | 是否显示图标右上角小红点 | boolean | - | false | - |
| type | 图标右上角显示的 `badge` 类型 | string | primary / success / warning / danger / info | - | - |
| value | 图标右上角 `badge` 显示值 | string, number | - | - | - |
| max | 图标右上角 `badge` 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number | - | - | - |
| url | 点击后跳转的链接地址 | string | - | - | - |
| link-type | 页面跳转方式, 参考[微信小程序路由文档](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html) | string | navigateTo / switchTab / reLaunch | - | - |
| use-slot | 是否开启 `GridItem` 内容插槽 | boolean | - | false | - |
| use-icon-slot | 是否开启 `GridItem` icon 插槽 | boolean | - | false | - |
| use-text-slot | 是否开启 `GridItem` text 内容插槽 | boolean | - | false | - |
| icon-size | 图标大小 | string | - | 26px | - |

### GridItem Events

| 方法名 | 说明 | 参数 | 返回值 | 最低版本 |
|------|------|------|------|---------|
| bind:itemclick | 点击(跳转)事件 | event | - | - |

### Grid Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 宫格内容 | - |

### GridItem Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 宫格中每一格的默认显示全部内容 | - |
| icon | 宫格中图标位内容 | - |
| text | 宫格中文本位内容 | - |

### Grid 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | Grid 根结点样式 | - |

### GridItem 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | GridItem 根结点样式 | - |
| custom-text | GridItem 下方文字样式 | - |
| custom-icon | GridItem 上方icon样式 | - |
