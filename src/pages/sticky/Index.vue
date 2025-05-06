<!--
 * @Author: weisheng
 * @Date: 2023-06-13 11:47:12
 * @LastEditTime: 2025-04-02 20:17:36
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/sticky/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <view style="height: 250vh">
      <view class="demo-block">
        <view class="demo-title">{{ $t('jiBenYongFa') }}</view>
        <view class="demo-container">
          <wd-sticky custom-style="margin-left: 20px">
            <wd-button type="success">{{ $t('ji-chu-yong-fa-0') }}</wd-button>
          </wd-sticky>
        </view>
      </view>

      <view class="demo-block">
        <view class="demo-title">{{ $t('xi-ding-ju-li') }}</view>
        <view class="demo-container">
          <wd-sticky :offset-top="50" custom-style="margin-left: 120px">
            <wd-button>{{ $t('xi-ding-ju-li-0') }}</wd-button>
          </wd-sticky>
        </view>
      </view>

      <view class="demo-block">
        <view class="demo-title">{{ $t('xiang-dui-rong-qi') }}</view>
        <view class="demo-container">
          <wd-sticky-box>
            <view class="custom-container">
              <wd-sticky custom-style="margin-left: 220px">
                <wd-button type="warning">{{ $t('xiang-dui-rong-qi') }}</wd-button>
              </wd-sticky>
            </view>
          </wd-sticky-box>
        </view>
      </view>

      <view class="demo-block">
        <view class="demo-title">{{ $t('dong-tai-cha-ru') }}</view>
        <view class="demo-container">
          <wd-button type="info" plain @click="insert">{{ $t('dian-ji-cha-ru') }}</wd-button>
          <wd-sticky custom-style="margin-left: 220px">
            <wd-button type="error" v-if="show">{{ $t('dong-tai-sheng-cheng') }}</wd-button>
          </wd-sticky>
        </view>
      </view>

      <view class="demo-block">
        <view class="demo-title">{{ $t('xiang-dui-rong-qi-xi-ding-ju-li') }}</view>
        <view class="demo-container">
          <wd-sticky-box>
            <view class="custom-container">
              <wd-sticky :offset-top="150">
                <wd-button type="warning">{{ $t('xiang-dui-rong-qi-xi-ding-ju-li') }}</wd-button>
              </wd-sticky>
            </view>
          </wd-sticky-box>
        </view>
      </view>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
const show = ref<boolean>(false)

function display() {
  show.value = true
}
function insert() {
  display()
}
onShow(() => {
  setTimeout(display, 5000)
})
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-container {
    background: $-dark-background2;
  }
}
.demo-block {
  padding: 15px 0;
  color: #666;
}

.custom-container {
  height: 120px;
  width: 100vw;
  background-color: #ffffff;
}
.is-white {
  background: #fff;
}
.demo-title {
  padding: 0 15px;
  margin: 10px 0;
  font-size: 13px;
}
</style>
