<template>
  <view class="collapse">
    <page-wraper>
      <demo-block title="toggleAll">
        <wd-button custom-class="custom-button" type="info" @click="collapse?.toggleAll()">{{ $t('quan-bu-qie-huan') }}</wd-button>
        <wd-button custom-class="custom-button" type="success" @click="collapse?.toggleAll(true)">{{ $t('quan-bu-zhan-kai') }}</wd-button>
        <wd-button custom-class="custom-button" type="primary" @click="collapse?.toggleAll(false)">{{ $t('quan-bu-shou-qi') }}</wd-button>
        <wd-button custom-class="custom-button" type="warning" @click="collapse?.toggleAll({ skipDisabled: true })">
          {{ $t('quan-bu-qie-huan-tiao-guo-jin-yong') }}
        </wd-button>
        <wd-button custom-class="custom-button" type="error" @click="collapse?.toggleAll({ expanded: true, skipDisabled: true })">
          {{ $t('quan-bu-xuan-zhong-tiao-guo-jin-yong') }}
        </wd-button>
      </demo-block>
      <demo-block :title="$t('ji-chu-yong-fa')" transparent>
        <wd-collapse ref="collapse" v-model="value1" @change="handleChange1">
          <wd-collapse-item
            :disabled="item.disabled"
            v-for="(item, index) in itemList"
            :before-expend="index === 2 ? beforeExpend : undefined"
            :key="index"
            :title="item.title"
            :name="item.name"
          >
            {{ item.body }}
          </wd-collapse-item>
        </wd-collapse>
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-title')" transparent>
        <wd-collapse v-model="value7">
          <wd-collapse-item name="item1">
            <template #title="{ expanded }">
              <view class="header">
                <text style="color: red">{{ $t('tong-guo-slot-zi-ding-yi-biao-ti') }}</text>
                <text>{{ expanded ? '我展开了' : '我已收起' }}</text>
              </view>
            </template>
            {{ desc7 }}
          </wd-collapse-item>
          <wd-collapse-item name="item2" disabled>
            <template #title="{ expanded, disabled }">
              <view class="header">
                <text v-if="disabled">{{ $t('bei-jin-yong') }}</text>
                <text style="color: red" v-else>{{ $t('tong-guo-slot-zi-ding-yi-title') }}</text>
                <text>{{ expanded ? '我展开了' : '我已收起' }}</text>
              </view>
            </template>
            {{ desc7 }}
          </wd-collapse-item>
        </wd-collapse>
      </demo-block>

      <demo-block :title="$t('shou-feng-qin')" transparent>
        <wd-collapse v-model="value2" :accordion="accordion" @change="handleChange2">
          <wd-collapse-item :title="$t('biao-qian-1')" name="item1">{{ $t('zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi') }}</wd-collapse-item>
          <wd-collapse-item :title="$t('biao-qian-2')" name="item2">
            {{
              $t(
                'zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi'
              )
            }}
          </wd-collapse-item>
          <wd-collapse-item :title="$t('biao-qian-3')" name="item3">{{ $t('zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-0') }}</wd-collapse-item>
        </wd-collapse>
      </demo-block>
      <demo-block :title="$t('jinYong')" transparent>
        <wd-collapse v-model="value3" @change="handleChange3">
          <wd-collapse-item :title="$t('biao-qian-1-0')" name="item1">
            {{
              $t(
                'zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-0'
              )
            }}
          </wd-collapse-item>
          <wd-collapse-item :title="$t('biao-qian-2-0')" name="item2" disabled>
            {{ $t('zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-1') }}
          </wd-collapse-item>
          <wd-collapse-item :title="$t('biao-qian-3-0')" name="item3">{{ $t('zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-2') }}</wd-collapse-item>
        </wd-collapse>
      </demo-block>

      <demo-block :title="$t('qian-tao')" transparent>
        <wd-collapse v-model="collapseRoot" @change="handleChange1">
          <wd-collapse-item
            custom-body-style="padding:0 0 0 14px"
            v-for="item in 5"
            :key="item"
            :title="$t('biao-qian-item') + item"
            :name="`${item}`"
          >
            <wd-collapse v-model="collapseList[item - 1]">
              <wd-collapse-item
                :custom-class="index === 0 ? 'no-border' : ''"
                v-for="(item, index) in itemList"
                :key="index"
                :title="item.title"
                :name="item.name"
              >
                {{ item.body }}
              </wd-collapse-item>
            </wd-collapse>
          </wd-collapse-item>
        </wd-collapse>
      </demo-block>

      <demo-block :title="$t('cha-kan-geng-duo')" transparent>
        <wd-collapse viewmore v-model="value4" @change="handleChange4">
          {{
            $t(
              'zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-1'
            )
          }}
        </wd-collapse>
      </demo-block>
      <demo-block :title="$t('cha-kan-geng-duo-hang-shu-xian-shi-she-zhi')" transparent>
        <wd-collapse viewmore v-model="value5" @change="handleChange5" :line-num="3">
          {{
            $t(
              'hang-shu-xian-shi-she-zhi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi'
            )
          }}
        </wd-collapse>
      </demo-block>
      <demo-block :title="$t('cha-kan-geng-duo-ju-ming-cha-cao')" transparent>
        <wd-collapse viewmore v-model="value6" @change="handleChange6" use-more-slot custom-more-slot-class="more-slot">
          {{
            $t(
              'ju-ming-cha-cao-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi-zhe-shi-yi-tiao-jian-dan-de-shi-li-wen-zi'
            )
          }}
          <template #more>
            <view>{{ $t('xian-shi-quan-bu') }}</view>
          </template>
        </wd-collapse>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { CollapseInstance } from '@/uni_modules/wot-design-uni/components/wd-collapse/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const toast = useToast()
