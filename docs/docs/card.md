## Card 卡片

### 引入

```json
{
  "usingComponents": {
    "wd-card": "/wot-design/card/index"
  }
}
```

### 基本使用

通过 `title` 属性设置标题，默认插槽传入内容。
支持设置 `title` 插槽和 `footer` 插槽。

```html
<wd-card title="经营分析">
  一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
  <wd-button slot="footer" size="small" plain>查看详情</wd-button>
</wd-card>
```

### 矩形卡片

将`type` 设置为 `rectangle` 。

```html
<wd-card type="rectangle">
  <view class="title" slot="title">
    <view>2020-02-03服务到期</view>
    <view class="title-tip"><wd-icon name="warning" size="14px" style="vertical-align: bottom"/> 您可以去电脑上使用该服务</view>
  </view>
  <view style="height: 40px;" class="content">
    <image src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg" width="40" height="40" alt="joy" style="border-radius: 4px; margin-right: 12px;" />
    <view>
      <view style="color: rgba(0,0,0,0.85); font-size: 16px;">智云好客CRM短信_催评营销</view>
      <view style="color: rgba(0,0,0,0.25); font-size: 12px;">高级版-快速吸粉 | 周期一年 </view>
    </view>
  </view>
  <view slot="footer">
    <wd-button size="small" style="margin-right: 8px;">评价</wd-button>
    <wd-button size="small" plain>立即使用</wd-button>
  </view>
</wd-card>
```
```css
.content, .title {
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

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|--------|
| title | 卡片标题 | string | - | - | - |
| type | 卡片类型 | string | rectangle | - | - |

### Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 卡片内容 | - |
| title | 卡片标题 | - |
| footer | 底部操作内容 | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点自定义样式 | 2.3.0 |
| custom-title-class | 标题自定义样式 | 2.3.0 |
| custom-content-class | 内容自定义样式 | 2.3.0 |
| custom-footer-class | 底部自定义样式 | 2.3.0 |
