# ColPicker 多列选择器

使用多列选择器来做级联，交互效果较好，多列选择器支持无限级选择。

::: tip 提示
多列选择器常用于选择省市区，我们使用 Vant 提供的中国省市区数据作为数据源，你可以安装 [@vant/area-data](https://github.com/youzan/vant/tree/main/packages/vant-area-data) npm 包来引入：

```bash
# 通过 npm
npm i @vant/area-data

# 通过 yarn
yarn add @vant/area-data

# 通过 pnpm
pnpm add @vant/area-data

# 通过 Bun
bun add @vant/area-data
```

:::

**_为了方便开发者使用`@vant/area-data`进行开发调试，我们封装了`useColPickerData`，你可以直接使用`useColPickerData`来获取数据源。_**
::: details 基于@vant/area-data 包装的`useColPickerData`

```typescript
// 可以将此代码放置于项目src/hooks/useColPickerData.ts中
import { useCascaderAreaData } from '@vant/area-data'

export type CascaderOption = {
  text: string
  value: string
  children?: CascaderOption[]
}

/**
 * 使用'@vant/area-data'作为数据源，构造ColPicker组件的数据
 * @returns
 */
export function useColPickerData() {
  // '@vant/area-data' 数据源
  const colPickerData: CascaderOption[] = useCascaderAreaData()

  // 根据code查找子节点，不传code则返回所有节点
  function findChildrenByCode(data: CascaderOption[], code?: string): CascaderOption[] | null {
    if (!code) {
      return data
    }
    for (const item of data) {
      if (item.value === code) {
        return item.children || null
      }
      if (item.children) {
        const childrenResult = findChildrenByCode(item.children, code)
        if (childrenResult) {
          return childrenResult
        }
      }
    }
    return null
  }

  return { colPickerData, findChildrenByCode }
}
```

:::

## 基本用法

`label` 设置左侧文本内容；

`columns` 设置数据源，为二维数组，每一列为一个一维数组，每个选项包含 `value`(选项值) 和 `label`(选项名称)。

`v-model` 设置选中项的值，数据类型为数组；

也可以监听 `change` 事件，获取选中值，`event` 是个对象，包含 `value`(选中值数组)、`selectedItems`（选中项对象数组）两个属性。

传入 `column-change` 属性，其类型为 `function`，接收参数 options: object；options 的结构如下：

| 参数         | 类型     | 说明                                                                   | 最低版本 |
| ------------ | -------- | ---------------------------------------------------------------------- | -------- |
| selectedItem | object   | 当前列的选中项，数据结构跟 columns 中选项的数据结构一致                | -        |
| index        | number   | 当前列下标                                                             | -        |
| rowIndex     | number   | 当前列选中项下标                                                       | -        |
| resolve      | function | 接收下一列的选项数组                                                   | -        |
| finish       | function | 结束 picker 选择，若无法正常关闭如数据获取失败，则执行 `finish(false)` | -        |

```html
<wd-col-picker label="选择地址" v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>([])

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

function handleConfirm({ value }) {
  console.log(value)
}
```

## 异步加载

一般 column-change 是个异步获取数据的操作，触发 column-change 组件会有默认 loading，数据响应后关闭 loading。

异步请求数据失败，则调用 `finish(false)`。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>([])
const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  // 模拟异步请求
  setTimeout(() => {
    // 模拟请求失败
    if (Math.random() > 0.7) {
      finish(false)
      toast.error.error('数据请求失败，请重试')
      return
    }
    // 这里为什么用selectedItem.value作为code呢？是因为area构造的时候就是将标识放到了value字段上，同理你也可以改为其他字段，只要和area的字段对应即可
    const areaData = findChildrenByCode(colPickerData, selectedItem.value)
    if (areaData && areaData.length) {
      resolve(
        areaData.map((item) => {
          return {
            value: item.value,
            label: item.text
          }
        })
      )
    } else {
      // 没有下一项时，执行完成
      finish()
    }
  }, 300)
}

function handleConfirm({ value }) {
  console.log(value)
}
```

## 初始选项

初始选项有两种方式：

1）设置初始选项时，`columns` 的数组长度应与 `value` 的数组长度一致，`value` 每一列的值必须对应可以在 `columns` 中找到。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="area" :column-change="columnChange"></wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>(['150000', '150100', '150121'])

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  }),
  findChildrenByCode(colPickerData, '150000')!.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  }),
  findChildrenByCode(colPickerData, '150100')!.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

function handleConfirm({ value }) {
  console.log(value)
}
```

