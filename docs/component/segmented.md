<frame/>

# Segmented 分段器 <el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">0.1.23</el-tag>

## 何时使用
* 用于展示多个选项并允许用户选择其中单个选项；
* 当切换选中选项时，关联区域的内容会发生变化。


## 大型分段器

通过设置 `size` 属性为 `"large"`，创建一个大型分段器。

```html
<wd-segmented :options="list" v-model:value="current" size="large"></wd-segmented>
```

## 默认分段器

这是默认尺寸的分段器。

```vue
<wd-segmented :options="list" v-model:value="current1"></wd-segmented>
```

## 小型分段器

通过设置 `size` 属性为 `"small"`，创建一个小型分段器。

```html
<wd-segmented :options="list" v-model:value="current2" size="small"></wd-segmented>
```

## 带振动效果的分段器

通过设置 `vibrate-short` 属性为 `true`，使手机在切换选项时产生短暂振动。

```html
<wd-segmented :options="list" v-model:value="current3" :vibrate-short="true"></wd-segmented>
```

## 禁用分段器

通过设置 `disabled` 属性为 `true`，禁用分段器。

```html
<wd-segmented :options="list" v-model:value="current5" disabled></wd-segmented>
```

## 自定义渲染分段器标签

使用插槽 `label` 可以自定义渲染分段器的标签内容。

```html
<wd-segmented :options="list1" v-model:value="current4" :vibrate-short="true">
  <template #label="{ option }">
    <view class="section-slot">
      <wd-img round width="32px" height="32px" :src="option.payload.avatar" />
      <view class="name">
        {{ option.value }}
      </view>
    </view>
  </template>
</wd-segmented>
```
```ts
const list1 = ref([
  {
    value: '李雷',
    disabled: false,
    payload: {
      avatar: 'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/redpanda.jpg'
    }
  },
  {
    value: '韩梅梅',
    disabled: false,
    payload: {
      avatar: 'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/capybara.jpg'
    }
  }
])
```
```scss
.section {
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;
  &-slot {
    padding: 4px;
  }
}

```

请注意，上述示例代码中的 `list` 和 `list1` 变量是您在 `<script>` 部分设置的示例数据。您可以根据您的实际需求自定义这些数据。


## Attributes

| 参数         | 说明                          | 类型            | 可选值 | 默认值 | 最低版本 |
| ------------ | ----------------------------- | --------------- | ------ | ------ | -------- |
| value/v-model:value | 当前选中的值                   | string \| number | -      | -      | 0.1.23   |
| disabled     | 是否禁用分段器                 | boolean         | true \| false | `false`  | 0.1.23   |
| size         | 控件尺寸                      | string          | `large` \| `middle` \| `small` | `middle` | 0.1.23   |
| options      | 数据集合                      | `string[] \| number[] \| SegmentedOption[]` | - | [] | 0.1.23   |
| vibrateShort | 切换选项时是否振动             | boolean         | true \| false | `false`  | 0.1.23   |

### SegmentedOption

| 参数       | 说明         | 类型                   | 可选值 | 默认值 | 最低版本 |
| ---------- | ------------ | ---------------------- | ------ | ------ | -------- |
| value      | 选中值       | string \| number       | -      | -      | 0.1.23   |
| disabled   | 是否禁用     | boolean                | true \| false | - | 0.1.23   |
| payload    | 更多数据     | any                    | -      | -      | 0.1.23   |


## Events

| 事件名称 | 说明                       | 参数        | 最低版本 |
| -------- | -------------------------- | ----------- | -------- |
| change   | 选项切换时触发             | `{ value }` | 0.1.23   |

## Slots

| name   | 说明                 | 参数                    | 最低版本 |
| ------ | -------------------- | ----------------------- | -------- |
| label  | 选项标签内容         | `{ option: SegmentedOption }` | 0.1.23   |


## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| customStyle  | 自定义样式  | 0.1.23   |
| customClass  | 自定义样式类 | 0.1.23   |
