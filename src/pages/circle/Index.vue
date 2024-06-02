<template>
  <view class="circle">
    <page-wraper>
      <wd-message-box></wd-message-box>

      <demo-block title="基础用法">
        <wd-circle custom-class="custom-circle" v-model="current" :text="current + '%'" />
      </demo-block>
      <demo-block title="样式定制">
        <wd-circle custom-class="custom-circle" v-model="current" :stroke-width="6" text="宽度定制" />
        <wd-circle custom-class="custom-circle" v-model="current" layer-color="#eee" color="#ee0a24" text="颜色定制" />
        <wd-circle custom-class="custom-circle" v-model="current" :color="gradientColor" text="渐变色" />
        <wd-circle custom-class="custom-circle" v-model="current" color="#07c160" :clockwise="false" text="逆时针" />
        <wd-circle custom-class="custom-circle" v-model="current" :size="120" text="大小定制" />
      </demo-block>

      <demo-block title="使用slot">
        <wd-circle custom-class="custom-circle" v-model="current" :stroke-width="6">
          <view style="color: red">{{ current }}%</view>
        </wd-circle>
      </demo-block>

      <demo-block>
        <wd-button custom-style="margin-right:24rpx" type="primary" size="small" @click="doAdd">增加</wd-button>
        <wd-button type="error" size="small" @click="doDecre">减少</wd-button>
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
  message.alert('操作成功')
}
</script>
<style lang="scss" scoped>
.circle {
  :deep(.custom-circle) {
    margin-left: 24rpx;
  }
}
</style>
