<template>
  <page-wraper>
    <wd-toast />
    <demo-block :title="$t('jiBenYongFa')" transparent>
      <wd-tabs v-model="tab1" @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="$t('biao-qian-item') + item">
            <view class="content">
              {{ $t('nei-rong') }}{{ tab1 + 1 }}
              <view>
                <wd-button @click="tab1 < 3 ? tab1++ : (tab1 = 0)">{{ $t('xia-yi-ge') }}</wd-button>
              </view>
            </view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>
    <demo-block :title="$t('name-pi-pei')" transparent>
      <wd-tabs v-model="tab" @change="handleChange">
        <block v-for="item in tabs" :key="item">
          <wd-tab :title="item" :name="item">
            <view class="content">{{ $t('nei-rong') }}{{ tab }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('shi-yong-hui-biao')" transparent>
      <wd-tabs v-model="tabWithBadge" @change="handleChange">
        <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="item.title" :badge-props="item.badgeProps">
          <view class="content">{{ item.title + $t('itemtitle-hui-biao') }}</view>
        </wd-tab>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('zi-dong-tiao-zheng-di-bu-tiao-kuan-du')" transparent>
      <wd-tabs v-model="autoLineWidthTab" @change="handleChange" auto-line-width>
        <block v-for="item in autoLineWidthTabs" :key="item">
          <wd-tab :title="item" :name="item">
            <view class="content">{{ $t('nei-rong') }}{{ autoLineWidthTab }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('nian-xing-bu-ju')" transparent>
      <wd-tabs v-model="tab2" sticky @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="$t('biao-qian-item') + item">
            <view class="content">{{ $t('nei-rong') }}{{ tab2 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('jin-yong-tab')" transparent>
      <wd-tabs v-model="tab3" @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="$t('biao-qian-item') + item" :disabled="item === 1">
            <view class="content">{{ $t('nei-rong') }}{{ tab3 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('dian-ji-shi-jian')" transparent>
      <wd-tabs v-model="tab4" @click="handleClick" @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="$t('biao-qian-item') + item">
            <view class="content">{{ $t('nei-rong') }}{{ tab4 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('qie-huan-dong-hua')" transparent>
      <wd-tabs v-model="tab8" animated @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="$t('biao-qian-item') + item">
            <view class="content">{{ $t('nei-rong') }}{{ tab8 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('shou-shi-hua-dong')" transparent>
      <wd-tabs v-model="tab5" swipeable animated @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="$t('biao-qian-item') + item">
            <view class="content">{{ $t('nei-rong') }}{{ tab5 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('shu-liang-da-yu-6-shi-ke-gun-dong')" transparent>
      <wd-tabs v-model="tab6" @change="handleChange">
        <block v-for="item in 7" :key="item">
          <wd-tab :title="$t('biao-qian-item') + item">
            <view class="content">{{ $t('nei-rong') }}{{ tab6 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('zuo-dui-qi-chao-chu-ji-ke-gun-dong')" transparent>
      <wd-tabs v-model="tab9" slidable="always" @change="handleChange">
        <block v-for="item in 5" :key="item">
          <wd-tab :title="$t('chao-da-biao-qian-item') + item">
            <view class="content">{{ $t('nei-rong') }}{{ tab9 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('shu-liang-da-yu-10-shi-chu-xian-dao-hang-di-tu')" transparent>
      <wd-tabs v-model="tab7" @change="handleChange">
        <block v-for="item in 11" :key="item">
          <wd-tab :title="$t('biao-qian-item') + item">
            <view class="large">{{ $t('nei-rong') }}{{ tab7 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block :title="$t('zai-dan-chu-kuang-zhong-shi-yong-0')" transparent>
      <view class="section">
        <wd-button @click="handleOpenClick">{{ $t('da-kai-dan-chuang') }}</wd-button>
      </view>
    </demo-block>

    <wd-popup v-model="showPopup" position="bottom" safe-area-inset-bottom @after-enter="handlePopupShow" closable custom-style="padding: 0 24rpx;">
      <view class="title">{{ $t('zai-dan-chu-kuang-zhong-shi-yong-0') }}</view>
      <wd-tabs v-model="tab10" ref="tabsRef">
        <wd-tab v-for="item in tabs" :key="item" :title="item" :name="item">
          <view class="content">{{ $t('nei-rong') }}{{ tab10 }}</view>
        </wd-tab>
      </wd-tabs>
    </wd-popup>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { TabsInstance } from '@/uni_modules/wot-design-uni/components/wd-tabs/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const tabs = ref(['this', 'is', 'a', 'individual', 'example'])

const tab = ref('a')

const tabWithBadge = ref(0)

const tabsWithBadge = computed(() => {
  return [
    {
      title: t('pu-tong-shu-zhi'),
      badgeProps: {
        modelValue: 10,
        right: '-8px'
      }
    },
    {
      title: t('zui-da-zhi-0'),
      badgeProps: {
        modelValue: 100,
        max: 99,
        right: '-8px'
      }
    },
    {
      title: t('dian-zhuang-0'),
      badgeProps: {
        isDot: true,
        right: '-8px',
        showZero: true
      }
    }
  ]
})

const autoLineWidthTabs = ref(['Wot', 'Design', 'Uni'])
const autoLineWidthTab = ref('Design')

const tab1 = ref<number>(0)
const tab2 = ref<number>(0)
const tab3 = ref<number>(1)
const tab4 = ref<number>(2)
const tab5 = ref<number>(0)
const tab6 = ref<number>(0)
const tab7 = ref<number>(0)
const tab8 = ref<number>(0)
const tab9 = ref<number>(0)
const tab10 = ref<number>(3)

const toast = useToast()
function handleClick({ index, name }: any) {
  console.log('event', { index, name })
  toast.show(t('dian-ji-le-biao-qian-name') + name)
}
function handleChange(event: any) {
  console.log('change', event)
}

const showPopup = ref(false) // 控制popup显示
const tabsRef = ref<TabsInstance>() // 获取分段器实例

/**
 * 点击按钮打开popup
 */
function handleOpenClick() {
  showPopup.value = true
}
/**
 * popup打开后更新分段器样式
 */
function handlePopupShow() {
  tabsRef.value?.updateLineStyle(false)
}
</script>
<style lang="scss" scoped>
.content {
  height: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.large {
  line-height: 320px;
  text-align: center;
}
.title {
  display: flex;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  padding: 24rpx 0;
}
</style>
