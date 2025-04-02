<template>
  <page-wraper>
    <demo-block :title="$t('ji-ben-yong-fa-shi-yong-yu-an-niu-jia-zai-zhuang-tai-he-ye-mian-qing-ti-shi')">
      <view class="flex">
        <wd-loading custom-class="loading" />
      </view>
    </demo-block>

    <demo-block :title="$t('outline-lei-xing-shi-yong-yu-tong-yong-mo-kuai-jia-zai')">
      <view class="flex">
        <wd-loading type="outline" custom-class="loading" />
      </view>
    </demo-block>

    <demo-block :title="$t('xiu-gai-yan-se')">
      <view class="flex">
        <wd-loading custom-class="loading" color="#fa34aa" />
      </view>
    </demo-block>

    <demo-block :title="$t('xiu-gai-zhi-shi-qi-da-xiao')">
      <view class="flex">
        <wd-loading custom-class="loading" :size="20" />
        <wd-loading custom-class="loading" :size="30" />
        <wd-loading custom-class="loading" size="50px" />
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
:deep(.loading) {
  margin-right: 20px;
}
</style>