2）设置 `auto-complete` 属性，当 `columns` 数组长度为 0 时，会自动触发 `columnChange` 函数来补齐数据。设置了该属性后，因为数据需要动态补全，因此 传递出来的参数 selectedItem 只有 value 字段，没有 label 字段。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="area" :column-change="columnChange" auto-complete></wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const value = ref<string[]>([])

const area = ref<any[]>([])

onMounted(async () => {
  toast.loading('数据加载中')
  // 模拟异步请求
  await sleep()
  toast.close()
  value.value = ['150000', '150100', '150121']
})

const columnChange: ColPickerColumnChange = async ({ selectedItem, resolve, finish }) => {
  // 模拟异步请求

  await sleep(0.3)
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

function sleep(second: number = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000 * second)
  })
}
```

## 禁用

设置 `disabled` 属性。

```html
<wd-col-picker label="禁用" disabled v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

## 只读

设置 `readonly` 属性。

```html
<wd-col-picker label="禁用" readonly v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

## 禁用选项

`columns` 每个选项支持 `disabled` 属性。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>([])

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
      disabled: item.value === '140000'
    }
  })
])
const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}
```

## 选项提示信息

`columns` 每个选项支持 `tip` 属性。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>([])

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
      disabled: item.value === '140000',
      tip: item.value === '140000' ? '该地区无货，暂时无法选择' : item.value === '150000' ? '该地区配送时间可能较长' : ''
    }
  })
])
const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}
```

## 展示格式化

设置 `display-format` 属性，其类型为 `function`，接收当前选中项（数组，数组成员的格式同 columns 数组成员的格式），返回要展示的字符串。

```html
<wd-col-picker
  label="展示格式化"
  v-model="value"
  :columns="area"
  :column-change="columnChange"
  :display-format="displayFormat"
  @confirm="handleConfirm"
></wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>(['130000', '130200', '130204'])

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  }),
  findChildrenByCode(colPickerData, '130000')!.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  }),
  findChildrenByCode(colPickerData, '130200')!.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}
// 格式化方法
const displayFormat = (selectedItems: Record<string, any>[]) => {
  return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
}
```

## 设置标题

设置 `title` 属性，修改弹出层的标题。

```html
<wd-col-picker label="标题" v-model="value" title="选择地址" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

## 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value`、`selectedItems`(选中项数组，数据结构同 columns 每一列的选项) 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受 1 个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭弹窗。

```html
<wd-col-picker
  label="before-confirm"
  v-model="value"
  :columns="area"
  :column-change="columnChange"
  :before-confirm="beforeConfirm"
  @confirm="handleConfirm"
></wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>([])
const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}
const beforeConfirm = (value: (string | number)[], selectedItems: Record<string, any>[], resolve: (isPass: boolean) => void) => {
  if (parseInt(String(value[2])) > 120000) {
    toast.error('该地区库存不足')
    resolve(false)
  } else {
    resolve(true)
  }
}

function handleConfirm({ selectedItems }: any) {
  displayValue.value = selectedItems
    .map((item: any) => {
      return item.label
    })
    .join('')
}
```

## 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-col-picker label="选择地址" v-model="value" error :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

## 必填样式

设置 `required` 属性，展示必填样式。

```html
<wd-col-picker label="选择地址" v-model="value" required :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

## 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-col-picker label="选择地址" v-model="value" size="large" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

## 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-col-picker label="选择地址" align-right v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

## 自定义选择器

如果默认的 cell 类型的展示格式不满足需求，可以通过默认插槽进行自定义选择器样式。在标签上添加 use-default-slot 属性并设置为 true。

```html
<view style="margin-bottom: 10px;">当前选中项: {{ displayValue }}</view>
<wd-col-picker :use-default-slot="true" v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm">
  <wd-button>选择地址</wd-button>
</wd-col-picker>
```

```typescript
// useColPickerData可以参考本章节顶部的介绍
// 导入路径根据自己实际情况调整，万不可一贴了之
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>([])
const displayValue = ref('')

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}
```
## 本地搜索

设置 `filterable` 属性，开启本地模糊搜索功能。

```html
<wd-col-picker label="选择地址" v-model="value" filterable :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```
## 远程搜索
设置 `filterable` 属性，开启远程搜索功能。
设置 `filter-type="remote"`，当搜索框内容发生变化时，会触发 `search` 事件。

```html
<wd-col-picker
  label="远程搜索"
  filterable
  filterType="remote"
  v-model="valueSearch"
  :columns="areaDataSearch"
  :column-change="columnChange1"
  @search="handleSearch"
  ></wd-col-picker>
