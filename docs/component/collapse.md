<frame/>

# Collapse 折叠面板

## 基本使用

`v-model` 为绑定值，可以为 array 类型（普通折叠）、 string 类型（手风琴）和 boolean 类型（收起展开查看更多）。CollapseItem 的 `name` 为必填, `title` 选填且可通过 `slot` 自定义。`name` 用于标识该折叠栏。

```typescript
const value = ref<string[]>(['item1'])
```

```html
<wd-collapse v-model="value">
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item name="item3">
    <template #title="{ expanded, disabled, isFirst }">
      <text style="color: red">通过 slot 自定义标题</text>
      <text>{{ expanded ? '我展开了' : '我已收起' }}</text>
    </template>
    这是一条简单的示例文字。
  </wd-collapse-item>
</wd-collapse>
```

## 手风琴

设置 `accordion` 属性。

```html
<wd-collapse v-model="value" accordion>
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
</wd-collapse>
```

## 禁用

给 CollapseItem 设置 `disabled` 属性，禁用某个折叠栏。

```html
<wd-collapse v-model="value">
  <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2" disabled>这是一条简单的示例文字。</wd-collapse-item>
  <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
</wd-collapse>
```

## 异步更新

通过给`wd-collapse-item`组件传入 `beforeExpend` 函数可以在打开面板前进行校验和处理，返回 true 表示允许打开，返回 false 表示禁止打开。支持返回 Promise 进行例如调用接口获取面板数据的操作。

```html
<wd-collapse v-model="value">
  <wd-collapse-item
    v-for="(item, index) in itemList"
    :before-expend="beforeExpend"
    :key="index"
    :title="item.title"
    :name="item.name"
  >
    {{ item.body }}
  </wd-collapse-item>
</wd-collapse>
```

```ts

import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()
const value = ref<string[]>(['item1'])

const itemList = ref<Record<string, any>[]>([
  {
    title: '标签1',
    name: 'item1',
    body: '如订单处于暂停状态，进入“我的订单”页面，找到要取消的订单，点击“取消订单”按钮；选择订单取消原因后，点击“下一步”提交申请即可。'
  },
  {
    title: '标签1',
    name: 'item2',
    body: '一般情况下，买家只能向商户申请退款，商户确认可以退款后，可以通过接口或者商户平台向微信支付发起退款申请。'
  },
  {
    title: '标签1',
    name: 'item3',
    body: '将收到的有质量问题的商品照片或者订单截图上传到微信公众账号（微信关注联华华商公众号），我们的工作人员会尽快帮您处理。'
  },
  {
    title: '标签1',
    name: 'item4',
    body: '七天无理由退换货制度，所有商品在不影响二次销售的情况下7天内（以快递单签收为准）均接受客户退换货。'
  },
  {
    title: '标签1',
    name: 'item5',
    body: 'Q1:优惠券使用详情？详情页面【我的】-【我的优惠】-【优惠券规则说明】。'
  }
])

/**
 * 折叠面板展开前回调方法
 * @param e
 */
function beforeExpend(name) {
  const index = itemList.value.findIndex((item) => {
    return item.name === name
  })
  if (index > -1) {
    itemList.value[index].body =
      'Q1:七天无理由退换货制度，所有商品在不影响二次销售的情况下7天内（以快递单签收为准）均接受客户退换货。七天无理由退换货制度，所有商品在不影响二次销售的情况下7天内（以快递单签收为准）均接受客户退换货。七天无理由退换货制度，所有商品在不影响二次销售的情况下7天内（以快递单签收为准）均接受客户退换货。七天无理由退换货制度，所有商品在不影响二次销售的情况下7天内（以快递单签收为准）均接受客户退换货。七天无理由退换货制度，所有商品在不影响二次销售的情况下7天内（以快递单签收为准）均接受客户退换货。七天无理由退换货制度，所有商品在不影响二次销售的情况下7天内（以快递单签收为准）均接受客户退换货。'
  }

  return new Promise((reslove, reject) => {
    toast.loading('加载中')
    setTimeout(() => {
      toast.close()
      reslove(true)
    }, 500)
  })
}
```

