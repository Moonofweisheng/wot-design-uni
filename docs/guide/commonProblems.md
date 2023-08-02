#  常见问题FAQ

本节介绍在开发过程当中遇到的部分 **常见问题** 以及 **解决办法**


## 小程序样式隔离

### 在页面中使用 Wot Design Uni 组件时，可直接在页面的样式文件中覆盖样式
```vue
<wd-button type="primary">主要按钮</wd-button>
```

```scss
/* 页面样式 */
:deep(.wd-button) {
  color: red !important;
}
```

### 在自定义组件中使用 Wot Design Uni 组件时，需开启`styleIsolation: 'shared'`选项

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

```scss
/* 组件样式 */
:deep(.wd-button) {
  color: red !important;
}
```

## 小程序使用外部样式类
Wot Design Uni 开放了大量的自定义样式类供开发者使用，具体的样式类名称可查阅对应组件的“外部样式类”部分。需要注意的是普通样式类和自定义样式类的优先级是未定义的，因此使用时请添加`!important`以保证外部样式类的优先级。

```vue
<wd-button custom-class="custom-button" type="primary">主要按钮</wd-button>
```
```scss
/* 组件样式 */
:deep(.custom-button) {
  color: red !important;
}
```

## 小程序自定义组件渲染问题
微信/QQ/百度/抖音这四家小程序，自定义组件在渲染时会比App/H5端多一级节点，下面以`divider`组件举例：

```vue
<!-- 使用 -->
<wd-divider></wd-divider>

<!-- h5渲染 -->
<view class="wd-divider"></view>

<!-- 微信小程序渲染 -->
<wd-divider>
  <view class="wd-divider"></view>
</wd-divider>
```

### 解决办法
在微信端可以使用[virtualHost](https://uniapp.dcloud.net.cn/tutorial/vue-api.html#%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE)解决，`virtualHost`设为`true`之后会将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签，启用后还可以通过 [mergeVirtualHostAttributes](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin) 合并合并组件虚拟节点外层属性。
```js
// vue2使用virtualHost
export default {
  data(){ return { } },
  options: {
    virtualHost: true
  }
}
```

```ts
// vue3 script setup 使用virtualHost
<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>
<script lang="ts" setup>
</script>
```
### 启用virtualHost效果
这里我们还是以`divider`组件举例：

```vue
<!-- 使用 -->
<wd-divider></wd-divider>

<!-- h5渲染 -->
<view class="wd-divider"></view>

<!-- 微信小程序渲染 -->
<view class="wd-divider"></view>
```


## 关于我们

**如果您的问题不在上述列表中或您有更好的建议，请联系我们 [Moonofweisheng](https://github.com/Moonofweisheng/wot-design-uni)**
