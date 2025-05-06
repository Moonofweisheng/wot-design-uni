# useMessage

Used for conveniently calling the MessageBox dialog component.

## Alert Dialog

Alert dialog only has a confirm button, used for strong reminders.

```html
<wd-message-box></wd-message-box>
<wd-button @click="alert">alert</wd-button>
```

```ts
import { useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()

function alert() {
  message.alert('Operation successful')
}
```

## Confirm Dialog

Used to prompt user operations.

```html
<wd-message-box />
<wd-button @click="confirm">confirm</wd-button>
```

```ts
import { useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()

function confirm() {
  message
    .confirm({
      msg: 'Prompt text',
      title: 'Title'
    })
    .then(() => {
      console.log('Clicked confirm button')
    })
    .catch(() => {
      console.log('Clicked cancel button')
    })
}
```

## Prompt Dialog

Prompt will display an input box and can perform input validation.

```html
<wd-message-box />
<wd-button @click="prompt">prompt</wd-button>
```

```ts
import { useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()

function prompt() {
  message
    .prompt({
      title: 'Please enter email',
      inputPattern: /.+@.+\..+/i,
      inputError: 'Invalid email format'
    })
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error)
    })
}
```

## API

### Methods

| Method Name | Description | Parameters |
|--------|----------------|----------|
| show | Show dialog | options |
| alert | Show Alert dialog | options |
| confirm | Show Confirm dialog | options |
| prompt | Show Prompt dialog | options |
| close | Close dialog | - |

### Options

| Parameter | Description | Type | Accepted Values | Default |
|-----|------|------|--------|--------|
| title | Title | string | - | - |
| msg | Message text | string | - | - |
| type | Dialog type | string | alert / confirm / prompt | alert |
| closeOnClickModal | Whether to support closing by clicking the mask | boolean | - | true |
| inputType | Input box type when type is prompt | string | - | text |
| inputValue | Initial value of input box when type is prompt | string / number | - | - |
| inputPlaceholder | Input box placeholder when type is prompt | string | - | Please enter content |
| inputPattern | Input box regex validation when type is prompt | RegExp | - | - |
| inputValidate | Input box validation function when type is prompt | function | - | - |
| inputError | Error prompt text when input box validation fails when type is prompt | string | - | Invalid input data |
| confirmButtonText | Confirm button text | string | - | Confirm |
| cancelButtonText | Cancel button text | string | - | Cancel |
| zIndex | Dialog layer level | number | - | 99 |
| selector | Unique identifier | string | - | '' |