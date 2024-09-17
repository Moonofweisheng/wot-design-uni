<frame/>

# Tour 引导

用于引导用户了解产品功能的气泡组件。

## 基本用法

在每一步中设置 target 目标元素的 id ，Tour 组件则会根据设置的 id 值进行查找。

:::warning 因微信小程序的特殊性，不建议直接将 `id` 绑定到自定义组件上面，最好是在外面嵌套一层 `view`。 :::

```html
<wd-cell-group>
  <wd-cell title="步骤一">
    <view id="step-a" style="display: inline-block">
      <wd-button @click="show3 = true">点击试试</wd-button>
    </view>
  </wd-cell>
  <wd-cell title="步骤二">
    <view id="step-b">
      <wd-button @click="show3 = true">点击试试</wd-button>
    </view>
  </wd-cell>
</wd-cell-group>

<wd-tour v-model="show" :steps="steps" type="step" />
```

```typescript
const show = ref(false)

const steps = ref([
  { target: 'step-a', content: '这是第一步' },
  { target: 'step-b', content: '这是第二步' }
])
```

## 类型 Type

引导类型分为 `step` 和 `card` 两种，默认为 `step` 分步骤引导类型。`card`为单条引导，即没有操作步骤展示。

无论使用哪种方式，基本数据类型需要保持一致。

```typescript
// step多步骤引导
const steps = ref([
  { target: 'step-a', content: '这是第一步' },
  { target: 'step-b', content: '这是第二步' }
])

// card 单条引导
const steps = ref([{ target: 'step-a', content: '这是一个单条引导' }])
```

## 自定义样式

每一条引导步骤可以通过 `popupStyle` 和 `contentStyle`来自定义样式，使用时尽量避免覆盖默认必要参数`width`、`height`、`top`、`left`、`right`。

```html
<wd-cell-group>
  <wd-cell title="步骤一">
    <view id="step-a" style="display: inline-block">
      <wd-button @click="show3 = true">点击试试</wd-button>
    </view>
  </wd-cell>
</wd-cell-group>

<wd-tour v-model="show" :steps="steps" type="card" />
```

```typescript
const show = ref(false)

const steps = ref([
  {
    target: 'step-a',
    content: '自定义样式内容',
    // 自定义引导区域样式
    popupStyle: {
      borderRadius: '18px',
      padding: '5px'
    },
    // 自定义提示内容样式
    contentStyle: {
      color: '#fff'
    }
  }
])
```

## 自定义内容

通过 `slot` 插槽可自定义气泡弹出层内容。

```html
<view id="step-a">
  <wd-button @click="show3 = true">点击试试</wd-button>
</view>

<wd-tour v-model="show" :steps="steps" type="card">
  // 此处也可以通过作用域插槽拿到传入的内容
  <template #content="{ item }">
    <view>此处可以随意自定义你的内容</view>
  </template>
</wd-tour>
```

```typescript
const show = ref(false)

const steps = ref([{ target: 'step-a', content: '这是一个单条引导' }])
```

## Tour Attributes

| 参数                | 说明                                                                        | 类型    | 可选值       | 默认值 | 最低版本 |
| ------------------- | --------------------------------------------------------------------------- | ------- | ------------ | ------ | -------- |
| v-model             | 手动状态是否可见                                                            | boolean | true / false | false  | -        |
| type                | 引导类型                                                                    | string  | step / card  | step   | -        |
| steps               | 数据集，详细见下面 数据格式                                                 | array   | -            | -      | -        |
| current             | 指定当前步骤 (type = step 时生效)，可以操作引导步骤继续进行                 | number  | -            | 0      | -        |
| nextStepTxt         | 多步骤引导时，指定`上一步`按钮展示文字（也可通过插槽`prev-step`自定义内容） | string  | -            | 上一步 | -        |
| prevStepTxt         | 多步骤引导时，指定`下一步`按钮展示文字（也可通过插槽`next-step`自定义内容） | string  | -            | 下一步 | -        |
| completeTxt         | 多步骤引导时，指定`完成`按钮展示文字（也可通过插槽`end-step`自定义内容）    | string  | -            | 完成   | -        |
| showPrevStep        | 多步骤引导时，是否展示`上一步`按钮                                          | boolean | true / false | true   | -        |
| showProgress        | 多步骤引导时，是否展示步骤进度                                              | boolean | true / false | true   | -        |
| mask                | 是否显示遮罩层                                                              | boolean | true / false | true   | -        |
| arrow               | 气泡框是否显示 指向箭头                                                     | boolean | true / false | true   | -        |
| showClose           | 多步骤引导时，是否显示关闭按钮                                              | boolean | true / false | true   | -        |
| closeOnClickOverlay | 点击遮罩层是否可关闭引导                                                    | boolean | true / false | true   | -        |
| bgColor             | 自定义气泡弹框背景色（也可通过自定义插槽 `content`自定义）                  | string  | -            | #fff   | -        |

## Step 数据格式

| 类名         | 说明               | 类型   | 是否必填 | 最低版本 |
| ------------ | ------------------ | ------ | -------- | -------- |
| target       | 元素根节 id        | string | 是       | -        |
| content      | 引导内容           | string | -        | -        |
| contentStyle | 自定义气泡框样式   | string | -        | -        |
| popupStyle   | 自定义引导区域样式 | string | -        | -        |

## Slot

| name          | 说明                   | 最低版本 |
| ------------- | ---------------------- | -------- |
| content       | 气泡弹框内容自定义样式 | -        |
| prev-step     | 上一步按钮自定义区域   | -        |
| next-step     | 下一步按钮自定义区域   | -        |
| end-step      | 完成按钮自定义区域     | -        |
| step-progress | 步骤进度自定义区域     | -        |

## Events

| 事件名称 | 说明           | 回调参数 | 最低版本 |
| -------- | -------------- | -------- | -------- |
| close    | 隐藏时触发     | -        | -        |
| change   | 步骤变化时触发 | -        | -        |

## Tour 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
