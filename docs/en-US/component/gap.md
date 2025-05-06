# Gap

Generally used to replace margin or padding in page layout; or serve as a (bottom) placeholder element.

## Basic Usage

Set the title through the `height` property and background color through the `background` property.

```html
<wd-gap bg-color="#FFFFFF"></wd-gap>
```

## Custom Background Color

```html
<wd-gap bg-color="#4D80F0"></wd-gap>
```

## Custom Height

```html
<wd-gap bg-color="#4D80F0" height="120rpx"></wd-gap>
```

## Bottom Safe Area

```html
<wd-gap safe-area-bottom height="0"></wd-gap>
```

## Attributes

| Parameter      | Description                | Type                | Options     | Default     | Version |
|----------------|----------------------------|---------------------|-------------|-------------|----------|
| height         | Height                     | `string`/`number`   | -           | 15          | -        |
| bgColor        | Background color           | string             | -           | transparent | -        |
| safeAreaBottom | Enable bottom safe area    | boolean            | true/false  | false       | -        |

## External Classes

| Class Name    | Description      | Version |
|---------------|------------------|----------|
| custom-class  | Custom style     | -        |