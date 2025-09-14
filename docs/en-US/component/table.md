# Table

Used to display multiple pieces of data with similar structures, allowing operations such as sorting.

::: warning Note
After `1.5.0`, the default value of `height` has been removed. You need to set it manually, preferably as a `number` type to facilitate future adaptation of virtual lists.
:::

## Basic Usage

Set table data through `data`.

::: details Basic Usage

```html
<wd-table :data="dataList" :height="400">
  <wd-table-col prop="name" label="Name"></wd-table-col>
  <wd-table-col prop="school" label="School"></wd-table-col>
  <wd-table-col prop="major" label="Major"></wd-table-col>
</wd-table>
```

```ts
const dataList = reactive([
  {
    name: 'Zhao Yun',
    school: 'Wuhan Yanglo Maternal and Child Health College',
    major: 'Computer Science and Technology'
  },
  {
    name: 'Kong Ming',
    school: 'Wuhan Yanglo Wolong College',
    major: 'Computer Science and Technology'
  },
  {
    name: 'Liu Bei',
    school: 'Wuhan Yanglo Weaving College',
    major: 'Computer Science and Technology'
  }
])
```

:::

## Fixed Columns

Set whether table columns are fixed through `fixed`, default is `false`.
:::warning Note
Currently only supports fixing on the left side, and the arrangement order of fixed column components must be the same as the actual desired display order.
:::

```html
<wd-table :data="dataList" :height="400">
  <wd-table-col prop="name" label="Name" fixed></wd-table-col>
  <wd-table-col prop="school" label="School"></wd-table-col>
  <wd-table-col prop="major" label="Major"></wd-table-col>
</wd-table>
```

## Show Index

Set whether to display the index column through `index`, default is `false`. You can also pass an object to configure the index column, parameters are the same as `TableColumnProps`

```html
<wd-table :data="dataList" height="328px" :index="true" :height="400">
  <wd-table-col prop="name" label="Name" sortable></wd-table-col>
  <wd-table-col prop="grade" label="Score" sortable></wd-table-col>
  <wd-table-col prop="hobby" label="Description" sortable :width="160"></wd-table-col>
</wd-table>

<wd-table :data="dataList" height="328px" :index="{ align: 'center', width: 200 }">
  <wd-table-col prop="name" label="Name" sortable align="center"></wd-table-col>
  <wd-table-col prop="grade" label="Score" sortable align="center"></wd-table-col>
  <wd-table-col prop="hobby" label="Description" sortable :width="160"></wd-table-col>
</wd-table>
```

## Striped

Set whether to display striped table through `stripe`, default is `true`.

```html
<wd-table :data="dataList" :stripe="false" :height="400">
  <wd-table-col prop="name" label="Name"></wd-table-col>
  <wd-table-col prop="school" label="School"></wd-table-col>
  <wd-table-col prop="major" label="Major"></wd-table-col>
</wd-table>
```

## Border

Set whether to display table border through `border`, default is `true`.

```html
<wd-table :data="dataList" :border="false" :height="400">
  <wd-table-col prop="name" label="Name"></wd-table-col>
  <wd-table-col prop="school" label="School"></wd-table-col>
  <wd-table-col prop="major" label="Major"></wd-table-col>
</wd-table>
```

## Table Height

Set table height through `height`, after setting height, the header will be automatically fixed.

```html
<wd-table :data="dataList" :height="400">
  <wd-table-col prop="name" label="Name"></wd-table-col>
  <wd-table-col prop="school" label="School"></wd-table-col>
  <wd-table-col prop="major" label="Major"></wd-table-col>
</wd-table>
```

## Sort Event

When there are columns participating in sorting, clicking will trigger the `sort-method` sorting event.

```html
<wd-table :data="dataList" @sort-method="handleSort" :height="400">
  <wd-table-col prop="name" label="Name"></wd-table-col>
  <wd-table-col prop="school" label="School" sortable></wd-table-col>
  <wd-table-col prop="major" label="Major"></wd-table-col>
</wd-table>
```

```ts
function handleSort(e) {
  console.log('This is the sorting event')
}
```

## Custom Column Template

Customize the display content of columns, can be combined with other components.
Through `Scoped slot` you can get the data of `row` and `index`, usage refers to the demo.

::: details View Custom Column Template Demo

```html
<wd-table :data="dataList" @sort-method="handleSort" :height="400">
  <wd-table-col prop="name" label="Name" fixed="true" width="320rpx" sortable></wd-table-col>
  <wd-table-col prop="grade" label="Score" width="220rpx" sortable>
    <template #value="{row}">
      <view class="custom-class">
        <text>{{ row.grade }}</text>
        <text>YoY {{ row.compare }}</text>
      </view>
    </template>
  </wd-table-col>
  <wd-table-col prop="hobby" label="Description" sortable></wd-table-col>
  <wd-table-col prop="school" label="School"></wd-table-col>
  <wd-table-col prop="major" label="Major"></wd-table-col>
  <wd-table-col prop="gender" label="Gender"></wd-table-col>
  <wd-table-col prop="graduation" label="Graduation Time"></wd-table-col>
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
    name: 'Zhang Fei',
    school: 'Wuhan Yanglo Butcher College',
    major: 'Computer Science and Technology',
    gender: 'Male',
    graduation: 'January 12, 2022',
    grade: 56,
    compare: '10%',
    hobby: 'Zhang Fei of Yan is here!'
  },
  {
    name: 'Guan Yu',
    school: 'Wuhan Yanglo Mung Bean College',
    major: 'Computer Science and Technology',
    gender: 'Male',
    graduation: 'January 12, 2022',
    grade: 66,
    compare: '11%',
    hobby: 'Yan Liang and Wen Chou, in my view, are mere clay chickens and pottery dogs.'
  },
  {
    name: 'Liu Bei',
    school: 'Wuhan Yanglo Weaving College',
    major: 'Computer Science and Technology',
    gender: 'Male',
    graduation: 'January 12, 2022',
    grade: 45,
    compare: '1%',
    hobby: 'I have found my Ming, like a fish finding water'
  }
])
```

:::

## Attributes

| Attribute | Description | Type | Default | Version |
|-----------|-------------|------|---------|----------|
| data | Table data | array | [] | - |
| height | Table height | number/string | - | - |
| stripe | Whether to show stripes | boolean | true | - |
| border | Whether to show border | boolean | true | - |
| index | Whether to show index column | boolean/object | false | - |

## Events

| Event | Description | Parameters |
|-------|-------------|------------|
| sort-method | Triggered when sorting | event: Event |

## Slots

| Name | Description |
|------|-------------|
| value | Custom column content |