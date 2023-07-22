## 更新日志

### 2.3.2

*2021-04-27*

- DropMenu
  - 修复点击已展开的选项时，无法收起的问题 (by [@yawuling](https://github.com/yawuling) )

### 2.3.1

*2021-04-22*

- CalendarView
  - 修复 `dates` 类型下无法取消选中日期的问题 (by [@yawuling](https://github.com/yawuling) )

### 2.3.0

*2021-04-22*

#### 新特性

- ActionSheet
  - 新增 `lazy-render` 懒渲染属性 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
- Calendar
  - 新增日历选择器组件 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- CalendarView
  - 新增日历面板组件 (by [@yawuling](https://github.com/yawuling) )
- Card
  - 新增 `custom-class`、`custom-title-class`、`custom-content-class`、`custom-footer-class` 自定义样式 (by [@yawuling](https://github.com/yawuling) )
- ColPicker
  - 新增 `z-index` 属性，设置弹层层级 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 新增 `default-value` 属性，支持设置面板默认展示值 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `z-index` 属性，设置弹层层级 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- DatetimePickerView
  - 新增 `bind:pickstart` 事件，当滚动选择开始时候触发事件 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `bind:pickend` 事件，当滚动选择结束时候触发事件 (by [@yawuling](https://github.com/yawuling) )
- Input
  - 添加自定义外部类名 `custom-textarea-container-class` (by [@yawuling](https://github.com/yawuling) )
- InputNumber
  - 新增 `allow-null` 属性允许空值 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `placeholder` 属性设置占位文本 (by [@yawuling](https://github.com/yawuling) )
- ImgCropper
  - 新增组件图片裁剪 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- MessageBox
  - 新增 `z-index` 属性，设置弹层层级 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `lazy-render` 懒渲染属性 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 新增 `z-index` 属性，设置弹层层级 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 新增 `bind:pickstart` 事件，当滚动选择开始时候触发事件 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `bind:pickend` 事件，当滚动选择结束时候触发事件 (by [@yawuling](https://github.com/yawuling) )
- Popup
  - 新增 `lazy-render` 懒渲染属性 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
- SelectPicker
  - 新增 `z-index` 属性，设置弹层层级 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `filterable` 和 `filter-placeholder` 属性，支持本地搜索 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- Switch
  - 新增 `before-change` 修改前钩子 (by [@yawuling](https://github.com/yawuling) )
- Toast
  - 新增 `context` 上下文属性 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - `file` 对象添加 `response` 字段 (by [@yawuling](https://github.com/yawuling) )

#### 优化

- Card
  - 优化卡片组件的样式结构 (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 优化多次触发 `change` 事件的问题 (by [@yawuling](https://github.com/yawuling) )
  - 优化多列数据的情况下 `value` 为空时，默认触发一次选中首个选项 (by [@yawuling](https://github.com/yawuling) )
  - 优化选中项样式 (by [@yawuling](https://github.com/yawuling) )
- StatusTip
  - 占位图改用网络地址，小程序打包时会将未使用的组件也打包进去，如果使用本地图片，会明显增大小程序包体积 (by [@yawuling](https://github.com/yawuling) )
- Tabs
  - 修改切换的实现方式，去掉 `animated` 和 `lazy-render` 属性 (by [@yawuling](https://github.com/yawuling) )
- 定位层级
  - 优化多个组件的定位层级 (by [@yawuling](https://github.com/yawuling) )
- clickoutside
  - 给 `wd-drop-menu`, `wd-popover`, `wd-swipe-action`, `wd-tooltip` 添加 `clickoutside` 功能，优化点击非组件区域时关闭组件的方案 (by [@yawuling](https://github.com/yawuling) )
- 边框
  - 边框调整为 0.5 像素 (by [@yawuling](https://github.com/yawuling) )

#### Bug 修复

- ActionSheet
  - 修复 `panels` 多行快捷方式的条件判断 (by [@yawuling](https://github.com/yawuling) )
- Button
  - 修复 `loading` 属性的类型问题 (by [@yawuling](https://github.com/yawuling) )
- Cell
  - 修复 `border` 类型的展示异常问题 (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 修复设置 `cell` 属性下新增选项时新增的选项缺少表单样式的问题 (by [@yawuling](https://github.com/yawuling) )
- ColPicker
  - 修复自定义 `label` 插槽失败的问题 (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 修复 `error` 错误状态时 placeholder 未标红问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复 `open` 和 `close` 无法调用问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复滚动太快后点击确定按钮，未更新值的问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复范围选择二次赋值时值错乱的问题 (by [@yawuling](https://github.com/yawuling) )
- Loadmore
  - 修复 loading 图标未正常展示的问题 (by [@yawuling](https://github.com/yawuling) )
- MessageBox
  - 修复 `closeOnClickModal` 无效问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复 `messageBox` 使用 `type` 无效问题 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 修复手动设置首选项无效问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复滚动太快后点击确定按钮，未更新值的问题 (by [@yawuling](https://github.com/yawuling) )
- Popover
  - 修复插槽宽度较小时，弹出层的箭头样式偏移错乱问题 (by [@yawuling](https://github.com/yawuling) )
  - 修正 `offset` 属性的使用 (by [@yawuling](https://github.com/yawuling) )
  - 修改文案过长时显示省略 (by [@yawuling](https://github.com/yawuling) )
- SelectPicker
  - 修复自定义 `label` 插槽失败的问题 (by [@yawuling](https://github.com/yawuling) )
- Tooltip
  - 修复插槽宽度较小时，弹出层的箭头样式偏移错乱问题 (by [@yawuling](https://github.com/yawuling) )
  - 修正 `offset` 属性的使用 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - 修复 `disabled` 状态下可以删除图片的问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复图片删除图标层级过高问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复 `limit` 二次赋值为 null、undefined 时抛错的问题 (by [@yawuling](https://github.com/yawuling) )

#### 本次更新可能影响范围

- ColPicker、DatetimePicker、Picker、SelectPicker 原先值为超出默认隐藏，显示为省略号，本次调整为默认不隐藏，若需隐藏，需手动设置 `ellipsis` 属性

### 2.2.0

*2020-12-10*

#### 新特性

- ColPicker
  - 新增 `close-on-click-modal` 属性 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `auto-complete` 属性，自动触发 `column-change` 补全列表初始数据 (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 新增 `close-on-click-modal` 属性 (by [@yawuling](https://github.com/yawuling) )
- DropMenu
  - 新增 `value-key` 属性，支持自定义 options 中数据结构的 value 字段 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `label-key` 属性，支持自定义 options 中数据结构的 label 字段 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `tip-key` 属性，支持自定义 options 中数据结构的 value 字段 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 新增 `close-on-click-modal` 属性 (by [@yawuling](https://github.com/yawuling) )
- Resize
  - 新增 `wd-resize` 组件，支持监听 dom 宽高变化 (by [@Gkxie](https://github.com/Gkxie) )
- SelectPicker
  - 新增 `close-on-click-modal` 属性 (by [@yawuling](https://github.com/yawuling) )
- SortButton
  - 新增 `line` 属性 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - 新增 `name-key` 和 `status-key`，支持自定义 file 数据结构中的 name 字段和 status 字段 (by [@yawuling](https://github.com/yawuling) )

#### 优化

- ActionSheet
  - 给列表添加最大高度限制，为选项过多的情况做展示兜底 (by [@yawuling](https://github.com/yawuling) )
- Cell
  - 将右侧value值的字号从12px调整为14px (by [@yawuling](https://github.com/yawuling) )
- CheckBox
  - `true-value` 和 `false-value` 支持空字符串 (by [@yawuling](https://github.com/yawuling) )
- ColPicker
  - 修改 loading 类型 (by [@yawuling](https://github.com/yawuling) )
- Loading
  - 去掉1.0中的 loading 类型，并做好向下兼容 (by [@yawuling](https://github.com/yawuling) )
- Radio
  - 优化 dot 类型的动画 (by [@yawuling](https://github.com/yawuling) )
- Rate
  - `active-color` 支持数组，支持设置两种颜色 (by [@awjing](https://github.com/awjing) )
- StatusTip
  - 更新占位图，清晰部分细节 (by [@yawuling](https://github.com/yawuling) )
- Tabs
  - 优化 `wd-tab` 组件 `name` 更新渲染问题 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - 修正事件传递和参数传递，向下兼容 (by [@yawuling](https://github.com/yawuling) )

#### Bug 修复

- Cell
  - 修复 `value` 与 箭头顶对齐 (by [@yawuling](https://github.com/yawuling) )
- Collapse
  - 将展开收起设置为行内块 (by [@yawuling](https://github.com/yawuling) )
- DropMenu
  - 修复 `wd-drop-menu-itemn` 组件 `value` 为 0 时的赋值无效问题 (by [@yawuling](https://github.com/yawuling) )
- Input
  - 修复 `label` 插槽展示问题 (by [@yawuling](https://github.com/yawuling) )
- Radio
  - 修改 `size` 为 'large' 时无效的问题 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 修复垂直居中问题 (by [@yawuling](https://github.com/yawuling) )

### 2.1.0

*2020-09-30*

#### 新特性

- Input
  - 新增属性 `align-right`, 支持设置内容右对齐 (by [@HXCStudio123](https://github.com/HXCStudio123) )

#### Bug 修复

- Search
  - Search 组件点击清除按钮后，出现两个“搜索”文案 [#193](https://github.com/Moonofweisheng/wot-design-uni/issues/193) (by [@HXCStudio123](https://github.com/HXCStudio123) )
- SortButton
  - 修复文档中 SortButton 的事件未对齐组件实际触发的事件 [#192](https://github.com/Moonofweisheng/wot-design-uni/issues/192) (by [@awjing](https://github.com/awjing) )
- Input
  - 修复 label 插槽未生效问题 [#191](https://github.com/Moonofweisheng/wot-design-uni/issues/191) (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 2.0.0

*2020-09-25*

#### 新特性

- 综合
  - 组件样式升级，主题色更改
  - 重绘了全部图标，并新增了部分图标
- ActionSheet
  - 新增属性 `panels` 自定义面板，支持一维数组和二维数组，panel数据结构支持设置显示的图片地址和标题内容 (by [@awjing](https://github.com/awjing) )
- Button
  - 属性 `type` 默认值为 `primary` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - round 默认值改为 `true` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Badge
  - 新增属性 `top` 为正时表示角标向下偏移对应的像素 (by [@awjing](https://github.com/awjing) )
  - 新增属性 `right` 为正时表示角标向左偏移对应的像素 (by [@awjing](https://github.com/awjing) )
- Card
  - 新增卡片组件 Card  (by [@awjing](https://github.com/awjing) )
- Cell
  - 新增属性 `required`, 支持表单属性设置必填项 (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `vertical`, 支持表单属性展示为上下结构 (by [@yawuling](https://github.com/yawuling) )
- CellGroup
  - 新增属性 `border`, 支持设置表单组是否展示边框线 (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `max-width`, 支持设置文字部分最大宽度，设置最大宽度开启文字折叠 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增自定义样式类 `custom-label-class` 自定义文字结点样式(by [@yawuling](https://github.com/yawuling) )
  - 新增自定义样式类 `custom-shape-class` 自定义单选图标结点样式(by [@yawuling](https://github.com/yawuling) )
- Collapse
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - `input` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- CheckboxGroup
  - 新增属性 `cell`, 支持复选框组下的表单模式事件 (by [@Gkxie](https://github.com/Gkxie) )
  - 新增属性 `size`，支持单选框尺寸更改（large） (by [@yawuling](https://github.com/yawuling) )
- ColPicker
  - 新增 ColPicker 多列选择组件 (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 新增属性 `columns-height`, 支持设置 picker 内部的单个 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `required`, 支持表单属性设置必填项 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `use-default-slot`, 使用默认插槽 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增默认插槽，可更改默认唤起 picker 的形式（默认为cell）。(by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `loading-color`, 支持修改加载的颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 展开弹出框事件名称由 `showPicker` 改为 `open`。（by [@yawuling](https://github.com/yawuling)）
  - 新增方法 `close`, 支持关闭弹出框 (by [@yawuling](https://github.com/yawuling)） )
- DatetimePickerView
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `loading-color`, 支持修改加载的颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Grid
  - 新增属性 `bg-color`, 支持宫格设置背景颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Icon
  - 新增属性 `custom-style`  设置根节点样式  (by [@awjing](https://github.com/awjing) )
- Input
  - 新增属性 `no-border`, 支持设置取消底部边框 (by [@yawuling](https://github.com/yawuling) )
  - 移除属性 `autofocus` (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `required`, 支持表单属性设置必填项 (by [@yawuling](https://github.com/yawuling) )
  - 新增事件 `clickprefixicon`, 点击前置图标时触发 (by [@yawuling](https://github.com/yawuling) )
  - 新增事件 `clicksuffixicon`, 点击后置图标时触发 (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `input` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- InputNumber
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Loading
  - 属性 `type` 新增类型 `circular-ring` loading 样式 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 属性 `size` 新增支持类型 `string`，兼容之前版本，推荐使用string类型 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- MessageBox
  - 新增属性 `context`, 引用 wd-message-box 的页面实例或自定义组件实例 (by [@wulin](https://github.com/wlin00) )
- NoticeBar
  - 新增属性 `type`， 新增默认插槽，支持设置通知栏类型 (by [@awjing](https://github.com/awjing) )
  - 属性 `left-icon` 更名为 `prefix` (by [@awjing](https://github.com/awjing) )
  - 插槽 `left-icon` 更名为 `prefix` (by [@awjing](httpradios://github.com/awjing) )
  - 插槽 `right-icon` 更名为 `suffix` (by [@awjing](https://github.com/awjing) )
- Pagination
  - 新增分页组件 Pagination (by [@wlin00](https://github.com/wlin00) )
- Picker
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `use-default-slot`, 使用默认插槽 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `required`, 支持表单属性设置必填项 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增默认插槽，可更改默认唤起 picker 的形式（默认为cell）。(by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `loading-color`, 支持修改加载的颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 展开弹出框事件名称由 `showPicker` 改为 `open`。（by [@yawuling](https://github.com/yawuling)）
  - 新增方法 `close`, 支持关闭弹出框 (by [@yawuling](https://github.com/yawuling)） )
- PickerView
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `loading-color`, 支持修改加载的颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Progress
  - 新增属性 `status` 设置进度条状态，支持sucess和danger (by [@awjing](https://github.com/awjing) )
- Popover
  - 新增组件 `Popover` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Radio
  - 新增属性 `max-width`, 支持设置文字部分最大宽度，设置最大宽度开启文字折叠 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 属性 `type` 新增可选值 `check`，默认值变更为 `check` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- RadioGroup
  - 新增属性 `cell`, 支持单选组下的表单模式事件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `size`, 支持单选框尺寸更改（large） (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - 属性 `type` 新增可选值 `check`，默认值变更为 `check` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Rate
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- SelectPicker
  - 新增单复选选择器组件 selectPicker (by [@HXCStudio123](https://github.com/HXCStudio123))
- Slider
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- StatusTip
  - 属性 `type` 下的七种类型 对应缺省展示图片更改 (by [@awjing](https://github.com/awjing) )
- Sticky
  - 新增粘性布局组件 Sticky （by [@Gkxie](https://github.com/Gkxie) ）
- Switch
  - 新增属性 `name` (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Tabs
  - 移除属性 `color` (by [@Gkxie](https://github.com/Gkxie) )
  - 移除属性 `inactive-color` (by [@Gkxie](https://github.com/Gkxie) )
  - 移除属性 `line-width` (by [@Gkxie](https://github.com/Gkxie) )
  - 移除属性 `line-height` (by [@Gkxie](https://github.com/Gkxie) )
- Tag
  - 移除属性 `size` (by [@awjing](https://github.com/awjing) )
  - 新增属性 `mark` 标记类型 (by [@awjing](https://github.com/awjing) )
  - 新增属性 `round` 圆角类型 (by [@awjing](https://github.com/awjing) )
- Toast
  - 新增属性 `iconSize`， 支持修改左侧图标尺寸 (by [@wulin](https://github.com/wlin00) )
  - 新增属性 `loadingColor` ，支持设置加载指示器颜色 (by [@wulin](https://github.com/wlin00) )
  - 新增方法 `info` ，支持展示常规Toast样式 (by zhongjiju )
- Tooltip
  - 新增属性 `show-close`， 支持设置显示 Tooltip 内部右侧的关闭按钮 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增方法 `open`， 支持外部打开文字提示弹框 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增方法 `close`， 支持外部关闭文字提示弹框 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增事件 `change`， 在pop显隐值变化时触发 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 事件 `show` 更名为 `open` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 事件 `hide` 更名为 `close` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `effect` ，文字提示 2.0 起 不再支持主题设置，将主题白色样式迁移至组件[Popover](/#/components/popover) (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `mode` ，文字提示 2.0 起 不再支持模式设置，将模式设置迁移至组件[Popover](/#/components/popover) (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除事件 `menu-click` 该事件已迁移至组件[Popover](/#/components/popover) (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Upload
  - 新增组件 `Upload` (by [@HXCStudio123](https://github.com/HXCStudio123) )

#### 优化

- Checkbox
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- CheckboxGroup
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Collapse
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - `input` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- DatetimePickerView
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- DropMenuItem
  - `change` 事件传参方式修改为与小程序官方组件一致，新增 `selectedItem` 参数 (by [@yawuling](https://github.com/yawuling) )
- Input
  - `input` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- InputNumber
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
  - 属性 `min` 支持动态修改重算value （by [@HXCStudio123](https://github.com/HXCStudio123) ）
  - 属性 `max` 支持动态修改重算value （by [@HXCStudio123](https://github.com/HXCStudio123) ）
- PickerView
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- RadioGrouo
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Rate
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Search
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Slider
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Switch
  - `change` 事件传参方式修改为与小程序官方组件一致 (by [@yawuling](https://github.com/yawuling) )
- Grid
  - 支持动态渲染GridItem （by [@HXCStudio123](https://github.com/HXCStudio123) ）
  - 支持列项修改后内部GridItem重排 （by [@HXCStudio123](https://github.com/HXCStudio123) ）
  - GridItem 内容padding移除，兼容小屏幕展示四字标题 （by [@HXCStudio123](https://github.com/HXCStudio123) ）
- MessageBox
  - 动画时间由300ms改为200ms，减少等待时间 (by [@yawuling](https://github.com/yawuling)） )

#### Bug 修复

- Cell
  - 修复边框线样式calc计算无效问题 (by [@yawuling](https://github.com/yawuling)） )
- DatetimePickerView
  - 修复绑定值更改后，未更新绑定数据 （by [@HXCStudio123](https://github.com/HXCStudio123) ）
  - type类型为 `time` 时，修复绑定值以及展示值 （by [@HXCStudio123](https://github.com/HXCStudio123) ）
- Input
  - Input 输入时不显示文字，仅在失焦后显示文字(不支持rgba色值) [#176](https://github.com/Moonofweisheng/wot-design-uni/issues/176) (by [@yawuling](https://github.com/yawuling)） )
  - 修复input 清空后无法再次弹起 （by [@Gkxie](https://github.com/Gkxie) ）
- MessageBox
  - MessageBox.prompt 获取不到value值 [#166](https://github.com/Moonofweisheng/wot-design-uni/issues/166)（by [@HXCStudio123](https://github.com/HXCStudio123) ）
- Popup
  - 修复按需引入popup和messageBox缺少modal样式问题 (by [@yawuling](https://github.com/yawuling)） )

### 2.0.0-beta3

该版本为测试版，推荐使用2.0 正式版

### 1.5.0

*2020-05-18*

#### 新特性

- Checkbox
  - 支持复选框组下的单个复选框触发 `change` 事件 (by [@yawuling](https://github.com/yawuling) )

#### Bug 修复

- DropMenu
  - 修正文档组件名错误 (by [@yawuling](https://github.com/yawuling) )
  - 修正居中样式 (by [@yawuling](https://github.com/yawuling) )
- Input
  - 修正 `type` 类型修改无效的问题 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Slider
  - 文档方法名修正 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Toast
  - 修复文案过长不换行导致超出页面的问题 (by [@yawuling](https://github.com/yawuling) )

#### 优化

- Doc
  - 完善 grid 组件文档 (by [@yawuling](https://github.com/yawuling) )
  - 添加爬虫文件sitemap，优化搜索功能 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 优化响应式 (by [@yawuling](https://github.com/yawuling) )

### 1.4.0

*2020-03-13*

#### 新特性

- Col
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- DropMenu
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Grid
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Img
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Row
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- SortButton
  - 新增组件 (by [@Gkxie](https://github.com/Gkxie) )
- StatusTip
  - 新增组件 (by [@RedJoy](https://github.com/RedJoy) )

#### Bug 修复

- Collapse
  - 修正初始动画展示 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Picker
  - 修复 picker 组件 Toolbar 滑动穿透 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 修复多级联动，修改内部值后取消恢复数据源 (by [@yawuling](https://github.com/yawuling) )
  - 修复 column-change 异步情况下无法准确获取值的问题 (by [@yawuling](https://github.com/yawuling) )
- Rate
  - 修正单向数据传输 (by [@yawuling](https://github.com/yawuling) )
- Slider
  - 修正样式和偏移比例计算问题 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 高度问题修复 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Tooltip
  - 解决tooltip关闭后透明未隐藏问题 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  
#### 优化

- Doc
  - 自定义主题 (by [@yawuling](https://github.com/yawuling) )
  - 新增Col/Row组合使用Layout文档 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 添加开发指南 (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 1.3.0

*2020-02-11*

#### 新特性

- Cell
  - 新增属性`size`, `title-width`, `center` (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 新增属性`inline` (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 新增属性`size`, `label-width`, `error`, `align-right`, `use-label-slot`, `before-confirm` (by [@yawuling](https://github.com/yawuling) )
  - 新增自定义样式类 `custom-label-class`, `custom-value-class`(by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
- Input
  - 新增属性`label`, `label-width`, `use-label-slot`, `size`, `error`, `center` (by [@yawuling](https://github.com/yawuling) )
  - 新增自定义样式类 `custom-label-class`(by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 新增属性`size`, `label-width`, `error`, `align-right`, `use-label-slot`, `before-confirm` (by [@yawuling](https://github.com/yawuling) )
  - 新增自定义样式类 `custom-label-class`, `custom-value-class`(by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
  - 新增自定义事件 `open` (by [@yawuling](https://github.com/yawuling) )
- Popup
  - 新增属性 `hide-when-close` (by [@yawuling](https://github.com/yawuling) )
- Radio
  - 新增属性`inline` (by [@yawuling](https://github.com/yawuling) )
- SwipeAction
  - 新增组件 (by [@Gkxie](https://github.com/Gkxie) )

#### Bug 修复

- ActionSheet
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by [@yawuling](https://github.com/yawuling) )
- Button
  - 修复文本垂直居中问题 (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 修复disabled 在设置 min 和 max 时非正常展示问题 (by [@yawuling](https://github.com/yawuling) )
- MesageBox
  - 修复点击蒙层无法关闭弹框的问题 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 修复快速滑动picker后关闭重新打开，选择器选项重置为第一项问题 (by [@yawuling](https://github.com/yawuling) )
- Popup
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by [@yawuling](https://github.com/yawuling) )
- Tabs
  - 修复map功能样式展示问题(by [@yawuling](https://github.com/yawuling) )
- Transition
  - 修复自定义事件连字符无法在京东小程序中触发的问题 (by [@yawuling](https://github.com/yawuling) )
#### 优化
- Checkbox
  - 优化单个复选框的 true-value 和 false-value 切换的 value 值，不再限制只能 boolean 值 (by [@yawuling](https://github.com/yawuling) )
- Doc
  - 新增Form表单组合使用文档 (by [@yawuling](https://github.com/yawuling) )
- Input
  - 删除无用的自定义样式类 `custom-prefix-class`, `custom-suffix-class` (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 删除无用事件 `bind:change` (by [@yawuling](https://github.com/yawuling) )
  - `bind:confirm` 事件增加 value 入参 (by [@yawuling](https://github.com/yawuling) )
  - 优化内部选中和关闭回退逻辑
- DatetimePicker
  - 删除无用事件 `bind:change` (by [@yawuling](https://github.com/yawuling) )
  - `bind:confirm` 事件入参优化为时间戳或字符串 (by [@yawuling](https://github.com/yawuling) )
  - 内部逻辑优化：日期数据源拆分为 value 和 label 两个值，方便将 value 传给调用者 (by [@yawuling](https://github.com/yawuling) )
- DatetimePickerView
  - `bind:change` 事件入参优化为时间戳或字符串 (by [@yawuling](https://github.com/yawuling) )
- Radio
  - 删除 `circle` 类型的单选框 (by [@yawuling](https://github.com/yawuling) )
- Switch
  - 优化内部值更新方式 (by [@yawuling](https://github.com/yawuling) )

### 1.2.0

*2020-01-09*

#### 新特性
- ToolTip
  - 新增弹出提示组件 (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 新增属性`open-delay`，`visibleArrow`  (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 样式抽离，主题实现 (by [@HXCStudio123](https://github.com/HXCStudio123))
- Tag
  - 新增属性`dynamic`属性 (by [@awjing](https://github.com/awjing))
#### Bug 修复
- DateTimePicker
  - 相同组件复用同一个实例，导致防抖函数被复用。 (by [@Gkxie](https://github.com/Gkxie))
  - 当未传入value，组件ready时label会闪烁 (by [@Gkxie](https://github.com/Gkxie))
#### 优化
- Chore
  - 删除 github page 无用文件 (by [@Gkxie](https://github.com/Gkxie))
  - 优化 travis 配置 (by [@Gkxie](https://github.com/Gkxie))
- Doc
  - 文档更换logo (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 新增搜索功能 (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 新文档版本切换 (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 文档更新:tooltip (by [@HXCStudio123](https://github.com/HXCStudio123))
  - 文档更新:tag (by [@awjing](https://github.com/awjing))

### 1.1.0

*2019-01-02*

- Tag添加新增标签功能

### 1.0.2

*2019-12-27*

- 文档更新

### 1.0.1

*2019-12-26*

- 修复search组件快速点击切换状态

### 1.0.0

*2019-12-26*

- 发布30个组件