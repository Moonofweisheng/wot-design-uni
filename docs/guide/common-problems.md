#  常见问题FAQ

本节介绍在开发过程当中遇到的部分 **常见问题** 以及 **解决办法**

## 目前支持哪些平台？

目前支持 微信小程序、支付宝小程序、钉钉小程序、H5、APP 等平台。

## 组件库有没有提供可以单独引入的组件？
目前是没有的，首先在插件市场缺少`CI/CD`工具，无法实现自动化发布，维护一套单独引入的组件费时费力，其次组件库提供的安装方式均可以实现按需引入，所以是无需提供单独引入的组件的。


## 如何开启暗黑模式？

`Wot Design Uni`支持深色模式、主题定制等能力，详见[ConfigProvider 全局配置](/component/config-provider.html)组件。


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

### 为什么在组件中无法覆盖组件库样式？

在自定义组件中使用 Wot Design Uni 组件时，需开启`styleIsolation: 'shared'`选项

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

什么？还有人想问：这样写还我怎么使用`script setup`啊！

***简单，这样写两个就行了***

```ts
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
</script>
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


## 如何定制主题？
我们为每个组件提供了`css 变量`，可以参考[config-provider](../component/config-provider)组件的使用介绍来定制主题。

## Toast和MessageBox组件调用无效果？

首先要检查一下用法是否正确，`uni-app`平台不支持全局挂载组件，所以```Message```、```Toast```等组件仍需在SFC中显式使用，例如:
``` html
<wd-toast></wd-toast>
```

```Message```、```Toast```的函数式调用是基于`provide/inject`实现的，所以你的调用要确保在`setup`中。

## 如何快速解决你的问题？
[提问的智慧](https://lug.ustc.edu.cn/wiki/doc/smart-questions/)，可以帮助你快速提出正确的问题，获得更快的解答。

## 关于我们

**如果您的问题不在上述列表中或您有更好的建议，请联系我们 [Moonofweisheng](https://github.com/Moonofweisheng/wot-design-uni)**
