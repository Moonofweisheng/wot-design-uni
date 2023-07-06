<template>
  <view v-if="{{ showWrapper }}" class="wd-drop-item custom-class" style="z-index: {{ zIndex }}; {{ positionStyle }}">
    <wd-popup
      show="{{ showPop }}"
      z-index="{{ zIndex }}"
      duration="{{ duration }}"
      position="{{ position }}"
      custom-style="position: absolute; max-height: 80%;"
      modal-style="position: absolute;"
      modal="{{ modal }}"
      close-on-click-modal="{{ closeOnClickModal }}"
      bind:clickmodal="close"
      bind:beforeenter="handleOpen"
      bind:afterenter="handleOpened"
      bind:beforeleave="handleClose"
      bind:afterleave="onPopupClose"
    >
      <view v-if="{{ options.length }}" style="background-color: #fff">
        <view
          jd:for="{{ options }}"
          jd:key="index"
          bindtap="choose"
          data-index="{{ index }}"
          class="wd-drop-item__option {{ (item[valueKey] !== '' ? item[valueKey] : item) === value ? 'is-active' : '' }}"
        >
          <view class="wd-drop-item__title custom-title">
            <text>{{ item[labelKey] ? item[labelKey] : item }}</text>
            <text v-if="{{ item[tipKey] }}" class="wd-drop-item__tip">{{ item[tipKey] }}</text>
          </view>
          <wd-icon
            v-if="{{ (item[valueKey] !== '' ? item[valueKey] : item) === value }}"
            name="{{ iconName }}"
            size="20px"
            class="wd-drop-item__icon custom-icon"
          />
        </view>
      </view>
      <slot v-else />
    </wd-popup>
  </view>
</template>

<script></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
