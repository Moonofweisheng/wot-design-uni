<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-autocomplete v-model="keyword1" :fetch-suggestions="list" clearable></wd-autocomplete>
    </demo-block>
    <demo-block :title="$t('jin-yong-zhuang-tai')">
      <wd-autocomplete v-model="keyword2" :fetch-suggestions="list2"></wd-autocomplete>
    </demo-block>
    <demo-block :title="$t('yuan-cheng-sou-suo')">
      <wd-autocomplete v-model="keyword3" :fetch-suggestions="fetchSuggestions"></wd-autocomplete>
    </demo-block>
    <demo-block :title="$t('zi-ding-yi-cha-cao')">
      <wd-autocomplete v-model="keyword4" :fetch-suggestions="list">
        <template #menuItem="{ item }">
          <view class="custom-menu-item">自定义{{ item }}</view>
        </template>
      </wd-autocomplete>
    </demo-block>
    <demo-block :title="$t('nei-rong-wei-zhi')">
      <wd-autocomplete v-model="keyword5" :fetch-suggestions="list" position="top"></wd-autocomplete>
    </demo-block>
    <demo-block :title="$t('bao-chi-xian-shi')">
      <wd-autocomplete v-model="keyword6" :fetch-suggestions="list" always-visible></wd-autocomplete>
    </demo-block>
    <view style="height: 400px"></view>
  </page-wraper>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import wdAutocomplete from '@/uni_modules/wot-design-uni/components/wd-autocomplete/wd-autocomplete.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const keyword1 = ref('')
const list = ref([
  {
    value: t('xuanXiang_1-0')
  },
  {
    value: t('xuanXiang_2-0')
  },
  {
    value: t('xuanXiang_3-0')
  }
])
const list2 = ref<any[]>(JSON.parse(JSON.stringify(list.value)))
onMounted(() => {
  list2.value[1].disabled = true
})
const keyword2 = ref('')

const keyword3 = ref('')
const fetchSuggestions = (): Promise<typeof list.value> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list.value.filter((v) => v.value.includes(keyword3.value)))
    }, 200)
  })
}

const keyword4 = ref('')

const keyword5 = ref('')

const keyword6 = ref('')
</script>

<style scoped lang="scss"></style>
