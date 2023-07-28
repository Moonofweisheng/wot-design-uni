<frame/>

# ColPicker 多列选择器

使用多列选择器来做级联，交互效果较好，多列选择器支持无限级选择。

## 基本用法

`label` 设置左侧文本内容；

`columns` 设置数据源，为二维数组，每一列为一个一维数组，每个选项包含 `value`(选项值) 和 `label`(选项名称)。

`value` 设置选中项的值，数据类型为数组；

监听 `change` 事件，获取选中值，`event.detail` 是个对象，包含 `value`(选中值数组)、`selectedItems`（选中项对象数组）两个属性。

传入 `column-change` 属性，其类型为 `function`，接收参数 options: object；options 的结构如下：

| 参数 | 类型 | 说明 | 最低版本 |
|-----|------|-----| - |
| selectedItem | object | 当前列的选中项，数据结构跟 columns 中选项的数据结构一致 | - |
| index | number | 当前列下标 | - |
| rowIndex | number | 当前列选中项下标 | - |
| resolve | function | 接收下一列的选项数组 | - |
| finish | function | 结束 picker 选择，若无法正常关闭如数据获取失败，则执行 `finish(false)` | - |

```html
<wd-col-picker label="选择地址" value="{{value}}" columns="{{ areaData }}" column-change="{{ columnChange }}" bind:confirm="handleConfirm"></wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: [],
    areaData: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    })],
    columnChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

:::info
如果想在data定义中的函数获取到小程序页面 this 对象，可以在小程序的生命周期里将 this 赋值给一个临时变量，也可以在生命周期的时候setData设置函数，并通过 bind 修改上下文，如下，详见 [在 data 定义的函数变量获取 this](http://fant-mini-plus.top/wot-design-uni/#/components/commonProblems#zai-data-ding-yi-de-han-shu-bian-liang-huo-qu-this)
:::

## 异步加载

一般column-change是个异步获取数据的操作，触发column-change组件会有默认loading，数据响应后关闭loading。

异步请求数据失败，则调用 `finish(false)`。

```html
<wd-col-picker label="选择地址" value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: [],
    areaData: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    })],
    columnChange ({ selectedItem, resolve, finish }) {
      // 模拟异步请求
      setTimeout(() => {
        // 模拟请求失败
        if (Math.random() > 0.7) {
          finish(false)
          this.$toast.error('数据请求失败，请重试')
          return
        }
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          // 没有下一项时，执行完成
          finish()
        }
      }, 300)
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

## 初始选项

初始选项有两种方式：

1）设置初始选项时，`columns` 的数组长度应与 `value` 的数组长度一致，`value` 每一列的值必须对应可以在 `columns` 中找到。

```html
<wd-col-picker label="选择地址" value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}"></wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: ['150000', '150100', '150121'],
    areaData: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    }), Object.keys(areaData[150000]).map(key => {
      return {
        value: key,
        label: areaData[150000][key]
      }
    }), Object.keys(areaData[150100]).map(key => {
      return {
        value: key,
        label: areaData[150100][key]
      }
    })],
    columnChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

2）设置 `auto-complete` 属性，当 `columns` 数组长度小于 `value` 或长度为 0 时，会自动触发 `columnChange` 函数来补齐数据。设置了该属性后，因为数据需要动态补全，因此 传递出来的参数 selectedItem 只有 value 字段，没有 label 字段。

```html
<wd-col-picker label="选择地址" value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" auto-complete></wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: ['150000', '150100', '150121'],
    areaData: [],
    columnChange ({ selectedItem, resolve, finish }) {
      const value = index === -1 ? 86 : selectedItem.value
      if (areaData[value]) {
        resolve(Object.keys(areaData[value]).map(key => {
          return {
            value: key,
            label: areaData[value][key]
          }
        }))
      } else {
        finish()
      }
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

## 禁用

设置 `disabled` 属性。

```html
<wd-col-picker label="禁用" disabled value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

## 只读

设置 `readonly` 属性。

```html
<wd-col-picker label="禁用" readonly value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

## 禁用选项

`columns` 每个选项支持 `disabled` 属性。

```html
<wd-col-picker label="选择地址" value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: [],
    areaData: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key],
        disabled: key === '140000' // 将某个选项设置禁用
      }
    })],
    columnChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

## 选项提示信息

`columns` 每个选项支持 `tip` 属性。

```html
<wd-col-picker label="选择地址" value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: [],
    areaData: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key],
        tip: key === '150000' ? '该地区配送时间可能较长' : ''
      }
    })],
    columnChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

## 展示格式化

设置 `display-format` 属性，其类型为 `function`，接收当前选中项（数组，数组成员的格式同columns数组成员的格式），返回要展示的字符串。

