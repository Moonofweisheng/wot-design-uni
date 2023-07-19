<template>
  <div class="page-controller">
    <div v-if="prevPage" class="page-controller__prev">
      <router-link class="page-controller__link" :to="{ name: prevPage.name }">
        <i class="iconfont icon-arrow-left"></i>
        <span>{{ prevPage.title }}</span>
      </router-link>
    </div>
    <div v-if="nextPage" class="page-controller__next">
      <router-link class="page-controller__link" :to="{ name: nextPage.name }">
        <span>{{ nextPage.title }}</span>
        <i class="iconfont icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { prevPage, nextPage } from '../utils/pageCache'

export default {
  computed: {
    prevPage () {
      let parentName = this.$route.meta.parentName
      let routeName = this.$route.name

      return prevPage(parentName, routeName)
    },
    nextPage () {
      let parentName = this.$route.meta.parentName
      let routeName = this.$route.name

      return nextPage(parentName, routeName)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/style/variable';
@import '../assets/style/mixin';

.page-controller {
  margin: 80px 0 50px;
  padding-top: 30px;
  border-top: 2px solid $color-theme-l7;

  @include clearFloat;

  .page-controller__prev {
    float: left;
  }
  .page-controller__next {
    float: right;
  }
  .page-controller__link {
    font-weight: 400;
    color: #666;
    transition: .2s;
  
    &:hover, &:active {
      color: $color-theme-l2;
    }
    span {
      display: inline-block;
      margin: 0 4px;
      vertical-align: middle;
    }
    .iconfont {
      vertical-align: middle;
    }
  }
}
</style>
