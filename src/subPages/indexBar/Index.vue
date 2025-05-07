<template>
  <page-wraper>
    <wd-search hide-cancel :placeholder="$t('wo-yao-qu-na-li')" v-model="keyword" @search="handleSearch" @clear="handleClear" />
    <view class="wraper">
      <wd-index-bar sticky v-if="showList.length">
        <view v-for="item in showList" :key="item.index">
          <wd-index-anchor :index="item.index" />
          <wd-cell border clickable v-for="city in item.data" :key="city" :title="city" @click="handleClick(item.index, city)"></wd-cell>
        </view>
      </wd-index-bar>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { nextTick, onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { show: showToast } = useToast()
const { t, locale } = useI18n()

watch(
  () => locale.value,
  () => {
    handleSearch()
  }
)

onMounted(() => {
  handleSearch()
})

const keyword = ref('')

const showList = ref<any>([])

const indexList = computed(() => [
  {
    index: 'A',
    data: [t('a-ba'), t('a-la-shan'), t('a-li'), t('an-kang'), t('an-qing'), t('an-shan'), t('an-shun'), t('an-yang'), t('ao-men')]
  },
  {
    index: 'B',
    data: [
      t('bei-jing'),
      t('bai-yin'),
      t('bao-ding'),
      t('bao-ji'),
      t('bao-shan'),
      t('bao-tou'),
      t('ba-zhong'),
      t('bei-hai'),
      t('bang-bu'),
      t('ben-xi'),
      t('bi-jie'),
      t('bin-zhou'),
      t('bai-se'),
      t('bo-zhou')
    ]
  },
  {
    index: 'C',
    data: [
      t('zhong-qing'),
      t('cheng-du'),
      t('chang-sha'),
      t('chang-chun'),
      t('cang-zhou'),
      t('chang-de'),
      t('chang-du'),
      t('chang-zhi'),
      t('chang-zhou'),
      t('chao-hu'),
      t('chao-zhou'),
      t('cheng-de'),
      t('chen-zhou'),
      t('chi-feng'),
      t('chi-zhou'),
      t('chong-zuo'),
      t('chu-xiong'),
      t('chu-zhou'),
      t('zhao-yang')
    ]
  },
  {
    index: 'D',
    data: [
      t('da-lian'),
      t('dong-guan'),
      t('da-li'),
      t('dan-dong'),
      t('da-qing'),
      t('da-tong'),
      t('da-xing-an-ling'),
      t('de-hong'),
      t('de-yang'),
      t('de-zhou'),
      t('ding-xi'),
      t('di-qing'),
      t('dong-ying')
    ]
  },
  {
    index: 'E',
    data: [t('e-er-duo-si'), t('en-shi'), t('e-zhou')]
  },
  {
    index: 'F',
    data: [t('fu-zhou'), t('fang-cheng-gang'), t('fo-shan'), t('fu-shun'), t('fu-zhou-0'), t('fu-xin'), t('fu-yang')]
  },
  {
    index: 'G',
    data: [
      t('guang-zhou'),
      t('gui-lin'),
      t('gui-yang'),
      t('gan-nan'),
      t('gan-zhou'),
      t('gan-zi'),
      t('guang-an'),
      t('guang-yuan'),
      t('gui-gang'),
      t('guo-luo')
    ]
  },
  {
    index: 'H',
    data: [
      t('hang-zhou'),
      t('ha-er-bin'),
      t('he-fei'),
      t('hai-kou'),
      t('hu-he-hao-te'),
      t('hai-bei'),
      t('hai-dong'),
      t('hai-nan'),
      t('hai-xi'),
      t('han-dan'),
      t('han-zhong'),
      t('he-bi'),
      t('he-chi'),
      t('he-gang'),
      t('hei-he'),
      t('heng-shui'),
      t('heng-yang'),
      t('he-yuan'),
      t('he-zhou'),
      t('hong-he'),
      t('huai-an'),
      t('huai-bei'),
      t('huai-hua'),
      t('huai-nan'),
      t('huang-gang'),
      t('huang-nan'),
      t('huang-shan'),
      t('huang-shi'),
      t('hui-zhou'),
      t('hu-lu-dao'),
      t('hu-lun-bei-er'),
      t('hu-zhou'),
      t('he-ze')
    ]
  }
])

function handleClick(index: string, city: string) {
  showToast(t('dang-qian-dian-ji-xiang-index-cheng-shi-city', [index, city]))
}

function handleSearch() {
  showList.value = []
  nextTick(() => {
    if (keyword.value) {
      showList.value = indexList.value.filter((item) => {
        return item.data.some((city) => {
          return city.includes(keyword.value)
        })
      })
    } else {
      showList.value = indexList.value
    }
  })
}

function handleClear() {
  keyword.value = ''
  handleSearch()
}
</script>

<style lang="scss">
.wraper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}
</style>
