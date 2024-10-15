<template>
  <page-wraper>
    <wd-toast />
    <view>
      <demo-block title="基本用法">
        <view>
          <wd-card type="rectangle">
            <template #title>
              <view class="title">
                <view>左下贝塞尔</view>
              </view>
            </template>
            <view style="height: 40px" class="content">
              <view style="display: flex">
                <wd-img
                  :width="40"
                  :height="40"
                  src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
                ></wd-img>
                <view style="margin-left: 10px">
                  <view style="color: rgba(0, 0, 0, 0.85); font-size: 16px">蜜滋兰(mizland)</view>
                  <view style="color: rgba(0, 0, 0, 0.25); font-size: 12px">￥29.08</view>
                </view>
              </view>
              <view class="right">
                <wd-icon name="add-circle" size="20px" />
                <wd-cubic-bezier :position="{ left: 50, bottom: 100 }" direction="bottom" :index="1" @change="change"></wd-cubic-bezier>
              </view>
            </view>
            <view style="height: 40px; margin-top: 40px" class="content">
              <view style="display: flex">
                <wd-img
                  :width="40"
                  :height="40"
                  src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
                ></wd-img>
                <view style="margin-left: 10px">
                  <view style="color: rgba(0, 0, 0, 0.85); font-size: 16px">蜜滋兰(mizland)</view>
                  <view style="color: rgba(0, 0, 0, 0.25); font-size: 12px">￥29.08</view>
                </view>
              </view>
              <view class="right">
                <wd-icon name="add-circle" size="20px" />
                <wd-cubic-bezier :position="{ left: 50, bottom: 100 }" direction="bottom" :index="2" @change="change"></wd-cubic-bezier>
              </view>
            </view>
          </wd-card>
        </view>
        <view>
          <wd-card type="rectangle">
            <template #title>
              <view class="title">
                <view>右下贝塞尔</view>
              </view>
            </template>
            <view style="height: 40px" class="content">
              <view class="right">
                <wd-icon name="add-circle" size="20px" />
                <wd-cubic-bezier :position="{ left: 320, bottom: 100 }" direction="bottom" :index="3" @change="change"></wd-cubic-bezier>
              </view>
              <view style="display: flex">
                <wd-img
                  :width="40"
                  :height="40"
                  src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
                ></wd-img>
                <view style="margin-left: 10px">
                  <view style="color: rgba(0, 0, 0, 0.85); font-size: 16px">蜜滋兰(mizland)</view>
                  <view style="color: rgba(0, 0, 0, 0.25); font-size: 12px">￥29.08</view>
                </view>
              </view>
            </view>
            <view style="height: 40px; margin-top: 40px" class="content">
              <view class="right">
                <wd-icon name="add-circle" size="20px" />
                <wd-cubic-bezier :position="{ left: 320, bottom: 100 }" direction="bottom" :index="4" @change="change"></wd-cubic-bezier>
              </view>
              <view style="display: flex">
                <wd-img
                  :width="40"
                  :height="40"
                  src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
                ></wd-img>
                <view style="margin-left: 10px">
                  <view style="color: rgba(0, 0, 0, 0.85); font-size: 16px">蜜滋兰(mizland)</view>
                  <view style="color: rgba(0, 0, 0, 0.25); font-size: 12px">￥29.08</view>
                </view>
              </view>
            </view>
          </wd-card>
        </view>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
function change(e: number) {
  console.log('获取索引' + e)
}
</script>
<style lang="scss" scoped>
.content,
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.right {
  position: relative;
}
</style>