```
```typescript
const valueSearch = ref<string[]>([])
const areaDataSearch = ref<any[]>([])

// 搜索事件
const handleSearch = ({ searchText, colIndex }) => {
  console.log(`正在搜索第${colIndex}列，关键词：${searchText}`)
  // 模拟异步请求更新 columns 数据
  // setTimeout(() => {
  //   const newCols = [...areaDataSearch.value]
  //   newCols[colIndex] = mockResult
  //   areaDataSearch.value = newCols
  // }, 300)
}

const columnChange1 = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}
```

## 下拉刷新与上拉加载
通过设置 `refresher-enabled` 开启下拉刷新，`scroll-to-lower-enabled` 开启上拉加载更多。

```html
<wd-col-picker
  label="加载更多"
  v-model="valueLoad"
  :columns="columnsLoad"
  :column-change="columnChangeLoad"
  refresher-enabled
  scroll-to-lower-enabled
  @refresh="onRefresh"
  @scroll-to-lower="onScrollToLower"
/>
```

```typescript
const valueLoad = ref([])
const columnsLoad = ref([])
const loadPicker = ref()

const onRefresh = ({ colIndex }) => {
  console.log('下拉刷新', colIndex)
  setTimeout(() => {
    // 刷新数据逻辑...
    loadPicker.value?.stopRefresh()
  }, 1000)
}

const onScrollToLower = ({ colIndex }) => {
  console.log('上拉加载更多', colIndex)
  // 加载更多数据逻辑...
  // const newCols = [...columnsLoad.value]
  // newCols[colIndex] = [...oldData, ...newData]
  // columnsLoad.value = newCols
}
```

## 综合案例：搜索+刷新+加载
这是一个结合了远程搜索、下拉刷新和上拉加载的完整示例。

```html
<wd-col-picker
  label="综合案例"
  title="支持搜索/刷新/加载"
  v-model="valueComplex"
  :columns="columnsComplex"
  :column-change="columnChangeComplex"
  filterable
  filter-type="remote"
  refresher-enabled
  scroll-to-lower-enabled
  @search="onSearchComplex"
  @search-clear="onSearchClearComplex"
  @refresh="onRefreshComplex"
  @scroll-to-lower="onScrollToLowerComplex"
/>
```

```typescript
// 详细代码实现参考示例
import { ref, onMounted } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()
const valueComplex = ref<string[]>([])
const columnsComplex = ref<any[][]>([])
const complexPicker = ref()

// 模拟“数据库”
const getComplexMockData = (() => {
  const TOTAL_COUNT = 100
  const DB: any[] = []
  
  return (colIndex: number, page: number, pageSize: number = 15, keyword: string = '') => {
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        const fullTable: any[] = []
        for (let i = 1; i <= TOTAL_COUNT; i++) {
          const label = colIndex === 0 ? `省份${i}` : colIndex === 1 ? `城市${i}` : `区县${i}`
          fullTable.push({
            label,
            value: colIndex === 0 ? `${i}` : `${colIndex}-${i}`
          })
        }

        // 1. 过滤
        let filteredData = fullTable
        if (keyword) {
          filteredData = fullTable.filter(item => item.label.includes(keyword))
        }

        // 2. 分页
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const pageData = filteredData.slice(start, end)

        resolve(pageData)
      }, 500)
    })
  }
})()

// 记录每一列的当前页码
const pageMapComplex = ref<Record<number, number>>({})

// 综合案例：列变化
const columnChangeComplex = ({ selectedItem, index, resolve, finish }) => {
  console.log(`[综合-列变化] 层级: ${index}, 选中: ${selectedItem.label}`)
  
  // 重置下一列的页码
  const nextColIndex = index + 1
  pageMapComplex.value[nextColIndex] = 1

  getComplexMockData(nextColIndex, 1).then((data) => {
    if (data.length > 0) {
      resolve(data)
    } else {
      finish()
    }
  })
}

const onSearchComplex = ({ searchText, colIndex }) => {
  console.log(`[综合-搜索] 层级: ${colIndex}, 关键词: "${searchText}"`)
  pageMapComplex.value[colIndex] = 1
  getComplexMockData(colIndex, 1, 15, searchText).then((data) => {
    const newCols = [...columnsComplex.value]
    newCols[colIndex] = data
    columnsComplex.value = newCols
  })
}

const onSearchClearComplex = ({ colIndex }) => {
  onSearchComplex({ searchText: '', colIndex })
}

