<template>
  <view :class="['wd-loadmore', customClass]" @click="reload">
    <wd-divider v-if="state === 'finished'">{{ finishedText || translate('finished') }}</wd-divider>
    <block v-if="state === 'error'">
      <block v-if="errorText">
        {{ errorText }}
      </block>
      <block v-else>
        <text class="wd-loadmore__text">{{ translate('error') }}</text>
        <text class="wd-loadmore__text is-light">{{ translate('retry') }}</text>
        <wd-icon name="refresh" size="16px" custom-class="wd-loadmore__refresh" />
      </block>
    </block>
    <block v-if="state === 'loading'">
      <wd-loading size="16px" custom-class="wd-loadmore__loading" />
      <text class="wd-loadmore__text">{{ loadingText || translate('loading') }}</text>
    </block>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-loadmore',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTranslate } from '../composables/useTranslate'

type LoadMoreState = 'loading' | 'error' | 'finished'

interface Props {
  customClass?: string
  state?: LoadMoreState
  loadingText?: string
  finishedText?: string
  errorText?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  errorText: ''
})

const { translate } = useTranslate('loadmore')

const currentState = ref<LoadMoreState | null>(null)

const emit = defineEmits(['reload'])

function reload() {
  if (props.state !== 'error') return
  currentState.value = 'loading'
  emit('reload')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