```html
<wd-col-picker label="展示格式化" value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" display-format="{{displayFormat}}" bind:confirm="handleConfirm"></wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: ['130000', '130200', '130204'],
    areaData: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    }), Object.keys(areaData[130000]).map(key => {
      return {
        value: key,
        label: areaData[130000][key]
      }
    }), Object.keys(areaData[130200]).map(key => {
      return {
        value: key,
        label: areaData[130200][key]
      }
    })],
    columnChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    },
    displayFormat (selectedItems) {
      return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

## 设置标题

设置 `title` 属性，修改弹出层的标题。

```html
<wd-col-picker label="标题" value="{{value}}" title="选择地址" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

## 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value`、`selectedItems`(选中项数组，数据结构同columns每一列的选项) 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭弹窗。

```html
<wd-col-picker label="before-confirm" value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" before-confirm="{{beforeConfirm}}" bind:confirm="handleConfirm"></wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: [],
    areaData: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    })],
    columnChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    },
    beforeConfirm (value, selectedItems, resolve) {
      if (parseInt(value[2]) > 120000) {
        this.$toast('该地区库存不足')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

## 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-col-picker label="选择地址" value="{{value}}" error columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

## 必填样式

设置 `required` 属性，展示必填样式。

```html
<wd-col-picker label="选择地址" value="{{value}}" required columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

## 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-col-picker label="选择地址" value="{{value}}" size="large" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

## 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-col-picker label="选择地址" align-right value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm"></wd-col-picker>
```

## 自定义选择器

如果默认的 cell 类型的展示格式不满足需求，可以通过默认插槽进行自定义选择器样式。

```html
<view style="margin-bottom: 10px;">当前选中项: {{ displayValue }}</view>
<wd-col-picker value="{{value}}" columns="{{areaData}}" column-change="{{columnChange}}" bind:confirm="handleConfirm">
  <wd-button>选择地址</wd-button>
</wd-col-picker>
```

```javascript
// 使用的是 `china-area-data` 库，包含国内最新的地区编码，手动将代码搬一下
import areaData from '../utils/area.json'

Page({
  data: {
    value: [],
    displayValue: '',
    areaData: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    })],
    columnChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    }
  },
  handleConfirm (event) {
    const { value, selectedItems } = event.detail
    this.setData({
      value: value,
      displayValue: selectedItems.map(item => {
        return item.label
      }).join('')
    })
  }
})
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|---------|
| value| 选中项 | array | - | - | - |
| columns | 选择器数据，二维数组 | array | - | - | - |
| value-key | 选项对象中，value对应的 key | string | - | value | - |
| label-key | 选项对象中，展示的文本对应的 key | string | - | label | - |
| tip-key | 选项对象中，提示文案对应的 key | string | - | tip | - |
| title | 弹出层标题 | string | - | - | - |
| label | 选择器左侧文案 | string | - | - | - |
| placeholder | 选择器占位符 | string | - | 请选择 | - |
| disabled | 禁用 | boolean | - | fasle | - |
| readonly | 只读 | boolean | - | false | - |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - | - |
| column-change | 接收当前列的选中项 item、当前列下标、当前列选中项下标下一列数据处理函数 resolve、结束选择 finish | function | - | - | - |
| size | 设置选择器大小 | string | large | - | - |
| label-width | 设置左侧标题宽度 | string | - | 33% | - |
| error | 是否为错误状态，错误状态时右侧内容为红色 | boolean | - | false | - |
| required | 必填样式 | boolean | - | false | - |
| align-right | 选择器的值靠右展示 | boolean | - | false | - |
| before-confirm | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 | function | - | - | - |
| loading-color | loading 图标的颜色 | string | - | #4D80F0 | - |
| use-default-slot | 使用默认插槽时设置该选项 | boolean | - | false | - |
| use-label-slot | 使用 label 插槽时设置该选项 | boolean | - | false | - |
| name | form 表单中的字段名 | string | - | - | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | - |
| auto-complete | 自动触发 column-change 事件来补全数据，当 columns 为空数组或者 columns 数组长度小于 value 数组长度时，会自动触发 column-change | - | false | - |
| z-index | 弹窗层级 | number | - | 15 | 2.3.0 |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型） | boolean | - | true | 2.3.0 |
| ellipsis | 是否超出隐藏 | boolean | - | false | 2.3.0 |

## 选项数据结构

| 键名 | 说明 | 类型 | 是否必填 | 最低版本 |
|------|-----|-----|---------|--------|
| value | 选项值 | string | 是 | - |
| label | 选项名 | string | 是 | - |
| tip | 选项提示 | string | 否 | - |
| disabled | 禁用选项 | boolean | 否 | - |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:confirm | 最后一列选项选中时触发 | `{ value(选项值数组), selectedItem(选项数组) }`  | - |
| bind:cancel | 点击关闭按钮或者蒙层时触发 | - | - |

## Methods

| 方法名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| open | 打开picker弹框 | - |
| close | 关闭picker弹框 | - |

## Slots

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 自定义展示 | - |
| label | 左侧插槽 | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
| custom-label-class | label 外部自定义样式 | - |
| custom-value-class | value 外部自定义样式 | - |
