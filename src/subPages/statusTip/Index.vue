<template>
  <page-wraper>
    <demo-block :title="$t('sou-suo-wu-jie-guo')">
      <wd-status-tip :url-prefix="urlPrefix" image="search" tip="当前搜索无结果" />
    </demo-block>

    <demo-block :title="$t('404-ye-mian')">
      <wd-status-tip :url-prefix="urlPrefix" image="network" tip="当前网络不可用，请检查你的网络设置" />
    </demo-block>

    <demo-block :title="$t('ye-mian-zan-wu-nei-rong')">
      <wd-status-tip :url-prefix="urlPrefix" image="content" tip="暂无内容" />
    </demo-block>

    <demo-block :title="$t('wo-de-shou-cang-wei-kong')">
      <wd-status-tip :url-prefix="urlPrefix" image="collect" tip="暂无收藏" />
    </demo-block>

    <demo-block :title="$t('wo-de-ping-lun-wei-kong')">
      <wd-status-tip :url-prefix="urlPrefix" image="comment" tip="暂无评论" />
    </demo-block>

    <demo-block :title="$t('zhi-fu-shi-bai')">
      <wd-status-tip :url-prefix="urlPrefix" image="halo" tip="支付失败，请重新订购" />
    </demo-block>

    <demo-block :title="$t('yi-ding-yue-quan-bu-xiao-xi')">
      <wd-status-tip :url-prefix="urlPrefix" image="message" tip="已订阅全部消息" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-da-xiao')">
      <wd-status-tip
        :url-prefix="urlPrefix"
        :image-size="{
          height: 200,
          width: 300
        }"
        image="search"
        :tip="$t('dang-qian-sou-suo-wu-jie-guo')"
      />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-tu-pian')">
      <wd-status-tip image="https://wot-ui.cn/assets/panda.jpg" tip="查看我的头像" />
    </demo-block>

    <demo-block :title="$t('cha-cao-zi-ding-yi-tu-pian-nei-rong')">
      <wd-status-tip :tip="$t('cha-cao-zi-ding-yi-tu-pian-nei-rong')">
        <template #image>
          <wd-icon name="ie-filled" size="100px"></wd-icon>
        </template>
      </wd-status-tip>
    </demo-block>

    <!-- 底部插槽示例移动到最后一个示例，并添加合理样式 -->
    <demo-block :title="$t('di-bu-cha-cao')">
      <wd-status-tip image="content" :url-prefix="urlPrefix" tip="当前搜索无结果">
        <template #bottom>
          <view class="bottom-actions">
            <wd-button type="info">重新加载</wd-button>
          </view>
        </template>
      </wd-status-tip>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
const urlPrefix = 'https://wot-ui.cn/assets/'
</script>
<style lang="scss" scoped>
.bottom-actions {
  margin-top: var(--wot-statustip-bottom-margin-top, 20px);
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
