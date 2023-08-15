<template>
  <page-wraper>
    <wd-toast />

    <view @click="clickOutside" class="wrapper">
      <demo-block custom-class="pop" title="基本用法">
        <view class="center">
          <wd-popover id="pop1" content="这是一段内容。" v-model="show1" @change="handleChange1">
            <wd-button data-id="pop1">点击展示</wd-button>
          </wd-popover>
        </view>
      </demo-block>

      <demo-block custom-class="pop" title="嵌套信息">
        <view class="center list">
          <wd-popover v-model="show2" use-content-slot @change="handleChange2">
            <template #content>
              <view class="pop-content">这是一段自定义样式的内容。</view>
            </template>
            <wd-button>点击展示</wd-button>
          </wd-popover>
        </view>
      </demo-block>

      <demo-block custom-class="pop" title="列表展示">
        <view class="center list">
          <wd-popover v-model="show3" mode="menu" :content="menu" @menuclick="link" @change="handleChange3">
            <wd-button>列表</wd-button>
          </wd-popover>
        </view>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { clickOut, useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'

const toast = useToast()

const show = ref<boolean>(false)
const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)

const menu = ref<Array<Record<string, any>>>([
  {
    iconClass: 'read',
    content: '全部标记已读'
  },
  {
    iconClass: 'delete',
    content: '清空最近会话'
  },
  {
    iconClass: 'detection',
    content: '消息订阅设置'
  },
  {
    iconClass: 'subscribe',
    content: '消息异常检测'
  }
])

function link(e) {
  toast.show('选择了' + e.item.content)
}

function clickOutside() {
  clickOut.closeOutside()
}

function showPop(index: number) {
  // if (pop && pop.id !== id) {
  //   closeOtherPop()
  // }
  // pop = selectComponent('#' + id)
}

function handleChange1(event) {
  // show1.value = event.detail.show
}

function handleChange2(event) {
  // show2.value = event.detail.show
}
function handleChange3(event) {
  // show3.value = event.detail.show
}
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
  padding-bottom: 20px;
}
:deep(.pop) {
  overflow: visible !important;
  padding: 10px;
}
.wrapper {
  width: 100%;
  height: 100vh;
}
.pop-content {
  /* 必填 开始 */
  position: relative;
  z-index: 500;
  border-radius: 4px;
  /* 必填 结束 */
  background: #fff;
  color: #8268de;
  font-weight: bolder;
  padding: 10px;
  width: 150px;
}
</style>
