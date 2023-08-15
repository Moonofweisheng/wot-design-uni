<template>
  <view>
    <wd-toast />
    <page-wraper>
      <view @click.stop="clickOutside">
        <demo-block title="基本用法">
          <view class="top">
            <wd-tooltip v-model="show1" placement="bottom-start" content="bottom-start 提示文字" @change="handleChange1">
              <wd-button :round="false">bottom-start</wd-button>
            </wd-tooltip>
            <wd-tooltip v-model="show2" placement="bottom" content="bottom 提示文字" @change="handleChange2">
              <wd-button :round="false">bottom</wd-button>
            </wd-tooltip>
            <wd-tooltip v-model="show3" placement="bottom-end" content="bottom-end 提示文字" @change="handleChange3">
              <wd-button :round="false">bottom-end</wd-button>
            </wd-tooltip>
          </view>
          <view class="left">
            <wd-tooltip v-model="show4" placement="right-start" content="right-start 提示文字" @change="handleChange4">
              <wd-button :round="false">right-start</wd-button>
            </wd-tooltip>
            <wd-tooltip v-model="show5" placement="right" content="right 提示文字" customStyle="margin: 20px 0" @change="handleChange5">
              <wd-button :round="false">right</wd-button>
            </wd-tooltip>
            <wd-tooltip v-model="show6" placement="right-end" content="right-end 提示文字" @change="handleChange6">
              <wd-button :round="false">right-end</wd-button>
            </wd-tooltip>
          </view>
          <view class="right">
            <wd-tooltip v-model="show7" placement="left-start" content="left-start 提示文字" @change="handleChange7">
              <wd-button :round="false">
                left-start
                <wd-icon name="setting" />
              </wd-button>
            </wd-tooltip>
            <wd-tooltip v-model="show8" placement="left" content="left 提示文字" customStyle="margin: 20px 0" @change="handleChange8">
              <wd-button :round="false">left</wd-button>
            </wd-tooltip>
            <wd-tooltip v-model="show9" placement="left-end" content="left-end 提示文字" @change="handleChange9">
              <wd-button :round="false">left-end</wd-button>
            </wd-tooltip>
          </view>
          <view class="bottom">
            <wd-tooltip v-model="show10" placement="top-start" content="top-start 提示文字" @change="handleChange10">
              <wd-button :round="false">top-start</wd-button>
            </wd-tooltip>
            <wd-tooltip v-model="show11" placement="top" content="top 提示文字" @change="handleChange11">
              <wd-button :round="false">top</wd-button>
            </wd-tooltip>
            <wd-tooltip v-model="show12" placement="top-end" content="top-end 提示文字" @change="handleChange12">
              <wd-button :round="false">top-end</wd-button>
            </wd-tooltip>
          </view>
        </demo-block>
        <demo-block title="显示关闭按钮">
          <view class="demo-left">
            <wd-tooltip v-model="show13" content="显示关闭按钮" placement="right" show-close @change="handleChange13">
              <wd-button :round="false">显示关闭按钮</wd-button>
            </wd-tooltip>
          </view>
        </demo-block>
        <demo-block title="多行文本">
          <view class="demo-left lines-demo">
            <wd-tooltip v-model="show14" placement="right" use-content-slot @change="handleChange14">
              <wd-button :round="false">多行文本</wd-button>
              <template #content>
                <view class="lines-content">
                  <view>多行文本1</view>
                  <view>多行文本2</view>
                  <view>多行文本3</view>
                </view>
              </template>
            </wd-tooltip>
          </view>
        </demo-block>
        <demo-block title="控制显隐">
          <view @click.stop="control">
            <wd-button plain size="small" class="button-control">{{ show15 ? '关闭' : '打开' }}</wd-button>
          </view>
          <view class="demo-left demo-control">
            <wd-tooltip placement="top" content="控制显隐" v-model="show15">
              <wd-button :round="false">top</wd-button>
            </wd-tooltip>
          </view>
        </demo-block>
        <demo-block title="绑定事件">
          <view class="demo-left">
            <wd-tooltip v-model="show16" placement="right-end" :content="content" @open="onShow" @close="onHide" @change="handleChange16">
              <wd-button :round="false">事件</wd-button>
            </wd-tooltip>
          </view>
        </demo-block>
        <demo-block title="禁用">
          <view class="demo-left">
            <wd-tooltip v-model="show17" placement="right-end" content="禁用" disabled @change="handleChange17">
              <wd-button :round="false">禁用</wd-button>
            </wd-tooltip>
          </view>
        </demo-block>
      </view>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { clickOut } from '@/uni_modules/wot-design-uni'
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)
const show5 = ref<boolean>(false)
const show6 = ref<boolean>(false)
const show7 = ref<boolean>(false)
const show8 = ref<boolean>(false)
const show9 = ref<boolean>(false)
const show10 = ref<boolean>(false)
const show11 = ref<boolean>(false)
const show12 = ref<boolean>(false)
const show13 = ref<boolean>(false)
const show14 = ref<boolean>(false)
const show15 = ref<boolean>(false)
const show16 = ref<boolean>(false)
const show17 = ref<boolean>(false)
const content = ref<string>('显示内容')

const toast = useToast()

function control() {
  show15.value = !show15.value
  //   this.setData({ show15: !this.data.show15 })
}
function onShow() {
  console.log('显示')
}
function onHide() {
  toast.show('文字提示关闭')
}
function handleChange1(event) {
  //   this.setData({ show1: event.detail.show })
}
function handleChange2(event) {
  //   this.setData({ show2: event.detail.show })
}
function handleChange3(event) {
  //   this.setData({ show3: event.detail.show })
}
function handleChange4(event) {
  //   this.setData({ show4: event.detail.show })
}
function handleChange5(event) {
  //   this.setData({ show5: event.detail.show })
}
function handleChange6(event) {
  //   this.setData({ show6: event.detail.show })
}
function handleChange7(event) {
  //   this.setData({ show7: event.detail.show })
}
function handleChange8(event) {
  //   this.setData({ show8: event.detail.show })
}
function handleChange9(event) {
  //   this.setData({ show9: event.detail.show })
}
function handleChange10(event) {
  //   this.setData({ show10: event.detail.show })
}
function handleChange11(event) {
  //   this.setData({ show11: event.detail.show })
}
function handleChange12(event) {
  //   this.setData({ show12: event.detail.show })
}
function handleChange13(event) {
  // this.setData({ show13: event.detail.show })
}
function handleChange14(event) {
  // this.setData({ show14: event.detail.show })
}
function handleChange15(event) {
  // this.setData({ show15: event.detail.show })
}
function handleChange16(event) {
  // this.setData({ show16: event.detail.show })
}
function handleChange17(event) {
  // this.setData({ show17: event.detail.show })
}
function clickOutside(event) {
  clickOut.closeOutside()
}
</script>
<style lang="scss" scoped>
.position-wrap {
  position: relative;
}
.center {
  text-align: center;
}
.left {
  float: left;
  display: flex;
  flex-direction: column;
}
.right {
  float: right;
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-bottom: 20px;
}
.top {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}
.bottom {
  clear: both;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.demo-left {
  text-align: left;
}
.button-control {
  float: left;
}
.demo-control {
  text-align: center;
  display: block;
  padding-top: 18px;
  clear: both;
  margin-bottom: 10px;
}
.lines-demo {
  padding: 30px 0;
}
.lines-content {
  color: #fff;
  padding: 5px;
  width: 90px;
}
</style>
