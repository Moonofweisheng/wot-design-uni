---
url: 'https://wot-design-uni.cn/component/table.md'
---
# Table 表格 0.1.39

用于展示多条结构类似的数据， 可对数据进行排序等操作。

::: warning 提示
`1.5.0`后取消了`height`的默认值，需要自行设置，最好设置为`number`类型，方便未来适配虚拟列表。
:::

## 基础用法

通过`data`设置表格数据。

::: details 基础用法

```html
<wd-table :data="dataList" :height="400">
  <wd-table-col prop="name" label="姓名"></wd-table-col>
  <wd-table-col prop="school" label="求学之所"></wd-table-col>
  <wd-table-col prop="major" label="专业"></wd-table-col>
</wd-table>
```

```ts
const dataList = reactive([
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业'
  },
  {
    name: '孔明',
    school: '武汉市阳逻卧龙学院',
    major: '计算机科学与技术专业'
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业'
  }
])
```

:::

## 固定列

通过`fixed`设置表格列是否固定展示，默认`false`。
:::warning 提示
目前仅支持固定在左侧，且固定列组件的排列顺序要和实际想要展示的顺序相同。
:::

```html
<wd-table :data="dataList" :height="400">
  <wd-table-col prop="name" label="姓名" fixed></wd-table-col>
  <wd-table-col prop="school" label="求学之所"></wd-table-col>
  <wd-table-col prop="major" label="专业"></wd-table-col>
</wd-table>
```

## 显示索引

通过`index`设置表格是否显示序号列，默认为`false`。同时也可以传入对象对序号列进行配置，参数同`TableColumnProps`

```html
<wd-table :data="dataList" height="328px" :index="true" :height="400">
  <wd-table-col prop="name" label="姓名" sortable></wd-table-col>
  <wd-table-col prop="grade" label="分数" sortable></wd-table-col>
  <wd-table-col prop="hobby" label="一言以蔽之" sortable :width="160"></wd-table-col>
</wd-table>

<wd-table :data="dataList" height="328px" :index="{ align: 'center', width: 200 }">
  <wd-table-col prop="name" label="姓名" sortable align="center"></wd-table-col>
  <wd-table-col prop="grade" label="分数" sortable align="center"></wd-table-col>
  <wd-table-col prop="hobby" label="一言以蔽之" sortable :width="160"></wd-table-col>
</wd-table>
```

## 斑马纹

通过`stripe`设置表格是否展示斑马纹，默认`true`。

```html
<wd-table :data="dataList" :stripe="false" :height="400">
  <wd-table-col prop="name" label="姓名"></wd-table-col>
  <wd-table-col prop="school" label="求学之所"></wd-table-col>
  <wd-table-col prop="major" label="专业"></wd-table-col>
</wd-table>
```

## 边框

通过`border`设置表格是否展示边框，默认`true`。

```html
<wd-table :data="dataList" :border="false" :height="400">
  <wd-table-col prop="name" label="姓名"></wd-table-col>
  <wd-table-col prop="school" label="求学之所"></wd-table-col>
  <wd-table-col prop="major" label="专业"></wd-table-col>
</wd-table>
```

## 表格高度

通过`height`设置表格高度，设置高度后会自动固定表头。

```html
<wd-table :data="dataList" :height="400">
  <wd-table-col prop="name" label="姓名"></wd-table-col>
  <wd-table-col prop="school" label="求学之所"></wd-table-col>
  <wd-table-col prop="major" label="专业"></wd-table-col>
</wd-table>
```

## 排序事件

当存在列参与排序时，点击会触发`sort-method`排序事件。

```html
<wd-table :data="dataList" @sort-method="handleSort" :height="400">
  <wd-table-col prop="name" label="姓名"></wd-table-col>
  <wd-table-col prop="school" label="求学之所" sortable></wd-table-col>
  <wd-table-col prop="major" label="专业"></wd-table-col>
</wd-table>
```

```ts
function handleSort(e) {
  console.log('这里是排序事件')
}
```

## 自定义列模板

自定义列的显示内容，可组合其他组件使用。
通过 `Scoped slot` 可以获取到 `row`, `index` 的数据，用法参考 demo。

::: details 查看自定义列模版 demo

