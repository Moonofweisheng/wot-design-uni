<template>
  <page-wraper>
    <demo-block :title="t('ji-chu-yong-fa')">
      <wd-puzzle-captcha
        image-url="https://picsum.photos/320/200?t=1"
        :image-width="282"
        :image-height="160"
        @success="onSuccess()"
        @fail="onFail()"
      ></wd-puzzle-captcha>
    </demo-block>

    <demo-block :title="t('geng-xin-bei-jing-tu-pian')">
      <wd-puzzle-captcha
        :image-url="state.image"
        :image-width="282"
        :image-height="160"
        :loading="state.loading"
        refreshable
        @success="onSuccess()"
        @update-image="onUpdateImage()"
      ></wd-puzzle-captcha>
    </demo-block>

    <demo-block :title="t('pin-tu-xing-zhuang')">
      <wd-puzzle-captcha
        image-url="https://picsum.photos/320/200?t=2"
        :image-width="282"
        :image-height="160"
        puzzle-shape="shield"
        @success="onSuccess()"
      ></wd-puzzle-captcha>
    </demo-block>

    <demo-block :title="t('gan-rao-mo-shi')">
      <wd-puzzle-captcha
        image-url="https://picsum.photos/320/200?t=3"
        :image-width="282"
        :image-height="160"
        decoy-mode
        @success="onSuccess()"
      ></wd-puzzle-captcha>
    </demo-block>

    <demo-block :title="t('yan-ge-mo-shi')">
      <wd-puzzle-captcha
        image-url="https://picsum.photos/320/200?t=4"
        :image-width="282"
        :image-height="160"
        strict-mode
        @success="onSuccess()"
      ></wd-puzzle-captcha>
    </demo-block>

    <demo-block :title="t('jin-yong-zhuang-tai')">
      <wd-puzzle-captcha
        image-url="https://picsum.photos/320/200?t=5"
        :image-width="282"
        :image-height="160"
        disabled
        @success="onSuccess()"
      ></wd-puzzle-captcha>
    </demo-block>

    <demo-block :title="t('zhong-zhi-fang-fa')">
      <wd-puzzle-captcha
        ref="captchaEl"
        image-url="https://picsum.photos/320/200?t=6"
        :image-width="282"
        :image-height="160"
        @success="onSuccess()"
      ></wd-puzzle-captcha>

      <wd-button style="margin-top: 20px" type="primary" @click="reset()">{{ $t('zhong-zhi') }}</wd-button>
    </demo-block>

    <demo-block :title="t('tan-chuang-yong-fa')">
      <wd-popup v-model="state.visible" custom-style="border-radius: 32rpx" @after-enter="state.render = true" @after-leave="state.render = false">
        <wd-puzzle-captcha
          v-if="state.render"
          image-url="https://picsum.photos/320/200?t=7"
          :image-width="282"
          :image-height="160"
          closable
          @success="onSuccess()"
          @close="state.visible = false"
        ></wd-puzzle-captcha>
      </wd-popup>

      <wd-button icon="jump" @click="state.visible = true"></wd-button>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import type { PuzzleCaptchaInstance } from '@/uni_modules/wot-design-uni/components/wd-puzzle-captcha/types'

const { t } = useI18n()

const captchaEl = ref<PuzzleCaptchaInstance>()

const state = reactive({
  image: `https://picsum.photos/320/200?t=${Date.now()}`,
  loading: false,
  visible: false,
  render: false
})

function onSuccess() {
  console.log('verify success')
}

function onFail() {
  console.log('verify fail')
}

function onUpdateImage() {
  state.loading = true

  setTimeout(() => {
    state.image = `https://picsum.photos/320/200?t=${Date.now()}`
    state.loading = false
  }, 500)
}

function reset() {
  captchaEl.value?.reset()
}
</script>
