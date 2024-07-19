<template>
  <page-wraper>
    <view>
      <demo-block title="基本用法">
        <wd-button open-type="getUserInfo" @getuserinfo="handleGetuserinfo">主要按钮</wd-button>
        <wd-button type="success">成功按钮</wd-button>
        <wd-button type="info">信息按钮</wd-button>
        <wd-button type="warning">警告按钮</wd-button>
        <wd-button type="error">危险按钮</wd-button>
      </demo-block>
      <demo-block title="禁用按钮">
        <wd-button disabled>主要按钮</wd-button>
        <wd-button type="success" disabled>成功按钮</wd-button>
        <wd-button type="info" disabled>信息按钮</wd-button>
        <wd-button type="warning" disabled>警告按钮</wd-button>
        <wd-button type="error" disabled>危险按钮</wd-button>
      </demo-block>
      <demo-block title="幽灵按钮">
        <wd-button plain>主要按钮</wd-button>
        <wd-button type="success" plain>成功按钮</wd-button>
        <wd-button type="info" plain>信息按钮</wd-button>
        <wd-button type="warning" plain>警告按钮</wd-button>
        <wd-button type="error" plain>危险按钮</wd-button>
      </demo-block>
      <demo-block title="细边框幽灵按钮">
        <wd-button plain hairline>主要按钮</wd-button>
        <wd-button type="success" plain hairline>成功按钮</wd-button>
        <wd-button type="info" plain hairline>信息按钮</wd-button>
        <wd-button type="warning" plain hairline>警告按钮</wd-button>
        <wd-button type="error" plain hairline>危险按钮</wd-button>
      </demo-block>
      <demo-block title="幽灵按钮禁用状态">
        <wd-button plain disabled>主要按钮</wd-button>
        <wd-button type="success" plain disabled>成功按钮</wd-button>
        <wd-button type="info" plain disabled>信息按钮</wd-button>
        <wd-button type="warning" plain disabled>警告按钮</wd-button>
        <wd-button type="error" plain disabled>危险按钮</wd-button>
      </demo-block>
      <demo-block title="按钮大小">
        <wd-button size="small">小型按钮</wd-button>
        <wd-button size="medium">普通按钮</wd-button>
        <wd-button size="large">大型按钮</wd-button>
      </demo-block>
      <demo-block title="加载中">
        <wd-button loading>加载中</wd-button>
        <wd-button type="success" loading>加载中</wd-button>
        <wd-button type="warning" loading>加载中</wd-button>
        <wd-button type="error" loading>加载中</wd-button>
        <wd-button type="info" loading>加载中</wd-button>
        <wd-button type="info" plain loading>加载中</wd-button>
      </demo-block>
      <demo-block title="文字按钮">
        <wd-button type="text">按钮</wd-button>
        <wd-button type="text" disabled>按钮</wd-button>
      </demo-block>
      <demo-block title="图标按钮">
        <wd-button type="icon" icon="delete-thin"></wd-button>
        <wd-button type="icon" icon="delete-thin" disabled></wd-button>
      </demo-block>
      <demo-block title="带图标的基本按钮">
        <wd-button icon="download">下载</wd-button>
        <wd-button icon="setting">设置</wd-button>
        <wd-button classPrefix="fish" icon="kehuishouwu">可回收</wd-button>
        <wd-button icon="download" size="small">下载</wd-button>
        <wd-button icon="setting" size="small">设置</wd-button>
        <wd-button icon="download" size="large">下载</wd-button>
        <wd-button icon="setting" size="large">设置</wd-button>
      </demo-block>
      <demo-block title="块状按钮，宽度100%">
        <wd-button block size="large">主要按钮</wd-button>
        <wd-button type="success" block size="large">成功按钮</wd-button>
        <wd-button type="info" block size="large">信息按钮</wd-button>
        <wd-button type="warning" block size="large">警告按钮</wd-button>
        <wd-button type="error" block size="large">危险按钮</wd-button>
      </demo-block>
      <demo-block title="常用按钮：块状+圆角">
        <wd-button block size="large" disabled>主要按钮</wd-button>
        <wd-button block size="large">主要按钮</wd-button>
        <wd-button block size="large" loading>主要按钮</wd-button>
        <wd-button type="info" block size="large" disabled>信息按钮</wd-button>
        <wd-button type="info" block size="large">信息按钮</wd-button>
      </demo-block>
      <demo-block title="常用按钮：圆角或圆角+幽灵">
        <view>
          <wd-button disabled>主操作</wd-button>
          <wd-button size="small" disabled>主操作</wd-button>
        </view>
        <view>
          <wd-button>主操作</wd-button>
          <wd-button size="small">主操作</wd-button>
        </view>
        <view>
          <wd-button type="info" disabled>次操作</wd-button>
          <wd-button type="info" size="small" disabled>次操作</wd-button>
        </view>
        <view>
          <wd-button type="info">次操作</wd-button>
          <wd-button type="info" size="small">次操作</wd-button>
        </view>
        <view>
          <wd-button plain disabled>幽灵按钮</wd-button>
          <wd-button size="small" plain disabled>幽灵按钮</wd-button>
        </view>
        <view>
          <wd-button plain>幽灵按钮</wd-button>
          <wd-button size="small" plain>幽灵按钮</wd-button>
        </view>
        <view>
          <wd-button type="info" plain disabled>次操作</wd-button>
          <wd-button type="info" size="small" plain disabled>次操作</wd-button>
        </view>
        <view>
          <wd-button type="info" plain>次操作</wd-button>
          <wd-button type="info" size="small" plain>次操作</wd-button>
        </view>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
function handleGetuserinfo(event: any) {
  // TODO
  console.log(event)
}
</script>
<style lang="scss" scoped>
:deep(button) {
  margin: 0 10px 10px 0;
}
.button-block {
  margin-right: 0;
}
</style>
