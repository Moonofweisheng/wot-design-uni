<template>
  <wd-watermark :image="image" :width="130" :height="140" :image-width="38" content="wot-design-uni" :image-height="38" :opacity="0.5"></wd-watermark>
  <view>
    <page-wraper>
      <demo-block title="基础用法">
        <wd-button @click="doSetImage(false)" plain>文字水印</wd-button>
        <wd-button @click="doSetImage(true)" plain>图片水印</wd-button>
      </demo-block>

      <demo-block title="展示效果">
        <wd-badge custom-class="badge" :modelValue="200" :max="99">
          <wd-button :round="false" type="info" size="small">评论</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="200" :max="10">
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
      </demo-block>
      <demo-block title="局部水印">
        <wd-watermark
          :opacity="0.8"
          image="https://wot-design-uni.cn/logo.png"
          :image-width="38"
          :image-height="38"
          :full-screen="false"
        ></wd-watermark>
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
        <wd-cell-group border>
          <wd-cell size="large" title="标题文字" value="内容" />
          <wd-cell title="标题文字" value="内容" size="large" icon="setting" is-link />
          <wd-cell size="large" title="标题文字" label="描述信息" value="内容" />
          <wd-cell size="large" title="标题文字" value="内容" />
          <wd-cell title="标题文字" value="内容" size="large" icon="setting" is-link />
          <wd-cell size="large" title="标题文字" label="描述信息" value="内容" />
        </wd-cell-group>
      </demo-block>

      <demo-block title="展示效果">
        <wd-badge custom-class="badge" modelValue="new">
          <wd-button :round="false" type="info" size="small">评论</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" modelValue="hot">
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block title="展示效果">
        <wd-badge custom-class="badge" is-dot>数据查询</wd-badge>
        <wd-badge custom-class="badge" is-dot>
          <wd-button :round="false" type="info" size="small">回复</wd-button>
        </wd-badge>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
const showImage = ref(false) // 是否展示图片

const image = computed(() => {
  return showImage.value ? 'https://wot-design-uni.cn/logo.png' : ''
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
