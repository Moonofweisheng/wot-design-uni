<!--
 * @Author: weisheng
 * @Date: 2025-03-31 11:23:58
 * @LastEditTime: 2025-04-02 20:11:32
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/divider/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')" transparent>
      <wd-divider></wd-divider>
    </demo-block>

    <demo-block :title="$t('zhan-shi-wen-ben')" transparent>
      <wd-divider>{{ $t('zhan-shi-wen-ben-0') }}</wd-divider>
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-xuan-ran-nei-rong')" transparent>
      <wd-divider>
        <wd-icon name="arrow-down" size="20" />
      </wd-divider>
    </demo-block>

    <demo-block :title="$t('nei-rong-wei-zhi')" transparent>
      <wd-divider>{{ $t('zhong-jian') }}</wd-divider>
      <wd-divider content-position="left">{{ $t('zuo-ce') }}</wd-divider>
      <wd-divider content-position="right">{{ $t('you-ce') }}</wd-divider>
    </demo-block>

    <demo-block :title="$t('xu-xian')" transparent>
      <wd-divider dashed>{{ $t('xu-xian-fen-ge') }}</wd-divider>
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-yan-se')" transparent>
      <wd-divider color="#4D80F0">{{ $t('zi-ding-yi-yan-se-0') }}</wd-divider>
    </demo-block>

    <demo-block :title="$t('chui-zhi-fen-ge-xian')" transparent>
      <view class="content">
        {{ $t('wen-ben') }}
        <wd-divider vertical />
        {{ $t('wen-ben') }}
        <wd-divider vertical dashed />
        {{ $t('wen-ben') }}
        <wd-divider vertical :hairline="false" />
        {{ $t('wen-ben') }}
        <wd-divider vertical color="#1989fa" />
        {{ $t('wen-ben') }}
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.content {
  padding: 12rpx 15px;
}
</style>