```html
<wd-table :data="dataList" @sort-method="handleSort" :height="400">
  <wd-table-col prop="name" label="姓名" fixed="true" width="320rpx" sortable></wd-table-col>
  <wd-table-col prop="grade" label="分数" width="220rpx" sortable>
    <template #value="{row}">
      <view class="custom-class">
        <text>{{ row.grade }}</text>
        <text>同比{{ row.compare }}</text>
      </view>
    </template>
  </wd-table-col>
  <wd-table-col prop="hobby" label="一言以蔽之" sortable></wd-table-col>
  <wd-table-col prop="school" label="求学之所"></wd-table-col>
  <wd-table-col prop="major" label="专业"></wd-table-col>
  <wd-table-col prop="gender" label="性别"></wd-table-col>
  <wd-table-col prop="graduation" label="学成时间"></wd-table-col>
</wd-table>
```

```ts
import { ref } from 'vue'
interface TableData {
  name: string
  school: string
  major: string
  gender: string
  graduation: string
  grade: number
  compare: string
  hobby: string
}

const dataList = ref<TableData[]>([
  {
    name: '张飞',
    school: '武汉市阳逻杀猪学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 56,
    compare: '10%',
    hobby: '燕人张飞在此！'
  },
  {
    name: '关羽',
    school: '武汉市阳逻绿豆学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 66,
    compare: '11%',
    hobby: '颜良文丑，以吾观之，如土鸡瓦犬耳。'
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 45,
    compare: '1%',
    hobby: '我得空明，如鱼得水也'
  },
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 69,
    compare: '14%',
    hobby: '子龙，子龙，世无双'
  },
  {
    name: '孔明',
    school: '武汉市阳逻卧龙学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 88,
    compare: '21%',
    hobby: '兴汉讨贼，克复中原'
  },
  {
    name: '姜维',
    school: '武汉市阳逻停水停电技术学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 87,
    compare: '32%',
    hobby: '我计不成，乃天命也！'
  }
])

/**
 * 排序
 * @param e
 */
function handleSort(e) {
  dataList.value = dataList.value.reverse()
}
```

```css
.custom-class {
  height: 80rpx;
  width: 220rpx;
  display: flex;
  flex-direction: col;
  align-items: center;
}
```

:::

## 不固定表头结合分页器使用

使用`pagination`组件，通过`v-model`绑定分页器当前页码，通过`total`设置分页器总条数，实现分页加载效果。

设置`fixed-header`为`false`，取消固定表头。

::: details 查看结合分页器使用 demo

```html
<wd-table :data="paginationData" :height="400" :fixed-header="false">
  <wd-table-col prop="name" label="姓名" fixed align="center"></wd-table-col>
  <wd-table-col prop="grade" label="分数" fixed align="center"></wd-table-col>
  <wd-table-col prop="hobby" label="一言以蔽之" :width="160"></wd-table-col>
  <wd-table-col prop="school" label="求学之所" :width="180"></wd-table-col>
  <wd-table-col prop="major" label="专业"></wd-table-col>
  <wd-table-col prop="gender" label="性别"></wd-table-col>
</wd-table>
<wd-pagination custom-style="border: 1px solid #ececec;border-top:none" v-model="page" :total="total"></wd-pagination>
```

