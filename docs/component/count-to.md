<frame/>

# CountTo

用于实时展示，数字从起始时间不进的动画效果。

## 基础用法

`endVal` 属性表示结束数字(必填参数)

```html
<wd-count-to :endVal="endVal" />

<!-- 自定义开始数字 -->
<wd-count-to :startVal="1000" :endVal="endVal" />
```

```ts
const endVal = ref<number>(2000)
```

## 分隔符

```html
<wd-count-to :startVal="1000" :endVal="200000"  isBold separator="," />
```


## 自定义样式

通过插槽自定义倒计时的样式，`timeData` 对象格式见下方表格。

```html
<wd-count-to :startVal="1000" :endVal="2000" fontSize="48rpx" fontColor="#f34250" isBold />
```


## Attributes

| 参数        | 说明                 | 类型    | 可选值 | 默认值     | 最低版本 |
| ----------- | -------------------- | ------- | ------ | ---------- | -------- |
| startVal    |        开始数字       | Number  | —      | 0          |         |
| endVal      |        结束数字       | Number  | —      | 必填       |         |
| autoStart   |   是否自动开始倒计时   | Boolean | —      | true       |         |
| decimals    |     显示的小数位数    | Number  | —       | 0          |         |
| separator   |        分隔符        | String  | —       |            |         |
| fontSize    |        字体大小       | String  | —      |            |         |
| fontColor   |        字体颜色       | String  | —      |            |         |
| isBold      |        是否加粗       | Boolean | —     | false       |         |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
