# Switch

Used to toggle options on or off.

## Basic Usage

`v-model` is the binding value, which is boolean type by default.

```html
<wd-switch v-model="checked" />
```

```typescript
const checked = ref<boolean>(true)
```

## Modify Values

Use the `active-value` property to modify the value when the switch is on, and the `inactive-value` property to modify the value when the switch is off.

```html
<wd-switch v-model="checked" active-value="Wot" inactive-value="Merchant Backend" />
```

## Modify Colors

Use the `active-color` property to modify the color when the switch is on, and the `inactive-color` property to modify the color when the switch is off.

```html
<wd-switch v-model="checked" active-color="#13ce66" inactive-color="#f00" />
```

## Custom Size

Set `size` to modify the switch size.

```html
<wd-switch v-model="checked" size="24px" />
```

## Disabled

Set the `disabled` property.

## Before Change Hook

Set the `before-change` property as a hook before modification. It receives { value, resolve } parameters, where `resolve(true)` means the modification is approved, and `resolve(false)` means no modification.

```html
<wd-switch v-model="checked" :before-change="beforeChange" @change="handleChange" />
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'

const message = useMessage()

const beforeChange = ({ value, resolve }) => {
  message
    .confirm('Do you want to toggle the switch?')
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      resolve(false)
    })
}
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Binding value | boolean / string / number | - | - | - |
| disabled | Disabled state | boolean | - | false | - |
| active-value | Value when switch is on | boolean / string / number | - | true | - |
| inactive-value | Value when switch is off | boolean / string / number | - | false | - |
| active-color | Background color when switch is on | string | - | #4D80F0 | - |
| inactive-color | Background color when switch is off. By default it's white, so there's a gray border. If this value is set, the gray border will be automatically removed | string | - | #fff | - |
| size | Switch size, can be any unit string size | string/number | - | 28px | - |
| before-change | Hook before modification | function | - | - | - |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Value change event | `{ value }` | - |

## External Style Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |