# Form

Used for data entry and validation, supporting input boxes, radio buttons, checkboxes, file uploads, and other types. Common form layouts are in a `cell` format, with the form title description on the left and form input on the right.

Among them, `Input`, `Textarea`, `Picker`, `Calendar`, `ColPicker`, `SelectPicker`, `Cell`, and `DatetimePicker` have a `cell` display format and also support `prop` and `rules` properties. We call these `form item components`. Components like `InputNumber`, `Switch`, and `Upload` need to be wrapped in a `Cell` component for use.

Combined with the `wd-form` component, rule validation can be implemented for the above components.

> For form components, it is recommended to enable the border property on wd-cell-group, so that each cell will have border lines separating them, making the form division clearer.

## Basic Usage

In the form, use `model` to specify the form data object. Each `form item component` represents a form item, use `prop` to specify the form item field, and use the `rules` property to define validation rules.

::: details View Basic Usage Example
::: code-group

```html [vue]
<wd-form ref="form" :model="model">
  <wd-cell-group border>
    <wd-input
      label="Username"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="Please enter username"
      :rules="[{ required: true, message: 'Please enter username' }]"
    />
    <wd-input
      label="Password"
      label-width="100px"
      prop="value2"
      show-password
      clearable
      v-model="model.value2"
      placeholder="Please enter password"
      :rules="[{ required: true, message: 'Please enter password' }]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>Submit</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
const { success: showSuccess } = useToast()

const model = reactive<{
  value1: string
  value2: string
}>({ 
  value1: '',
  value2: ''
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: 'Validation passed'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

```css [css]
.footer {
  padding: 12px;
}
```

:::

## Validation Error Display Methods

1. `message`: Default method, displays text below the input box
2. `toast`: Displays error messages as toast popups, only showing the error message of the first form field each time
3. `none`: No display of any prompts

::: details Error Display Methods
::: code-group

```html [vue]
<wd-form ref="form" :model="model" :errorType="errorType">
  <wd-cell-group border>
    <wd-input
      label="Username"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="Please enter username"
      :rules="[{ required: true, message: 'Please enter username' }]"
    />
    <wd-input
      label="Password"
      label-width="100px"
      prop="value2"
      show-password
      clearable
      v-model="model.value2"
      placeholder="Please enter password"
      :rules="[{ required: true, message: 'Please enter password' }]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit" block>Submit</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
<script lang="ts" setup>
const { success: showSuccess } = useToast()
const errorType = ref<string>('message')
const model = reactive<{
  value1: string
  value2: string
}>({ 
  value1: '',
  value2: ''
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: 'Validation passed'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

:::

## Validation Rules

This section demonstrates four types of custom validation and prompt rules: `Regular Expression Validation`, `Function Validation`, `Function Return Error Message`, and `Async Function Validation`.

::: details View Validation Rules Example
::: code-group

```html [vue]
<wd-form ref="form2" :model="model">
  <wd-cell-group border>
    <wd-input
      label="Validate"
      label-width="100px"
      prop="value1"
      clearable
      v-model="model.value1"
      placeholder="Regular Expression Validation"
      :rules="[{ required: false, pattern: /\d{6}/, message: 'Please enter 6 digits' }]"
    />
    <wd-input
      label="Validate"
      label-width="100px"
      prop="value2"
      clearable
      v-model="model.value2"
      placeholder="Function Validation"
      :rules="[
              {
                required: false,
                validator: validatorMessage,
                message: 'Please enter correct value'
              }
            ]"
    />
    <wd-input
      label="Validate"
      label-width="100px"
      prop="value3"
      clearable
      v-model="model.value3"
      placeholder="Function Return Error Message"
      :rules="[
              {
                required: false,
                validator: validatorReturnMessage
              }
            ]"
    />
    <wd-input
      label="Validate"
      label-width="100px"
      prop="value4"
      clearable
      v-model="model.value4"
      placeholder="Async Function Validation"
      :rules="[
              {
                required: false,
                validator: validatorAsync,
                message: 'Please enter correct value'
              }
            ]"
    />
  </wd-cell-group>
  <view class="footer">
    <wd-button type="primary" size="large" @click="handleSubmit2" block>Submit</wd-button>
  </view>
</wd-form>
```

```typescript [typescript]
const form2 = ref()
const model = reactive<{
  value1: string
  value2: string
  value3: string
  value4: string
}>({ 
  value1: '',
  value2: '',
  value3: '',
  value4: ''
})

function validatorMessage(value: string) {
  return value === 'maka'
}

function validatorReturnMessage(value: string) {
  if (value === 'maka') {
    return true
  }
  return 'Please enter maka'
}

function validatorAsync(value: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value === 'maka')
    }, 1000)
  })
}

function handleSubmit2() {
  form2.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: 'Validation passed'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
```

:::

## Form Methods

| Method Name | Description | Parameters | Return Value |
|-------------|-------------|------------|---------------|
| validate | Validate the entire form | - | Promise |
| validateField | Validate a specific form field | prop: string | Promise |
| resetFields | Reset form fields to initial values and clear validation results | - | - |
| clearValidate | Clear validation information | props: array / string | - |

## Form Item Methods

| Method Name | Description | Parameters | Return Value |
|-------------|-------------|------------|---------------|
| resetField | Reset form item field to initial value and clear validation result | - | - |
| clearValidate | Clear validation information | - | - |