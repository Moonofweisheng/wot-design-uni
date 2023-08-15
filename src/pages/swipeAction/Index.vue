<template>
  <page-wraper>
    <wd-toast />

    <view @click.stop="clickoutside">
      <demo-block transparent title="基本用法">
        <wd-swipe-action>
          <wd-cell title="标题文字" value="内容" />
          <template #right>
            <view class="action">
              <view class="button" style="background: #fa4350" @click="handleAction('操作1')">操作1</view>
              <view class="button" style="background: #f0883a" @click="handleAction('操作2')">操作2</view>
              <view class="button" style="background: #4d80f0" @click="handleAction('操作3')">操作3</view>
            </view>
          </template>
        </wd-swipe-action>
      </demo-block>

      <demo-block transparent title="左右滑动">
        <wd-swipe-action>
          <template #left>
            <view class="action">
              <view class="button" style="background: #fa4350">操作1</view>
              <view class="button" style="background: #f0883a">操作2</view>
              <view class="button" style="background: #4d80f0">操作3</view>
            </view>
          </template>

          <wd-cell title="标题文字" value="内容" />

          <template #right>
            <view class="action">
              <view class="button" style="background: #fa4350">操作4</view>
              <view class="button" style="background: #f0883a">操作5</view>
              <view class="button" style="background: #4d80f0">操作6</view>
            </view>
          </template>
        </wd-swipe-action>
      </demo-block>

      <demo-block transparent title="切换按钮">
        <wd-swipe-action v-model="value" :before-close="beforeClose">
          <template #left>
            <view class="action">
              <view class="button" style="background: #fa4350">操作1</view>
              <view class="button" style="background: #f0883a">操作2</view>
              <view class="button" style="background: #4d80f0">操作3</view>
            </view>
          </template>

          <wd-cell title="标题文字" value="内容" />

          <template #right>
            <view class="action">
              <view class="button" style="background: #fa4350">操作4</view>
              <view class="button" style="background: #f0883a">操作5</view>
              <view class="button" style="background: #4d80f0">操作6</view>
            </view>
          </template>
        </wd-swipe-action>
      </demo-block>
      <view class="button-group">
        <view @click.stop="noop">
          <wd-button size="small" @click="changeState('left')">打开左边</wd-button>
        </view>
        <view @click.stop="noop">
          <wd-button size="small" @click="changeState('close')">关闭所有</wd-button>
        </view>
        <view @click.stop="noop">
          <wd-button size="small" @click="changeState('right')">打开右边</wd-button>
        </view>
      </view>

      <demo-block transparent title="点击事件">
        <wd-swipe-action @click="handleClick">
          <wd-cell title="标题文字" value="内容" />

          <template #right>
            <view class="action">
              <view class="button" style="background: #fa4350">操作1</view>
              <view class="button" style="background: #f0883a">操作2</view>
              <view class="button" style="background: #4d80f0">操作3</view>
            </view>
          </template>
        </wd-swipe-action>
      </demo-block>

      <demo-block transparent title="禁用滑动按钮">
        <wd-swipe-action disabled>
          <wd-cell title="标题文字" value="内容" />

          <template #right>
            <view class="action">
              <view class="button" style="background: #fa4350">操作1</view>
              <view class="button" style="background: #f0883a">操作2</view>
              <view class="button" style="background: #4d80f0">操作3</view>
            </view>
          </template>
        </wd-swipe-action>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { clickOut } from '@/uni_modules/wot-design-uni'

import { ref } from 'vue'
const toast = useToast()
const value = ref<string>('close')

const beforeClose = (reason, position) => {
  if (reason === 'click') {
    toast.show(`${reason} ${position}导致滑动按钮关闭`)
  } else {
    toast.show(`${reason}导致${position}滑动按钮关闭`)
  }
}

function clickoutside() {
  clickOut.closeOutside()
}

function changeState(position: string) {
  value.value = position
}
function handleClick({ value }) {
  toast.show(`点击${value}关闭操作按钮`)
}
function handleAction(action: string) {
  toast.show(`点击了${action}`)
}

function noop() {}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .button-group {
    background: $-dark-background2;
  }
}
.action {
  height: 100%;
}
.button {
  display: inline-block;
  padding: 0 15px;
  height: 100%;
  color: white;
  line-height: 46px;
}
.button-group {
  padding: 10px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
