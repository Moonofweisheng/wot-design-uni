<template>
  <view>
    <page-wraper>
      <demo-block title="Fade 动画">
        <wd-button @click="fade">fade</wd-button>
        <wd-button @click="fadeUp">fade-up</wd-button>
        <wd-button @click="fadeDown">fade-down</wd-button>
        <wd-button @click="fadeLeft">fade-left</wd-button>
        <wd-button @click="fadeRight">fade-right</wd-button>
      </demo-block>
      <demo-block title="Slide 动画">
        <wd-button @click="slideUp">slide-up</wd-button>
        <wd-button @click="slideDown">slide-down</wd-button>
        <wd-button @click="slideLeft">slide-left</wd-button>
        <wd-button @click="slideRight">slide-right</wd-button>
      </demo-block>
      <demo-block title="Zoom 动画">
        <wd-button @click="zoomIn">zoom-in</wd-button>
        <wd-button @click="zoomOut">zoom-out</wd-button>
      </demo-block>
      <demo-block title="自定义动画">
        <wd-button @click="custom">custom</wd-button>
      </demo-block>

      <wd-transition :show="show" :name="name" custom-class="block" />

      <wd-transition
        :show="customShow"
        :duration="{ enter: 700, leave: 1000 }"
        enter-class="custom-enter"
        enter-active-class="custom-enter-active"
        enter-to-class="custom-enter-to"
        leave-class="custom-leave"
        leave-active-class="custom-leave-active"
        leave-to-class="custom-leave-to"
        custom-class="block"
      />
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import type { TransitionName } from '@/uni_modules/wot-design-uni/components/wd-transition/types'
import { ref } from 'vue'

const show = ref<boolean>(false)
const name = ref<TransitionName>()
const customShow = ref<boolean>(false)
function fade() {
  transition('fade')
}
function fadeUp() {
  transition('fade-up')
}
function fadeDown() {
  transition('fade-down')
}
function fadeLeft() {
  transition('fade-left')
}
function fadeRight() {
  transition('fade-right')
}
function slideUp() {
  transition('slide-up')
}
function slideDown() {
  transition('slide-down')
}
function slideLeft() {
  transition('slide-left')
}
function slideRight() {
  transition('slide-right')
}
function zoomIn() {
  transition('zoom-in')
}
function zoomOut() {
  transition('zoom-out')
}
function custom() {
  customShow.value = true
  setTimeout(() => {
    customShow.value = false
  }, 1200)
}
function transition(transition: TransitionName) {
  name.value = transition
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 500)
}
</script>
<style lang="scss" scoped>
:deep(button) {
  margin: 0 10px 10px 0;
}
:deep(.block) {
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
  width: 100px;
  height: 100px;
  background: #0083ff;
}

:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition-property: background, transform;
}
:deep(.custom-enter) {
  transform: translate3d(-100px, -100px, 0) rotate(-180deg);
  background: #ff0000;
}
:deep(.custom-leave-to) {
  transform: translate3d(100px, 100px, 0) rotate(180deg);
  background: #ff0000;
}
</style>
