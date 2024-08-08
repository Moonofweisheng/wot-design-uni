<frame/>

# Statistic 数值显示

> 1.3.6+ 版本提供

## 基本用法


```vue
<wd-statistic :endVal="2024" suffix="年" color="#16baaa"></wd-statistic>
```

## 插槽


```vue
<wd-statistic prefix="￥" :startVal="0" :decimals="2" :endVal="186.321" :fontSize="32" suffix="%" color="#1e9fff"></wd-statistic>
<wd-statistic prefix="￥" :startVal="0" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ff5722"></wd-statistic>
<wd-statistic prefix="￥" :startVal="0" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ffb800" :duration="2000"></wd-statistic>
```

## 自定义字体颜色

设置 `color` 属性。

```html
<wd-statistic :endVal="2024" color="#16baaa"></wd-statistic>
```


## Attributes

| 参数       | 说明                                                               | 类型    | 可选值                                                             | 默认值  | 最低版本         |
| ---------- | ------------------------------------------------------------------ | ------- | ------------------------------------------------------------------ | ------- | ---------------- |
| fontSize       | 字体大小                                                           | number  | 16                        | default | 1.3.6+ |
|color | 文本颜色 | string | - | '' | $LOWEST_VERSION$|
|startVal | 起始值 | number | - | 0 | $LOWEST_VERSION$ | 
|endVal | 最终值 | number | - | 2024 | $LOWEST_VERSION$ | 
|duration | 从起始值到结束值数字变动的时间 | number | - | 3000 | $LOWEST_VERSION$ | 
|autoplay | 是否自动播放 | boolean | - | true | $LOWEST_VERSION$ | 
|decimals | 保留的小数位数 | number | (需大于等于0) | 0 | $LOWEST_VERSION$ | 
|decimal | 小数点符号 | string | - | '.' | $LOWEST_VERSION$ | 
|separator | 三位三位的隔开效果 | string | - | ',' | $LOWEST_VERSION$ | 
|prefix | 前缀 | string | - | - | $LOWEST_VERSION$ | 
|suffix | 后缀 | string | - | - | $LOWEST_VERSION$ | 
|useEasing | 是否具有连贯性 | boolean | - | true | $LOWEST_VERSION$ | 
|isFrequent | 是否隔一段时间数字跳动 | boolean | - | false | $LOWEST_VERSION$ | 
|frequentTime | 跳动间隔时间 | number | - | 5000 | $LOWEST_VERSION$ | 



## 外部样式类

| 类名         | 说明       | 最低版本         |
| ------------ | ---------- | ---------------- |
| custom-class | 根节点样式 | $LOWEST_VERSION$ |
| custom-style | 根节点样式 | $LOWEST_VERSION$ |
