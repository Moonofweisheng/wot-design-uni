<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page">
      <view class="page__hd">
        <view class="page__title">
          <view class="logo"></view>
          <view class="inline">
            Wot UI
            <text class="version">@{{ packageConfig.version }}</text>
          </view>
        </view>
        <view class="page__desc">
          {{
            $t(
              'wot-design-uni-shi-yi-ge-ji-yu-vue3ts-kai-fa-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti'
            )
          }}
        </view>
      </view>
      <view class="page__bd">
        <block v-for="(item, index) in list" :key="index">
          <view class="kind-list__item">
            <view :id="item.id" class="wd-flex kind-list__item-hd" @click="kindToggle(item.id)">
              <view class="wd-flex__item title">{{ item.name }}</view>
              <image class="kind-list__img" :src="item.icon"></image>
            </view>
            <view :class="['kind-list__item-bd', openState[item.id] ? 'kind-list__item-bd_show' : '']">
              <view :class="['wd-cells', openState[item.id] ? 'wd-cells_show' : '']">
                <wd-cell
                  v-for="(page, j) in item.pages"
                  :key="j"
                  is-link
                  :label="page.name"
                  @click="handleClick(`/subPages/${page.id}/Index`)"
                ></wd-cell>
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import packageConfig from '../../../package.json'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const imgModules: any = import.meta.glob('../images/*.png', { eager: true })

