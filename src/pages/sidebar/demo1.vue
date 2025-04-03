<!--
 * @Author: weisheng
 * @Date: 2023-11-05 12:09:52
 * @LastEditTime: 2025-03-31 23:05:54
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/sidebar/demo1.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <view class="wraper">
      <wd-sidebar v-model="active" @change="handleChange">
        <wd-sidebar-item v-for="(item, index) in categories" :key="index" :value="index" :label="item.label" />
      </wd-sidebar>
      <scroll-view class="content" scroll-y scroll-with-animation :scroll-top="scrollTop" :throttle="false" @scroll="onScroll">
        <view v-for="(item, index) in categories" :key="index" class="category">
          <wd-cell-group :title="item.title" border>
            <wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title" :label="cell.label">
              <wd-icon name="github-filled" size="24px"></wd-icon>
            </wd-cell>
          </wd-cell-group>
        </view>
      </scroll-view>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { getRect } from '@/uni_modules/wot-design-uni/components/common/util'
import { useI18n } from 'vue-i18n'

interface CategoryItem {
  title: string
  label: string
}

interface Category {
  label: string
  title: string
  items: CategoryItem[]
}

const { t } = useI18n()
const active = ref<number>(1)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const subCategories = computed<CategoryItem[]>(() =>
  new Array(24).fill({ title: t('biao-ti-wen-zi-10'), label: t('zhe-shi-miao-shu-zhe-shi-miao-shu') }, 0, 24)
)

const categories = computed<Category[]>(() => [
  {
    label: t('fen-lei-yi'),
    title: t('biao-ti-yi'),
    items: subCategories.value
  },
  {
    label: t('fen-lei-er'),
    title: t('biao-ti-er'),
    items: subCategories.value
  },
  {
    label: t('fen-lei-san'),
    title: t('biao-ti-san'),
    items: subCategories.value.slice(0, 18)
  },
  {
    label: t('fen-lei-si'),
    title: t('biao-ti-si'),
    items: subCategories.value.slice(0, 21)
  },
  {
    label: t('fen-lei-wu'),
    title: t('biao-ti-wu'),
    items: subCategories.value
  },
  {
    label: t('fen-lei-liu'),
    title: t('biao-ti-liu'),
    items: subCategories.value.slice(0, 18)
  },
  {
    label: t('fen-lei-qi'),
    title: t('biao-ti-qi'),
    items: subCategories.value
  }
])

onMounted(() => {
  getRect('.category', true).then((rects) => {
    itemScrollTop.value = rects.map((item) => item.top || 0)
    scrollTop.value = rects[active.value].top || 0
  })
})

function handleChange({ value }: any) {
  active.value = value
  scrollTop.value = itemScrollTop.value[value]
}
function onScroll(e: any) {
  const { scrollTop } = e.detail
  const threshold = 50 // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0
    return
  }
  const index = itemScrollTop.value.findIndex((top) => top > scrollTop && top - scrollTop <= threshold)
  if (index > -1) {
    active.value = index
  }
}
</script>
<style lang="scss" scoped>
.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}

.content {
  flex: 1;
  background: #fff;
}
</style>
