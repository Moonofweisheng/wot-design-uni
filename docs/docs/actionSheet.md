## ActionSheet 动作面板

### 引入

```json
{
  "usingComponents": {
    "wd-action-sheet": "/wot-design/actionSheet/index"
  }
}
```

### 基本用法

通过 `show` 属性设置显示隐藏，监听 `bind:close` 事件，隐藏菜单。

`actions` 类型为 `Array`，数组内部对象结构如下：

| 参数 | 类型 | 说明 | 最低版本 |
|-----|------|-----|---------|
| name | string | 选项名称 | - |
| subname | string | 描述信息 | - |
| color | string | 颜色 | - |

```html
<wd-button bind:click="showActions">弹出菜单</wd-button>
<wd-action-sheet show="{{ show }}" actions="{{ actions }}" bind:close="close" />
```

```javascript
page({
  data: {
    show: false,
    actions: [
      {
        name: '选项1'
      }, {
        name: '选项2'
      }, {
        name: '选项3',
        subname: '描述信息'
      }
    ]
  },
  showActions () {
    this.setData({
      show: true
    })
  },
  close () {
    this.setData({
      show: false
    })
  },
  select (item, index) {
    this.$toast(`当前选中项: ${item.name}, 下标: ${index}`)
  }
})
```

### 选项状态

可以设置 颜色、禁用、加载 等状态。

```html
<wd-button bind:click="showActions">弹出菜单</wd-button>
<wd-action-sheet show="{{ show }}" actions="{{ actions }}" bind:close="close" />
```

```javascript
page({
  data: {
    show: false,
    actions: [
      {
        name: '颜色',
        color: '#0083ff'
      }, {
        name: '禁用',
        disabled: true
      }, {
        loading: true
      }
    ]
  },
  showActions () {
    this.setData({
      show: true
    })
  },
  close () {
    this.setData({
      show: false
    })
  }
})
```

### 取消按钮

设置 `cancel-text` 取消按钮文案，展示取消按钮。

```html
<wd-action-sheet
  show="{{ show }}"
  actions="{{ actions }}"
  bind:close="close"
  cancel-text="取消" />
```

### 自定义单行面板

自定义单行面板时，`panels` 类型为一维数组， 数组内部对象结构如下：

| 参数 | 类型 | 说明 | 最低版本 |
|-----|------|-----|---------|
| iconUrl | string | 图片地址 | - |
| title | string | 标题 | - |


```html
<wd-button bind:click="showActions">弹出菜单</wd-button>
<wd-action-sheet show="{{ show }}" panels="{{ panels }}" bind:close="close" bind:select="select" />
```

```javascript
page({
  data: {
    show: false,
    panels: [
      {
        iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
        title: '微信好友',
      }
    ]
  },
  showActions () {
    this.setData({
      show: true
    })
  },
  close () {
    this.setData({
      show: false
    })
  },
  select ({ detail : {item, index} }) {
    Toast(`当前选中项: ${item.title}, 下标: ${index}`)
  }
})
```

#### 多行展示

自定义多行面板时， `panels` 类型为多维数组， 每个数组内部对象结构如下：

| 参数 | 类型 | 说明 | 最低版本 |
|-----|------|-----|--------|
| iconUrl | string | 图片地址 | - |
| title | string | 标题 | - |

```html
<wd-button bind:click="showActions">弹出菜单</wd-button>
<wd-action-sheet show="{{ show }}" panels="{{ panels }}" bind:close="close" bind:select="select" />
```

```javascript
page({
  data: {
    show: false,
    panels: [
      [
        {
          iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
          title: '微信好友',
        }
      ],
      [
        {
          iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
          title: '微信好友',
        }
      ]
    ]
  },
  showActions () {
    this.setData({
      show: true
    })
  },
  close () {
    this.setData({
      show: false
    })
  },
  select ({ detail : {item, rowIndex, colIndex} }) {
    Toast(`当前选中项: ${item.title}, 行下标: ${rowIndex}, 列下标: ${colIndex}`)
  }
})
```

### 标题

设置 `title` 展示标题。

```html
<wd-action-sheet show="{{ show }}" title="标题" bind:close="close">
  <view style="padding: 15px 15px 150px 15px;">内容</view>
</wd-action-sheet>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| show | 设置菜单显示隐藏 | boolean | - | - | - |
| actions | 菜单选项 | array | - | [] | - |
| panels | 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示 | array | - | [] | - |
| title | 标题 | string | - | - | - |
| cancel-text | 取消按钮文案 | string | - | - | - |
| close-on-click-action | 点击选项后是否关闭菜单 | boolean | - | true | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | - |
| duration | 动画持续时间 | number | - | 200(ms) | - |
| z-index | 菜单层级 | number | - | 10 | - |
| lazy-render | 弹层内容懒渲染，触发展示时才渲染内容 | boolean | - | true | 2.3.0 |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型） | boolean | - | true | 2.3.0 |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:select | 点击选项时触发 | 菜单选项或自定义面板一维数组 （item: 选项对象, index: 选项下标），自定义面板二维数组（item: 选项对象, rowIndex: 选项行下标, colIndex选项列下标）| - |
| bind:open | 弹出层打开时触发 | - | - |
| bind:opened | 弹出层打开动画结束时触发 | - | - |
| bind:close | 弹出层关闭时触发 | - | - |
| bind:closed | 弹出层关闭动画结束时触发 | - | - |
| bind:clickmodal | 点击遮罩时触发 | - | - |
| bind:cancel | 点击取消按钮时触发 | - | - |

### Action 数据结构

| 键名 | 说明 | 类型 | 最低版本 |
|-----|------|-----|---------|
| name | 选项名称 | string | - |
| subname | 描述信息 | string | - |
| color | 颜色 | string | - |
| disabled | 禁用 | boolean | - |
| loading | 加载中状态 | boolean | - |

### Panel 数据结构

| 键名 | 说明 | 类型 | 最低版本 |
|-----|------|-----|---------|
| iconUrl | 图片地址 | string | - |
| title | 标题内容 | string | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
| custom-header-class | header头部样式 | - |
