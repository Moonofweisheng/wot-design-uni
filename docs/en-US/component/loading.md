# Loading

Loading animation, used to indicate a transitional loading state.

## Basic Usage

Basic usage, suitable for button loading states and page light prompts.

```html
<wd-loading />
```

## Modify Indicator Type

Modify the indicator type through the `type` property, with optional value 'outline', suitable for general module loading.

```html
<wd-loading type="outline" />
```

## Modify Color

Modify the indicator color through the `color` property. For example, change it to white and set the background to black.

:::warning
In mini-programs, there is no svg tag, so the svg tag is first generated through js and then converted to base64. Therefore, the indicator color must be a hexadecimal color value and does not accept abbreviated color values.
:::

```html
<wd-loading color="#ffffff" custom-class="loading-black" />

<!-- The following are incorrect usages -->
<wd-loading color="#fff" />
<wd-loading color="green" />
<wd-loading color="rgba(255,255,255,1)" />
```

```scss
:deep(.loading-black) {
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 4px;
}
```

## Modify Indicator Size

Set the indicator size through the `size` property, default size is '32px', property supports `number`/`string` types.

```html
<wd-loading :size="20" />
<wd-loading :size="30" />
<wd-loading size="50px" />
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| type | Loading indicator type | string | outline | ring | - |
| color | Set loading indicator color | string | - | #4D80F0 | - |
| size | Set loading indicator size | number / string | - | 32px | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |