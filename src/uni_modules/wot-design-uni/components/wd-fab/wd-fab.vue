<template>
  <view :class="customClass" :style="customStyle"></view>
</template>

<script lang="ts">
export default {
  name: 'wd-fab',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'

interface Props {
  customClass?: string
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: ''
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
