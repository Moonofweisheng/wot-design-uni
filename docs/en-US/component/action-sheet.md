# ActionSheet

A panel that slides up from the bottom, presenting a set of options.

## Basic Usage

The `visible` attribute controls whether the action sheet is displayed. The `actions` attribute is an array of objects, each object in the array represents an option in the action sheet. The `name` attribute is the name of the option, and the `color` attribute is the text color of the option.

```html
<wd-button @click="show = true">Open ActionSheet</wd-button>
<wd-action-sheet :visible.sync="show" :actions="actions" @select="handleSelect" />
```

```typescript
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      show: false,
      actions: [
        {
          name: 'Option 1'
        },
        {
          name: 'Option 2'
        },
        {
          name: 'Option 3',
          color: '#4D80F0'
        }
      ]
    })

    const handleSelect = item => {
      console.log(item)
    }

    return {
      ...toRefs(state),
      handleSelect
    }
  }
}
```

## Cancel Button

Set the `cancel-text` attribute to display a cancel button at the bottom of the action sheet.

```html
<wd-action-sheet :visible.sync="show" :actions="actions" cancel-text="Cancel" />
```

## Title

Set the `title` attribute to display a title at the top of the action sheet.

```html
<wd-action-sheet :visible.sync="show" :actions="actions" title="Title" />
```

## Option Status

The `actions` array can set the `disabled` attribute to disable an option, and the `loading` attribute to set an option to loading state.

```html
<wd-action-sheet :visible.sync="show" :actions="actions" />
```

```typescript
export default {
  data() {
    return {
      show: false,
      actions: [
        {
          name: 'Option 1',
          disabled: true
        },
        {
          name: 'Option 2',
          loading: true
        },
        {
          name: 'Option 3'
        }
      ]
    }
  }
}
```

## Custom Panel

The action sheet can be used with a slot to customize the panel content.

```html
<wd-action-sheet :visible.sync="show" title="Custom Panel">
  <view style="padding: 15px 15px 150px 15px; color: #333333; font-size: 16px;">
    Custom Content
  </view>
</wd-action-sheet>
```

## Attributes

| Attribute | Description | Type | Default | Version |
|---------|---------|---------|---------|------|
| visible | Whether to display the action sheet, supports the .sync modifier | boolean | false | - |
| actions | Options | Action[] | [] | - |
| title | Title | string | - | - |
| cancel-text | Cancel button text | string | - | - |
| close-on-click-action | Whether to close the action sheet when clicking an option | boolean | true | - |
| close-on-click-modal | Whether to close the action sheet when clicking the modal | boolean | true | - |
| duration | Animation duration | number | 200(ms) | - |
| z-index | z-index | number | 10 | - |
| lazy-render | Whether to lazily render the action sheet | boolean | true | - |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | boolean | true | 1.0.0 |

## Action Options

| Key | Description | Type | Default | Version |
|---------|---------|---------|---------|------|
| name | Option name | string | - | - |
| subname | Option subname | string | - | - |
| color | Option text color | string | - | - |
| disabled | Whether to disable the option | boolean | false | - |
| loading | Whether to display loading status | boolean | false | - |

## Events

| Event Name | Description | Parameters | Version |
|---------|---------|---------|------|
| select | Triggered when an option is clicked | item: selected option, index: option index | - |
| open | Triggered when the action sheet is opened | - | - |
| opened | Triggered when the action sheet opening animation ends | - | - |
| close | Triggered when the action sheet is closed | - | - |
| closed | Triggered when the action sheet closing animation ends | - | - |
| click-modal | Triggered when the modal is clicked | - | - |
| cancel | Triggered when the cancel button is clicked | - | - |