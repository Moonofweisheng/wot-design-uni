<template>
  <page-meta :page-style="`overflow:${show10 ? 'hidden' : 'visible'};`"></page-meta>
  <view>
    <page-wraper>
      <demo-block :title="$t('ji-chu-yong-fa-0')" transparent>
        <wd-cell-group>
          <wd-cell :title="$t('dan-chu-ceng')" is-link @click="handleClick1" />
        </wd-cell-group>
      </demo-block>
      <demo-block :title="$t('dan-chu-wei-zhi')" transparent>
        <wd-cell-group border>
          <wd-cell :title="$t('ding-bu')" is-link @click="handleClick2" />
          <wd-cell :title="$t('you-ce')" is-link @click="handleClick3" />
          <wd-cell :title="$t('di-bu')" is-link @click="handleClick4" />
          <wd-cell :title="$t('zuo-ce')" is-link @click="handleClick5" />
        </wd-cell-group>
      </demo-block>
      <demo-block :title="$t('guan-bi-an-niu')" transparent>
        <wd-cell-group border>
          <wd-cell :title="$t('guan-bi-an-niu-0')" is-link @click="handleClick6" />
        </wd-cell-group>
      </demo-block>

      <demo-block :title="$t('suo-ding-gun-dong')" transparent>
        <wd-cell-group border>
          <wd-cell :title="$t('suo-ding-gun-dong-0')" is-link @click="handleClick10" />
        </wd-cell-group>
      </demo-block>

      <demo-block :title="$t('jin-yong-zhe-zhao-dian-ji')" transparent>
        <wd-cell-group border>
          <wd-cell :title="$t('jin-yong-zhe-zhao-dian-ji-0')" is-link @click="handleClick7" />
        </wd-cell-group>
      </demo-block>

      <demo-block :title="$t('jin-yong-zhe-zhao')" transparent>
        <wd-cell-group border>
          <wd-cell :title="$t('jin-yong-zhe-zhao-0')" is-link @click="handleClick8" />
        </wd-cell-group>
      </demo-block>

      <demo-block :title="$t('kai-qi-di-bu-an-quan-qu')" transparent>
        <wd-cell-group border>
          <wd-cell :title="$t('kai-qi-di-bu-an-quan-qu-0')" is-link @click="handleClick9" />
        </wd-cell-group>
      </demo-block>

      <demo-block title="嵌套弹窗" transparent>
        <wd-cell-group border>
          <wd-cell title="嵌套弹窗测试" is-link @click="handleClick11" />
        </wd-cell-group>
      </demo-block>

      <wd-popup v-model="show1" @close="handleClose1" custom-style="border-radius:32rpx;">
        <text class="custom-txt">{{ $t('dan-dan-dan') }}</text>
      </wd-popup>
      <wd-popup v-model="show2" position="top" custom-style="height: 200px;" @close="handleClose2"></wd-popup>
      <wd-popup v-model="show3" position="right" custom-style="width: 200px;" @close="handleClose3"></wd-popup>
      <wd-popup v-model="show4" position="bottom" custom-style="height: 200px;" @close="handleClose4"></wd-popup>
      <wd-popup v-model="show5" position="left" custom-style="width: 200px;" @close="handleClose5"></wd-popup>
      <wd-popup v-model="show6" position="bottom" closable custom-style="height: 200px;" @close="handleClose6"></wd-popup>
      <wd-popup
        v-model="show7"
        position="bottom"
        :close-on-click-modal="false"
        closable
        custom-style="height: 200px;"
        @close="handleClose7"
      ></wd-popup>

      <wd-popup v-model="show8" position="bottom" :modal="false" closable custom-style="height: 200px;" @close="handleClose8"></wd-popup>
      <wd-popup v-model="show9" position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose9"></wd-popup>
      <wd-popup
        v-model="show10"
        lock-scroll
        position="bottom"
        :safe-area-inset-bottom="true"
        custom-style="height: 200px;"
        @close="handleClose10"
      ></wd-popup>

      <!-- 嵌套弹窗测试：父弹窗 -->
      <wd-popup v-model="show11" position="center" custom-style="padding: 20px; border-radius: 16px;" @close="handleClose11">
        <view class="nested-popup-content">
          <text class="nested-title">父弹窗（普通模式）</text>
          <text class="nested-desc">这是一个普通的弹窗，点击下面的按钮会打开子弹窗</text>
          <view class="nested-buttons">
            <wd-button type="primary" size="small" @click="openChildPopup(false)">打开普通子弹窗</wd-button>
            <wd-button type="success" size="small" @click="openChildPopup(true)">打开传送子弹窗</wd-button>
          </view>
        </view>

        <!-- 嵌套弹窗测试：子弹窗（普通） -->
        <wd-popup v-model="showChild1" position="center" custom-style="padding: 20px; border-radius: 16px;" @close="handleCloseChild1">
          <view class="nested-popup-content">
            <text class="nested-title">子弹窗（普通模式）</text>
            <text class="nested-desc">这个子弹窗可能会被父弹窗的层级影响</text>
            <wd-button type="primary" size="small" @click="handleCloseChild1">关闭</wd-button>
          </view>
        </wd-popup>

        <!-- 嵌套弹窗测试：子弹窗（传送） -->
        <wd-popup v-model="showChild2" root-portal position="center" custom-style="padding: 20px; border-radius: 16px;" @close="handleCloseChild2">
          <view class="nested-popup-content">
            <text class="nested-title">子弹窗（传送模式）</text>
            <text class="nested-desc">这个子弹窗使用传送功能，避免了层级问题</text>
            <wd-button type="success" size="small" @click="handleCloseChild2">关闭</wd-button>
          </view>
        </wd-popup>
      </wd-popup>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)
