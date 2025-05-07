<template>
  <view>
    <page-wraper>
      <demo-block :title="$t('zhanShiXiaoXiShuLiang')">
        <wd-badge custom-class="badge" :modelValue="12">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="3" bg-color="pink">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="1" type="primary">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="2" type="warning">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-0') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="1" type="success">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun-1') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="2" type="info">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-1') }}</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block :title="$t('keDingYiXiaoXiZuiDaZhi')">
        <wd-badge custom-class="badge" :modelValue="200" :max="99">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun-2') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="200" :max="10">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-2') }}</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block :title="$t('ziDingYiNeiRong')">
        <wd-badge custom-class="badge" modelValue="new">
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun-3') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" modelValue="hot">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-3') }}</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block :title="$t('dianZhuangLeiXing')">
        <wd-badge custom-class="badge" is-dot>{{ $t('shuJuChaXun') }}</wd-badge>
        <wd-badge custom-class="badge" is-dot>
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-4') }}</wd-button>
        </wd-badge>
      </demo-block>

      <demo-block :title="$t('xianShi_0Zhi')">
        <wd-badge custom-class="badge" :modelValue="0" show-zero>
          <wd-button :round="false" type="info" size="small">{{ $t('pingLun-4') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="0">
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-5') }}</wd-button>
        </wd-badge>
        <wd-badge custom-class="badge" :modelValue="0" is-dot>
          <wd-button :round="false" type="info" size="small">{{ $t('huiFu-6') }}</wd-button>
        </wd-badge>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
:deep(.badge) {
  margin: 0 30px 20px 0;
  display: inline-block;
}
</style>