const itemList = ref<Record<string, any>[]>([
  {
    title: t('biao-qian-1-1'),
    name: 'item1',
    body: t(
      'ru-ding-dan-chu-yu-zan-ting-zhuang-tai-jin-ru-wo-de-ding-dan-ye-mian-zhao-dao-yao-qu-xiao-de-ding-dan-dian-ji-qu-xiao-ding-dan-an-niu-xuan-ze-ding-dan-qu-xiao-yuan-yin-hou-dian-ji-xia-yi-bu-ti-jiao-shen-qing-ji-ke'
    )
  },
  {
    title: t('biao-qian-2-1'),
    name: 'item2',
    body: t(
      'yi-ban-qing-kuang-xia-mai-jia-zhi-neng-xiang-shang-hu-shen-qing-tui-kuan-shang-hu-que-ren-ke-yi-tui-kuan-hou-ke-yi-tong-guo-jie-kou-huo-zhe-shang-hu-ping-tai-xiang-wei-xin-zhi-fu-fa-qi-tui-kuan-shen-qing'
    ),
    disabled: true
  },
  {
    title: t('biao-qian-3-1'),
    name: 'item3',
    body: t(
      'jiang-shou-dao-de-you-zhi-liang-wen-ti-de-shang-pin-zhao-pian-huo-zhe-ding-dan-jie-tu-shang-chuan-dao-wei-xin-gong-zhong-zhang-hao-wei-xin-guan-zhu-lian-hua-hua-shang-gong-zhong-hao-wo-men-de-gong-zuo-ren-yuan-hui-jin-kuai-bang-nin-chu-li'
    )
  },
  {
    title: t('biao-qian-4'),
    name: 'item4',
    body: t(
      'qi-tian-wu-li-you-tui-huan-huo-zhi-du-suo-you-shang-pin-zai-bu-ying-xiang-er-ci-xiao-shou-de-qing-kuang-xia-7-tian-nei-yi-kuai-di-dan-qian-shou-wei-zhun-jun-jie-shou-ke-hu-tui-huan-huo'
    )
  },
  {
    title: t('biao-qian-5'),
    name: 'item5',
    body: t('q1-you-hui-quan-shi-yong-xiang-qing-xiang-qing-ye-mian-wo-de-wo-de-you-hui-you-hui-quan-gui-ze-shuo-ming')
  }
])

const collapse = ref<CollapseInstance>()

