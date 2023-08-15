<template>
  <page-wraper>
    <view class="container">
      <view v-for="index in num" :key="index" class="list-item">
        <image src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/70325/36/14954/36690/5dcd3e3bEee5006e0/aed1ccf6d5ffc764.png" />
        <view class="right">这是一条测试{{ index + 1 }}</view>
      </view>
      <wd-loadmore :state="state" @reload="loadmore" />
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'

const state = ref<any>('loading')
const num = ref<number>(0)
const max = ref<number>(60)

onReachBottom(() => {
  if (num.value === 45) {
    state.value = 'error'
  } else if (num.value < max.value) {
    loadmore()
  } else if (num.value === max.value) {
    state.value = 'finished'
  }
})

onLoad(() => {
  loadmore()
})

function loadmore() {
  setTimeout(() => {
    num.value = num.value + 15
    state.value = 'loading'
  }, 200)
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .list-item {
    background: $-dark-background2;
    color: $-dark-color;
  }
  .list-item:after {
    background: $-dark-border-color;
  }
}

.list-item {
  position: relative;
  display: flex;
  padding: 10px 15px;
  background: #fff;
  color: #464646;
}

.list-item:after {
  position: absolute;
  display: block;
  content: '';
  height: 1px;
  left: 0;
  width: 100%;
  bottom: 0;
  background: #eee;
  transform: scaleY(0.5);
}
image {
  display: block;
  width: 120px;
  height: 78px;
  margin-right: 15px;
}
.right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
</style>