// 使用computed使list响应语言变化
const list = computed(() => [
  {
    id: 'widget',
    name: t('ji-chu'),
    open: false,
    icon: imgModules['../images/icon_nav_widget.png'].default,
    pages: [
      {
        id: 'button',
        name: t('button-an-niu')
      },
      {
        id: 'icon',
        name: t('icon-tu-biao')
      },
      {
        id: 'layout',
        name: t('layout-bu-ju')
      },
      {
        id: 'configProvider',
        name: t('configprovider-quan-ju-pei-zhi')
      },
      {
        id: 'popup',
        name: t('popup-dan-chu-ceng')
      },
      {
        id: 'resize',
        name: t('resize-jian-ting-yuan-su-chi-cun-bian-hua')
      },
      {
        id: 'transition',
        name: t('transition-dong-hua')
      },
      {
        id: 'fab',
        name: t('fab-xuan-fu-an-niu')
      },
      {
        id: 'text',
        name: t('text-wen-ben')
      },
      {
        id: 'rootPortal',
        name: t('rootportal-title')
      }
    ]
  },
  {
    id: 'nav',
    name: t('dao-hang'),
    open: false,
    icon: imgModules['../images/icon_nav_nav.png'].default,

    pages: [
      {
        id: 'pagination',
        name: t('pagination-fen-ye')
      },
      {
        id: 'popover',
        name: t('popover-qi-pao')
      },
      {
        id: 'tabs',
        name: t('tabs-biao-qian-ye')
      },
      {
        id: 'segmented',
        name: t('segmented-fen-duan-qi')
      },
      {
        id: 'tabbar',
        name: t('tabbar-biao-qian-lan')
      },
      {
        id: 'navbar',
        name: t('navbar-dao-hang-lan')
      },
      {
        id: 'sidebar',
        name: t('sidebar-ce-bian-lan')
      },
      {
        id: 'backtop',
        name: t('backtop-hui-dao-ding-bu')
      },
      {
        id: 'indexBar',
        name: t('indexbar-suo-yin-lan')
      }
    ]
  },
  {
    id: 'form',
    name: t('shu-ju-shu-ru'),
    open: false,
    icon: imgModules['../images/icon_nav_form.png'].default,
    pages: [
      {
        id: 'calendar',
        name: t('calendar-ri-li-xuan-ze-qi')
      },
      {
        id: 'calendarView',
        name: t('calendarview-ri-li-mian-ban')
      },
      {
        id: 'checkbox',
        name: t('checkbox-fu-xuan-kuang')
      },
      {
        id: 'colPicker',
        name: t('colpicker-duo-lie-xuan-ze-qi')
      },
      {
        id: 'datetimePicker',
        name: t('datetimepicker-shi-jian-xuan-ze-qi')
      },
      {
        id: 'datetimePickerView',
        name: t('datetimepickerview-shi-jian-xuan-ze-qi-shi-tu')
      },
      {
        id: 'input',
        name: t('input-shu-ru-kuang')
      },
      {
        id: 'textarea',
        name: t('textarea-wen-ben-yu')
      },
      {
        id: 'inputNumber',
        name: t('inputnumber-ji-shu-qi')
      },
      {
        id: 'picker',
        name: t('picker-xuan-ze-qi')
      },
      {
        id: 'pickerView',
        name: t('pickerview-xuan-ze-qi-shi-tu')
      },
      {
        id: 'radio',
        name: t('radio-dan-xuan-kuang')
      },
      {
        id: 'rate',
        name: t('rate-ping-fen')
      },
      {
        id: 'search',
        name: t('search-sou-suo')
      },
      {
        id: 'selectPicker',
        name: t('selectpicker-dan-fu-xuan-xuan-ze-qi')
      },
      {
        id: 'slider',
        name: t('slider-hua-kuai')
      },
      {
        id: 'switch',
        name: t('switch-kai-guan')
      },
      {
        id: 'form',
        name: t('form-biao-dan')
      },
      {
        id: 'upload',
        name: t('upload-shang-chuan')
      },
      {
        id: 'passwordInput',
        name: t('passwordinput-mi-ma-shu-ru-kuang')
      },
      {
        id: 'signature',
        name: t('signature-qian-ming')
      }
    ]
  },
  {
    id: 'feedback',
    name: t('fan-kui'),
    open: false,
    icon: imgModules['../images/icon_nav_feedback.png'].default,
    pages: [
      {
        id: 'actionSheet',
        name: t('actionsheet-shang-la-cai-dan')
      },
      {
        id: 'dropMenu',
        name: t('dropmenu-xia-la-cai-dan')
      },
      {
        id: 'floatingPanel',
        name: t('floatingpanel-fu-dong-mian-ban')
      },
      {
        id: 'loading',
        name: t('loading-jia-zai-zhi-shi-qi')
      },
      {
        id: 'messageBox',
        name: t('messagebox-dan-kuang')
      },
      {
        id: 'overlay',
        name: t('overlay-zhe-zhao-ceng')
      },
      {
        id: 'noticeBar',
        name: t('noticebar-tong-zhi-lan')
      },
      {
        id: 'progress',
        name: t('progress-jin-du-tiao')
      },
      {
        id: 'circle',
        name: t('circle-huan-xing-jin-du-tiao')
      },
      {
        id: 'sortButton',
        name: t('sortbutton-pai-xu-an-niu')
      },
      {
        id: 'statusTip',
        name: t('statustip-que-sheng-ti-shi')
      },
      {
        id: 'swipeAction',
        name: t('swipeaction-hua-dong-cao-zuo')
      },
      {
        id: 'toast',
        name: t('toast-qing-ti-shi')
      },
      {
        id: 'notify',
        name: t('notify-xiao-xi-tong-zhi')
      },
      {
        id: 'tooltip',
        name: t('tooltip-wen-zi-ti-shi')
      },
      {
        id: 'countDown',
        name: t('countdown-dao-ji-shi')
      },
      {
        id: 'countTo',
        name: t('countto-shu-zi-gun-dong')
      },
      {
        id: 'keyboard',
        name: t('keyboard-xu-ni-jian-pan')
      },
      {
        id: 'numberKeyboard',
        name: t('numberkeyboard-shu-zi-jian-pan')
      }
    ]
  },
  {
    id: 'show',
    name: t('shu-ju-zhan-shi'),
    open: false,
    icon: imgModules['../images/icon_nav_show.png'].default,
    pages: [
      {
        id: 'badge',
        name: t('badge-hui-biao')
      },
      {
        id: 'card',
        name: t('card-ka-pian')
      },
      {
        id: 'cell',
        name: t('cell-dan-yuan-ge')
      },
      {
        id: 'collapse',
        name: t('collapse-zhe-die-mian-ban')
      },
      {
        id: 'curtain',
        name: t('curtain-mu-lian')
      },
      {
        id: 'divider',
        name: t('divider-fen-ge-xian')
      },
      {
        id: 'gap',
        name: t('gap-jian-ge-cao')
      },
      {
        id: 'img',
        name: t('img-tu-pian')
      },
      {
        id: 'imgCropper',
        name: t('imgcropper-tu-pian-cai-jian')
      },
      {
        id: 'grid',
        name: t('grid-gong-ge')
      },
      {
        id: 'loadmore',
        name: t('loadmore-jia-zai-geng-duo')
      },
      {
        id: 'skeleton',
        name: t('skeleton-gu-jia-ping')
      },
      {
        id: 'steps',
        name: t('steps-bu-zhou-tiao')
      },
      {
        id: 'sticky',
        name: t('sticky-xi-ding-bu-ju')
      },
      {
        id: 'tag',
        name: t('tag-biao-qian')
      },
      {
        id: 'watermark',
        name: t('watermark-shui-yin')
      },
      {
        id: 'swiper',
        name: t('swiper-lun-bo-tu')
      },
      {
        id: 'table',
        name: t('table-biao-ge')
      },
      {
        id: 'waterfall',
        name: '瀑布流'
      }
    ]
  }
])

