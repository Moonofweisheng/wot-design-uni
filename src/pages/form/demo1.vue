<template>
  <page-wraper>
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
          :label="$t('wai-bi-ba-bu-ming')"
          label-width="100px"
          prop="name"
          clearable
          v-model="model.name"
          :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
          :rules="[{ required: true, message: $t('qing-shu-ru-wai-bi-ba-bu') }]"
        />
        <wd-input
          v-for="(item, index) in model.phoneNumbers"
          :key="item.key"
          :label="$t('ma-ka-ba-ka-dan-hao-index') + index"
          :prop="'phoneNumbers.' + index + '.value'"
          label-width="100px"
          clearable
          v-model="item.value"
          :placeholder="$t('ma-ka-ba-ka-dan-hao')"
          :rules="[{ required: true, message: $t('ma-ka-ba-ka-dan-hao') + index }]"
        />

        <wd-cell title-width="0px">
          <view class="footer">
            <wd-button size="small" type="info" plain @click="addPhone">{{ $t('tian-jia') }}</wd-button>
            <wd-button size="small" type="info" plain @click="removePhone">{{ $t('shan-chu') }}</wd-button>
            <wd-button size="small" type="info" plain @click="reset">{{ $t('zhong-zhi') }}</wd-button>
            <wd-button type="primary" size="small" @click="submit">{{ $t('ti-jiao') }}</wd-button>
          </view>
        </wd-cell>
      </wd-cell-group>
    </wd-form>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { FormInstance } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface PhoneItem {
  key: number
  value: string
}

const model = reactive<{
  name: string
  phoneNumbers: PhoneItem[]
}>({
  name: '',
  phoneNumbers: [
    {
      key: Date.now(),
      value: ''
    }
  ]
})

const { success: showSuccess } = useToast()
const form = ref<FormInstance>()

const removePhone = () => {
  model.phoneNumbers.splice(model.phoneNumbers.length - 1, 1)
}

const addPhone = () => {
  model.phoneNumbers.push({
    key: Date.now(),
    value: ''
  })
}

const reset = () => {
  form.value!.reset()
}

const submit = () => {
  form.value!.validate().then(({ valid, errors }) => {
    if (valid) {
      showSuccess(t('xiao-yan-tong-guo'))
    }
  })
}
</script>
<style lang="scss" scoped>
.footer {
  text-align: left;
  :deep(.wd-button) {
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}
</style>
