<frame/>

# ConfigProvider 全局配置

## 介绍

用于全局配置 `Wot` 组件，提供深色模式、主题定制等能力。

## 深色模式

将 ConfigProvider 组件的 `theme` 属性设置为 `dark`，可以开启深色模式。

深色模式会全局生效，使页面上的所有 `Wot` 组件变为深色风格。

```vue
<wd-config-provider theme="dark">...</wd-config-provider>
```

:::tip
值得注意的是，开启 `Wot` 的深色模式只会影响 `Wot` 组件的 `UI`，并不会影响全局的文字颜色或背景颜色，你可以参考以下 `CSS` 来设置一些全局样式：
:::

```css
.wot-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
```

## 动态切换

通过动态设置 `theme` 属性，可以在浅色风格和深色风格之间进行切换。

```vue
<wd-config-provider :theme="theme">...</wd-config-provider>
```

```ts
export default {
  setup() {
    const theme = ref('light')

    setTimeout(() => {
      theme.value = 'dark'
    }, 1000)

    return { theme }
  }
}
```

## 定制主题

`Wot` 组件通过丰富的 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 来组织样式，通过覆盖这些 `CSS` 变量，可以实现定制主题、动态切换主题等效果。

### 示例

这些变量的默认值被定义在 `page` 节点上，如果要转 `H5`，默认值被定义在 `:root` 节点上

```css
:root,
page {
  --wot-color-success: red;
  --wot-color-warning: yellow;
}
```

### 通过 CSS 覆盖

你可以直接在代码中覆盖这些 `CSS` 变量，`Button` 组件的样式会随之发生改变：

```css
/* 添加这段样式后，默认 Button 底色会变成绿色 */
:root,
page {
  --wot-button-normal-bg: green;
}
```

### 通过 ConfigProvider 覆盖

`ConfigProvider` 组件提供了覆盖 `CSS` 变量的能力，你需要在根节点包裹一个 `ConfigProvider` 组件，并通过 `theme-vars` 属性来配置一些主题变量

```html
<wd-config-provider :theme-vars="themeVars">
  <div style="margin: 16px">
    <wd-button round block type="primary">提交</wd-button>
  </div>
</wd-config-provider>
```

```ts
import { ref, reactive } from 'vue'

export default {
  setup() {
    // themeVars 内的值会被转换成对应 CSS 变量
    // 比如 buttonPrimaryBg 会转换成 `--wot-button-primary-bg`
    const themeVars = reactive({
      buttonPrimaryBg: '#07c160',
      buttonPrimaryColor: '#07c160'
    })
    return {
      themeVars
    }
  }
}
```

:::tip
注意：ConfigProvider 仅影响它的子组件的样式，不影响全局 root 节点。
:::

## Attributes

| 参数       | 说明                                             | 类型   | 可选值         | 默认值 | 最低版本 |
| ---------- | ------------------------------------------------ | ------ | -------------- | ------ | -------- |
| theme      | 主题风格，设置为 `dark` 来开启深色模式，全局生效 | string | `dark`/`light` | -      | -        |
| theme-vars | 自定义主题变量                                   | object | -              | -      | -        |

