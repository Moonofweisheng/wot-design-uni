# Segmented

Segmented is used to display multiple options and allow users to select a single option.

## When To Use

- Used to display multiple options and allow users to select a single option;
- When switching the selected option, the content in the associated area will change.

## Basic Usage

Set the options list through the `options` property and bind the current selected item through `v-model:value`.

```vue
<wd-segmented :options="list" v-model:value="current"></wd-segmented>
```

```ts
const list = ref<string[]>(['Comments', 'Likes', 'Contributions', 'Rewards'])

const current = ref('Likes')
```

## Large Segmented

Create a large segmented by setting the `size` property to `"large"`.

```html
<wd-segmented :options="list" v-model:value="current" size="large"></wd-segmented>
```

## Small Segmented

Create a small segmented by setting the `size` property to `"small"`.

```html
<wd-segmented :options="list" v-model:value="current" size="small"></wd-segmented>
```

## Segmented with Vibration Effect

Make the phone produce a short vibration when switching options by setting the `vibrate-short` property to `true`.

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true"></wd-segmented>
```

## Disabled Segmented

Disable the segmented by setting the `disabled` property to `true`.

```html
<wd-segmented :options="list" v-model:value="current" disabled></wd-segmented>
```

## Custom Rendering Segmented Labels

Use the `label` slot to customize the rendering of segmented labels.

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true">
  <template #label="{ option }">
    <view class="section-slot">
      <image style="border-radius: 50%; width: 32px; height: 32px" :src="option.payload.avatar" />
      <view class="name">{{ option.value }}</view>
    </view>
  </template>
</wd-segmented>
```

```ts
const list = ref([
  {
    value: 'Li Lei',
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/redpanda.jpg'
    }
  },
  {
    value: 'Han Meimei',
    disabled: false,
    payload: {
      avatar: 'https://wot-ui.cn/assets/capybara.jpg'
    }
  }
])
```

```scss
.section {
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;
  &-slot {
    padding: 4px;
  }
}
```

## Using in Popup
On WeChat Mini Program, when using this component in a popup, you need to call the `updateActiveStyle` method to update the segmented style. See [Common Problems](/guide/common-problems.html#why-do-slider-tabs-and-other-components-behave-abnormally-when-using-popup-actionsheet-dropdownitem-and-other-popup-components-in-wechat-mini-program).

```html
<wd-button @click="handleClick">Open Popup</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable custom-style="height: 200px;padding: 0 24rpx;">
  <view class="title">Using in Popup</view>
  <wd-segmented :options="list" v-model:value="current" ref="segmentedRef"></wd-segmented>
</wd-popup>
```
```ts
const list = ref<string[]>(['Comments', 'Likes', 'Contributions', 'Rewards'])
const current = ref('Likes')

const segmentedRef = ref<SegmentedInstance>() // Get segmented instance
const showPopup = ref(false) // Control popup display
/**
 * Click button to open popup
 */
function handleClick() {
  showPopup.value = true
}
/**
 * Update segmented style after popup opens
 */
function handlePopupShow() {
  segmentedRef.value?.updateActiveStyle()
}
```
```css
.title {
  display: flex;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  padding: 24rpx 0;
}
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| value/v-model:value | Currently selected value | string / number | - | - | 0.1.23 |
| disabled | Whether to disable the segmented | boolean | true / false | `false` | 0.1.23 |
| size | Control size | string | `large` / `middle` / `small` | `middle` | 0.1.23 |
| options | Data collection | `string[] / number[] / SegmentedOption[]` | - | [] | 0.1.23 |
| vibrateShort | Whether to vibrate when switching options | boolean | true / false | `false` | 0.1.23 |

### SegmentedOption

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| value | Selected value | string / number | - | - | 0.1.23 |
| disabled | Whether to disable | boolean | true / false | - | 0.1.23 |
| payload | Additional data | any | - | - | 0.1.23 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Triggered when option switches | `SegmentedOption` | 0.1.23 |
| click | Triggered when option is clicked | `SegmentedOption` | 1.2.20 |

## Methods

Exposed functions

| Method Name | Description | Parameters | Version |
|-------------|-------------|------------|----------|
| updateActiveStyle | Update slider offset, parameter `animation` is used to enable/disable animation, enabled by default | `(animation: boolean) => void` | - |

## Slots

| Name | Description | Parameters | Version |
|------|-------------|------------|----------|
| label | Option label content | `{ option: SegmentedOption }` | 0.1.23 |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| customStyle | Custom style | 0.1.23 |
| customClass | Custom style class | 0.1.23 |