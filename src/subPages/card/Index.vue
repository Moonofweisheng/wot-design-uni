<!--
 * @Author: weisheng
 * @Date: 2023-06-13 11:47:12
 * @LastEditTime: 2025-04-02 21:24:38
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/card/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <view>
      <demo-block :title="$t('ji-ben-shi-yong')" transparent>
        <wd-card :title="$t('jing-ying-fen-xi')">
          {{
            $t(
              'yi-ban-de-jian-ju-nei-rong-you-cheng-ban-de-dang-de-wei-yuan-hui-huo-ji-lv-jian-cha-wei-yuan-hui-jiang-chu-li-yi-jian-huo-fu-yi-fu-cha-jie-lun-tong-shen-su-ren-jian-mian-ting-qu-qi-yi-jian-fu-yi-fu-cha-de-jie-lun-he-jue-ding-ying-jiao-gei-shen-su-ren-yi-fen'
            )
          }}
          <template #footer>
            <wd-button size="small" plain>{{ $t('cha-kan-xiang-qing') }}</wd-button>
          </template>
        </wd-card>
        <wd-card :title="$t('xin-ding-dan')">
          <view class="content">
            <image
              src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
              alt="joy"
              style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view>{{ $t('mi-zi-lan-mizland-xin-xi-lan-jin-kou-duo-hua-zhong') }}</view>
              <view>{{ $t('shu-liang-1-jian') }}</view>
              <view>{{ $t('jine2908') }}</view>
              <view>{{ $t('mai-jia-ni-cheng-joy') }}</view>
            </view>
          </view>
          <template #footer>
            <wd-button size="small" plain>{{ $t('cha-kan-xiang-qing-0') }}</wd-button>
          </template>
        </wd-card>
      </demo-block>
      <demo-block :title="$t('qu-chu-footer')" transparent>
        <wd-card :title="$t('wang-ming')" type="rectangle">
          <view>
            <image
              src="https://avatars.githubusercontent.com/u/26426873?v=4"
              alt="joy"
              style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px"
            />
            {{ $t('da-jia-hao-wo-jiao-mo-yu') }}
          </view>
        </wd-card>
        <wd-card type="rectangle">
          <template #title>
            <view class="title">
              <view>{{ $t('20200203-fu-wu-dao-qi') }}</view>
              <view class="title-tip">
                <wd-icon name="warning" size="14px" custom-style="vertical-align: bottom" />
                {{ $t('nin-ke-yi-qu-dian-nao-shang-shi-yong-gai-fu-wu') }}
              </view>
            </view>
          </template>

          <view style="height: 40px" class="content">
            <image
              src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
              width="40"
              height="40"
              alt="joy"
              style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view class="custom-main">{{ $t('zhi-yun-hao-ke-crm-duan-xin-cui-ping-ying-xiao') }}</view>
              <view class="custom-sub">{{ $t('gao-ji-ban-kuai-su-xi-fen-zhou-qi-yi-nian') }}</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">{{ $t('ping-jia') }}</wd-button>
              <wd-button size="small">{{ $t('li-ji-shi-yong') }}</wd-button>
            </view>
          </template>
        </wd-card>
      </demo-block>
      <demo-block :title="$t('ju-xing-ka-pian')" transparent>
        <wd-card :title="$t('20200203-fu-wu-dao-qi-0')" type="rectangle">
          <view style="height: 40px" class="content">
            <image
              src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
              width="40"
              height="40"
              alt="joy"
              style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view class="custom-main">{{ $t('zhi-yun-hao-ke-crm-duan-xin-cui-ping-ying-xiao') }}</view>
              <view class="custom-sub">{{ $t('gao-ji-ban-kuai-su-xi-fen-zhou-qi-yi-nian-0') }}</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">{{ $t('ping-jia-0') }}</wd-button>
              <wd-button size="small">{{ $t('li-ji-shi-yong') }}</wd-button>
            </view>
          </template>
        </wd-card>
        <wd-card type="rectangle">
          <template #title>
            <view class="title">
              <view>{{ $t('20200203-fu-wu-dao-qi-1') }}</view>
              <view class="title-tip">
                <wd-icon name="warning" size="14px" custom-style="vertical-align: bottom" />
                {{ $t('nin-ke-yi-qu-dian-nao-shang-shi-yong-gai-fu-wu') }}
              </view>
            </view>
          </template>

          <view style="height: 40px" class="content">
            <image
              src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
              width="40"
              height="40"
              alt="joy"
              style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view class="custom-main">{{ $t('zhi-yun-hao-ke-crm-duan-xin-cui-ping-ying-xiao') }}</view>
              <view class="custom-sub">{{ $t('gao-ji-ban-kuai-su-xi-fen-zhou-qi-yi-nian-1') }}</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">{{ $t('ping-jia-1') }}</wd-button>
              <wd-button size="small">{{ $t('li-ji-shi-yong') }}</wd-button>
            </view>
          </template>
        </wd-card>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.wot-theme-dark {
  .title-tip {
    color: rgba(232, 230, 227, 0.8);
  }

  .custom-main {
    color: $-dark-color;
  }

  .custom-sub {
    color: $-dark-color;
  }
}

.content,
.title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.content {
  justify-content: flex-start;
}

.title {
  justify-content: space-between;
}

.title-tip {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}

.custom-main {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
}

.custom-sub {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
</style>
