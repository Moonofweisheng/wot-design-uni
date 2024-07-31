<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-text :text="text"></wd-text>
    </demo-block>

    <demo-block title="设置主题">
      <view style="display: flex">
        <wd-text type="primary" text="主色"></wd-text>
        <wd-text type="error" text="错误"></wd-text>
        <wd-text type="success" text="成功"></wd-text>
        <wd-text type="warning" text="警告"></wd-text>
        <wd-text text="默认"></wd-text>
      </view>
    </demo-block>

    <demo-block title="自定义字体颜色">
      <wd-text :text="text" color="#36B8C2"></wd-text>
    </demo-block>

    <demo-block title="是否粗体">
      <wd-text :text="text" bold></wd-text>
    </demo-block>

    <demo-block title="字体大小">
      <wd-text :text="text" size="16px"></wd-text>
    </demo-block>

    <demo-block title="脱敏">
      <view style="display: flex; align-items: center">
        <wd-text text="张长三" mode="name" :format="true"></wd-text>
        <wd-text text="18888888888" mode="phone" :format="true"></wd-text>
      </view>
    </demo-block>

    <demo-block title="lines">
      <view>
        <wd-text :text="text" :lines="2" size="16px"></wd-text>
      </view>
    </demo-block>

    <demo-block title="lineHeight">
      <wd-text :text="text" :lines="2" lineHeight="20px"></wd-text>
    </demo-block>

    <demo-block title="mode">
      <view>
        <view><wd-text text="18888888888" mode="phone"></wd-text></view>
        <view><wd-text text="王三" mode="name"></wd-text></view>
        <view><wd-text text="1719976636911" mode="date"></wd-text></view>
      </view>
    </demo-block>

    <demo-block title="前后插槽">
      <view>
        <wd-text text="12345678901" mode="phone" format type="primary" prefix="Prefix" suffix="Suffix" />
        <br />
        <wd-text text="12345678901" mode="phone" format type="primary">
          <template #prefix>
            <text>Prefix</text>
          </template>
          <template #suffix>Suffix</template>
        </wd-text>
      </view>
    </demo-block>

    <demo-block title="金额">
      <view>
        <wd-text text="16354.156" mode="price" type="success" decoration="line-through" prefix="￥" />
      </view>
    </demo-block>

    <demo-block title="文字装饰">
      <view>
        <wd-text :text="text" type="warning" decoration="underline" />
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const text = ref<string>(
  '芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。'
)
function clickTest() {
  console.log(1)
}
</script>
<style lang="scss" scoped></style>
