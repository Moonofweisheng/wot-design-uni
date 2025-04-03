<template>
  <page-wraper>
    <view class="wraper">
      <wd-sidebar v-model="active" @change="handleChange">
        <wd-sidebar-item
          v-for="(item, index) in categories"
          :key="index"
          :value="index"
          :label="item.label"
          :icon="item.icon"
          :disabled="item.disabled"
        />
      </wd-sidebar>
      <view class="content" :style="`transform: translateY(-${active * 100}%)`">
        <scroll-view
          v-for="(item, index) in categories"
          :key="index"
          class="category"
          scroll-y
          scroll-with-animation
          :show-scrollbar="false"
          :scroll-top="scrollTop"
          :throttle="false"
        >
          <wd-cell-group :title="item.title" border>
            <wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title" :label="cell.label">
              <wd-icon name="github-filled" size="24px"></wd-icon>
            </wd-cell>
          </wd-cell-group>
        </scroll-view>
      </view>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface CategoryItem {
  title: string
  label: string
}

interface Category {
  label: string
  title: string
  icon: string
  items: CategoryItem[]
  disabled: boolean
}

const { t } = useI18n()
const active = ref<number>(1)
const scrollTop = ref<number>(0)

const subCategories = computed<CategoryItem[]>(() =>
  new Array(24).fill({ title: t('biao-ti-wen-zi-10'), label: t('zhe-shi-miao-shu-zhe-shi-miao-shu') }, 0, 24)
)

const categories = computed<Category[]>(() => [
  {
    label: t('fen-lei-yi'),
    title: t('biao-ti-yi'),
    icon: 'thumb-up',
    items: subCategories.value,
    disabled: false
  },
  {
    label: t('fen-lei-er'),
    title: t('biao-ti-er'),
    icon: 'thumb-up',
    items: subCategories.value,
    disabled: false
  },
  {
    label: t('fen-lei-san'),
    title: t('biao-ti-san'),
    icon: 'thumb-up',
    items: subCategories.value.slice(0, 18),
    disabled: false
  },
  {
    label: t('fen-lei-si'),
    title: t('biao-ti-si'),
    icon: 'thumb-up',
    items: subCategories.value.slice(0, 21),
    disabled: false
  },
  {
    label: t('fen-lei-wu'),
    title: t('biao-ti-wu'),
    icon: 'thumb-up',
    items: subCategories.value,
    disabled: false
  },
  {
    label: t('fen-lei-liu'),
    title: t('biao-ti-liu'),
    icon: 'thumb-up',
    items: subCategories.value.slice(0, 18),
    disabled: false
  },
  {
    label: t('fen-lei-qi'),
    title: t('biao-ti-qi'),
    icon: 'thumb-up',
    items: subCategories.value,
    disabled: true
  }
])

function handleChange({ value }: any) {
  active.value = value
  scrollTop.value = -1
  nextTick(() => {
    scrollTop.value = 0
  })
}
</script>
<style lang="scss" scoped>
.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  overflow: hidden;
}
.content {
  flex: 1;
  background: #fff;
  transition: transform 0.3s ease;
}
.category {
  box-sizing: border-box;
  height: 100%;
}
</style>
