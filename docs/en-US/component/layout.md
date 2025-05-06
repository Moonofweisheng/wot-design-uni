# Layout

Used for quick layout.

## Basic Usage

The `Layout` component provides a `24-column` grid system. By setting the `span` property on `wd-col`, columns are created by calculating the current content's percentage.

Note: The column layout only provides layout, i.e., element width. Users can define internal styles as needed through `custom-class` or by `modifying internal tags`.

```html
<wd-row>
  <wd-col :span="24"><view class="bg-dark1">span: 24</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="12"><view class="bg-dark">span: 12</view></wd-col>
  <wd-col :span="12"><view class="bg-light">span: 12</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-light">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="6"><view class="bg-dark">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-light">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-dark">span: 6</view></wd-col>
  <wd-col :span="6"><view class="bg-light">span: 6</view></wd-col>
</wd-row>
```

```scss
.bg-dark1,
.bg-dark,
.bg-light{
  border-radius: 4px;
  min-height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.45);
}
.bg-dark1 {
  background: #99a9bf;
  color: #fff;
}
.bg-dark {
  background: #d3dce6;
}
.bg-light {
  background: #e5e9f2;
}
```

## Column Offset

The `offset` property can set the offset of columns. The calculation method and offset size are the same as `span`.

```html
<wd-row>
  <wd-col :span="4"><view class="bg-dark">span: 4</view></wd-col>
  <wd-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></wd-col>
</wd-row>
<wd-row>
  <wd-col :span="8" :offset="4"><view class="bg-dark">span: 8 offset: 4</view></wd-col>
  <wd-col :span="8" :offset="4"><view class="bg-dark">span: 8 offset: 4</view></wd-col>
</wd-row>
```

## Column Spacing

Through the `gutter` property, you can set the spacing between column elements. The default spacing is 0.

```html
<wd-row gutter="20">
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-light">span: 8</view></wd-col>
  <wd-col :span="8"><view class="bg-dark">span: 8</view></wd-col>
</wd-row>
```

## Row Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| gutter | Spacing between column elements (in px) | number | - | 0 | - |

## Col Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| span | Column element width | number | - | 24 | - |
| offset | Column element offset distance | number | - | 0 | - |

## Row External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Row root node style | - |

## Col External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Col root node style | - |