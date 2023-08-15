<template>
  <view>
    <page-wraper>
      <wd-toast />
      <view class="grid">
        <demo-block title="基本用法" transparent>
          <wd-grid>
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="自定义列数" transparent>
          <wd-grid :column="3">
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="自定义背景颜色">
          <wd-grid bg-color="rgba(0, 0, 0, 0.02)">
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="显示border">
          <wd-grid :column="3" border>
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="内容插槽" transparent>
          <wd-grid>
            <wd-grid-item use-slot>
              <image class="img" :src="joy" />
            </wd-grid-item>
            <wd-grid-item use-slot>
              <image class="img" :src="joy" />
            </wd-grid-item>
            <wd-grid-item use-slot>
              <image class="img" :src="joy" />
            </wd-grid-item>
          </wd-grid>
        </demo-block>
        <demo-block title="图标插槽" transparent>
          <wd-grid>
            <wd-grid-item use-icon-slot text="文字" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
            <wd-grid-item use-icon-slot text="文字" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
            <wd-grid-item use-icon-slot text="文字" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
          </wd-grid>
        </demo-block>
        <demo-block title="文字插槽" transparent>
          <wd-grid>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">自定义文字插槽</view>
              </template>
            </wd-grid-item>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">自定义文字插槽</view>
              </template>
            </wd-grid-item>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">自定义文字插槽</view>
              </template>
            </wd-grid-item>
          </wd-grid>
        </demo-block>
        <demo-block title="自定义样式" transparent>
          <wd-grid>
            <wd-grid-item
              custom-class="custom-item"
              icon="search"
              text="京东JD.COM-专业的综合网上购物商城，销售超数万品牌、4020万种商品，囊括家电、手机、电脑、母婴、服装等13大品类。"
            />
            <wd-grid-item custom-class="custom-item" icon="setting" text="秉承客户为先的理念，京东所售商品为正品行货、全国联保、机打发票。" />
          </wd-grid>
        </demo-block>
        <demo-block title="正方形格子" transparent>
          <wd-grid square :column="4" :gutter="10">
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="设定格间隙" transparent>
          <wd-grid :gutter="10" :column="4">
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="页面导航" transparent>
          <wd-grid clickable>
            <wd-grid-item link-type="redirectTo" url="/pages/button/index" @itemclick="click" icon="edit-outline" text="Redirect to ..." />
            <wd-grid-item link-type="navigateTo" url="/pages/button/index" @itemclick="click" icon="edit-outline" text="Navigate to ..." />
          </wd-grid>
        </demo-block>
        <demo-block title="提示信息" transparent>
          <wd-grid>
            <wd-grid-item is-dot icon="goods" text="文字" />
            <wd-grid-item :value="100" :max="99" icon="computer" text="文字" />
          </wd-grid>
        </demo-block>
      </view>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { joy } from '../images/joy'
import { ref } from 'vue'

const img = ref<string>(joy)

const toast = useToast()
function click() {
  toast.show('成功跳转')
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .grid {
    :deep(.custom-item) {
      color: #e2231a;
      background: $-dark-background2;
    }
  }
}

:deep(.custom-item) {
  height: 80px !important;
  color: #e2231a;
  text-align: left !important;
  padding: 0 10px;
  background: #fff;
}
.img {
  width: 100%;
  height: 90px;
  display: inline-block;
  background-size: cover;
  vertical-align: middle;
}
.slot-img {
  height: 36px;
  width: 36px;
  border-radius: 4px;
}
.text {
  color: #ffb300;
  margin-top: 8px;
}
</style>
