<template>
  <view class="circle">
    <page-wraper>
      <wd-message-box></wd-message-box>

      <demo-block :title="$t('ji-chu-yong-fa')">
        <wd-circle custom-class="custom-circle" v-model="current" :text="current + '%'" />
      </demo-block>
      <demo-block :title="$t('yang-shi-ding-zhi')">
        <wd-circle custom-class="custom-circle" v-model="current" :stroke-width="6" :text="$t('kuan-du-ding-zhi')" />
        <wd-circle custom-class="custom-circle" v-model="current" layer-color="#eee" color="#ee0a24" :text="$t('yan-se-ding-zhi')" />
        <wd-circle custom-class="custom-circle" v-model="current" :color="gradientColor" :text="$t('jian-bian-se')" />
        <wd-circle custom-class="custom-circle" v-model="current" color="#07c160" :clockwise="false" :text="$t('ni-shi-zhen')" />
        <wd-circle custom-class="custom-circle" v-model="current" :size="120" :text="$t('da-xiao-ding-zhi')" />
      </demo-block>

      <demo-block :title="$t('shi-yong-slot')">
        <wd-circle custom-class="custom-circle" v-model="current" :stroke-width="6">
          <view style="color: red">{{ current }}%</view>
        </wd-circle>
      </demo-block>

      <demo-block>
        <wd-button custom-style="margin-right:24rpx" type="primary" size="small" @click="doAdd">{{ $t('zeng-jia') }}</wd-button>
        <wd-button type="error" size="small" @click="doDecre">{{ $t('jian-shao') }}</wd-button>
      </demo-block>
      <demo-block title="alert">
        <wd-button @click="alert">alert</wd-button>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const current = ref<number>(20)
const gradientColor: Record<string, string> = {
  '0': 'red',
  '100': 'white'
} // 进度条颜色渐变色

function doAdd() {
  if (current.value < 100) {
    current.value += 10
  }
}

function doDecre() {
  if (current.value > 0) {
    current.value -= 10
  }
}

const message = useMessage()

function alert() {
  message.alert(t('cao-zuo-cheng-gong'))
}
</script>
<style lang="scss" scoped>
.circle {
  :deep(.custom-circle) {
    margin-left: 24rpx;
  }
}
</style>
