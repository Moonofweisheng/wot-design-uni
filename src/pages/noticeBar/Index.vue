<!--
 * @Author: weisheng
 * @Date: 2023-06-13 11:47:12
 * @LastEditTime: 2023-08-07 20:24:04
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\pages\noticeBar\Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-notice-bar text="这是一条消息提示信息这是一条消息提示信息这是一条消息提示信息" prefix="warn-bold" />
    </demo-block>
    <demo-block title="类型修改">
      <wd-notice-bar
        type="danger"
        text="当前网络不可用，请检查你的网络设置。当前网络不可用，请检查你的网络设置。"
        prefix="wifi-error"
        custom-class="space"
      />
      <wd-notice-bar
        type="info"
        text="pc-win沃特已登录，可在“设备管理”中查看详情。pc-win沃特已登录，可在“设备管理”中查看详情。"
        prefix="check-outline"
      />
    </demo-block>
    <demo-block title="禁止滚动">
      <wd-notice-bar :scrollable="false" text="通知被禁或时段内消息屏蔽可能造成消…" prefix="warn-bold"></wd-notice-bar>
    </demo-block>
    <demo-block title="插槽">
      <wd-notice-bar :scrollable="false">
        <template #prefix>
          <wd-icon custom-class="prefix" name="warn-bold">占位符</wd-icon>
        </template>
        通知被禁或时段内消息屏蔽可能造成消…
        <template #suffix>
          <div style="color: #4d80f0">查看</div>
        </template>
      </wd-notice-bar>
    </demo-block>
    <demo-block title="可关闭的">
      <wd-notice-bar text="挂起后，电脑与手机均不会有新客户接入。挂起后，电脑与手机均不会有新客户接入。" closable prefix="warn-bold" />
    </demo-block>
    <demo-block title="多行展示">
      <wd-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        wrapable
        :scrollable="false"
      />
    </demo-block>
    <demo-block title="自定义颜色">
      <wd-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        prefix="check-outline"
        color="#34D19D"
        background-color="#f0f9eb"
      ></wd-notice-bar>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
:deep(.prefix) {
  font-size: 18px;
  padding-right: 4px;
  width: 18px;
  height: 18px;
}

:deep(.space) {
  margin-bottom: 10px;
}
</style>
