<template>
  <view>
    <wd-popup v-model="showPopup" :close-on-click-modal="false" custom-class="wd-privacy-popup" @close="handleClose">
      <view class="wd-privacy-popup__header">
        <!--标题-->
        <view class="wd-picker__title">{{ title }}</view>
      </view>
      <view class="wd-privacy-popup__container">
        <text>{{ desc }}</text>
        <text class="wd-privacy-popup__container-protocol" @click="openPrivacyContract">{{ protocol }}</text>
        <text>{{ subDesc }}</text>
      </view>
      <view class="wd-privacy-popup__footer">
        <wd-button custom-class="wd-privacy-popup__footer-disagree " size="medium" round plain buttonId="disagree-btn" @click="handleDisagree">
          {{ $t('ju-jue') }}
        </wd-button>
        <wd-button
          class="wd-privacy-popup__footer-agree"
          round
          size="medium"
          buttonId="agree-btn"
          open-type="agreePrivacyAuthorization"
          @agreeprivacyauthorization="handleAgree"
        >
          {{ $t('tong-yi') }}
        </wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-privacy-popup',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface Props {
  title?: string // 标题
  desc?: string // 描述
  subDesc?: string // 字描述
  protocol?: string // 协议名称
}

// 定义props，不在默认值中使用t函数
const props = withDefaults(defineProps<Props>(), {
  title: '',
  desc: '',
  subDesc: '',
  protocol: ''
})

// 使用计算属性提供默认值
const title = computed(() => props.title || t('yong-hu-yin-si-bao-hu-ti-shi'))
const desc = computed(
  () => props.desc || t('gan-xie-nin-shi-yong-ben-ying-yong-nin-shi-yong-ben-ying-yong-de-fu-wu-zhi-qian-qing-zi-xi-yue-du-bing-tong-yi')
)
const subDesc = computed(
  () =>
    props.subDesc ||
    t(
      'dang-nin-dian-ji-tong-yi-bing-kai-shi-shi-yong-chan-pin-fu-wu-shi-ji-biao-shi-ni-yi-li-jie-bing-tong-xi-gai-tiao-kuan-nei-rong-gai-tiao-kuan-jiang-dui-nin-chan-sheng-fa-lv-yue-shu-li-ru-nin-ju-jue-jiang-wu-fa-shi-yong-xiang-ying-fu-wu'
    )
)
const protocol = computed(() => props.protocol || t('yong-hu-yin-si-bao-hu-zhi-yin'))
const emit = defineEmits(['agree', 'disagree'])

const showPopup = ref<boolean>(false) // 是否展示popup

const privacyResolves = ref(new Set()) // onNeedPrivacyAuthorization的reslove

const privacyHandler = (resolve: any) => {
  showPopup.value = true
  privacyResolves.value.add(resolve)
}

onBeforeMount(() => {
  // 注册监听
  if (wx.onNeedPrivacyAuthorization) {
    wx.onNeedPrivacyAuthorization((resolve: any) => {
      if (typeof privacyHandler === 'function') {
        privacyHandler(resolve)
      }
    })
  }
})

/**
 * 同意隐私协议
 */
function handleAgree() {
  showPopup.value = false
  privacyResolves.value.forEach((resolve: any) => {
    resolve({
      event: 'agree',
      buttonId: 'agree-btn'
    })
  })
  privacyResolves.value.clear()
  emit('agree')
}

/**
 * 拒绝隐私协议
 */
function handleDisagree() {
  showPopup.value = false
  privacyResolves.value.forEach((resolve: any) => {
    resolve({
      event: 'disagree'
    })
  })
  privacyResolves.value.clear()
}

/**
 * 打开隐私协议
 */
function openPrivacyContract() {
  ;(wx as any).openPrivacyContract({
    success: (res: any) => {
      console.log('openPrivacyContract success')
    },
    fail: (res: any) => {
      console.error('openPrivacyContract fail', res)
    }
  })
}

/**
 * 弹出框关闭时清空
 */
function handleClose() {
  privacyResolves.value.clear()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
