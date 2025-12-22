<template>
  <wd-toast></wd-toast>

  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')" transparent>
      <wd-cell-group border>
        <wd-cell :title="$t('mo-ren-jian-pan')" is-link @click="showKeyBoard(1)" />
        <wd-cell :title="$t('dai-you-ce-lan-de-jian-pan')" is-link @click="showKeyBoard(2)" />
        <wd-cell :title="$t('shen-fen-zheng-jian-pan')" is-link @click="showKeyBoard(3)" />
        <wd-cell :title="$t('dai-biao-ti-de-jian-pan')" is-link @click="showKeyBoard(4)" />
        <wd-cell :title="$t('slot-zi-ding-yi-biao-ti')" is-link @click="showKeyBoard(9)" />
        <wd-cell :title="$t('duo-geewai-an-jian')" is-link @click="showKeyBoard(5)" />
        <wd-cell :title="$t('sui-ji-shu-zi-jian-pan')" is-link @click="showKeyBoard(6)" />
        <wd-cell :title="$t('che-pai-hao-jian-pan-fei-shou-kong')" :value="value10" is-link @click="showKeyBoard(10)" />
        <wd-cell :title="$t('che-pai-hao-jian-pan-shou-kong')" :value="value11" is-link @click="showKeyBoard(11)" />
        <wd-cell :title="$t('shuang-xiang-bang-ding')" clickable :value="value1" @click="showKeyBoard(7)" />
        <wd-cell :title="$t('zhan-shi-meng-ceng')" clickable @click="showKeyBoard(8)" />
      </wd-cell-group>
    </demo-block>

    <wd-keyboard v-model:visible="visible1" @input="onInput" @delete="onDelete"></wd-keyboard>
    <wd-keyboard
      v-model:visible="visible2"
      mode="custom"
      extra-key="."
      :close-text="$t('wan-cheng')"
      @input="onInput"
      @delete="onDelete"
    ></wd-keyboard>
    <wd-keyboard v-model:visible="visible3" extra-key="X" :close-text="$t('wan-cheng')" @input="onInput" @delete="onDelete" />
    <wd-keyboard
      v-model:visible="visible4"
      :title="$t('shu-ru-mi-ma')"
      extra-key="."
      :close-text="$t('wan-cheng')"
      @input="onInput"
      @delete="onDelete"
    ></wd-keyboard>
    <wd-keyboard v-model:visible="visible9" extra-key="." :close-text="$t('wan-cheng')" @input="onInput" @delete="onDelete">
      <template #title>
        <text style="color: red">{{ $t('zi-ding-yi-biao-ti') }}</text>
      </template>
    </wd-keyboard>

    <wd-keyboard
      v-model:visible="visible5"
      mode="custom"
      :extra-key="['00', '.']"
      :close-text="$t('wan-cheng')"
      @input="onInput"
      @delete="onDelete"
    />

    <wd-keyboard v-model:visible="visible6" random-key-order @input="onInput" @delete="onDelete" />

    <wd-keyboard
      v-model="value1"
      :maxlength="6"
      v-model:visible="visible7"
      :title="$t('jian-pan-biao-ti')"
      extra-key="."
      :close-text="$t('wan-cheng')"
      @input="onInput"
      @delete="onDelete"
    ></wd-keyboard>

    <wd-keyboard :modal="true" v-model:visible="visible8" @input="onInput" @delete="onDelete" />

    <wd-keyboard v-model="value10" v-model:visible="visible10" mode="car" auto-switch-lang @input="onInput" @delete="onDelete" />
    <wd-keyboard v-model="value11" v-model:visible="visible11" v-model:car-lang="carLang" mode="car" @input="onInput" @delete="onDelete" />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { show: showToast } = useToast()
const { t } = useI18n()
const visible1 = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const visible3 = ref<boolean>(false)
const visible4 = ref<boolean>(false)
const visible5 = ref<boolean>(false)
const visible6 = ref<boolean>(false)
const visible7 = ref<boolean>(false)
const visible8 = ref<boolean>(false)
const visible9 = ref<boolean>(false)
const visible10 = ref<boolean>(false)
const visible11 = ref<boolean>(false)

const visibleArr = [visible1, visible2, visible3, visible4, visible5, visible6, visible7, visible8, visible9, visible10, visible11]

const value1 = ref<string>('')
const value10 = ref<string>('')
const value11 = ref<string>('')
const carLang = ref<'zh' | 'en'>('zh')
function showKeyBoard(index: number) {
  visibleArr.forEach((item, i) => (i === index - 1 ? (item.value = true) : (item.value = false)))
}

const onInput = (value: string) => showToast(`${value}`)
const onDelete = () => showToast(t('shan-chu'))
</script>
<style lang="scss" scoped></style>