const show5 = ref<boolean>(false)
const show6 = ref<boolean>(false)
const show7 = ref<boolean>(false)

function handleClick1() {
  show1.value = true
}
function handleClose1() {
  show1.value = false
}
function handleClick2() {
  show2.value = true
}
function handleClose2() {
  show2.value = false
}
function handleClick3() {
  show3.value = true
}
function handleClose3() {
  show3.value = false
}
function handleClick4() {
  show4.value = true
}
function handleClose4() {
  show4.value = false
}
function handleClick5() {
  show5.value = true
}
function handleClose5() {
  show5.value = false
}
function handleClick6() {
  show6.value = true
}
function handleClose6() {
  show6.value = false
}

function handleClick7() {
  show7.value = true
}

function handleClose7() {
  show7.value = false
}

const show8 = ref<boolean>(false)

function handleClick8() {
  show8.value = true
}

function handleClose8() {
  show8.value = false
}

const show9 = ref<boolean>(false)

function handleClick9() {
  show9.value = true
}

function handleClose9() {
  show9.value = false
}

const show10 = ref<boolean>(false)

function handleClick10() {
  show10.value = true
}

function handleClose10() {
  show10.value = false
}

const show11 = ref<boolean>(false)
const showChild1 = ref<boolean>(false)
const showChild2 = ref<boolean>(false)

function handleClick11() {
  show11.value = true
}

function handleClose11() {
  show11.value = false
  // 关闭父弹窗时也关闭子弹窗
  showChild1.value = false
  showChild2.value = false
}

function openChildPopup(useTeleport: boolean) {
  if (useTeleport) {
    showChild2.value = true
  } else {
    showChild1.value = true
  }
}

function handleCloseChild1() {
  showChild1.value = false
}

function handleCloseChild2() {
  showChild2.value = false
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}

.custom-txt {
  color: black;
  width: 400rpx;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  border-radius: 32rpx;
}

.teleport-demo-txt {
  color: black;
  width: 300rpx;
  height: 150rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32rpx;
  text-align: center;
  line-height: 1.4;
}

.nested-popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.nested-title {
  color: black;
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
}

.nested-desc {
  color: #666;
  font-size: 28rpx;
  text-align: center;
  line-height: 1.5;
  margin: 10rpx 0;
}

.nested-buttons {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
}

.wot-theme-dark {
  .nested-title {
    color: $-dark-color;
  }

  .nested-desc {
    color: $-dark-color3;
  }
}
</style>
