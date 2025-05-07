<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-steps :active="0">
        <wd-step></wd-step>
        <wd-step></wd-step>
        <wd-step></wd-step>
      </wd-steps>
    </demo-block>
    <demo-block :title="$t('shui-ping-ju-zhong')">
      <wd-steps :active="0" align-center>
        <wd-step></wd-step>
        <wd-step></wd-step>
        <wd-step></wd-step>
      </wd-steps>
    </demo-block>
    <demo-block :title="$t('biao-ti-he-miao-shu-xin-xi')">
      <wd-steps :active="active" align-center>
        <wd-step :title="$t('bu-zhou-1')" :description="$t('zhu-ce-1-ge-zhang-hao')" />
        <wd-step :title="$t('bu-zhou-2')" :description="$t('deng-lu-zhang-hao-bin-ding-shou-ji')" />
        <wd-step :title="$t('bu-zhou-3')" :description="$t('wan-shan-ge-ren-xin-xi')" />
      </wd-steps>
      <view style="margin-top: 15px; text-align: center">
        <wd-button size="small" @click="nextStep">{{ $t('xia-yi-bu') }}</wd-button>
      </view>
    </demo-block>
    <demo-block :title="$t('xiu-gai-tu-biao')">
      <wd-steps :active="1" align-center>
        <wd-step icon="setting" />
        <wd-step icon="list" />
        <wd-step icon="clock" />
      </wd-steps>
    </demo-block>
    <demo-block :title="$t('shu-xiang-bu-zhou-tiao')">
      <wd-steps :active="1" vertical>
        <wd-step :description="$t('zhu-ce-1-ge-zhang-hao')" />
        <wd-step :description="$t('deng-lu-zhang-hao-bing-bang-ding-shou-ji-hou-mian-shi-bi-ji-chang-wen-an')" />
        <wd-step :description="$t('wan-shan-ge-ren-xin-xi')" />
      </wd-steps>
    </demo-block>
    <demo-block :title="$t('dian-zhuang-bu-zhou-he-chui-zhi-fang-xiang')">
      <wd-steps :active="1" vertical dot>
        <wd-step :description="$t('zhu-ce-1-ge-zhang-hao')" />
        <wd-step :description="$t('deng-lu-zhang-hao-bin-ding-shou-ji')" />
        <wd-step :description="$t('wan-shan-ge-ren-xin-xi')" />
      </wd-steps>
    </demo-block>
    <demo-block :title="$t('xiu-gai-zhuang-tai')">
      <wd-steps :active="1" align-center>
        <wd-step :title="$t('bang-ding-shou-ji')" status="error" />
        <wd-step :title="$t('zhong-xin-bang-ding-shou-ji')" />
        <wd-step :title="$t('bu-zhou-3-0')" />
      </wd-steps>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const active = ref<number>(0)

function nextStep() {
  active.value = active.value + 1
}
</script>
<style lang="scss" scoped></style>
