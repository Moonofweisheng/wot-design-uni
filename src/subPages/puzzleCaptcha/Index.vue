<template>
  <page-wraper>
    <demo-block :title="t('ji-chu-yong-fa')">
      <wd-puzzle-captcha
        puzzle-shape="puzzle"
        decoy-mode
        strict-mode
        :image-url="state.image"
        :loading="state.loading"
        refreshable
        @success="onSuccess()"
        @fail="onFail()"
        @update-image="onUpdateImage()"
      ></wd-puzzle-captcha>

      <wd-popup v-model="state.visible" custom-style="border-radius: 32rpx">
        <wd-puzzle-captcha image-url="https://picsum.photos/320/200" closable @close="state.visible = false"></wd-puzzle-captcha>
      </wd-popup>

      <wd-button icon="jump" @click="state.visible = true"></wd-button>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'

const { t } = useI18n()

const state = reactive({
  visible: false,
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
