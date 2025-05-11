# Common Problems FAQ

This section introduces some **common problems** encountered during development and their **solutions**

## Which platforms are currently supported?

Currently supports WeChat Mini Program, Alipay Mini Program, DingTalk Mini Program, H5, APP, and other platforms.

## Does the component library provide components that can be imported individually?

Currently, no. First, the plugin market lacks CI/CD tools, making automated publishing impossible. Maintaining a set of individually importable components is time and effort-consuming. Secondly, the installation methods provided by the component library can already achieve on-demand importing, so there's no need to provide individually importable components.

## How to enable dark mode?

`Wot UI` supports dark mode, theme customization, and other capabilities. See the [ConfigProvider](/en-US/component/config-provider.html) component for details.

## Is there a technical communication group?

Yes!
You can join the [Wot UI Help Group](/en-US/guide/join-group.html) to share experiences and exchange ideas.

## Sass throws lots of errors and warnings?
`Dart Sass 3.0.0` has deprecated a batch of APIs, and the component library hasn't been compatible yet, so please ensure your `sass` version is 1.78.0 or earlier. You can install a specific version using the following command:
::: code-group
```bash [npm]
npm i sass@1.78.0 -D
```

```bash [yarn]
yarn add sass@1.78.0 -D
```

```bash [pnpm]
pnpm add sass@1.78.0 -D
```
:::

## Mini Program Style Isolation

### When using Wot UI components in pages, you can directly override styles in the page's style file

```vue
<wd-button type="primary">Primary Button</wd-button>
```

```scss
/* Page style */
:deep(.wd-button) {
  color: red !important;
}
```

### Why can't I override component library styles in components?

When using Wot UI components in custom components, you need to enable the `styleIsolation: 'shared'` option

```vue
<wd-button type="primary">Primary Button</wd-button>
```

For `Vue 3.2` and below versions, you can use the following configuration to enable the `styleIsolation: 'shared'` option:
```ts
// vue
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

```scss
/* Component style */
:deep(.wd-button) {
  color: red !important;
}
```
For `Vue 3.3+`, you can enable the `styleIsolation: 'shared'` option through `defineOptions`:
```ts
<script lang="ts" setup>
defineOptions({
  options: {
    styleIsolation: 'shared'
  }
})
</script>
```

## Mini Program External Style Classes

Wot UI provides many custom style classes for developers to use. The specific style class names can be found in the "External Style Classes" section of the corresponding component. Note that the priority of regular style classes and custom style classes is undefined, so please add `!important` when using to ensure the priority of external style classes.

::: tip Please Note
`Wot UI` components are all set with `scoped`, so its CSS will only affect the elements of the current component, similar to style encapsulation in Shadow DOM. If selectors in `scoped` styles want to make "deeper" selections, that is, affect child components, you can use the `:deep()` pseudo-class:
```css
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```
The above code will be compiled into:
```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

See [Single File Component CSS Features](https://vuejs.org/api/sfc-css-features.html#sfc-css-features) for details.
:::

```vue
<wd-button custom-class="custom-button" type="primary">Primary Button</wd-button>
```

```scss
/* Component style */
:deep(.custom-button) {
  color: red !important;
}
```

## Mini Program Custom Component Rendering Issue

WeChat/QQ/Baidu/Douyin mini programs have an extra level of nodes when rendering custom components compared to App/H5. Here's an example with the `divider` component:

```vue
<!-- Usage -->
<wd-divider></wd-divider>

<!-- h5 rendering -->
<view class="wd-divider"></view>

<!-- WeChat mini program rendering -->
<wd-divider>
  <view class="wd-divider"></view>
</wd-divider>
```

### Solution

On WeChat platform, this can be solved using [virtualHost](https://uniapp.dcloud.net.cn/tutorial/vue-api.html#%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE). When `virtualHost` is set to `true`, it will set custom nodes as virtual, making them behave more like Vue components and removing the extra outermost tag of WeChat mini program custom components. After enabling, you can also use [mergeVirtualHostAttributes](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin) to merge the outer layer attributes of component virtual nodes.

```js
// Using virtualHost in vue2
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
// Using virtualHost in vue3 script setup
<script lang="ts">
export default {
  // Set custom nodes as virtual to make them behave more like Vue components and remove the extra outermost tag of WeChat mini program custom components
  options: {
    virtualHost: true
  }
}
</script>
<script lang="ts" setup>
</script>
```

### Effect of Enabling virtualHost

Here's another example with the `divider` component:

```vue
<!-- Usage -->
<wd-divider></wd-divider>

<!-- h5 rendering -->
<view class="wd-divider"></view>

<!-- WeChat mini program rendering -->
<view class="wd-divider"></view>
```

## How to customize themes?

We provide CSS variables for each component. You can refer to the [config-provider](/en-US/component/config-provider) component's usage guide to customize themes.

## Why are Toast and MessageBox component calls not working?

First, check if the usage is correct. The `uni-app` platform doesn't support global component mounting, so components like `Message` and `Toast` still need to be explicitly used in SFC, for example:

```html
<wd-toast></wd-toast>
```

The functional calls of `Message` and `Toast` are implemented based on `provide/inject`, so your calls must be made within `setup`.