<template>
  <header class="header">
    <div class="header-container">
      <router-link :to="{ path: '/' }" class="logo-block">
        <img class="wot-design-logo" src="../assets/img/wot-design.png" alt="wot design mini" />
        <h1 class="wot-design-title">Wot Design Uni</h1>
      </router-link>
      <survey></survey>
      <ul class="header-tab">
        <!-- 搜索 -->
        <li class="header-tab__item">
          <search />
        </li>
        <!-- 组件文档切换 -->
        <li class="header-tab__item" v-for="(page, key) in pages" :key="key">
          <a v-if="page.type === 'link'" :href="page.link" class="header-tab__link" target="_blank">{{ page.title }}</a>
          <router-link v-else class="header-tab__link" active-class="header-tab__link--active" :to="{ name: page.name }">
            {{ page.title }}
          </router-link>
        </li>
        <!-- 版本控制 -->
        <li class="header-tab__item version-control" v-show="isComponentPage">
          <a class="header-tab__link header-tab__with-arrow" @click="showOption">{{ version }}</a>
          <transition name="drop-scale-in">
            <div class="wot-dropdown" v-show="isShowOption">
              <ul class="wot-dropdown-menu">
                <li
                  class="wot-dropdown-item"
                  :class="{ 'is-active': item === version }"
                  v-for="item in formatVersions"
                  :key="item"
                  @click="switchVersion(item)"
                >
                  {{ item }}
                </li>
              </ul>
              <i class="popper__arrow"></i>
            </div>
          </transition>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import routesConfig from '../routes.yml'
import search from './search'
import survey from './survey'
import axios from 'axios'
const { version } = require('../../package.json')

export default {
  components: {
    search,
    survey
  },
  data() {
    return {
      pages: routesConfig,
      versions: [],
      isComponentPage: true,
      isShowOption: false,
      version
    }
  },
  computed: {
    formatVersions() {
      return this.filter(this.versions)
    }
  },
  methods: {
    showOption() {
      this.isShowOption = !this.isShowOption
    },
    getVersions() {
      const requestUrl = process.env.NODE_ENV === 'dev' ? '/static/public/versions.json' : '/wot-design-uni/static/public/versions.json'

      axios.get(requestUrl).then((res) => {
        this.versions = res.data
      })
    },
    filter(versions) {
      const keys = versions
      let result = []
      let preVersionList = []

      keys.forEach((item) => {
        const lastIndex = item.lastIndexOf('.')
        const preVersion = item.slice(0, lastIndex)
        const curentPreIndex = preVersionList.indexOf(preVersion)
        if (curentPreIndex === -1) {
          preVersionList.push(preVersion)
          result.push(item)
        } else {
          const lastVersion = item.slice(lastIndex + 1)
          // 当前的 preVersion 如果存在，那么查找目前 result 中存在前两位版本的最后版本数的大小
          result = result.map((itemR) => {
            const lastIndexR = itemR.lastIndexOf('.')
            const preVersionR = itemR.slice(0, lastIndexR)
            const lastVersionR = itemR.slice(lastIndexR + 1)
            if (preVersion === preVersionR && lastVersion > lastVersionR) {
              itemR = item
            }
            return itemR
          })
        }
      })
      return result.sort((a, b) => a - b)
    },
    switchVersion(selected) {
      this.isShowOption = !this.isShowOption
      if (selected === this.version) return
      // location.hash
      window.location.href = `${location.origin}/wot-design-uni/${selected}/#/components/introduction`
    },
    clickOutside(event) {
      let clickDom = event.target

      // 监听常见问题标题点击
      while (clickDom.className.indexOf('version-control') === -1 && clickDom !== document.body) {
        clickDom = clickDom.parentNode
      }

      if (clickDom.className.indexOf('version-control') === -1) {
        this.isShowOption = false
      }
    }
  },
  mounted() {
    document.body.addEventListener('click', this.clickOutside)
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.clickOutside)
  },
  created() {
    this.getVersions()
  }
}
</script>

<style lang="scss">
/**
 * 布局文件 header 的样式
 */
@import '../assets/style/variable';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 10px #eee;
  background: $color-bg;
  z-index: 100;
}
.header-container {
  margin: 0 120px;
  height: $layout-header-height;
  line-height: $layout-header-height;
}

.logo-block {
  display: inline-block;
  height: $layout-header-height;
  line-height: $layout-header-height;
  vertical-align: top;
  font-size: 18px;
  color: $color-theme;

  span {
    vertical-align: middle;
  }
}
.wot-design-logo {
  display: inline-block;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.wot-design-title {
  display: inline-block;
  font-weight: normal;
  font-size: 18px;
  color: $color-theme;
  margin: 0;
}
.header-tab {
  float: right;
}
.header-tab__item {
  display: inline-block;
  position: relative;
}

.header-tab__link {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  font-size: $fs-title;
  line-height: 25px;
  color: $color-text-light;
  transition: color 0.3s;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: $color-important;
  }
}
.header-tab__with-arrow::after {
  position: absolute;
  display: inline-block;
  content: '';
  width: 0;
  height: 0;
  top: 50%;
  margin-top: -3px;
  right: 0;
  border: 6px solid rgba(0, 0, 0, 0);
  border-top-color: #ccc;
}
.header-tab__link--active {
  color: $color-theme;

  &:hover {
    color: $color-theme;
  }
}
.version-control {
  &:before {
    position: absolute;
    content: ' ';
    top: calc(50% - 8px);
    width: 1px;
    height: 16px;
    background-color: #ebebeb;
  }
}
.wot-dropdown {
  position: relative;
}
.wot-dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  padding: 10px 0;
  width: 90px;
  max-height: 300px;
  overflow: auto;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: #666;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 2px;
  box-shadow: 0 2px 12px 4px rgba(0, 0, 0, 0.1);
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) #fefefe;

  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    height: 6px;
    opacity: 0.5;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.wot-dropdown-item {
  list-style: none;
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  margin: 0;
  font-size: 12px;
  color: #464c5b;
  cursor: pointer;
  font-size: 14px;
  outline: none;
  transition: background 0.3s, color 0.3s;

  &:hover,
  &.is-active,
  &.is-active:hover {
    background-color: mix(#0083ff, #fff, 10%);
    color: #0083ff;
  }
}
.popper__arrow {
  border: 1px solid;
  display: inline-block;
  position: absolute;
  left: 50%;
  bottom: -2px;
  margin-left: -3px;
  border-width: 6px;
  border-color: transparent;
  border-bottom-color: white;
}
.drop-scale-in-enter,
.drop-scale-in-leave-to {
  transform: scaleY(0);
}
.drop-scale-in-enter-active,
.drop-scale-in-leave-active {
  transition: transform 0.2s;
}
@media (max-width: 1366px) {
  .header-container {
    margin: 0 30px;
  }
}
@media (max-width: 773px) {
  .wot-design-title {
    font-size: 16px;
  }
  .header-container {
    margin: 0 15px;
  }
  .header-tab__link {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>
