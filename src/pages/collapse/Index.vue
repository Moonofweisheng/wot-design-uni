<template>
  <page-wraper>
    <wd-toast></wd-toast>
    <demo-block title="基础用法" transparent>
      <wd-button @click="collapse?.toggleAll()">toggleAll</wd-button>

      <wd-collapse ref="collapse" v-model="value1" @change="handleChange1">
        <wd-collapse-item
          v-for="(item, index) in itemList"
          :before-expend="index === 2 ? beforeExpend : undefined"
          :key="index"
          :title="item.title"
          :name="item.name"
        >
          {{ item.body }}
        </wd-collapse-item>
      </wd-collapse>
    </demo-block>

    <demo-block title="自定义title" transparent>
      <wd-collapse v-model="value7">
        <wd-collapse-item name="item1">
          <template #title="{ expanded }">
            <text style="color: red">通过 slot 自定义标题</text>
            <text>{{ expanded ? '我展开了' : '我已收起' }}</text>
          </template>
          {{ desc7 }}
        </wd-collapse-item>
        <wd-collapse-item name="item2" disabled>
          <template #title="{ expanded, disabled }">
            <text v-if="disabled">被禁用</text>
            <text style="color: red" v-else>通过 slot 自定义 title</text>
            <text>{{ expanded ? '我展开了' : '我已收起' }}</text>
          </template>
          {{ desc7 }}
        </wd-collapse-item>
      </wd-collapse>
    </demo-block>

    <demo-block title="手风琴" transparent>
      <wd-collapse v-model="value2" :accordion="accordion" @change="handleChange2">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">
          这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="禁用" transparent>
      <wd-collapse v-model="value3" @change="handleChange3">
        <wd-collapse-item title="标签1" name="item1">
          这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2" disabled>这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多" transparent>
      <wd-collapse viewmore v-model="value4" @change="handleChange4">
        这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多-行数显示设置" transparent>
      <wd-collapse viewmore v-model="value5" @change="handleChange5" :line-num="3">
        行数显示设置：这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多-具名插槽" transparent>
      <wd-collapse viewmore v-model="value6" @change="handleChange6" use-more-slot custom-more-slot-class="more-slot">
        具名插槽：这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
        <template #more>
          <view>显示全部</view>
        </template>
      </wd-collapse>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { CollapseInstance } from '@/uni_modules/wot-design-uni/components/wd-collapse/types'
import { ref } from 'vue'

const toast = useToast()
const itemList = ref<Record<string, any>[]>([
  {
    title: '标签1',
    name: 'item1',
    body: '如订单处于暂停状态，进入“我的订单”页面，找到要取消的订单，点击“取消订单”按钮；选择订单取消原因后，点击“下一步”提交申请即可。'
  },
  {
    title: '标签2',
    name: 'item2',
    body: '一般情况下，买家只能向商户申请退款，商户确认可以退款后，可以通过接口或者商户平台向微信支付发起退款申请。'
  },
  {
    title: '标签3',
    name: 'item3',
    body: '将收到的有质量问题的商品照片或者订单截图上传到微信公众账号（微信关注联华华商公众号），我们的工作人员会尽快帮您处理。'
  },
  {
    title: '标签4',
    name: 'item4',
    body: '七天无理由退换货制度，所有商品在不影响二次销售的情况下7天内（以快递单签收为准）均接受客户退换货。'
  },
  {
    title: '标签5',
    name: 'item5',
    body: 'Q1:优惠券使用详情？详情页面【我的】-【我的优惠】-【优惠券规则说明】。'
  }
])

const collapse = ref<CollapseInstance>()

const value1 = ref<string[]>(['item1'])
const value2 = ref<string>('item1')
const value3 = ref<string[]>(['item1'])
const value4 = ref<boolean>(false)
const value5 = ref<boolean>(false)
const value6 = ref<boolean>(false)
const value7 = ref<string[]>(['item1'])
const desc7 = '如订单处于暂停状态，进入“我的订单”页面，找到要取消的订单，点击“取消订单”按钮；选择订单取消原因后，点击“下一步”提交申请即可。'
const accordion = ref<boolean>(true)
const name = ref<string>('item1')

function handleChange1({ value }: any) {
  console.log(value)
}
function handleChange2({ value }: any) {
  console.log(value)
}
function handleChange3({ value }: any) {
  console.log(value)
}
function handleChange4({ value }: any) {
  console.log(value)
}
function handleChange5({ value }: any) {
  console.log(value)
}
function handleChange6({ value }: any) {
  console.log(value)
}

/**
 * 折叠面板展开前回调方法
 * @param e
 */
function beforeExpend(name: string) {
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
</script>
<style lang="scss" scoped>
:deep(.more-slot) {
  color: red;
}
</style>
