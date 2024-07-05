<template>
  <page-wraper>
    <template :key="item.value" v-for="item in themeList">
      <demo-block :title="item.title">
        <wd-skeleton :theme="item.value" />
      </demo-block>
    </template>
    <demo-block title="宫格骨架屏">
      <wd-skeleton :row-col="grid" />
    </demo-block>
    <demo-block title="单元格骨架屏">
      <view style="display: flex">
        <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
        <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
      </view>
      <view style="display: flex; margin-top: 20px">
        <wd-skeleton :row-col="[{ size: '48px', type: 'rect' }]" />
        <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" />
      </view>
    </demo-block>
    <demo-block title="图片组合骨架屏">
      <wd-skeleton :row-col="imageGroup" />
      <wd-skeleton :custom-style="{ marginTop: '20px' }" :row-col="imageGroup" />
    </demo-block>
    <demo-block title="渐变加载动画">
      <wd-skeleton animation="gradient" theme="paragraph" />
    </demo-block>
    <demo-block title="闪烁加载动画">
      <view style="display: flex">
        <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
        <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" animation="flashed" theme="paragraph" />
      </view>
    </demo-block>
    <demo-block title="插槽内容">
      <view style="margin-bottom: 10px">切换显示</view>
      <wd-switch v-model="showContent" />
      <view style="height: 20px"></view>
      <wd-skeleton :row-col="grid" :loading="showContent">
        <wd-grid>
          <wd-grid-item icon-size="32px" icon="picture" text="文字" />
          <wd-grid-item icon-size="32px" icon="picture" text="文字" />
          <wd-grid-item icon-size="32px" icon="picture" text="文字" />
          <wd-grid-item icon-size="32px" icon="picture" text="文字" />
          <wd-grid-item icon-size="32px" icon="picture" text="文字" />
        </wd-grid>
      </wd-skeleton>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { SkeletonRowCol, SkeletonProps } from '../../uni_modules/wot-design-uni/components/wd-skeleton/types'

const themeList = [
  { title: '头像骨架屏', value: 'avatar' },
  { title: '图片骨架屏', value: 'image' },
  { title: '文本骨架屏', value: 'text' },
  { title: '段落骨架屏', value: 'paragraph' }
] as Array<{ title: string; value: SkeletonProps['theme'] }>
const grid = [
  [
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' }
  ],
  [
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' }
  ]
] as SkeletonRowCol[]
const imageGroup = [{ height: '171px' }, 1, { width: '107px' }, [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]] as SkeletonRowCol[]

const showContent = ref(true)
</script>
