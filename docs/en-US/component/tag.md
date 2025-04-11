# Tag

Used to mark status or summarize main content.

## Basic Usage

Set `type` to modify the tag type.

```html
<wd-tag custom-class="space">Tag</wd-tag>
<wd-tag custom-class="space" type="primary">Tag</wd-tag>
<wd-tag custom-class="space" type="danger">Tag</wd-tag>
<wd-tag custom-class="space" type="warning">Tag</wd-tag>
<wd-tag custom-class="space" type="success">Tag</wd-tag>
```

```scss
:deep(.space) {
  margin: 0 10px 10px;
}
```

## Plain Tag

Set the `plain` property.

```html
<wd-tag plain>Tag</wd-tag>
<wd-tag type="primary" plain>Tag</wd-tag>
<wd-tag type="danger" plain>Tag</wd-tag>
<wd-tag type="warning" plain>Tag</wd-tag>
<wd-tag type="success" plain>Tag</wd-tag>
```

## Mark Tag

Set the `mark` property.

```html
<wd-tag mark>Tag</wd-tag>
<wd-tag type="primary" mark>Tag</wd-tag>
<wd-tag type="danger" mark>Tag</wd-tag>
<wd-tag type="warning" mark>Tag</wd-tag>
<wd-tag type="success" mark>Tag</wd-tag>
```

## Plain Mark Tag

Set both `mark` and `plain` properties.

```html
<wd-tag mark plain>Tag</wd-tag>
<wd-tag type="primary" mark plain>Tag</wd-tag>
<wd-tag type="danger" mark plain>Tag</wd-tag>
<wd-tag type="warning" mark plain>Tag</wd-tag>
<wd-tag type="success" mark plain>Tag</wd-tag>
```

## Round Tag

Set the `round` property.

```html
<wd-tag round>Tag</wd-tag>
<wd-tag type="primary" round>Tag</wd-tag>
<wd-tag type="danger" round>Tag</wd-tag>
<wd-tag type="warning" round>Tag</wd-tag>
<wd-tag type="success" round>Tag</wd-tag>
```

## Set Icon

Set `icon` for the left icon, or use the 'icon' slot. When using the slot, enable `use-icon-slot`.

```html
<wd-tag custom-class="space" icon="clock" mark>Tag</wd-tag>
<wd-tag custom-class="space" mark use-icon-slot>
  <text>Slot</text>
  <template #icon>
    <wd-icon name="clock" />
  </template>
</wd-tag>
```

## Custom Color

Set `color` to modify text color, set `bg-color` to modify background and border color.

```html
<wd-tag color="#0083ff" bg-color="#d0e8ff">Tag</wd-tag>
<wd-tag color="#FAA21E" bg-color="#FAA21E" plain>Tag</wd-tag>
```

## Closable

Set the `closable` property to allow the tag to be closed. When closed, it will trigger the `close` event.

```html
<wd-tag closable round type="primary">Tag</wd-tag>
```

## Add Tag

Set the `dynamic` property for the add tag style. After entering content, it will trigger the `confirm` event.

```html
<wd-tag v-for="(tag, index) in tags" :key="index" custom-class="space" round closable @close="handleClose(index)">{{item}}</wd-tag>
<wd-tag custom-class="space" round dynamic @confirm="handleConfirm"></wd-tag>
```
If you want to customize the add style, you can use the `add` slot.
```html
<wd-tag custom-class="space" round dynamic @confirm="handleConfirm">
  <template #add>
    <wd-icon name="pin" size="12px"></wd-icon>
    <text style="margin-left: 4px">Custom</text>
  </template>
</wd-tag>
```

```typescript
const tags = ref(['Tag 1', 'Tag 2'])

function handleClose(order) {
  tags.value = tags.value.filter((value, index) => index !== order)
  console.log('close:index' + order)
}

function handleConfirm({ value }) {
  if (!value) return
  tags.value = [...tags.value, value]
}
```

## Events

```html
<wd-tag v-for="(tag, index) in tags" :key="index" round closable @click="handleClick(index)" @close="handleClose(index)">{{tag.value}}</wd-tag>
```

```typescript
const tags = ref([
  {
    plain: true,
    closable: true,
    type: 'primary',
    value: 'Tag 1'
  }
])

function handleClick(index) {
  console.log('click:index' + index)
}
function handleClose(order) {
  tags.value = tags.value.filter((value, index) => index !== order)
  console.log('close:index' + order)
}
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| type | Tag type | string | `default` / `primary` / `danger` / `warning` / `success` | default | - |
| plain | Plain type | boolean | - | false | - |
| mark | Mark type | boolean | - | false | - |
| round | Round type | boolean | - | false | - |
| icon | Left icon | string | - | - | - |
| color | Text color | string | - | - | - |
| bg-color | Background and border color | string | - | - | - |
| closable | Closable (only supported for round type) | boolean | - | false | - |
| use-icon-slot | Enable icon slot | boolean | - | false | - |
| dynamic | Whether it's an add tag | boolean | - | false | - |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| click | Triggered when tag is clicked | event | - |
| close | Triggered when close button is clicked | event | - |
| confirm | Triggered after entering content in add tag | `{ value }` | - |

## Slots

| Name | Description | Version |
|------|-------------|----------|
| icon | Icon | - |
| add | Custom add tag slot, effective when `dynamic` is `true` | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |