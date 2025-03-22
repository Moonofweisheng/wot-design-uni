<template>
  <page-wraper>
    <demo-block>
      <wd-msg type="success" title="操作成功" desc="内容详情，根据实际需要进行展示，内容为空则不展示展示" color="#07c160">
        <!--自定义内容部分-->
        <view class="mt-5"><wd-button size="medium" block @click="showToast">主要操作</wd-button></view>
        <view class="mt-5"><wd-button size="medium" type="info" block>辅助操作</wd-button></view>
      </wd-msg>
    </demo-block>
  </page-wraper>
  <wd-toast />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()

function showToast() {
  toast.show('提示信息')
}
</script>
<style lang="scss" scoped>
.mt-5 {
  margin-top: 20px;
}
</style>
