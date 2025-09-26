<template>
  <wd-watermark :image="image" :width="130" :height="140" :image-width="38" content="wot-design-uni" :image-height="38" :opacity="0.5"></wd-watermark>
  <view>
    <page-wraper>
      <demo-block :title="$t('ji-chu-yong-fa-0')">
        <wd-button @click="doSetImage(false)" plain>{{ $t('wen-zi-shui-yin') }}</wd-button>
        <wd-button @click="doSetImage(true)" plain>{{ $t('tu-pian-shui-yin') }}</wd-button>
      </demo-block>

      <demo-block :title="$t('zhan-shi-xiao-guo')">
        <wd-badge custom-class="badge" :modelValue="200" :max="99">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="200" :max="10">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-0') }}</wd-button>
        </wd-badge>
      </demo-block>
      <demo-block :title="$t('ju-bu-shui-yin')">
        <wd-watermark :opacity="0.8" image="https://wot-ui.cn/logo.png" :image-width="38" :image-height="38" :full-screen="false"></wd-watermark>
        <wd-badge custom-class="badge" :modelValue="12">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="3" bg-color="pink">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-0') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="1" type="primary">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="2" type="warning">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-0') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="1" type="success">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="2" type="info">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-0') }}</wd-button>
        </wd-badge>
        <wd-cell-group border>
          <wd-cell size="large" :title="$t('biao-ti-wen-zi-10')" value="内容" />
          <wd-cell :title="$t('biao-ti-wen-zi-10')" value="内容" size="large" icon="setting" is-link />
          <wd-cell size="large" :title="$t('biao-ti-wen-zi-10')" :label="$t('miaoShuXinXi-0')" value="内容" />
          <wd-cell size="large" :title="$t('biao-ti-wen-zi-10')" value="内容" />
          <wd-cell :title="$t('biao-ti-wen-zi-10')" value="内容" size="large" icon="setting" is-link />
          <wd-cell size="large" :title="$t('biao-ti-wen-zi-10')" :label="$t('miaoShuXinXi-0')" value="内容" />
        </wd-cell-group>
      </demo-block>

      <demo-block :title="$t('zhan-shi-xiao-guo-0')">
        <wd-badge custom-class="badge" modelValue="new">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" modelValue="hot">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-0') }}</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block :title="$t('zhan-shi-xiao-guo-1')">
        <wd-badge custom-class="badge" is-dot>{{ $t('shuJuChaXun') }}</wd-badge>
        <wd-badge custom-class="badge" is-dot>
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-0') }}</wd-button>
        </wd-badge>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
const showImage = ref(false) // 是否展示图片

const image = computed(() => {
  return showImage.value ? 'https://wot-ui.cn/logo.png' : ''
})

function doSetImage(show: boolean) {
  showImage.value = show
}
</script>
<style lang="scss" scoped>
:deep(.badge) {
  margin: 0 30px 20px 0;
  display: inline-block;
}
</style>
