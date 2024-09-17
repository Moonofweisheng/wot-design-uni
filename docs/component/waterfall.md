<frame/>

# Waterfall 瀑布流

简易瀑布流组件，内容分为左右两列， 结合作用域插槽进行自定义布局。

## 基本用法

本组件利用了 vue 的作用域插槽特性， 将传入 waterfall 内部的数据，通过 slot 作用域插槽让用户能在父组件中引用和配置对应的数据。

需要注意的是，组件内部导出的数据，需要使用 template 元素接收，同时通过 v-slot 指定左右两列的 slot，如 `v-slot:left="{ leftList }"`，这里的 `leftList`变量名为组件内部传出的一个对象，用于 渲染左右两列的数据，见如下完整示例：

```html
<wd-waterfall v-model="flowList">
  <template v-slot:left="{leftList}">
    <view v-for="(item, index) in leftList" :key="index">
      <!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
    </view>
  </template>
  <template v-slot:right="{rightList}">
    <view v-for="(item, index) in rightList" :key="index">
      <!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
    </view>
  </template>
</wd-waterfall>
```

```typescript
const flowList = ref([{ id: 1, title: '这是数据标题' }])
```

## 事件方法

waterfall 默认提供导出`reorder`(重新排序)、`clear`(清空所有数据)、`remove`(删除某条数据)、`update`(更新某条数据)等方法。

使用时通过 ref 调用组件内部的方法。

```html
<wd-button @click="handleReorder">重新排序</wd-button>
<wd-button @click="handleClear">清空列表</wd-button>

<wd-waterfall v-model="flowList" ref="waterfallRef">
  <template v-slot:left="{leftList}">
    <view v-for="(item, index) in leftList" :key="index">
      <view>{{item.ttle}}</view>
      <view>
        <view @click="handleRemove(item.id)">删除</view>
        <view @click="handleUpdate(item.id, 'title', '新标题')">修改</view>
      </view>
    </view>
  </template>
  <template v-slot:right="{rightList}">
    <view v-for="(item, index) in rightList" :key="index">
      <view>
        <view @click="handleRemove(item.id)">删除</view>
        <view @click="handleUpdate(item.id, 'title', '新标题')">修改</view>
      </view>
    </view>
  </template>
</wd-waterfall>
```

```typescript
const waterfallRef = ref(null)
const flowList = ref([
  { id: 1, title: '这是数据标题111' },
  { id: 2, title: '这是数据标题222' },
  { id: 3, title: '这是数据标题333' }
])

// 重新排序， 也可以通过指定配置参数 `isReorder` 在数据改变时直接重新排序
function handleReorder() {
  waterfallRef.value.reorder()
}

// 清空数据
function handleClear() {
  waterfallRef.value.clear()
  // 等同于 flowList.value = []
}

// 删除某条数据
function handleRemove(id) {
  // 这里的id为配置参数传入的 `idKey`对应值， 默认为 'id'
  waterfallRef.value.remove(id)
}

// 更新某条数据
function handleUpdate(id, key, value) {
  // 这里的id为配置参数传入的 `idKey`对应值， 默认为 'id'
  // `key` 为修改的字段
  // `value` 为修改的值
  waterfallRef.value.update(id, key, value)
}
```

## 注意事项

`add-time`用于将单条数据添加到队列的时间间隔，因为加载是需要时间的，所以瀑布流左右列 的高度会不定时改变，add-time 值越大，对程序效果越好，但是对用户来说，越大值可能就是以能感受的速度一个一个添加 到队列尾部的，所以这是一个双面性的结果。

`id-key`用于指定数据中唯一主键名，类似 v-for 中的 key，后续的修改、删除时指定的 id 就是基于此值。默认是 `id`， 如果您的数据中没有`id`这个字段，您应该重新指定一个`唯一key`,即：`<wd-waterfall id-key="xxx"  />` 。

`gap`用于左右两侧间隔设置，默认单位`px`, 如需自定义，可以通过`custom-class`操作，使用时注意参考原有结构。

```html
<view :class="['wd-waterfall', customClass]" :style="{ gap: gap + 'px' }">
  <view class="wd-waterfall__item" :style="{ width: `calc(50% - ${gap / 2}px)` }">这里是插槽部分</view>
  <view class="wd-waterfall__item" :style="{ width: `calc(50% - ${gap / 2}px)` }">这里是插槽部分</view>
</view>
```

## Waterfall Attributes

| 参数                   | 说明                                                                                                                           | 类型    | 可选值       | 默认值 | 最低版本 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- | ------------ | ------ | -------- |
| v-model / modelValue   | 需要渲染的数据列表                                                                                                             | array   | -            | -      | -        |
| gap                    | 两列布局时， 左右两侧间隔距离, 单位是 `px`，这里仅允许传递`number`类型，详情见上方注意事项说明                                 | number  | -            | 12     | -        |
| add-time / addTime     | 单条数据添加到队列的时间间隔，单位 ms，详情见上方注意事项说明                                                                  | number  | -            | 50     | -        |
| id-key / idKey         | 数据的唯一值的键名, 后续删除、修改的主键 id 都是基于此值进行查找。                                                             | string  | -            | id     | -        |
| is-reorder / isReorder | 数据操作完成后，是否重新排序（目前主要是删除操作的时候）。                                                                     | boolean | true / false | false  | -        |
| options                | （可选）全局配置参数，使用方式同 v-slot='{ options }', 传递什么就返回什么，通过 options 接收，主要用于解决低版本作用域数据问题 | -       | -            | -      | -        |

## Methods

| 方法名称 | 说明         | 参数             | 最低版本 |
| -------- | ------------ | ---------------- | -------- |
| reorder  | 重新排列数据 | -                | -        |
| clear    | 清空数据列表 | -                | -        |
| remove   | 移除某条数据 | (id)             | -        |
| update   | 更新某条数据 | (id, key, value) | -        |

## waterfall 外部样式类

| 类名         | 说明             | 最低版本 |
| ------------ | ---------------- | -------- |
| custom-class | 根节点自定义类名 | -        |
