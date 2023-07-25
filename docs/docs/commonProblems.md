## 常见问题FAQ

本节介绍在开发过程当中遇到的部分 **常见问题** 以及 **解决办法**


### 小程序样式隔离

#### 在页面中使用 Wot Design Uni 组件时，可直接在页面的样式文件中覆盖样式
```vue
<wd-button type="primary">主要按钮</wd-button>
```

```css
/* 页面样式 */
:deep(.wd-button) {
  color: red !important;
}
```

#### 在自定义组件中使用 Wot Design Uni 组件时，需开启`styleIsolation: 'shared'`选项

```vue
<wd-button type="primary">主要按钮</wd-button>
```

```ts
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>
```

```css
/* 组件样式 */
:deep(.wd-button) {
  color: red !important;
}
```

### 使用外部样式类
Wot Design Uni 开放了大量的自定义样式类供开发者使用，具体的样式类名称可查阅对应组件的“外部样式类”部分。需要注意的是普通样式类和自定义样式类的优先级是未定义的，因此使用时请添加`!important`以保证外部样式类的优先级。

```vue
<wd-button custom-class="custom-button" type="primary">主要按钮</wd-button>
```
```css
/* 组件样式 */
:deep(.custom-button) {
  color: red !important;
}
```



### 关于我们

**如果您的问题不在上述列表中或您有更好的建议，请联系我们 [Moonofweisheng](https://github.com/Moonofweisheng/wot-design-uni)**
