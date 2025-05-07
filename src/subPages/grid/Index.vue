<template>
  <view>
    <page-wraper>
      <wd-toast />
      <view class="grid">
        <demo-block :title="$t('jiBenYongFa')" transparent>
          <wd-grid clickable>
            <wd-grid-item icon="picture" :text="$t('wen-zi')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-0')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-1')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-2')" />
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('zi-ding-yi-lie-shu')" transparent>
          <wd-grid :column="3">
            <wd-grid-item icon="picture" :text="$t('wen-zi-3')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-4')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-5')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-6')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-7')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-8')" />
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('zi-ding-yi-bei-jing-yan-se')">
          <wd-grid bg-color="rgba(0, 0, 0, 0.02)">
            <wd-grid-item icon="picture" :text="$t('wen-zi-9')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-10')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-11')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-12')" />
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('xian-shi-border')">
          <wd-grid :column="3" border>
            <wd-grid-item icon="picture" :text="$t('wen-zi-13')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-14')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-15')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-16')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-17')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-18')" />
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('nei-rong-cha-cao')" transparent>
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
        <demo-block :title="$t('tu-biao-cha-cao')" transparent>
          <wd-grid>
            <wd-grid-item use-icon-slot :text="$t('wen-zi-19')" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
            <wd-grid-item use-icon-slot :text="$t('wen-zi-20')" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
            <wd-grid-item use-icon-slot :text="$t('wen-zi-21')" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('wen-zi-cha-cao')" transparent>
          <wd-grid>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">{{ $t('zi-ding-yi-wen-zi-cha-cao') }}</view>
              </template>
            </wd-grid-item>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">{{ $t('zi-ding-yi-wen-zi-cha-cao-0') }}</view>
              </template>
            </wd-grid-item>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">{{ $t('zi-ding-yi-wen-zi-cha-cao-1') }}</view>
              </template>
            </wd-grid-item>
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('ziDingYiYangShi')" transparent>
          <wd-grid>
            <wd-grid-item custom-class="custom-item" icon="search" :text="$t('wot-ui-yi-ge-gao-yan-zhi-qing-liang-hua-de-uniapp-zu-jian-ku')" />
            <wd-grid-item
              custom-class="custom-item"
              icon="setting"
              :text="$t('ji-yu-vue3ts-kai-fa-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti')"
            />
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('zheng-fang-xing-ge-zi')" transparent>
          <wd-grid square :column="4" :gutter="10">
            <wd-grid-item icon="picture" :text="$t('wen-zi-22')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-23')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-24')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-25')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-26')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-27')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-28')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-29')" />
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('she-ding-ge-jian-xi')" transparent>
          <wd-grid :gutter="10" :column="4">
            <wd-grid-item icon="picture" :text="$t('wen-zi-30')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-31')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-32')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-33')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-34')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-35')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-36')" />
            <wd-grid-item icon="picture" :text="$t('wen-zi-37')" />
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('ye-mian-dao-hang')" transparent>
          <wd-grid clickable>
            <wd-grid-item link-type="redirectTo" url="/pages/button/Index" @itemclick="click" icon="edit-outline" :text="$t('redirect-to')" />
            <wd-grid-item link-type="navigateTo" url="/pages/button/Index" @itemclick="click" icon="edit-outline" :text="$t('navigate-to')" />
          </wd-grid>
        </demo-block>
        <demo-block :title="$t('ti-shi-xin-xi')" transparent>
          <wd-grid>
            <wd-grid-item is-dot icon="goods" :text="$t('wen-zi-38')" />
            <wd-grid-item :value="100" :max="99" icon="computer" :text="$t('wen-zi-39')" />
          </wd-grid>
        </demo-block>
      </view>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { joy } from '../../pages/images/joy'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const img = ref<string>(joy)

const toast = useToast()
function click() {
  toast.show(t('cheng-gong-tiao-zhuan'))
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
