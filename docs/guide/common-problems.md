# 常见问题 FAQ

本节介绍在开发过程当中遇到的部分 **常见问题** 以及 **解决办法**

## 目前支持哪些平台？

目前支持 微信小程序、支付宝小程序、钉钉小程序、H5、APP 等平台。

## 组件库有没有提供可以单独引入的组件？

目前是没有的，首先在插件市场缺少`CI/CD`工具，无法实现自动化发布，维护一套单独引入的组件费时费力，其次组件库提供的安装方式均可以实现按需引入，所以是无需提供单独引入的组件的。

## 如何开启暗黑模式？

`Wot Design Uni`支持深色模式、主题定制等能力，详见[ConfigProvider 全局配置](/component/config-provider.html)组件。

## 有没有技术交流群？

有！
可以加入[组件库QQ 群](/guide/join-group.html)，分享心得、交流体会。


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

**_简单，这样写两个就行了_**

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

微信/QQ/百度/抖音这四家小程序，自定义组件在渲染时会比 App/H5 端多一级节点，下面以`divider`组件举例：

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

在微信端可以使用[virtualHost](https://uniapp.dcloud.net.cn/tutorial/vue-api.html#%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE)解决，`virtualHost`设为`true`之后会将自定义节点设置成虚拟的，更加接近 Vue 组件的表现，可以去掉微信小程序自定义组件多出的最外层标签，启用后还可以通过 [mergeVirtualHostAttributes](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin) 合并合并组件虚拟节点外层属性。

```js
// vue2使用virtualHost
export default {
  data() {
    return {}
  },
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

### 启用 virtualHost 效果

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

## Toast 和 MessageBox 组件调用无效果？

首先要检查一下用法是否正确，`uni-app`平台不支持全局挂载组件，所以`Message`、`Toast`等组件仍需在 SFC 中显式使用，例如:

```html
<wd-toast></wd-toast>
```

`Message`、`Toast`的函数式调用是基于`provide/inject`实现的，所以你的调用要确保在`setup`中。

## 编译到支付宝小程序 Popup 组件的遮罩无法显示？

uni-app 3.99.2023122704 将支付宝小程序的`styleIsolation`默认值设置为了`apply-shared`，而支付宝小程序默认的`styleIsolation`为`shared`，所以导致更新到`3.99.2023122704`版本后，支付宝小程序自定义组件样式穿透无法生效，参见[issue](https://ask.dcloud.net.cn/question/187142)。
解决办法：在`mainfest.json`中设置`styleIsolation`为`shared`。

```json
{
  // ...
  "mp-alipay": {
    // ...
    "styleIsolation": "shared"
    // ...
  }
  // ...
}
```

## 为什么组件库文档中都是从`@/uni_modules/wot-design-uni`导入方法和工具类？

当前组件库本身的开发方式是将组件库代码放到`@/uni_modules/wot-design-uni`这个目录的，所以文档中都是从`@/uni_modules/wot-design-uni`导入方法和工具类，使用`npm`方式安装组件库的时候可以这样调整：

```ts
// useToast、useNotify等同理
import { useMessage } from '@/uni_modules/wot-design-uni'
```

替换为

```ts
import { useMessage } from 'wot-design-uni'
```

## uni-app 如何自定义编译平台，例如钉钉小程序？

可以参考`uni-app`文档中[package.json](https://uniapp.dcloud.net.cn/collocation/package.html#%E7%A4%BA%E4%BE%8B-%E9%92%89%E9%92%89%E5%B0%8F%E7%A8%8B%E5%BA%8F)章节。

钉钉小程序示例：
```JSON
{
    "uni-app": {
    "scripts": {
      "mp-dingtalk": {
        "title": "钉钉小程序",
        "env": {
          "UNI_PLATFORM": "mp-alipay"
        },
        "define": {
          "MP-DINGTALK": true
        }
      }
    }
  },
}
```

## 当前组件库提供的用于控制组件显示隐藏 hooks 不生效怎么办？

**_可以按照以下步骤进行排查_**

1. `uni-app`平台不支持全局挂载组件，所以`Message`、`Toast`、`Notify`等组件需在 SFC 中显式使用，例如：

```html
<wd-toast></wd-toast>
```

2. `useToast`、`useMessage`、`useNotify`、`useQueue`等 hooks 不生效，请检查是否在`setup`中调用，如果`setup`中调用，请检查当前页面是否存在多次执行`use`的场景，例如在多个组件中执行，这样会导致上一次`use`的失效。针对此场景，组件的函数式调用都支持传入`selector`参数，可以通过`selector`参数来指定组件，例如：

```html
<wd-toast></wd-toast>
<wd-toast selector="my-toast"></wd-toast>
```

```ts
const toast = useToast()
const myToast = useToast({ selector: 'my-toast' })
```

## 为什么在微信小程序上使用`Popup`、`ActionSheet`、`DropDownItem`等弹出框组件包裹`Slider`、`Tabs`等组件时，`Slider`、`Tabs`表现异常？

目前uni-app使用`v-if`控制插槽是否显示编译到微信小程序端存在问题，具体可以参考issue:[4755](https://github.com/dcloudio/uni-app/issues/4755)、[4847](https://github.com/dcloudio/uni-app/issues/4847)。而`Popup`、`ActionSheet`、`DropDownItem`恰好正是使用`v-if`控制插槽是否显示，所以会导致`Slider`、`Tabs`在未渲染时执行了相关生命周期。`Slider`、`Tabs`等组件的一些数据如`Slider`的宽度，`Tabs`的滑块位置等会在onMounted等生命周期进行获取，此时这些数据将会存在异常。

解决办法：

1. 在`Slider`、`Tabs`等组件外部使用`v-if`控制弹框打开前不展示，例如：

```html
<wd-slider v-if="showSlider"></wd-slider>
```

1. 在`Popup`、`ActionSheet`、`DropDownItem`等组件完全打开时的钩子中重新初始化`Slider`、`Tabs`组件，例如：
   
```html
<wd-popup v-model="show" position="bottom" closable custom-style="height: 200px;" @after-enter="handleOpened">
<wd-slider v-model="value" ref="slider"></wd-slider>
</wd-popup>
```
```ts
const slider = ref()

function handleOpened() {
  slider.value!.initSlider()
}

```

## 为何messageBox弹出了多个？
检查一下弹出多个`messageBox`的页面是否存在多个相同`selector`或无`selector`的`<wd-message-box></wd-message-box>`标签(当前页面包括页面中使用的组件)。`toast`亦是同理，在子组件中使用`messageBox`等组件需要指定`selector`并确保`selector`唯一。



## 如何快速解决你的问题？

[提问的智慧](https://lug.ustc.edu.cn/wiki/doc/smart-questions/)，可以帮助你快速提出正确的问题，获得更快的解答。

## 关于我们

**如果您的问题不在上述列表中或您有更好的建议，请联系我们 [Moonofweisheng](https://github.com/Moonofweisheng/wot-design-uni)**