const onRefreshComplex = ({ searchText, colIndex }) => {
  console.log(`[综合-刷新] 层级: ${colIndex}`)
  pageMapComplex.value[colIndex] = 1
  getComplexMockData(colIndex, 1, 15, searchText).then((data) => {
    const newCols = [...columnsComplex.value]
    newCols[colIndex] = data
    columnsComplex.value = newCols
    
    // 停止刷新
    complexPicker.value?.stopRefresh()
  })
}

const onScrollToLowerComplex = ({ searchText, colIndex }) => {
  console.log(`[综合-加载更多] 层级: ${colIndex}`)
  const nextPage = (pageMapComplex.value[colIndex] || 1) + 1
  pageMapComplex.value[colIndex] = nextPage
  
  toast.loading('加载中...')
  
  getComplexMockData(colIndex, nextPage, 15, searchText).then((newData) => {
    toast.close()
    if (newData.length === 0) {
      toast.info('没有更多数据了')
      return
    }
    
    const currentData = columnsComplex.value[colIndex] || []
    const combinedData = [...currentData, ...newData]

    const newCols = [...columnsComplex.value]
    newCols[colIndex] = combinedData
    columnsComplex.value = newCols
  })
}

// 初始化第一列
onMounted(() => {
  pageMapComplex.value[0] = 1
  getComplexMockData(0, 1).then((data) => {
    columnsComplex.value = [data]
  })
})
```

## Attributes

| 参数                   | 说明                                                                                                                           | 类型              | 可选值 | 默认值  | 最低版本 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ------ | ------- | -------- |
| v-model                | 选中项                                                                                                                         | array             | -      | -       | -        |
| columns                | 选择器数据，二维数组                                                                                                           | array             | -      | -       | -        |
| value-key              | 选项对象中，value 对应的 key                                                                                                   | string            | -      | value   | -        |
| label-key              | 选项对象中，展示的文本对应的 key                                                                                               | string            | -      | label   | -        |
| tip-key                | 选项对象中，提示文案对应的 key                                                                                                 | string            | -      | tip     | -        |
| title                  | 弹出层标题                                                                                                                     | string            | -      | -       | -        |
| label                  | 选择器左侧文案                                                                                                                 | string            | -      | -       | -        |
| placeholder            | 选择器占位符                                                                                                                   | string            | -      | 请选择  | -        |
| disabled               | 禁用                                                                                                                           | boolean           | -      | false   | -        |
| readonly               | 只读                                                                                                                           | boolean           | -      | false   | -        |
| display-format         | 自定义展示文案的格式化函数，返回一个字符串                                                                                     | function          | -      | -       | -        |
| column-change          | 接收当前列的选中项 item、当前列下标、当前列选中项下标下一列数据处理函数 resolve、结束选择 finish                               | function          | -      | -       | -        |
| size                   | 设置选择器大小                                                                                                                 | string            | large  | -       | -        |
| label-width            | 设置左侧标题宽度                                                                                                               | string            | -      | 33%     | -        |
| error                  | 是否为错误状态，错误状态时右侧内容为红色                                                                                       | boolean           | -      | false   | -        |
| required               | 必填样式                                                                                                                       | boolean           | -      | false   | -        |
| marker-side            | 必填标记位置                                                                                                                   | string            | before / after | before  | $LOWEST_VERSION$ |
| align-right            | 选择器的值靠右展示                                                                                                             | boolean           | -      | false   | -        |
| before-confirm         | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数                       | function          | -      | -       | -        |
| loading-color          | loading 图标的颜色                                                                                                             | string            | -      | #4D80F0 | -        |
| use-default-slot       | 使用默认插槽时设置该选项                                                                                                       | boolean           | -      | false   | -        |
| use-label-slot         | 使用 label 插槽时设置该选项                                                                                                    | boolean           | -      | false   | -        |
| close-on-click-modal   | 点击遮罩是否关闭                                                                                                               | boolean           | -      | true    | -        |
| auto-complete          | 自动触发 column-change 事件来补全数据，当 columns 为空数组或者 columns 数组长度小于 value 数组长度时，会自动触发 column-change | -                 | false  | -       |
| z-index                | 弹窗层级                                                                                                                       | number            | -      | 15      | -        |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型）                                                                            | boolean           | -      | true    | -        |
| ellipsis               | 是否超出隐藏                                                                                                                   | boolean           | -      | false   | -        |
| prop                   | 表单域 `model` 字段名，在使用表单校验功能的情况下，该属性是必填的                                                              | string            | -      | -       | -        |
| rules                  | 表单验证规则，结合`wd-form`组件使用                                                                                            | `FormItemRule []` | -      | `[]`    | -        |
| lineWidth              | 底部条宽度，单位像素                                                                                                           | number            | -      | -       | 1.3.7    |
| lineHeight             | 底部条高度，单位像素                                                                                                           | number            | -      | -       | 1.3.7    |
| root-portal            | 是否从页面中脱离出来，用于解决各种 fixed 失效问题                                                                             | boolean           | -      | false   | 1.11.0 |
| filterable             | 是否开启搜索功能（本地/远程）                                                                                                 | boolean           | -      | false   | -        |
| filter-type            | 搜索类型：'local' (本地过滤) 或 'remote' (远程搜索)                                                                           | string            | -      | 'local' | -        |
| filter-placeholder     | 搜索输入框占位符                                                                                                             | string            | -      | -       | -        |
| refresher-enabled      | 是否开启下拉刷新                                                                                                              | boolean           | -      | false   | -        |
| refresher-default-style| 下拉刷新默认样式                                                                                                              | string            | 'black' / 'white' / 'none' | 'white' | - |
| refresher-background   | 下拉刷新区域背景颜色                                                                                                          | string            | -      | transparent | -    |
| scroll-to-lower-enabled| 是否开启上拉加载更多                                                                                                          | boolean           | -      | false   | -        |
| refresher-background   | 下拉刷新区域背景颜色                                                                                                          | string            | -      | transparent | -    |
| refresher-default-style| 下拉刷新默认样式                                                                                                              | string            | 'black' / 'white' / 'none' | 'white' | - |

### FormItemRule 数据结构

| 键名      | 说明                                                    | 类型                                  |
| --------- | ------------------------------------------------------- | ------------------------------------- |
| required  | 是否为必选字段                                          | `boolean`                             |
| message   | 错误提示文案                                            | `string`                              |
| validator | 通过函数进行校验，可以返回一个 `Promise` 来进行异步校验 | `(value, rule) => boolean \| Promise` |
| pattern   | 通过正则表达式进行校验，正则无法匹配表示校验不通过      | `RegExp`                              |

## 选项数据结构

| 键名     | 说明     | 类型    | 是否必填 | 最低版本 |
| -------- | -------- | ------- | -------- | -------- |
| value    | 选项值   | string  | 是       | -        |
| label    | 选项名   | string  | 是       | -        |
| tip      | 选项提示 | string  | 否       | -        |
| disabled | 禁用选项 | boolean | 否       | -        |

## Events

| 事件名称 | 说明                       | 参数                                             | 最低版本 |
| -------- | -------------------------- | ------------------------------------------------ | -------- |
| confirm  | 最后一列选项选中时触发     | `{ value(选项值数组), selectedItems(选项数组) }` | -        |
| close    | 点击关闭按钮或者蒙层时触发 | -                                                | -        |
| search   | 搜索时触发（filter-type="remote"） | `{ searchText, colIndex, selectedValues, selectedItems }` | - |
| search-change | 搜索文本改变时触发（filter-type="remote"） | `{ searchText, colIndex, selectedValues, selectedItems }` | - |
| search-clear | 清空搜索时触发（filter-type="remote"） | `{ searchText, colIndex, selectedValues, selectedItems }` | - |
| refresh  | 下拉刷新时触发 | `{ searchText, colIndex, isRefresh: true }` | - |
| scroll-to-lower | 上拉加载更多时触发 | `{ searchText, colIndex, isRefresh: false }` | - |

## Methods

| 方法名称 | 说明             | 参数 | 最低版本 |
| -------- | ---------------- | ---- | -------- |
| open     | 打开 picker 弹框 | -    |
| close    | 关闭 picker 弹框 | -    |
| stopRefresh | 停止下拉刷新 | - | - |
| getCurrentColData | 获取当前列数据 | colIndex | - |
| getAllColData | 获取所有列数据 | - | - |

## Slots

| name    | 说明       | 最低版本 |
| ------- | ---------- | -------- |
| default | 自定义展示 | -        |
| label   | 左侧插槽   | -        |
| search  | 搜索插槽   | -        |
| empty   | 空数据提示插槽 | -        |

## 外部样式类

| 类名               | 说明                 | 最低版本 |
| ------------------ | -------------------- | -------- |
| custom-class       | 根节点样式           | -        |
| custom-label-class | label 外部自定义样式 | -        |
| custom-value-class | value 外部自定义样式 | -        |
