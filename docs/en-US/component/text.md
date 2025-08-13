# Text

Text component, used to display text information.

> Available since version 1.3.4

## Basic Usage

Set `text` to set the text content. It is recommended to use the form <code>:text='value'</code>.

```html
<wd-text
  text="Reed leaves fill the sandbar, cold sand carries shallow streams. Twenty years later, passing the south tower again. The boat tied under willows is not yet steady, how many days until mid-autumn comes again? Yellow crane at the broken cliff, has my old friend been here? The old rivers and mountains are all filled with new sorrows. Wanting to buy osmanthus flowers and bring wine, but it's never like the wanderings of youth."
></wd-text>
```

## Set Theme

Set text theme through the <code>type</code> parameter. We provide five types: <code>primary</code> <code>error</code> <code>success</code> <code>warning</code> <code>default</code>.

```html
<wd-text type="primary" text="Primary"></wd-text>
<wd-text type="error" text="Error"></wd-text>
<wd-text type="success" text="Success"></wd-text>
<wd-text type="warning" text="Warning"></wd-text>
<wd-text text="Default"></wd-text>
```

## Custom Font Color

Set the `color` property.

```html
<wd-text
  text="Reed leaves fill the sandbar, cold sand carries shallow streams. Twenty years later, passing the south tower again. The boat tied under willows is not yet steady, how many days until mid-autumn comes again? Yellow crane at the broken cliff, has my old friend been here? The old rivers and mountains are all filled with new sorrows. Wanting to buy osmanthus flowers and bring wine, but it's never like the wanderings of youth."
  color="#36B8C2"
></wd-text>
```

## Bold Text

Set the `bold` property.

```html
<wd-text
  text="Reed leaves fill the sandbar, cold sand carries shallow streams. Twenty years later, passing the south tower again. The boat tied under willows is not yet steady, how many days until mid-autumn comes again? Yellow crane at the broken cliff, has my old friend been here? The old rivers and mountains are all filled with new sorrows. Wanting to buy osmanthus flowers and bring wine, but it's never like the wanderings of youth."
  bold
></wd-text>
```

## Font Size

Set the `size` property.

```html
<wd-text
  text="Reed leaves fill the sandbar, cold sand carries shallow streams. Twenty years later, passing the south tower again. The boat tied under willows is not yet steady, how many days until mid-autumn comes again? Yellow crane at the broken cliff, has my old friend been here? The old rivers and mountains are all filled with new sorrows. Wanting to buy osmanthus flowers and bring wine, but it's never like the wanderings of youth."
  size="16px"
></wd-text>
```

## Data Masking

Set the `format` property, effective when `mode` is `phone` or `name`.

```html
<wd-text text="Li Si" mode="name" :format="true"></wd-text>
<wd-text text="Zhang Chang San" mode="name" :format="true"></wd-text>
<wd-text text="18888888888" mode="phone" :format="true"></wd-text>
```

## Lines

Set the `lines` property to specify the number of lines of text to display. If set, an ellipsis will be shown when the text exceeds this number of lines. Maximum value is 5.

```html
<wd-text :text="text" :lines="2" size="16px"></wd-text>
```

## Line Height

Set `lineHeight` for text line height.

```html
<wd-text :text="text" lineHeight="20px"></wd-text>
```

## Prefix and Suffix Slots

Set `prefix` and `suffix` slots.

```html
<wd-text
  text="12345678901"
  mode="phone"
  format
  type="primary"
  prefix="Prefix"
  suffix="Suffix"
/>

<wd-text text="12345678901" mode="phone" format type="primary">
  <template #prefix>
    <text>Prefix</text>
  </template>
  <template #suffix>Suffix</template>
</wd-text>
```

## Price

Set `mode="price"`.

```html
<wd-text
  text="16354.156"
  mode="price"
  type="success"
  decoration="line-through"
  prefix="￥"
/>
```

## Text Decoration

Set `decoration` for text decoration, such as underline, line-through, etc.

```html
<wd-text :text="text" type="warning" decoration="underline"/>
```

## Events

```html
<wd-text
  text="Reed leaves fill the sandbar, cold sand carries shallow streams. Twenty years later, passing the south tower again. The boat tied under willows is not yet steady, how many days until mid-autumn comes again? Yellow crane at the broken cliff, has my old friend been here? The old rivers and mountains are all filled with new sorrows. Wanting to buy osmanthus flowers and bring wine, but it's never like the wanderings of youth."
  @click="clickTest"
></wd-text>
```

```typescript
function clickTest() {
  console.log(1)
}
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| type | Theme type | string | 'primary' / 'error' / 'warning' / 'success' / 'default' | default | 1.3.4 |
| text | Text content | string / number | - | - | 1.3.4 |
| size | Font size | string | - | - | 1.3.4 |
| mode | Text processing mode | string | 'text' / 'date' / 'phone' / 'name' / 'price' | text | 1.3.4+ |
| bold | Whether bold, default normal | boolean | - | false | 1.3.4 |
| format | Whether to mask data | boolean | Effective when mode is phone or name | false | 1.3.4 |
| color | Text color | string | - | - | 1.3.4 |
| lines | Number of lines to display, if set, ellipsis will show when exceeding. Max value is 5. | number | - | - | 1.3.4 |
| lineHeight | Text line height | string | - | - | 1.3.4 |
| decoration | Text decoration, underline, line-through, etc. | string | 'underline' / 'line-through' / 'overline' | none | 1.3.4+ |
| prefix | Prefix content | string | - | - | 1.3.4+ |
| suffix | Suffix content | string | - | - | 1.3.4+ |
| call | Whether to make a call when clicking text in phone mode | boolean | - | false | 1.3.4 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| click | Triggered when text is clicked | event | 1.3.4 |

## Slots

| Slot Name | Description | Version |
|-----------|-------------|---------|
| prefix | Prefix slot | 1.3.4 |
| suffix | Suffix slot | 1.3.4 |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | 1.3.4 |
| custom-style | Root node style | 1.3.4 |