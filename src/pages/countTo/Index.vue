<template>
  <page-wraper>
    <wd-toast></wd-toast>
    <demo-block title="基本用法">
      <view>
        <wd-count-to :endVal="2000" />
      </view>
      <view>
        <wd-count-to :startVal="1000" :endVal="2000" />
      </view>
      <view>
        <wd-count-to :startVal="2000" :endVal="1500" />
      </view>
    </demo-block>

    <demo-block title="样式">
      <wd-count-to :startVal="1000" :endVal="2000" fontSize="48rpx" fontColor="#f34250" isBold />
    </demo-block>
  </page-wraper>
</template>
