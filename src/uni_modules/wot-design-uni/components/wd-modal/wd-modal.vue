<template>
  <wd-transition
    :show="show"
    name="fade"
    custom-class="wd-modal"
    :duration="duration"
    :custom-style="`z-index: ${zIndex}; ${customStyle}`"
    @click="handleClick"
    @touchmove="noop"
  />
</template>
<script lang="ts">
export default {
  name: 'wd-modal',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
interface Props {
  show: boolean
  duration: Record<string, number> | number | boolean
  zIndex: number
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  duration: 300,
  zIndex: 10
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
function noop() {}
</script>

<style lang="scss">
@import './index.scss';
</style>