const value1 = ref<string[]>(['item1'])
const value2 = ref<string>('item1')
const value3 = ref<string[]>(['item1'])
const value4 = ref<boolean>(false)
const value5 = ref<boolean>(false)
const value6 = ref<boolean>(false)
const value7 = ref<string[]>(['item1'])
const desc7 = t(
  'ru-ding-dan-chu-yu-zan-ting-zhuang-tai-jin-ru-wo-de-ding-dan-ye-mian-zhao-dao-yao-qu-xiao-de-ding-dan-dian-ji-qu-xiao-ding-dan-an-niu-xuan-ze-ding-dan-qu-xiao-yuan-yin-hou-dian-ji-xia-yi-bu-ti-jiao-shen-qing-ji-ke-0'
)
const accordion = ref<boolean>(true)

const collapseRoot = ref<string[]>(['0'])
const collapseList = ref<Array<string[]>>([['item1'], ['item2'], ['item3'], ['item4'], ['item5']])

function handleChange1({ value }: any) {
  console.log(value)
}
function handleChange2({ value }: any) {
  console.log(value)
}
function handleChange3({ value }: any) {
  console.log(value)
}
function handleChange4({ value }: any) {
  console.log(value)
}
function handleChange5({ value }: any) {
  console.log(value)
}
function handleChange6({ value }: any) {
  console.log(value)
}
function handleChange7({ value }: any) {
  console.log(value)
}

/**
 * 折叠面板展开前回调方法
 * @param e
 */
function beforeExpend(name: string) {
  const index = itemList.value.findIndex((item) => {
    return item.name === name
  })
  if (index > -1) {
    itemList.value[index].body = t(
      'q1-qi-tian-wu-li-you-tui-huan-huo-zhi-du-suo-you-shang-pin-zai-bu-ying-xiang-er-ci-xiao-shou-de-qing-kuang-xia-7-tian-nei-yi-kuai-di-dan-qian-shou-wei-zhun-jun-jie-shou-ke-hu-tui-huan-huo-qi-tian-wu-li-you-tui-huan-huo-zhi-du-suo-you-shang-pin-zai-bu-ying-xiang-er-ci-xiao-shou-de-qing-kuang-xia-7-tian-nei-yi-kuai-di-dan-qian-shou-wei-zhun-jun-jie-shou-ke-hu-tui-huan-huo-qi-tian-wu-li-you-tui-huan-huo-zhi-du-suo-you-shang-pin-zai-bu-ying-xiang-er-ci-xiao-shou-de-qing-kuang-xia-7-tian-nei-yi-kuai-di-dan-qian-shou-wei-zhun-jun-jie-shou-ke-hu-tui-huan-huo-qi-tian-wu-li-you-tui-huan-huo-zhi-du-suo-you-shang-pin-zai-bu-ying-xiang-er-ci-xiao-shou-de-qing-kuang-xia-7-tian-nei-yi-kuai-di-dan-qian-shou-wei-zhun-jun-jie-shou-ke-hu-tui-huan-huo-qi-tian-wu-li-you-tui-huan-huo-zhi-du-suo-you-shang-pin-zai-bu-ying-xiang-er-ci-xiao-shou-de-qing-kuang-xia-7-tian-nei-yi-kuai-di-dan-qian-shou-wei-zhun-jun-jie-shou-ke-hu-tui-huan-huo-qi-tian-wu-li-you-tui-huan-huo-zhi-du-suo-you-shang-pin-zai-bu-ying-xiang-er-ci-xiao-shou-de-qing-kuang-xia-7-tian-nei-yi-kuai-di-dan-qian-shou-wei-zhun-jun-jie-shou-ke-hu-tui-huan-huo'
    )
  }

  return new Promise((reslove, reject) => {
    toast.loading(t('jia-zai-zhong-0'))
    setTimeout(() => {
      toast.close()
      reslove(true)
    }, 500)
  })
}
</script>
<style lang="scss" scoped>
.collapse {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :deep(.more-slot) {
    color: red;
  }

  :deep(.custom-button) {
    margin-right: 16px;
    margin-bottom: 16px;
  }
  :deep() {
    .no-border {
      &::after {
        display: none;
      }
    }
  }
}
</style>
