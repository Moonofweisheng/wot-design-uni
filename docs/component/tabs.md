<frame/>

#  Tab 标签页


## 基本用法

`v-model` 为绑定值，可以为 number 类型（选中的tab的下标）和 string 类型（标签名）。

> 当`v-model`为`number`类型时，`wd-tab`可以不必设置`name`。同时如果value超出了tab数量，会用0自动兜底。

```html
<wd-tabs v-model="tab">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item}}</view>
    </wd-tab>
  </block>
</wd-tabs>
```
```typescript
const tab = ref<number>(0)

```
```scss
.content{
  line-height: 120px;
  text-align: center;
}
```


## 粘性布局

设置 `sticky` 属性，使用粘性布局。可以设置 `offset-top` 属性，当距离窗口顶部多少像素时，固定标签头。在`H5`端使用自定义导航栏时需要参考[sticky的吸顶距离](/component/sticky.html#吸顶距离)进行配置。

```html
<wd-tabs v-model="tab" sticky>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item}}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 禁用Tab

在 `wd-tab` 上设置 `disabled` 属性，禁用某个页签。

```html
<wd-tabs v-model="tab">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`" :disabled="item === 1">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 点击事件

监听页签的点击事件.

```html
<wd-tabs v-model="tab" @click="handleClick">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 手势滑动

设置 `swipeable` 属性，支持手势滑动。

```html
<wd-tabs v-model="tab" swipeable>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 切换动画

设置 `animated` 属性，开启切换标签内容时的过渡动画。

```html
<wd-tabs v-model="tab" animated>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

---

标签页在标签数大于等于6个时，可以滑动；当标签数大于等于10个时，将会显示导航地图，便于快速定位到某个标签。可以通过设置 `slidable-num` 修改可滑动的数量阈值；设置 `map-num` 修改显示导航地图的阈值。

## Tabs Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| v-model | 绑定值 | string / number | - | - | - |
| slidable-num | 可滑动的标签数阈值 | number | - | 6 | - |
| map-num | 显示导航地图的标签数阈值 | number | - | 10 | - |
| sticky | 粘性布局 | boolean | - | false | - |
| offset-top | 粘性布局时距离窗口顶部距离 | number | - | 0 | - |
| swipeable | 开启手势滑动 | boolean | - | false | - |
| lineWidth | 底部条宽度，单位像素 | number | - | 19 | - |
| lineHeight | 底部条高度，单位像素 | number | - | 3 | - |
| color | 文字颜色 | string | - | - | - |
| inactiveColor | 非活动标签文字颜色 | string | - | - | - |
| animated | 是否开启切换标签内容时的转场动画 | boolean | - | false | - |
| duration | 切换动画过渡时间，单位毫秒 | number | - | 300 | - |

## Tab Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| name | 标签页名称 | string | - | - | - |
| title | 标题 | string | - | - | - |
| disabled | 禁用 | boolean | - | false | - |

## Tabs Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| change | 绑定值变化时触发 | event = { index, name },index为tab下标，name为tab绑定的值 | - |
| click | 点击标题时触发 | event = { index, name },index为tab下标，name为tab绑定的值 | - |
| disabled | 点击禁用的标题时触发| event = { index, name },index为tab下标，name为tab绑定的值 | - |


## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |