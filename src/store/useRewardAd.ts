import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'

// 是否免除广告，免除后不再显示广告
const isFree = ref(false)

export function useRewardAd() {
  const { loading: showLoading, close: closeLoading, show: showToast } = useToast()

  let rewardVideoAd: UniApp.InterstitialAdContext | null = null

  isFreeAd()

  // 用户观看过广告的话会在storage中存一个时间戳，写个方法判断是否存在这个时间戳，距离当前是否超过一天，超过一天则必须观看，否则不强制
  function isFreeAd() {
    const freeAdTime = uni.getStorageSync('freeAdTime')
    if (freeAdTime) {
      const now = new Date().getTime()
      const diff = now - freeAdTime
      if (diff > 24 * 60 * 60 * 1000) {
        isFree.value = false
      } else {
        isFree.value = true
      }
    } else {
      isFree.value = false
    }
  }

  /**
   * 创建激励视频广告
   */
  function createRewardVideoAd() {
    if (uni.createRewardedVideoAd) {
      rewardVideoAd = uni.createRewardedVideoAd({ adUnitId: 'adunit-91e0e9b07b57557a' })
      rewardVideoAd.onLoad(() => {
        console.log('激励视频 广告加载成功')
      })
      rewardVideoAd.onError((err) => {
        console.log('激励视频 广告加载失败', err)
      })
      rewardVideoAd.onClose((res) => {
        if (res && res.isEnded) {
          // 看完广告则存一个时间戳
          console.log('激励视频 广告完成')
          isFree.value = true
          uni.setStorageSync('freeAdTime', new Date().getTime())
          showToast({ msg: '广告观看成功，感谢支持' })
        } else {
          console.log('激励视频 广告未完成')
        }
      })
    } else {
      console.log('当前环境不支持激励视频广告')
    }
  }

  /**
   * 打开激励视频广告
   */
  function showRewardAd() {
    showLoading({ msg: '正在加载激励视频...' })
    rewardVideoAd &&
      rewardVideoAd
        .show()
        .then(() => {
          closeLoading()
        })
        .catch(() => {
          rewardVideoAd!
            .load()
            .then(() =>
              rewardVideoAd!.show().finally(() => {
                closeLoading()
              })
            )
            .catch((err) => {
              closeLoading()
              console.log('激励视频 广告显示失败')
            })
        })
  }

  return { createRewardVideoAd, showRewardAd, isFree }
}