## 查看更多

Collapse 可以单独使用，通过设置 `viewmore` 属性，将其转化为查看更多的折叠类型，同时可以设置 `line-num` 修改收起时的显示行数。这时候的 `value` 为 boolean 类型。

```html
<wd-collapse viewmore v-model="value">
  这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
</wd-collapse>
```

## 查看更多-使用插槽

Collapse 查看更多的模式下，可以使用插槽定义自己想要的折叠处样式，使用 `use-more-slot` 设置插槽开启。并且可以使用外部样式类 `custom-more-slot-class` 为自定义插槽设置样式。

```scss
:deep(.more-slot) {
  color: red;
}
```

```html
<wd-collapse viewmore v-model="value" @change="handleChange4" use-more-slot custom-more-slot-class="more-slot">
  具名插槽：这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
  <template #more>
    <view>显示全部</view>
  </template>
</wd-collapse>
```

## CollapseItem Attributes

| 参数          | 说明                                                        | 类型     | 可选值 | 默认值 | 最低版本 |
| ------------- | ----------------------------------------------------------- | -------- | ------ | ------ | -------- |
| name          | 折叠栏的标识符                                              | string   | -      | -      | -        |
| title         | 折叠栏的标题, 支持同名 slot 自定义内容                          | string   | -      | ''      | -        |
| disabled      | 禁用折叠栏                                                  | boolean  | -      | false  | -        |
| before-expend | 打开前的回调函数，返回 false 可以阻止打开，支持返回 Promise | Function | -      | false  | -        |

### `before-expend` 执行时会传递以下回调参数：

| 参数名 | 说明       | 类型     |
| ------ | ---------- | -------- |
| name   | 唯一标识符 | `String` |

## Collapse Attributes

| 参数        | 说明                                 | 类型                     | 可选值 | 默认值 | 最低版本 |
| ----------- | ------------------------------------ | ------------------------ | ------ | ------ | -------- |
| value       | 绑定值                               | string / array / boolean | -      | -      | -        |
| accordion   | 手风琴                               | boolean                  | -      | false  | -        |
| viewmore    | 查看更多的折叠面板                   | boolean                  | -      | false  | -        |
| useMoreSlot | 查看更多的自定义插槽使用标志         | boolean                  | -      | false  | -        |
| line-num    | 查看更多的折叠面板，收起时的显示行数 | number                   | -      | 2      | -        |

## Collapse Events

| 事件名称 | 说明             | 参数        | 最低版本 |
| -------- | ---------------- | ----------- | -------- |
| change   | 绑定值变化时触发 | `{ value }` | -        |

## Methods

| 方法名 | 说明 | 参数 | 最低版本 |
| --- | --- | --- | --- |
| toggleAll | 切换所有面板展开状态，传 `true` 为全部展开，`false` 为全部收起，不传参为全部切换 | _options?: boolean \| object_ | 0.2.6 |

## Collapse Slot

| name | 说明                                                 | 最低版本 |
| ---- | ---------------------------------------------------- | -------- |
| title |标题，便于开发者自定义标题（非 viewmore 使用）  | 1.2.27      |
| more | 查看更多，便于开发者自定义查看更多类型的展开收起样式 | -        |

## CollapseItem 外部样式类

| 类名         | 说明                    | 最低版本 |
| ------------ | ----------------------- | -------- |
| custom-class | collapseItem 根节点样式 | -        |

**注意：组件内插槽样式不生效，因此使用插槽时需注意添加外部样式类**

## Collapse 外部样式类

| 类名                   | 说明                               | 最低版本 |
| ---------------------- | ---------------------------------- | -------- |
| custom-class           | collapse 根节点样式                | -        |
| custom-more-slot-class | 查看更多模式下的插槽外部自定义样式 | -        |
