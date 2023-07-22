<template>
  <div class="survey" @mouseover="show = true" @mouseout="show = false">
    <i class="survey-line-1"></i>
    <span>打赏作者</span>
    <i class="survey-line-2"></i>
    <transition name="slide-fade">
      <div v-show="show" class="survey-img">
        <img style="width: 160px; height: 160px; padding: 32px" src="https://fant-mini-plus.top/img/weixinQrcode.jpg" />
        <p>打赏作者，助力他的工作～</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Survey',
  data() {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss">
.survey {
  position: relative;
  display: inline-block;
  margin-left: 80px;
  text-align: center;
  background: #fff;
  color: #0083ff;
  cursor: pointer;

  .survey-img {
    position: absolute;
    padding: 10px;
    left: 50%;
    top: 60px;
    margin-left: -85px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px #ccc;
    transition: transform 0.2s, opacity 0.2s;
    line-height: 1.2;
    padding-bottom: 16px;

    &::after {
      position: absolute;
      content: '';
      top: -12px;
      left: 50%;
      transform: translate(-50%, 0);
      border: 6px solid transparent;
      border-bottom-color: #fff;
    }
    p {
      margin: 0;
      padding: 0 10px;
      color: #666;
    }
  }
  .survey-line-1 {
    position: absolute;
    left: 0;
    top: 0;

    &::before {
      position: absolute;
      content: '';
      width: 1px;
      height: 14px;
      background: #ddd;
      top: 10px;
      left: -20px;
    }
    &::after {
      position: absolute;
      content: '';
      height: 1px;
      width: 50px;
      background: #ddd;
      top: 16px;
      left: -30px;
    }
  }
  .survey-line-2 {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    &::before {
      position: absolute;
      content: '';
      width: 1px;
      height: 14px;
      background: #ddd;
      right: -20px;
      bottom: 10px;
    }
    &::after {
      position: absolute;
      content: '';
      height: 1px;
      width: 50px;
      background: #ddd;
      right: -30px;
      bottom: 16px;
    }
  }
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translate(0, 30px);
  opacity: 0;
}
@media (max-width: 773px) {
  .survey {
    display: none;
  }
}
</style>
