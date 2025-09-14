# PasswordInput

A grid input box component that can be used for inputting passwords, SMS verification codes, and other scenarios. Usually used in conjunction with the [number keyboard](./number-keyboard.md) component.

## Basic Usage

Use with the number keyboard component to implement password input functionality.

```html
<!-- Password input box -->
<wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
<!-- Number keyboard -->
<wd-number-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="4" @blur="showKeyboard = false" />
```

```typescript
import { ref } from 'vue'

const value = ref<string>('123')
const showKeyboard = ref<boolean>(true)
```

### Custom Length

Set the password length through the `length` property.

```html
<!-- Password input box -->
<wd-password-input v-model="value" :length="4" :focused="showKeyboard" @focus="showKeyboard = true" />
<wd-number-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="4" @blur="showKeyboard = false"></wd-number-keyboard>
```

### Grid Spacing

Set the spacing between grids through the `gutter` property.

```html
<!-- Password input box -->
<wd-password-input v-model="value" :gutter="10" :focused="showKeyboard" @focus="showKeyboard = true" />
```

### Plain Text Display

Set `mask` to `false` to display the input content in plain text, suitable for SMS verification code scenarios.

```html
<!-- Password input box -->
<wd-password-input v-model="value" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true" />
```

### Information Tips

Set prompt information through the `info` property and error prompt through the `error-info` property, for example, prompting password error when six digits are entered.

```html
<!-- Password input box -->
<wd-password-input v-model="value" info="Password is 6 digits" :error-info="errorInfo" :focused="showKeyboard" @focus="showKeyboard = true" />
<!-- Number keyboard -->
<wd-number-keyboard v-model="value" :show="showKeyboard" :maxlength="6" @blur="showKeyboard = false" />
```

```typescript
import { ref, watch } from 'vue'

const value = ref('123')
const errorInfo = ref('')
const showKeyboard = ref(true)

watch(value, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = 'Incorrect password'
  } else {
    errorInfo.value = ''
  }
})
```

## Attributes

| Parameter  | Description | Type | Options | Default | Version |
|------------|-------------|------|----------|---------|----------|
| v-model    | Password value | string | - | - | - |
| info       | Text prompt below input box | string | - | - | - |
| error-info | Error prompt below input box | string | - | - | - |
| length     | Maximum password length | number | - | 6 | - |
| gutter     | Spacing between input box grids, like 20px 2em, default unit is px | number / string | - | 0 | - |
| mask       | Whether to hide password content | boolean | - | true | - |
| focused    | Whether focused, cursor will be displayed when focused | boolean | - | false | - |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| focus | Triggered when input box is focused | `event:Event` | - |