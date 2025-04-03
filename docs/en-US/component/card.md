# Card

Used to display product images, prices, and other information.

## Basic Usage

Set the title through the `title` property, and pass content through the default slot.
Supports setting `title` slot and `footer` slot.

```html
<wd-card title="Business Analysis">
  Generally, the disciplinary inspection committee or the party committee handling the report will meet with the complainant to discuss the handling opinions or review conclusions. A copy of the review conclusions and decisions should be given to the complainant.
  <template #footer>
    <wd-button size="small" plain>View Details</wd-button>
  </template>
</wd-card>
```

## Rectangle Card

Set `type` to `rectangle`.

```html
<wd-card type="rectangle">
  <template #title>
    <view class="title">
      <view>Service expires on 2020-02-03</view>
      <view class="title-tip">
        <wd-icon name="warning" size="14px" custom-style="vertical-align: bottom" />
        You can use this service on your computer
      </view>
    </view>
  </template>
  <view style="height: 40px;" class="content">
    <image
      src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
      width="40"
      height="40"
      alt="joy"
      style="border-radius: 4px; margin-right: 12px;"
    />
    <view>
      <view style="color: rgba(0,0,0,0.85); font-size: 16px;">Smart Marketing</view>
      <view style="color: rgba(0,0,0,0.25); font-size: 12px;">Premium Version - Quick Fan Growth | One Year Period</view>
    </view>
  </view>

  <template #footer>
    <view>
      <wd-button size="small" style="margin-right: 8px;">Rate</wd-button>
      <wd-button size="small" plain>Use Now</wd-button>
    </view>
  </template>
</wd-card>
```

```scss
.content,
.title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.content {
  justify-content: flex-start;
}
.title {
  justify-content: space-between;
}
.title-tip {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
```

## Attributes

| Attribute | Description | Type | Options | Default | Version |
| --------- | ----------- | ---- | -------- | ------- | ------- |
| title | Card title | string | - | - | - |
| type | Card type | string | rectangle | - | - |

## Slot

| name | Description | Version |
| ---- | ----------- | ------- |
| default | Card content | - |
| title | Card title | - |
| footer | Footer operation content | - |

## External Classes

| Class Name | Description | Version |
| ---------- | ----------- | ------- |
| custom-class | Root node custom style | - |
| custom-title-class | Title custom style | - |
| custom-content-class | Content custom style | - |
| custom-footer-class | Footer custom style | - |