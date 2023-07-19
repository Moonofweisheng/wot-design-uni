## StatusTip 缺省提示

一般用于兜底占位展示。

> 若图片显示安全域名问题，需将 img11.360buyimg.com 域名添加为业务域名。

### 引入

```json
{
  "usingComponents": {
    "wd-status-tip": "/wot-design/statusTip/index"
  }
}
```

### 基本用法

设置 `type` 修改展示缺省图片类型，默认为 'network'，可选值 'search', 'network', 'content', 'collect', 'comment', 'halo', 'message'。可设置 `tip` 来控制展示提示文案。

```html
<wd-status-tip type="search" tip="当前搜索无结果"/>
<wd-status-tip type="network" tip="该页面暂时无法访问"/>
<wd-status-tip type="content" tip="暂无内容"/>
<wd-status-tip type="collect" tip="暂无收藏"/>
<wd-status-tip type="comment" tip="当前没有联系人名单哦～"/>
<wd-status-tip type="halo" tip="支付失败，请重新订购"/>
<wd-status-tip type="message" tip="已订阅全部消息"/>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| type | 缺省类型 | string | search / network / content / collect / comment / halo / message | network | - |
| tip | 提示文案 | string | - | - | - |