```ts
interface TableData {
  name: string
  school: string
  major: string
  gender: string
  graduation: string
  grade: number
  compare: string
  hobby: string
}

const dataList = ref<TableData[]>([
  {
    name: '关羽',
    school: '武汉市阳逻绿豆学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 66,
    compare: '48%',
    hobby: '颜良文丑，以吾观之，如土鸡瓦犬耳。'
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 68,
    compare: '21%',
    hobby: '我得空明，如鱼得水也'
  },
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 91,
    compare: '12%',
    hobby: '子龙，子龙，世无双'
  },
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 91,
    compare: '12%',
    hobby: '子龙，子龙，世无双'
  },
  {
    name: '孔明',
    school: '武汉市阳逻卧龙学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 99,
    compare: '18%',
    hobby: '兴汉讨贼，克复中原'
  },
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 36,
    compare: '48%',
    hobby: '子龙，子龙，世无双'
  },
  {
    name: '关羽',
    school: '武汉市阳逻绿豆学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 66,
    compare: '48%',
    hobby: '颜良文丑，以吾观之，如土鸡瓦犬耳。'
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 68,
    compare: '21%',
    hobby: '我得空明，如鱼得水也'
  },
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 91,
    compare: '12%',
    hobby: '子龙，子龙，世无双'
  },
  {
    name: '孔明',
    school: '武汉市阳逻卧龙学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 99,
    compare: '18%',
    hobby: '兴汉讨贼，克复中原'
  },
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 36,
    compare: '48%',
    hobby: '子龙，子龙，世无双'
  },
  {
    name: '关羽',
    school: '武汉市阳逻绿豆学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 66,
    compare: '48%',
    hobby: '颜良文丑，以吾观之，如土鸡瓦犬耳。'
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 68,
    compare: '21%',
    hobby: '我得空明，如鱼得水也'
  },
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 91,
    compare: '12%',
    hobby: '子龙，子龙，世无双'
  },
  {
    name: '孔明',
    school: '武汉市阳逻卧龙学院',
    major: '计算机科学与技术专业',
    gender: '男',
    graduation: '2022年1月12日',
    grade: 99,
    compare: '18%',
    hobby: '兴汉讨贼，克复中原'
  }
])
const page = ref<number>(1)
const pageSize = ref<number>(10)

const total = ref<number>(dataList.value.length)

const paginationData = computed(() => {
  // 按页码和每页条数截取数据
  return dataList.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
})
```

:::

## Attributes

| 参数            | 说明                                                | 类型                         | 可选值 | 默认值 | 最低版本         |
| --------------- | --------------------------------------------------- | ---------------------------- | ------ | ------ | ---------------- |
| data            | 显示的数据                                          | Array                        | -      | -      | 0.0.39           |
| border          | 是否带有边框                                        | boolean                      | -      | true   | 0.0.39           |
| stripe          | 是否为斑马纹表                                      | boolean                      | -      | true   | 0.0.39           |
| height          | Table 的高度，无默认值，设置后自动开启固定表头。        | `number / string`            | -      | -      | 0.0.39           |
| rowHeight       | 行高                                                | `number / string`            | -      | 50     | 0.0.39           |
| showHeader      | 是否显示表头                                        | boolean                      | -      | true   | 0.0.39           |
| ellipsis        | 是否超出 2 行隐藏                                   | boolean                      | -      | true   | 0.0.39           |
| index           | 是否显示索引列，可传入`boolean`也可传入 column 配置 | `boolean / TableColumnProps` |        | false  | 1.2.19           |
| fixed-header    | 是否固定表头，需要结合`height`才可以实现固定表头的效果。      | boolean                      | -      | true   | 1.5.0 |

## Events

| 事件名称    | 说明                                                               | 参数                             | 最低版本 |
| ----------- | ------------------------------------------------------------------ | -------------------------------- | -------- |
| sort-method | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 的时候有效 | `TableColumn：当前点击列数据`    | 0.0.39   |
| row-click   | 当某一行被点击时会触发该事件                                       | `{rowIndex:number} 点击行的下标` | 0.0.39   |

## TableColumn Attributes

| 参数     | 说明                        | 类型            | 可选值              | 默认值 | 最低版本 |
| -------- | --------------------------- | --------------- | ------------------- | ------ | -------- |
| prop     | 字段名称,对应列内容的字段名 | string          | -                   | -      | 0.0.39   |
| label    | 显示的标题                  | string          | -                   | -      | 0.0.39   |
| width    | 对应列的宽度，单位为 px     | number / string | -                   | 100    | 0.0.39   |
| sortable | 是否开启列排序              | boolean         | -                   | false  | 0.0.39   |
| fixed    | 是否固定本列                | boolean         | -                   | false  | 0.0.39   |
| align    | 列的对齐方式                | AlignType       | left, center, right | left   | 0.0.39   |

## TableColumn Slot

| name  | 说明                                   | 参数                             | 最低版本 |
| ----- | -------------------------------------- | -------------------------------- | -------- |
| value | 自定义列的内容，1.2.16 新增`index`参数 | `{ row: Object, index: number }` | 0.1.22   |
