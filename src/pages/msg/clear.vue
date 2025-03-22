<template>
  <page-wraper>
    <demo-block>
      <wd-msg type="clear" title="操作错误" desc="内容详情，根据实际需要展示，内容为空则不展示" color="#F74D54">
        <!--自定义内容部分-->
        <view class="mt-5"><wd-button size="medium" type="info" block>辅助操作</wd-button></view>
      </wd-msg>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
</script>
<style lang="scss" scoped>
.mt-5 {
  margin-top: 20px;
}
</style>
