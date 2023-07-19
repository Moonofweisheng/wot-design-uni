<template>
  <div class="changelog">
    <changelog />
  </div>
</template>

<script>
import Changelog from '../docs/changelog.md'

export default {
  components: {
    Changelog
  }
}
</script>

<style lang="scss">
@import '../assets/style/variable';

.changelog {
  em {
    font-size: 15px;
    font-style: initial;
    color: $color-theme;
  }
  h3 {
    position: relative;
    margin: 40px 0 4px;
  }
  p {
    margin: 4px 0;
  }
  .header-anchor {
    display: none;
  }
}
</style>