function handleClick(url: string) {
  uni.navigateTo({
    url
  })
}

// 创建一个状态来跟踪每个分类的打开状态
const openState = ref<Record<string, boolean>>({})

function kindToggle(id: string) {
  openState.value[id] = !openState.value[id]
}

onShareAppMessage(() => {
  return {
    title: t('yi-ge-ji-yu-vue3ts-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti'),
    path: '/pages/index/Index',
    imageUrl: imgModules['../images/share.png'].default
  }
})

onShareTimeline(() => {
  return {
    title: t('yi-ge-ji-yu-vue3ts-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti-0'),
    path: '/pages/index/Index',
    imageUrl: imgModules['../images/share.png'].default
  }
})
</script>

<style lang="scss" scoped>
.wot-theme-dark {
  .page__hd,
  .kind-list__item {
    background: $-dark-background2;
  }

  .title {
    color: $-dark-color;
  }

  :deep(.wd-cell__label) {
    color: $-dark-color3 !important;
  }

  .kind-list__img {
    filter: invert(100%);
  }
}

.page__hd {
  padding: 40px 40px 30px;
  margin-bottom: 30px;
  background: #fff;
}

.page__title {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  color: #0083ff;
}

.page__desc {
  margin-top: 20px;
  color: #999;
  text-align: left;
  font-size: 12px;
}

.page__bd {
  padding: 0 15px 30px 20px;
  user-select: none;
}

.logo {
  display: inline-block;
  margin-right: 14px;
  width: 40px;
  height: 40px;
  background: url('data:image/png;base64,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')
    no-repeat;
  background-size: cover;
  vertical-align: middle;
}

.inline {
  display: inline-block;
  vertical-align: middle;
}

.version {
  font-size: 14px;
}

.wd-cell_access {
  padding: 15px 20px;
}

.wd-cell__ft {
  padding-right: 16px;
  position: relative;
}

.wd-cells {
  position: relative;
  margin-top: 0;
  opacity: 0;
  transform: translateY(-50%);
  transition: 0.3s;

  :deep(.wd-cell__label) {
    color: rgba(0, 0, 0, 0.65);
  }
}

.wd-cells_show {
  opacity: 1;
  transform: translateY(0);
}

.kind-list__item {
  border-radius: 30px;
  background: #fff;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.kind-list__img {
  width: 20px;
  height: 20px;
}

.kind-list__item-hd {
  padding: 15px 30px;
  transition: opacity 0.3s;
}

.kind-list__item-bd {
  height: 0;
  overflow: hidden;
}

.kind-list__item-bd_show {
  height: auto;
}

.wd-flex {
  display: flex;
}

.wd-flex__item {
  flex: 1;
}

.title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}

.page-name {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
}

.wd-tool-right-line-angle::after {
  content: ' ';
  display: inline-block;
  height: 8px;
  width: 8px;
  border-width: 2px 2px 0 0;
  border-color: #b2b2b2;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -5px;
  right: 0;
}
</style>
