<template>
  <page-wraper>
    <view>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-notice-bar
          :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi')"
          prefix="warn-bold"
        />
      </demo-block>

      <demo-block :title="$t('lei-xing-xiu-gai')">
        <wd-notice-bar
          type="danger"
          :text="
            $t(
              'dang-qian-wang-luo-bu-ke-yong-qing-jian-cha-ni-de-wang-luo-she-zhi-dang-qian-wang-luo-bu-ke-yong-qing-jian-cha-ni-de-wang-luo-she-zhi'
            )
          "
          prefix="wifi-error"
          custom-class="space"
        />
        <wd-notice-bar
          type="info"
          :text="
            $t(
              'dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing'
            )
          "
          prefix="check-outline"
        />
      </demo-block>

      <demo-block :title="$t('jin-zhi-gun-dong')">
        <wd-notice-bar :scrollable="false" :text="$t('yu-mai-gui-hua-tong-zai-jiu-zhong-bu-si-shao-nian-you')" prefix="warn-bold"></wd-notice-bar>
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
        <wd-notice-bar
          :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-0')"
          closable
          prefix="warn-bold"
        />
      </demo-block>

      <demo-block :title="$t('duo-hang-zhan-shi')">
        <wd-notice-bar
          :text="
            $t(
              'zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi'
            )
          "
          wrapable
          :scrollable="false"
        />
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-yan-se-0')">
        <wd-notice-bar
          :text="$t('zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-1')"
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
        <wd-notice-bar
          @click="handleClick"
          prefix="warn-bold"
          direction="vertical"
          :text="$t('zhi-you-yi-tiao-xiao-xi-bu-hui-gun-dong')"
          :delay="3"
          custom-class="space"
        />
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
