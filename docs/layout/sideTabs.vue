<template>
  <div>
    <side-bar parentKey="components"></side-bar>
    <div class="tab-content">
      <div class="content-flex" ref="demoBlock">
        <div class="wd-markdown">
          <router-view></router-view>
          <page-controller></page-controller>
        </div>
        <div class="demo-preview" ref="phone">
          <div class="demo-iframe" v-show="$route.meta.demo">
            <div class="iframe-wrapper">
              <div class="input-wrapper">
                <input readonly v-model="demoLink" class="phone-link" />
              </div>
              <div class="wrapper">
                <iframe frameborder="0" :src="demoLink" ref="iframe"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './sidebar'
import PageController from './pageController'

export default {
  data () {
    return {
      bodyContent: null
    }
  },
  components: {
    SideBar,
    PageController
  },
  computed: {
    demoLink () {
      return `https://ftf.jd.com/wot-design/demo.html#${this.$route.meta.demo}`
    }
  },
  methods: {
    renderAnchorHref () {
      const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
      const basePath = location.href.split('#').splice(0, 2).join('#')

      Array.prototype.slice.call(anchors).forEach(a => {
        const href = a.getAttribute('href')
        a.href = href.indexOf(basePath) > -1 ? href : (basePath + href)
      })
    },
    goAnchor () {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g)
        if (!anchor) return
        const elm = document.querySelector(anchor[0])
        if (!elm) return

        setTimeout(() => {
          this.bodyContent.scrollTop = elm.offsetTop
        }, 50)
      }
    }
  },
  mounted () {
    this.bodyContent = document.querySelector('.body-content')
    this.renderAnchorHref()
    this.goAnchor()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    const toPath = to.path
    const fromPath = from.path
    if (toPath !== fromPath) {
      this.bodyContent.scrollTop = 0
    }
    setTimeout(() => {
      if (toPath === fromPath && to.hash) {
        this.goAnchor()
      }

      if (toPath !== fromPath) {
        this.renderAnchorHref()
      }
    }, 100)
  }
}
</script>

<style lang="scss">
.tab-content {
  margin: 0 530px 100px 375px;

  .content-flex {
    position: relative;
  }
  .wd-markdown {
    padding-top: 10px;
    margin-top: 10px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      position: relative;

      &:hover {
        .header-anchor {
          opacity: 0.4;
        }
      }
    }
    .header-anchor {
      float: left;
      margin-left: -15px;
      opacity: 0;
    }
  }
  .markdown-content {
    min-height: 600px;
  }
  .phone-header {
    padding: 10px 10px 12px 10px;
    background: #545456;
  }
  .phone-title {
    width: 100%;
  }

  .input-wrapper {
    position: absolute;
    top: 69px;
    width: 370px;
    height: 46px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: #fafafa;

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
  .phone-link {
    padding: 10px;
    border-radius: 10px;
    background: rgba(142, 142, 147, 0.12);
    border: none;
    width: 355px;
    outline: none;
    height: 36px;
    box-sizing: border-box;
    color: #030303;
    text-align: center;
  }

  .demo-iframe {
    position: fixed;
    top: 50%;
    right: 80px;
    transform: translateY(-50%);
    width: 425px;
    height: 820px;
    margin-top: 30px;
    font-size: 0;

    .iframe-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-image: url('../assets/img/phone-case.png');
      background-size: 100% 100%;
    }
    iframe {
      height: 100%;
      width: 100%;
    }
    .wrapper {
      position: relative;
      width: 368px;
      height: 676px;
      margin-top: 115px;
      overflow: hidden;
      box-sizing: border-box;
      border-radius: 0 0 22px 22px;
      border: 1px solid #fafafa;
    }
  }
}
@media (max-width: 1536px) and (max-height: 750px) {
  .tab-content {
    margin-left: 275px;
    margin-right: 460px;
    margin-bottom: 0;

    .demo-iframe {
      right: 80px;
      width: 360px;
      height: 651px;
      margin-top: 20px;
      .wrapper {
        width: 313px;
        height: 517px;
      }
    }
    .phone-link {
      width: 290px;
    }
    .input-wrapper {
      width: 313px;
    }
  }
}
@media (max-width: 1366px) and (max-height: 670px) {
  .tab-content {
    margin-left: 275px;
    margin-right: 420px;
    height: 610px;
    margin-bottom: 0;

    .demo-iframe {
      right: 80px;
      width: 320px;
      margin-top: 20px;
      .wrapper {
        margin-top: 101px;
        width: 280px;
        height: 527px;
      }
    }
    .phone-link {
      width: 260px;
    }
    .input-wrapper {
      width: 280px;
      top: 55px;
    }
  }
}
@media (max-width: 1000px) {
  .tab-content {
    margin-left: 275px;
    margin-right: 30px;

    .demo-iframe {
      display: none;
    }
  }
}
@media (max-width: 773px) {
  .tab-content {
    margin: 0 15px 10px;
  }
  .side-bar {
    position: static;
    margin: 60px 15px 10px;
    padding-bottom: 0;
  }
  .wot-search-input {
    display: none;
  }
}
</style>
