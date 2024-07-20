<template>
  <view @click="closeOutside">
    <wd-toast />
    <page-wraper>
      <demo-block title="基本用法" transparent>
        <wd-search v-model="value1" @search="search" @change="change" @cancel="cancel" @clear="clear" />
      </demo-block>

      <demo-block title="白色输入框" transparent>
        <wd-search light />
      </demo-block>

      <demo-block title="搜索占位符居左" transparent>
        <wd-search placeholder-left />
      </demo-block>

      <demo-block title="禁用且隐藏取消按钮" transparent>
        <wd-search disabled hide-cancel />
      </demo-block>

      <view style="margin: 15px 0; color: #666">
        <view style="padding: 0 15px; margin: 10px 0; font-size: 13px">自定义左侧插槽</view>
        <wd-search v-model="value3">
          <template #prefix>
            <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
              <view class="search-type">
                <text>{{ searchType }}</text>
                <wd-icon class="icon-arrow" name="fill-arrow-down"></wd-icon>
              </view>
            </wd-popover>
          </template>
        </wd-search>
      </view>

      <demo-block title="自定义右侧文案" transparent>
        <wd-search placeholder="请输入订单号/订单名称" cancel-txt="搜索" />
      </demo-block>

      <demo-block title="设置最大长度" transparent>
        <wd-search v-model="value2" :maxlength="4" />
      </demo-block>

      <demo-block title="清空后自动聚焦" transparent>
        <wd-search v-model="value4" focus-when-clear />
      </demo-block>

      <demo-block title="自动聚焦" transparent>
        <wd-search v-model="value5" focus />
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useQueue } from '@/uni_modules/wot-design-uni'

const { closeOutside } = useQueue()

const value1 = ref<string>('')
const value2 = ref<string>('初始文案')
const value3 = ref<string>('')
const value4 = ref<string>('')
const value5 = ref<string>('')

const searchType = ref<string>('全部')
const menu = ref([
  {
    content: '全部'
  },
  {
    content: '订单号'
  },
  {
    content: '退款单号'
  }
])

function search(e: any) {
  uni.showToast({ title: '搜索' + e.value })
}
function clear() {
  uni.showToast({ title: '清空' })
}
function cancel() {
  uni.showToast({ title: '取消' })
}
function change(e: any) {
  console.log(e.value)
}
function changeSearchType({ item, index }: any) {
  // this.setData({
  //   searchType: e.detail.item.content
  // })
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .search-type {
    color: #f5f5f5;
  }

  .search-type::after {
    color: #f5f5f5;
  }

  .search-type .icon-arrow {
    color: #f5f5f5;
  }
}

.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;
  color: rgba(0, 0, 0, 0.45);
}
.search-type::after {
  position: absolute;
  content: '';
  width: 1px;
  right: 0;
  top: 5px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.25);
  transform: scaleX(0.5);
}
.search-type .icon-arrow {
  margin-left: 4px;
  display: inline-block;
  font-size: 18px;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.65);
}
.overflowauto {
  overflow: normal;
}
</style>
