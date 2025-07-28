# Textarea

Used for inputting multi-line text information.

## Basic Usage

You can use `v-model` for two-way binding of the input value and set placeholder text through `placeholder`.

```html
<wd-textarea v-model="value" placeholder="Please enter your comment" />
```

```typescript
const value = ref<string>('')
```

## Disabled

Enable the disabled state by setting the `disabled` property.

```html
<wd-textarea v-model="value" disabled></wd-textarea>
```

## Read-only

Enable the read-only state by setting the `readonly` property.

```html
<wd-textarea v-model="value" readonly></wd-textarea>
```

## Clear Button

Enable the clear button by setting the `clearable` property, and implement character limit by setting `show-word-limit` and `maxlength`.

```html
<wd-textarea v-model="value" :maxlength="120" clearable show-word-limit />
```

## Show Clear Button on Focus

Set the `clear-trigger` property to control whether to show the clear button only when focused.

:::warning Note
Alipay Mini Program currently does not support the `clear-trigger` property, and in some cases, the clear button cannot be clicked. Please refer to this [issue](https://github.com/ant-design/ant-design-mini/issues/1255) (Hoping it can be resolved soon, so I directly raised an issue in Ant's component library).
:::

```html
<wd-textarea clear-trigger="focus" v-model="value14" :maxlength="120" clearable show-word-limit />
```

## Don't Auto Focus After Clearing

Set the `focus-when-clear` property to control whether to automatically focus after clicking the clear button.

```html
<wd-textarea v-model="value" :focus-when-clear="false" :maxlength="120" clearable show-word-limit />
```

## Auto Height

Enable auto height adjustment by setting the `auto-height` property.

```html
<wd-textarea v-model="value" auto-height />
```

## Prefix Icon

Set a prefix icon using `prefix-icon`, where the icon should be a class name from the [icon](/component/icon) section. If you need a custom icon that's not available, use the `prefix` slot instead.

```html
<wd-textarea v-model="value" prefix-icon="dong"></wd-textarea>
```

## Setting Label Title

Set a `label` title, which can be used with `cell-group` to create a `cell` display type. You can set the title width through `label-width`, which defaults to '33%'.

```html
<wd-cell-group border>
  <wd-textarea label="Basic Usage" clearable v-model="value" placeholder="Please enter..." />
</wd-cell-group>
```

## Required Style

When a `label` is set, you can set the `required` property to display the required style.

```html
<wd-textarea v-model="value" placeholder="Please enter..." label="Required" required></wd-textarea>
```

## Input Size

Modify the input size by setting `size`. When `size` is set to 'large', the font size is 16px.

```html
<wd-textarea label="Basic Usage" size="large" v-model="value" placeholder="Please enter..." />
```

## Error State

Set the `error` property to display the input value in red.

```html
<wd-textarea v-model="value" placeholder="Please enter username" error />
```

## Vertical Center

When a `label` title is set, it defaults to top alignment. Set the `center` property to vertically center the title and input box.

```html
<wd-textarea label="Basic Usage" v-model="value" center />
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Binding value | string / number | - | - | - |
| placeholder | Placeholder text | string | - | Please enter... | - |
| placeholderStyle | Native attribute, specify placeholder style | string | - | - | - |
| placeholderClass | Native attribute, specify placeholder style class | string | - | - | - |
| disabled | Native attribute, disabled state | boolean | - | false | - |
| maxlength | Native attribute, maximum input length, set to -1 for no limit | number | - | - | - |
| auto-focus | Native attribute, auto focus, brings up keyboard | boolean | - | false | - |
| focus | Native attribute, get focus | boolean | - | false | - |
| auto-height | Native attribute, auto increase height (style.height doesn't work when set) | boolean | - | false | - |
| fixed | Need to set to true in position:fixed areas | boolean | - | false | - |
| cursorSpacing | Native attribute, specify distance between cursor and keyboard (takes minimum of textarea bottom distance and this value) | number | - | 0 | - |
| cursor | Native attribute, specify cursor position when focused | number | - | -1 | - |
| confirm-type | Set text of keyboard's bottom-right button | string | `done`/`go`/`next`/`search`/`send` | - | - |
| confirm-hold | Whether to keep keyboard open after clicking bottom-right button | boolean | - | false | - |
| show-confirm-bar | Whether to show "Done" bar above keyboard | boolean | - | true | - |
| selection-start | Native attribute, cursor start position (must be used with selection-end) | number | - | -1 | - |
| selection-end | Native attribute, cursor end position (must be used with selection-start) | number | - | -1 | - |
| adjust-position | Native attribute, whether to automatically push page up when keyboard rises | boolean | - | true | - |
| disable-default-padding | Native attribute, whether to remove iOS default padding | boolean | - | false | - |
| hold-keyboard | Native attribute, whether to keep keyboard open when clicking page while focused | boolean | - | false | - |
| show-password | Display as password field | boolean | - | false | - |
| clearable | Show clear button | boolean | - | false | - |
| readonly | Read-only | boolean | - | false | - |
| prefix-icon | Prefix icon (use icon component class name) | string | - | - | - |
| show-word-limit | Show character limit (requires maxlength) | boolean | - | false | - |
| label | Set left title | string | - | - | - |
| label-width | Set left title width | string | - | 33% | - |
| size | Set input size | string | - | - | - |
| error | Set input error state (red indicator) | boolean | - | false | - |
| center | Vertically center title and input box when label is set (defaults to top alignment) | boolean | - | false | - |
| no-border | Whether to hide underline in non-cell type | boolean | - | false | - |
| required | Required style in cell type | boolean | - | false | - |
| marker-side | Position of the required marker | 'before' \| 'after' | - | 'before' | $LOWEST_VERSION$ |
| prop | Form field model name (required for form validation) | string | - | - | - |
| rules | Form validation rules | FormItemRule[] | - | [] | - |
| clearTrigger | When to show clear icon: always (show when input is not empty) / focus (show when focused and not empty) | InputClearTrigger | `focus`/`always` | `always` | 1.3.7 |
| focusWhenClear | Whether to focus input box when clicking clear button | boolean | - | true | 1.3.7 |
| ignoreCompositionEvent | Whether to ignore text composition system events (when false, triggers composition events and input events during composition) | boolean | - | true | 1.3.11 |
| inputmode | Input data type hint | InputMode | - | text | 1.5.0 |

### InputMode Options

>Added in uni-app 3.6.16+. inputmode is a later addition to the HTML specification. Various mini programs do not yet support this property.

This property can be used in web and app-vue platforms of uni-app in compatible high-version webviews, see [inputmode](https://uniapp.dcloud.net.cn/component/input.html#inputmode).

| Value | Description |
|-------|-------------|
| none | No virtual keyboard. Useful when the application or site needs to implement its own keyboard input control. |
| text | Uses the standard text input keyboard for the user's locale. |
| decimal | Numeric keyboard with decimal separator (usually "." or ","), device may or may not show minus key. |
| numeric | Numeric keyboard, just needs numbers 0 to 9, device may or may not show minus key. |
| tel | Telephone input keyboard, includes numbers 0 to 9, asterisk (*), and pound (#) keys. Phone number input typically should use <input type="tel">. |
| search | Virtual keyboard optimized for search input, for example, return key might be labeled "search", and may have other optimizations. |
| email | Virtual keyboard optimized for email address input, typically includes "@" symbol and other optimizations. Email address input should use <input type="email">. |
| url | Virtual keyboard optimized for URL input, for example, "/" key might be more prominent, history access, etc. URL input typically should use <input type="url">. |

### FormItemRule Data Structure

| Key | Description | Type |
|-----|-------------|------|
| required | Whether it's a required field | `boolean` |
| message | Error prompt text | `string` |
| validator | Validate through function, can return a `Promise` for asynchronous validation | `(value, rule) => boolean \| Promise` |
| pattern | Validate through regular expression, validation fails if regex doesn't match | `RegExp` |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| input | Listen to input box input event | `{value, cursor, keyCode}` | - |
| focus | Listen to input box focus event | `{ value, height }`, height is keyboard height | - |
| blur | Listen to input box blur event | `{ value }` | - |
| clear | Listen to input box clear button event | - | - |
| linechange | Listen to input box line number change | `{ height: 0, heightRpx: 0, lineCount: 0 }` | - |
| confirm | Triggered when clicking done, triggers confirm event | `{ value }` | - |