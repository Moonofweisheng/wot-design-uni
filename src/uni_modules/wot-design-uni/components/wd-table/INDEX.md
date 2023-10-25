
## 代码演示

### 基础用法

通过`dataSource`设置表格数据。

```html
<hd-table :dataSource="dataList">
  <hd-table-column prop="name" label="姓名"></hd-table-column>
  <hd-table-column prop="school" label="求学之所"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
</hd-table>
```

```ts
const dataList = ref<Record<string,string>> ([
        {
          name: '赵云',
          school: '武汉市阳逻妇幼保健学院',
          major: '计算机科学与技术专业'
        },
        {
          name: '孔明',
          school: '武汉市阳逻卧龙学院',
          major: '计算机科学与技术专业'
        }
        {
          name: '刘备',
          school: '武汉市阳逻编织学院',
          major: '计算机科学与技术专业'
        }
      ])
```

### 斑马纹

通过`stripe`设置表格是否展示斑马纹，默认`false`(不展示)。

```html
<hd-table :dataSource="dataList" :stripe="true">
  <hd-table-column prop="name" label="姓名"></hd-table-column>
  <hd-table-column prop="school" label="求学之所"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
</hd-table>
```

### 表格高度

通过`height`设置表格高度，默认为`80vh`。

```html
<hd-table :dataSource="dataList" height="90vh">
  <hd-table-column prop="name" label="姓名"></hd-table-column>
  <hd-table-column prop="school" label="求学之所"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
</hd-table>
```

### 排序事件

当存在列参与排序时，点击会触发`sort-method`排序事件。

```html
<hd-table :dataSource="dataList" @sort-method="doSort">
  <hd-table-column prop="name" label="姓名"></hd-table-column>
  <hd-table-column prop="school" label="求学之所" :sortable="true"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
</hd-table>
```

```ts
function doSort(e) {
  console.log('这里是排序事件')
}
```

### 自定义列模板

自定义列的显示内容，可组合其他组件使用。
通过 `Scoped slot` 可以获取到 `row` 的数据，用法参考 demo。

```html
<hd-table :dataSource="dataList" :stripe="true" @sort-method="doSort">
  <hd-table-column prop="name" label="姓名" fixed="true" width="320rpx" :sortable="true"></hd-table-column>
  <hd-table-column prop="grade" label="分数" width="220rpx" :sortable="true">
    <template #default="scope: any">
      <view class="custom-class">
        <text>{{ scope.row.grade }}</text>
        <text>同比{{ scope.row.compare }}</text>
      </view>
    </template>
  </hd-table-column>
  <hd-table-column prop="hobby" label="一言以蔽之" :sortable="true"></hd-table-column>
  <hd-table-column prop="school" label="求学之所"></hd-table-column>
  <hd-table-column prop="major" label="专业"></hd-table-column>
  <hd-table-column prop="gender" label="性别"></hd-table-column>
  <hd-table-column prop="graduation" label="学成时间"></hd-table-column>
</hd-table>
```

```ts

import { ref } from 'vue'

const dataList = ref<Record<string, any>[]>([
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
function doSort(e) {
  dataList.value = dataList.value.reverse()
}

```

```css
.custom-class {
  height: 80rpx;
  width: 220rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```