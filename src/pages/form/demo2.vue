<template>
  <page-wraper>
    <wd-form ref="form" :model="model" :reset-on-change="false">
      <wd-cell-group border>
        <wd-input
          label="用户名"
          label-width="100px"
          prop="name"
          clearable
          v-model="model.name"
          placeholder="请输入用户名"
          @blur="handleBlur('name')"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-input
          label="玛卡巴卡单号"
          prop="phoneNumber"
          label-width="100px"
          clearable
          @blur="handleBlur('phoneNumber')"
          v-model="model.phoneNumber"
          placeholder="玛卡巴卡单号"
          :rules="[{ required: true, message: '请填写玛卡巴卡单号' }]"
        />
      </wd-cell-group>
    </wd-form>

    <view class="footer">
      <wd-button type="primary" size="large" block @click="handleSubmit">提交</wd-button>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { FormInstance } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { reactive, ref } from 'vue'

const model = reactive<{
  name: string
  phoneNumber: string
}>({
  name: '',
  phoneNumber: ''
})

const { success: showSuccess } = useToast()
const form = ref<FormInstance>()

function handleBlur(prop: string) {
  form.value!.validate(prop)
}

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid }) => {
      if (valid) {
        showSuccess('校验通过')
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
<style lang="scss" scoped>
.footer {
  padding: 12px;
}
</style>
