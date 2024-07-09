<frame/>

# Statistic 数值显示 

## 基本用法

```html
<wd-statistic prefix="今日：" color="#36B8C2" endVal="230.122" :decimals="2" :duration="5000" suffix="%"/>
```

## prefix 前缀插槽

`prefix` 前缀插槽

```html
<wd-statistic prefix="今日："/>
```

## suffix 后缀插槽

`suffix` 后缀插槽

```html
<wd-statistic prefix="今日："/>
```

## ref方法


```html
<template>
  <wd-statistic :autoplay="false" endVal="8888" ref="refStatistic" />
  <wd-button @click="clickStart">开始</wd-button>
  <wd-button @click="clickReset">重置</wd-button>
  <wd-button @click="clickPause">暂停</wd-button>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const refStatistic = ref()

  function clickStart() {
    refStatistic.value.start()
  }
  function clickReset() {
    refStatistic.value.reset()
  }
  function clickPause() {
    refStatistic.value.pause()
  }
</script>
```

## Attributes
| 参数 | 说明                        | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|---------------------------|-----|-------|-------|-------|
| fontSize | 	字体大小      |	number | - | 30 | - |
| color | 	字体颜色      |	string | - | - | - |
| startVal | 	起始值      |	String, Number | - | 0 | - |
| endVal | 	最终值      |	String, Number | - | 2024 | - |
| duration | 	从起始值到结束值数字变动的时间      |	Number | - | 3000(ms) | - |
| decimals | 	保留的小数位数      |	Number | - | 0 | - |
| autoplay | 	是否自动播放      |	boolean | - | true | - |
| separator | 	上了三位数分割的符号      |	String | - | , | - |
| prefix | 	前缀      |	String | - | - | - |
| suffix | 	后缀      |	String | - | - | - |
| decimal | 	小数点分割符号      |	String | - | . | - |


## ref方法

| name  | 说明         | 参数 | 最低版本 |
| ----- | ------------ | ------------ |  -------- |
| start | 开始数值动画     | startVal:number |  -        |
| reset | 重置数值动画 | - |  -        |
| pause | 暂停数值动画 | - |  -        |

## Cell Slot

| name    | 说明                                      | 最低版本 |
| ------- | ----------------------------------------- | -------- |
| prefix   | 前缀插槽                                      | -        |
| suffix    | 后缀插槽                                      | -        |


## 外部样式类

| 类名               | 说明                           | 最低版本 |
| ------------------ | ------------------------------ | -------- |
| custom-class       | 根节点样式                     | -        |
