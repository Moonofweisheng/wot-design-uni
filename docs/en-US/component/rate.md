# Rate

Used for quick rating operations or displaying ratings.

## Basic Usage

Set `v-model` for the score and `num` for the total score, default is 5 points.

```html
<wd-rate v-model="value" @change="handleChange" />
```

```typescript
const value = ref<number>(1)

function changeValue({ value }) {
  console.log(value)
}
```

## Read-only

Set the `readonly` property.

```html
<wd-rate v-model="value" readonly />
```

## Disabled

Set the `disabled` property and `disabled-color`.

```html
<wd-rate :modelValue="2" disabled />
```

## Modify Color

You can modify the unselected color through the `color` property and the selected color through `active-color`.

```html
<wd-rate v-model="value" active-color="linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)" />
<wd-rate v-model="value" :active-color="['linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)', 'linear-gradient(315deg, rgba(245,34,34,1) 0%,rgba(255,117,102,1) 100%)']" />
```

## Modify Icon

You can modify the unselected icon through the `icon` property and the selected icon through `active-icon`.

```html
<wd-rate v-model="value" icon="wd-icon-dong" active-icon="wd-icon-dong" active-color="#4D80F0"/>
```

## Modify Size and Spacing

You can modify the icon size through the `size` property and the spacing between icons through `space`.

```html
<wd-rate v-model="value" size="30px" space="10px"/>
```

## Allow Half Selection

Set the `allowHalf` property.

```html
<wd-rate v-model="value" allow-half />
```

## Allow Clear Rating

Set the `clearable` property. When clearable is set to true, clicking the same value again can reset the value to 0.

```html
<wd-rate v-model="value" clearable />
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Current score | number | - | - | - |
| num | Maximum rating value | number | - | 5 | - |
| readonly | Whether it's read-only | boolean | - | false | - |
| size | Icon size | string | - | 16px | - |
| space | Icon spacing | string | - | 4px | - |
| color | Unselected icon color | string | - | #E8E8E8 | - |
| active-color | Selected icon color (supports color array with 2 elements for 2 segments) | string/array | - | linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%) | - |
| icon | Unselected icon class name | string | - | wd-icon-star-on | - |
| active-icon | Selected icon class name | string | - | wd-icon-star-on | - |
| disabled | Whether it's disabled | boolean | - | false | - |
| disabled-color | Disabled icon color | string | - | linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%) | - |
| allow-half | Whether to allow half selection | boolean | - | false | 1.7.0 |
| clearable | Whether to allow clear rating | boolean | - | false | 1.13.0 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Triggered when clicking icon to modify score | `{ value }` | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |