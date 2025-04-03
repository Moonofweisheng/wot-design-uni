<template>
  <page-wraper>
    <view>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-notice-bar text="这是一条消息提示信息这是一条消息提示信息这是一条消息提示信息" prefix="warn-bold" />
      </demo-block>

      <demo-block :title="$t('lei-xing-xiu-gai')">
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

      <demo-block :title="$t('jin-zhi-gun-dong')">
        <wd-notice-bar :scrollable="false" text="通知被禁或时段内消息屏蔽可能造成消…" prefix="warn-bold"></wd-notice-bar>
      </demo-block>

      <demo-block :title="$t('cha-cao')">
        <wd-notice-bar :scrollable="false">
          <template #prefix>
            <wd-icon custom-class="prefix" name="warn-bold">{{ $t('zhan-wei-fu') }}</wd-icon>
          </template>
          {{ $t('tong-zhi-bei-jin-huo-shi-duan-nei-xiao-xi-ping-bi-ke-neng-zao-cheng-xiao') }}
          <template #suffix>
            <div style="color: #4d80f0">{{ $t('cha-kan') }}</div>
          </template>
        </wd-notice-bar>
      </demo-block>

      <demo-block :title="$t('ke-guan-bi-de')">
        <wd-notice-bar text="挂起后，电脑与手机均不会有新客户接入。挂起后，电脑与手机均不会有新客户接入。" closable prefix="warn-bold" />
      </demo-block>

      <demo-block :title="$t('duo-hang-zhan-shi')">
        <wd-notice-bar
          text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
          wrapable
          :scrollable="false"
        />
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-yan-se-0')">
        <wd-notice-bar
          text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
          prefix="check-outline"
          color="#34D19D"
          background-color="#f0f9eb"
        ></wd-notice-bar>
      </demo-block>

      <demo-block :title="$t('duo-wen-ben-lun-bo')">
        <wd-notice-bar @click="handleClick" :text="textArray" prefix="check-outline" @next="onNext" />
      </demo-block>

      <demo-block :title="$t('chui-zhi-gun-dong')">
        <wd-notice-bar @click="handleClick" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
        <wd-notice-bar @click="handleClick" prefix="warn-bold" direction="vertical" text="只有一条消息不会滚动" :delay="3" custom-class="space" />
      </demo-block>

      <demo-block :title="$t('zhong-zhi-bo-fang-dong-hua')">
        <wd-notice-bar ref="notice" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />

        <wd-button @click="handleReset">{{ $t('zhong-zhi-bo-fang-dong-hua-0') }}</wd-button>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { type NoticeBarInstance } from '@/uni_modules/wot-design-uni/components/wd-notice-bar/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const notice = ref<NoticeBarInstance>()

function handleReset() {
  notice.value?.reset()
}

const textArray = ref([
  t('huan-ying-shi-yong-wot-design-uni'),
  t('gai-zu-jian-ku-ji-yu-uniapp-vue3-ts-gou-jian'),
  t('xiang-mu-di-zhi-httpsgithubcommoonofweishengwotdesignuni'),
  t('wo-men-de-mu-biao-shi-da-zao-zui-qiang-uniapp-zu-jian-ku'),
  t('cheng-zhi-yao-qing-da-jia-gong-tong-jian-she'),
  t(
    'zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi'
  )
])

const onNext = (index: number) => {
  console.log('展示下一条，index: ', index)
  console.log('文本是：' + textArray.value[index])
}

function handleClick(result: { text: string; index: number }) {
  console.log(result)
}
</script>
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
