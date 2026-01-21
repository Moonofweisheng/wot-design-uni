<template>
  <page-wraper>
    <demo-block :title="t('ji-chu-yong-fa')">
      <wd-puzzle-captcha
        puzzle-shape="puzzle"
        decoy-mode
        strict-mode
        :image-url="state.image"
        :loading="state.loading"
        @success="onSuccess()"
        @fail="onFail()"
        @update-image="onUpdateImage()"
      ></wd-puzzle-captcha>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'

const { t } = useI18n()

const state = reactive({
  image: `https://picsum.photos/320/200?t=${Date.now()}`,
  loading: false
})

function onSuccess() {
  console.log('验证成功')
}

function onFail() {
  console.log('验证失败')
}

function onUpdateImage() {
  state.loading = true

  setTimeout(() => {
    state.image = `https://picsum.photos/320/200?t=${Date.now()}`
    state.loading = false
  }, 500)
}
</script>

<style lang="scss" scoped></style>
