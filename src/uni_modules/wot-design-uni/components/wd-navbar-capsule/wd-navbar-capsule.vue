<template>
  <view class="wd-navbar-capsule">
    <wd-icon size="20" name="chevron-left" custom-class="wd-navbar-capsule__icon" />
    <wd-icon size="20" name="home" custom-class="wd-navbar-capsule__icon" />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-navbar-capsule',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
interface Props {
  customClass?: string
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['click-left', 'click-right'])
</script>

<style lang="scss">
@import './index.scss';
</style>
