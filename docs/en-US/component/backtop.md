# Backtop

A button used to return to the top of the page.

## Basic Usage

Since returning to the top requires real-time monitoring of the scrollbar position, and the page's scroll information cannot be obtained in the uniapp component,
the scrollbar position can only be obtained in the page's `onPageScroll` lifecycle, and then passed to the component through `Props`.

```html
  <wd-backtop :scrollTop="scrollTop"></wd-backtop>
```

```typescript
const scrollTop = ref<number>(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
```

## Custom Icon

```html
  <wd-backtop :scrollTop="scrollTop">
    <text>TOP<text>
  </wd-backtop>
```

## Custom Style

```html
  <wd-backtop :scrollTop="scrollTop" customStyle="background: #007aff;color:white;"></wd-backtop>
```

## Attributes

| Attribute  | Description                                                | Type   | Options | Default | Version |
| ---------- | ---------------------------------------------------------- | ------ | ------- | ------- | ------- |
| scrollTop  | Page scroll distance                                       | number | -       | -       | -       |
| top        | Distance from top when to show, unit `px`                  | number | -       | 300     | -       |
| duration   | Return to top scroll time, unit `ms`                       | number | -       | 100     | -       |
| zIndex     | Component z-index property                                 | number | -       | 10      | -       |
| iconStyle  | Custom `icon` style                                        | string | -       | -       | -       |
| shape      | Button shape                                               | string | square  | circle  | -       |
| bottom     | Distance from screen bottom, unit `px`                        | number | -       | 100     | -       |
| right      | Distance from screen right, unit `px`                      | number | -       | 20      | -       |

## External Classes

| Class Name    | Description          | Version |
| ------------- | -------------------- | ------- |
| custom-class  | Root element style   | -       |
| custom-style  | Root element style   | -       |