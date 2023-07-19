<template>
  <a v-show="showTop" class="scroll-top" @click="gotoTop" ref="scrollTop">
    <i class="iconfont icon-top"></i>
  </a>
</template>

<script>
export default {
  data () {
    return {
      showTop: false,
      bodyContent: null
    }
  },
  methods: {
    gotoTop () {
     this.bodyContent.scrollTop = 0
    },
    scrollTopListener (e) {
      this.showTop = this.bodyContent.scrollTop > 100
    }
  },
  mounted () {
    this.bodyContent = document.querySelector('.body-content')
    this.bodyContent.addEventListener('scroll', this.scrollTopListener)
  },
  destroyed () {
    this.bodyContent.removeEventListener('scroll', this.scrollTopListener)
  }
}
</script>

<style lang="scss">
@import "../assets/style/variable.scss";

.scroll-top {
  position: fixed;
  display: inline-block;
  right: 20px;
  bottom: 100px;
  display: inline-block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0 0 10px #dfdfdf;
  text-align: center;
  line-height: 44px;
  cursor: pointer;

  &:hover {
    .iconfont {
      color: $color-theme-l3;
    }
  }
  .iconfont {
    font-size: 24px;
    color: #7f7f7f;
  }
}

@media (max-height: 750px) {
  .scroll-top {
    bottom: 40px;
  }
}
@media (max-width: 773px) {
  .scroll-top {
    display: none;
  }
}
</style>
