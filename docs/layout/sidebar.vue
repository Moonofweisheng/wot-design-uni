<template>
  <ul class="side-bar" :class="isWindows ? 'win-scrollbar' : ''">
    <template>
      <div class="side-bar__link">关于我们</div>
      <div class="side-bar__github-info">
        <a href="https://github.com/Moonofweisheng/wot-design-uni" target="_blank"><i class="github-logo"></i></a>
        <github-button
          class="github-star"
          href="https://github.com/Moonofweisheng/wot-design-uni"
          data-icon="octicon-star"
          data-show-count="true"
          aria-label="Star wot-design-uni on GitHub"
        >
          Star
        </github-button>
      </div>
    </template>
    <!--规避 netlify 免费政策-->
    <template v-if="showNetlify">
      <div class="side-bar__link">Thanks</div>
      <div class="side-bar__github-info">
        <a href="https://www.netlify.com">
          <img width="100" height="40" src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" alt="Deploys by Netlify" />
        </a>
      </div>
    </template>
    <li v-for="(mdl, index) in sideMenu.children" class="side-bar__item" :key="index">
      <template v-if="mdl.children">
        <a class="side-bar__group-name">{{ mdl.title }}</a>
        <template v-if="mdl.type === 'module'">
          <div v-for="(group, groupIndex) in mdl.children" class="side-bar__item-list" :key="groupIndex">
            <a class="side-bar__item-listist-name">{{ group.title }}</a>
            <ul class="side-group">
              <li v-for="(item, key) in group.children" class="side-group__item" :key="key">
                <router-link
                  class="side-group__link"
                  active-class="side-group__link--active"
                  :to="{ name: `${$route.meta.parentName}-${item.name}` }"
                >
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </template>
        <ul v-else class="side-group">
          <li v-for="(item, key) in mdl.children" class="side-group__item" :key="key">
            <router-link class="side-group__link" active-class="side-group__link--active" :to="{ name: `${$route.meta.parentName}-${item.name}` }">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <template v-if="mdl.children">
          <router-link
            v-for="(item, key) in mdl.children"
            :key="key"
            class="side-group__link side-group__link--title"
            active-class="side-group__link--active"
            :to="{ name: `${$route.meta.parentName}-${item.name}` }"
          >
            {{ item.name }}
          </router-link>
        </template>
        <router-link v-else class="side-group__link" active-class="side-group__link--active" :to="{ name: `${$route.meta.parentName}-${mdl.name}` }">
          {{ mdl.title }}
        </router-link>
      </template>
    </li>
  </ul>
</template>

<script>
import routesConfig from '../routes.yml'
import { isWindows } from '../utils/index'
import GithubButton from 'vue-github-button'

export default {
  components: {
    GithubButton
  },
  data() {
    return {
      parentKey: '',
      isWindows
    }
  },
  computed: {
    sideMenu() {
      let sideMenu = routesConfig.filter((item) => item.name === this.$route.meta.parentName)

      return sideMenu.length ? sideMenu[0] : []
    },
    showNetlify() {
      return location.href.includes('netlify')
    }
  },
  created() {
    this.parentKey = this.$route.path.split('/')[1]
  }
}
</script>

<style lang="scss">
@import '../assets/style/_variable.scss';

.side-bar__github-info {
  margin: 15px 0 32px;
}
.github-logo {
  display: inline-block;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  background: url('../assets/img/github.png') no-repeat;
  background-size: cover;
  vertical-align: middle;
}
.github-star {
  display: inline-block;
  vertical-align: middle;
}
.side-bar {
  position: fixed;
  left: 120px;
  top: $layout-header-height;
  bottom: 0;
  width: 210px;
  padding-top: 20px;
  padding-bottom: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  background: $color-bg;
}
.side-bar__link {
  color: #adadad;
}
.side-bar__group-name {
  display: block;
  margin: 16px 0;
  font-size: $fs-title;
  font-weight: 600;
}
.side-group__link {
  display: block;
  margin: 16px 0;
}
.side-group__link--active {
  color: $color-theme;
}
.side-bar__item-list {
  margin-top: 26px;
}
.side-bar__item-listist-name {
  color: $color-black-l7;
}
@media (max-width: 1366px) {
  .side-bar {
    left: 30px;
  }
}
</style>
