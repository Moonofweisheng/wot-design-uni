<template>
  <page-wraper>
    <demo-block title="搜索无结果">
      <wd-status-tip image="search" tip="当前搜索无结果" />
    </demo-block>

    <demo-block title="404页面">
      <wd-status-tip image="network" tip="当前网络不可用，请检查你的网络设置" />
    </demo-block>

    <demo-block title="页面暂无内容">
      <wd-status-tip image="content" tip="暂无内容" />
    </demo-block>

    <demo-block title="我的收藏为空">
      <wd-status-tip image="collect" tip="暂无收藏" />
    </demo-block>

    <demo-block title="我的评论为空">
      <wd-status-tip image="comment" tip="暂无评论" />
    </demo-block>

    <demo-block title="支付失败">
      <wd-status-tip image="halo" tip="支付失败，请重新订购" />
    </demo-block>

    <demo-block title="已订阅全部消息">
      <wd-status-tip image="message" tip="已订阅全部消息" />
    </demo-block>

    <demo-block title="自定义大小">
      <wd-status-tip
        :image-size="{
          height: 200,
          width: 300
        }"
        image="search"
        tip="当前搜索无结果"
      />
    </demo-block>

    <demo-block title="自定义图片">
      <wd-status-tip image="https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg" tip="查看我的头像" />
    </demo-block>

    <demo-block title="插槽自定义图片内容">
      <wd-status-tip tip="插槽自定义图片内容">
        <template #image>
          <wd-icon name="ie-filled" size="100px"></wd-icon>
        </template>
      </wd-status-tip>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
