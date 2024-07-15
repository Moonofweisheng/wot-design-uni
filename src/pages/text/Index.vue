<template>
  <view>
    <page-wraper>
      <demo-block title="基本用法">
        <view>
          <view>
            通过
            <code>text</code>
            参数设置文本内容。推荐您使用
            <code>:text='value'</code>
            的形式
          </view>
          <view style="margin-top: 15px">
            <wd-text :text="text"></wd-text>
          </view>
        </view>
      </demo-block>

      <demo-block title="设置主题">
        <view>
          <view>
            通过
            <code>type</code>
            参数设置文本主题，我们提供了五类属性：
            <code>primary</code>
            <code>error</code>
            <code>success</code>
            <code>warning</code>
            <code>info-默认</code>
            。
          </view>
          <view style="margin-top: 15px; display: flex" class="space-x-3">
            <wd-text type="primary" text="主色"></wd-text>
            <wd-text type="error" text="错误"></wd-text>
            <wd-text type="success" text="成功"></wd-text>
            <wd-text type="warning" text="警告"></wd-text>
            <wd-text text="默认"></wd-text>
          </view>
        </view>
      </demo-block>

      <demo-block title="自定义字体颜色">
        <view>
          <view>
            通过
            <code>color</code>
            参数设置文本颜色
          </view>
          <view style="margin-top: 15px">
            <wd-text text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。" color="#36B8C2"></wd-text>
          </view>
        </view>
      </demo-block>

      <demo-block title="是否粗体">
        <view>
          <view>
            通过
            <code>bold</code>
            设置是否粗体
          </view>
          <view style="margin-top: 15px">
            <wd-text text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。" bold></wd-text>
          </view>
        </view>
      </demo-block>

      <demo-block title="字体大小">
        <view>
          <view>
            通过
            <code>size</code>
            设置字体大小
          </view>
          <view style="margin-top: 15px">
            <wd-text text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。" size="16px"></wd-text>
          </view>
        </view>
      </demo-block>

      <demo-block title="脱敏">
        <view>
          <view style="display: flex" class="space-x-3">
            <view><wd-text text="李四" mode="name" :format="true"></wd-text></view>
            <view><wd-text text="张长三" mode="name" :format="true"></wd-text></view>
            <view><wd-text text="18888888888" mode="phone" :format="true"></wd-text></view>
          </view>
        </view>
      </demo-block>

      <demo-block title="lines">
        <view>
          <view>
            通过
            <code>lines</code>
            文本显示的行数，如果设置，超出此行数，将会显示省略号。最大值为5。
          </view>
          <view style="margin-top: 15px">
            <wd-text
              text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。"
              :lines="2"
              size="16px"
            ></wd-text>
          </view>
        </view>
      </demo-block>

      <demo-block title="lineHeight">
        <view>
          <view>
            通过
            <code>lineHeight</code>
            文本行高
          </view>
          <view style="margin-top: 15px">
            <wd-text
              text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。"
              :lines="2"
              lineHeight="20px"
            ></wd-text>
          </view>
        </view>
      </demo-block>

      <demo-block title="mode">
        <view>
          <view>
            通过
            <code>mode</code>
            文本处理的匹配模式可选值：'text-普通文本' / 'date - 日期' / 'phone - 手机号' / 'name - 姓名'
          </view>
          <view style="margin-top: 15px">
            <view><wd-text text="18888888888" mode="phone"></wd-text></view>
            <view><wd-text text="王三" mode="name"></wd-text></view>
            <view><wd-text text="1719976636911" mode="date"></wd-text></view>
          </view>
        </view>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const text = ref<string>('只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。')
function clickTest() {
  console.log(1)
}
</script>
<style lang="scss" scoped>
:deep(.space) {
  margin: 0 10px 10px;
}

.space-x-3 {
  & > * {
    + * {
      margin-left: 12px;
    }
  }
}
</style>
