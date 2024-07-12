<template>
  <view>
    <wd-toast />
    <page-wraper>
      <demo-block title="大型分段器" transparent>
        <view class="section">
          <wd-segmented :options="list" v-model:value="current" size="large" @change="handleChange"></wd-segmented>
        </view>
      </demo-block>
      <demo-block title="默认分段器" transparent>
        <view class="section">
          <wd-segmented :options="list" v-model:value="current1"></wd-segmented>
        </view>
      </demo-block>

      <demo-block title="小型分段器" transparent>
        <view class="section">
          <wd-segmented :options="list" v-model:value="current2" size="small"></wd-segmented>
        </view>
      </demo-block>

      <demo-block title="带振动效果的分段器" transparent>
        <view class="section">
          <wd-segmented :options="list" v-model:value="current3" :vibrate-short="true"></wd-segmented>
        </view>
      </demo-block>

      <demo-block title="禁用分段器" transparent>
        <view class="section">
          <wd-segmented :options="list" v-model:value="current5" disabled></wd-segmented>
        </view>
      </demo-block>

      <demo-block title="自定义渲染分段器标签" transparent>
        <view class="section">
          <wd-segmented :options="list1" v-model:value="current4" :vibrate-short="true" @change="handleChange">
            <template #label="{ option }">
              <view class="section-slot">
                <image style="border-radius: 50%; width: 32px; height: 32px" :src="option.payload.avatar" />

                <view class="name">
                  {{ option.value }}
                </view>
              </view>
            </template>
          </wd-segmented>
        </view>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import type { SegmentedOption } from '@/uni_modules/wot-design-uni/components/wd-segmented/types'
import { ref } from 'vue'

const list = ref<string[]>(['评论', '点赞', '贡献', '打赏'])

const list1 = ref([
  {
    value: '李雷',
    disabled: false,
    payload: {
      avatar: 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg'
    }
  },
  {
    value: '韩梅梅',
    disabled: false,
    payload: {
      avatar: 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg'
    }
  },
  {
    value: '林涛',
    disabled: true,
    payload: {
      avatar: 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg'
    }
  },
  {
    value: 'Tom',
    disabled: false,
    payload: {
      avatar: 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg'
    }
  }
])

const current = ref('简介')

const current1 = ref('详情')

const current2 = ref('评论')

const current3 = ref('打赏')

const current4 = ref('韩梅梅')

const current5 = ref('评论')

function handleChange(option: SegmentedOption) {
  console.log(option)
}
</script>
<style lang="scss" scoped>
.section {
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;
  &-slot {
    padding: 4px;
  }
}
</style>
