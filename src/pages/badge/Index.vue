<template>
  <view>
    <page-wraper>
      <demo-block title="展示消息数量">
        <wd-badge custom-class="badge" :modelValue="12">
          <wd-button :round="false" type="info" size="small">评论</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="3" bg-color="pink">
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="1" type="primary">
          <wd-button :round="false" type="info" size="small">评论</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="2" type="warning">
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="1" type="success">
          <wd-button :round="false" type="info" size="small">评论</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="2" type="info">
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block title="可定义消息最大值">
        <wd-badge custom-class="badge" :modelValue="200" :max="99">
          <wd-button :round="false" type="info" size="small">评论</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="200" :max="10">
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block title="自定义内容">
        <wd-badge custom-class="badge" modelValue="new">
          <wd-button :round="false" type="info" size="small">评论</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" modelValue="hot">
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block title="点状类型">
        <wd-badge custom-class="badge" is-dot>数据查询</wd-badge>
        <wd-badge custom-class="badge" is-dot>
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
:deep(.badge) {
  margin: 0 30px 20px 0;
  display: inline-block;
}
</style>
