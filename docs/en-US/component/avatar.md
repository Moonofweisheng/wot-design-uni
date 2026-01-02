---
version: $LOWEST_VERSION$
---

# Avatar

Used to represent users or objects, supporting images, text, or icons.

## Basic Usage

Avatar supports three types: image, text, and icon.

```typescript
const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
```

```html
<wd-avatar :src="avatarURL" />
<wd-avatar text="U" />
<wd-avatar icon="user" />
```

## Shape

Use the `shape` prop to set the avatar shape, supports `round` and `square`, default is `round`.

```html
<wd-avatar :src="avatarURL" shape="square" />
<wd-avatar :src="avatarURL" shape="round" />
```

## Size

Supports preset sizes: `large`, `medium`, `normal`, `small`, default is `normal`. Also supports passing a number or string with units (like `40px`, `100rpx`) for custom sizes.

```html
<!-- Preset Sizes -->
<wd-avatar :src="avatarURL" size="large" />
<wd-avatar :src="avatarURL" size="medium" />
<wd-avatar :src="avatarURL" size="normal" />
<wd-avatar :src="avatarURL" size="small" />

<!-- Custom Sizes -->
<wd-avatar :src="avatarURL" :size="80" />
<wd-avatar :src="avatarURL" size="60px" />
<wd-avatar :src="avatarURL" size="100rpx" />
```

## Custom Color

Use `bg-color` and `color` props to customize background and text colors.

```html
<wd-avatar bg-color="#DC143C" color="#fff" text="W" />
<wd-avatar bg-color="#228B22" color="#fff" text="O" />
<wd-avatar bg-color="#1E90FF" color="#fff" text="T" />
<wd-avatar bg-color="#EEEEEE" color="#7B8198" icon="user" />
```

## Avatar with Badge

Display badge with Badge component.

```html
<wd-badge modelValue="10" type="primary">
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge modelValue="20" type="danger">
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge is-dot>
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge is-dot>
  <wd-avatar text="A" shape="square" bg-color="#1E90FF" />
</wd-badge>
```

## Custom Content

Use the default slot to customize avatar content.

```html
<wd-avatar>
  <view class="custom-content">VIP</view>
</wd-avatar>
<wd-avatar>
  <wd-icon name="star-on" size="24px" color="#f0883a" />
</wd-avatar>
```

## Clickable

Implement click functionality by listening to the `click` event.

```html
<wd-avatar :src="avatarURL" @click="handleClick" />
<wd-avatar text="Click" bg-color="#1E90FF" @click="handleClick" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const handleClick = () => {
  toast.show('Avatar clicked')
}
```

## Avatar Group

Use `wd-avatar-group` component to display a group of avatars.

### Basic Usage

```html
<wd-avatar-group>
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>
```

### Max Count

Use `max-count` prop to limit the number of displayed avatars, excess avatars will be shown as `+N`.

```html
<wd-avatar-group :max-count="3">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### Cascading Direction

Use `cascading` prop to set the cascading direction, supports `left-up` (left avatars on top) and `right-up` (right avatars on top).

```html
<wd-avatar-group cascading="left-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>

<wd-avatar-group cascading="right-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### Unified Size and Shape

Use `size` and `shape` props to uniformly set the size and shape of all avatars in the group. Use `max-count` to limit the number of displayed avatars, and excess avatars will show a collapsed avatar. Customize the collapsed avatar text using `collapse-avatar`.

```html
<!-- Unified Size -->
<wd-avatar-group size="large" :max-count="3">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>

<!-- Unified Shape with Custom Collapse Text -->
<wd-avatar-group shape="square" :max-count="3" :collapse-avatar="'+N'">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>
```

## Avatar Attributes

| Name     | Description                                              | Type             | Accepted Values                 | Default    | Version          |
| -------- | -------------------------------------------------------- | ---------------- | ------------------------------- | ---------- | ---------------- |
| src      | Image URL                                                | string           | -                               | -          | $LOWEST_VERSION$ |
| text     | Text content                                             | string           | -                               | -          | $LOWEST_VERSION$ |
| icon     | Icon name, using wd-icon component                       | string           | -                               | -          | $LOWEST_VERSION$ |
| size     | Avatar size, supports preset sizes or strings with units | string \| number | large / medium / normal / small | normal     | $LOWEST_VERSION$ |
| shape    | Avatar shape                                             | string           | round / square                  | round      | $LOWEST_VERSION$ |
| bg-color | Background color                                         | string           | -                               | -          | $LOWEST_VERSION$ |
| color    | Text color                                               | string           | -                               | -          | $LOWEST_VERSION$ |
| alt      | Placeholder text when image fails to load                | string           | -                               | -          | $LOWEST_VERSION$ |
| mode     | Image fill mode, same as uni-app image component's mode  | string           | -                               | aspectFill | $LOWEST_VERSION$ |

## Avatar Events

| Event Name | Description                        | Parameters | Version          |
| ---------- | ---------------------------------- | ---------- | ---------------- |
| click      | Triggered when avatar is clicked   | -          | $LOWEST_VERSION$ |
| error      | Triggered when image fails to load | event      | $LOWEST_VERSION$ |

## Avatar Slots

| Name    | Description           | Version          |
| ------- | --------------------- | ---------------- |
| default | Custom avatar content | $LOWEST_VERSION$ |

## Avatar External Classes

| Class Name   | Description     | Version          |
| ------------ | --------------- | ---------------- |
| custom-class | Root node style | $LOWEST_VERSION$ |
| custom-style | Root node style | $LOWEST_VERSION$ |

## AvatarGroup Attributes

| Name            | Description                                         | Type             | Accepted Values                 | Default | Version          |
| --------------- | --------------------------------------------------- | ---------------- | ------------------------------- | ------- | ---------------- |
| max-count       | Maximum display count                               | number           | -                               | -       | $LOWEST_VERSION$ |
| cascading       | Cascading direction                                 | string           | left-up / right-up              | -       | $LOWEST_VERSION$ |
| shape           | Uniform avatar shape                                | string           | round / square                  | round   | $LOWEST_VERSION$ |
| size            | Uniform avatar size                                 | string \| number | large / medium / normal / small | normal  | $LOWEST_VERSION$ |
| collapse-avatar | Collapsed avatar content when exceeds maximum count | string           | -                               | -       | $LOWEST_VERSION$ |

## AvatarGroup Slots

| Name    | Description                             | Version          |
| ------- | --------------------------------------- | ---------------- |
| default | Avatar list, place wd-avatar components | $LOWEST_VERSION$ |

## AvatarGroup External Classes

| Class Name   | Description     | Version          |
| ------------ | --------------- | ---------------- |
| custom-class | Root node style | $LOWEST_VERSION$ |
| custom-style | Root node style | $LOWEST_VERSION$ |
