<template>
  <!-- <page-meta :page-style="'overflow:' + (canScrollY ? 'hidden' : 'overflow')"></page-meta> -->
  <page-wraper>
    <scroll-view
      scroll-y
      style="height: calc(100vh - env(safe-area-inset-bottom))"
      :style="{ pointerEvents: canScrollY ? 'auto' : 'none' }"
      :scroll-top="currentScrollTop"
      @scroll="onScroll"
    >
      <wd-toast />
      <demo-block title="基础用法 (Move + 非实时)">
        <view class="tip">默认 sort-type 为 'move' (插入排序)，非实时排序</view>
        <wd-drag-sort
          v-model="list1"
          :scroll-top="scrollTop"
          @change="handleChange"
          @scroll="handleScroll"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list1" :key="item.id" :index="index">
              <view class="grid-cell">
                <wd-icon name="picture" size="24px" />
                <text class="grid-text">{{ item.name }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="伪 Grid 严格模式 (实时)">
        <view class="tip">使用 Flex 模拟 Grid，启用 realtime 和 strict。不同尺寸无法交换。</view>
        <wd-drag-sort
          v-model="listPseudo"
          sort-type="swap"
          strict
          realtime
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
          custom-style="display: flex; flex-wrap: wrap; gap: 10px"
        >
          <wd-drag-sort-item
            v-for="(item, index) in listPseudo"
            :key="item.id"
            :index="index"
            :custom-style="`width: ${item.large ? 'calc(66.66% - 5px)' : 'calc(33.33% - 7px)'}`"
          >
            <view
              class="item"
              :style="{
                height: '100px',
                backgroundColor: item.large ? '#f0f9eb' : '#fff',
                color: item.large ? '#67c23a' : '#606266'
              }"
            >
              <text>{{ item.text }}</text>
            </view>
          </wd-drag-sort-item>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="图片排序">
        <wd-drag-sort v-model="list2" placeholder-class="custom-placeholder" @drag-start="handleDragStart" @drag-end="handleDragEnd">
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list2" :key="item.id" :index="index">
              <view class="item-img">
                <image :src="item.src" mode="aspectFill" class="image" />
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="混合尺寸 Grid 布局 (CSS Grid)">
        <view class="tip">CSS Grid 原生布局，支持自动填充和跨行列 (display: grid)</view>
        <wd-drag-sort
          v-model="listMix"
          strict
          sort-type="swap"
          :realtime="false"
          :scroll-top="scrollTop"
          custom-style="display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 80px; gap: 10px;"
          @scroll="handleScroll"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <wd-drag-sort-item
            v-for="(item, index) in listMix"
            :key="item.id"
            :index="index"
            :custom-style="`width: 100% !important; height: 100% !important; grid-column: span ${item.w}; grid-row: span ${item.h}`"
          >
            <view class="item-mix" :style="{ backgroundColor: item.color, height: '100%' }">
              <text class="text-white">{{ item.text }}</text>
            </view>
          </wd-drag-sort-item>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="列表排序 (单列)">
        <wd-drag-sort
          v-model="list3"
          :scroll-top="scrollTop"
          @change="handleChange"
          @scroll="handleScroll"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <view class="list-container">
            <wd-drag-sort-item v-for="(item, index) in list3" :key="item.id" :index="index">
              <view class="list-item">
                <wd-icon name="github-filled" size="24px" class="icon" />
                <text class="text">{{ item.text }}</text>
                <wd-icon name="list" size="20px" class="handle" />
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="动态增删">
        <view class="tip">动态增加或删除列表项，组件会自动更新布局</view>
        <view style="margin-bottom: 12px; display: flex; gap: 12px">
          <wd-button size="small" @click="addItem">添加一项</wd-button>
          <wd-button size="small" type="error" @click="removeItem">删除一项</wd-button>
        </view>
        <wd-drag-sort
          v-model="list13"
          custom-style="display: flex; flex-wrap: wrap"
          :scroll-top="scrollTop"
          @change="handleChange"
          @scroll="handleScroll"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list13" :key="item.id" :index="index">
              <view class="grid-cell">
                <wd-icon name="picture" size="24px" />
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="自定义拖拽手柄">
        <view class="tip">设置 use-drag-handle 属性，可以使用 wd-drag-handle 组件自定义手柄，无需手动绑定事件</view>
        <wd-drag-sort
          v-model="list7"
          use-drag-handle
          :scroll-top="scrollTop"
          @scroll="handleScroll"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <view class="list-container">
            <wd-drag-sort-item v-for="(item, index) in list7" :key="item.id" :index="index">
              <view class="list-item">
                <wd-icon name="github-filled" size="24px" class="icon" />
                <text class="text">{{ item.text }}</text>
                <wd-drag-handle custom-class="handle-wrapper">
                  <wd-icon name="move" size="20px" class="handle" />
                </wd-drag-handle>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="自定义占位样式">
        <view class="tip">设置 placeholder-class 属性自定义占位符样式</view>
        <wd-drag-sort
          v-model="list11"
          custom-style="display: flex; flex-wrap: wrap"
          placeholder-class="custom-placeholder"
          @change="handleChange"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list11" :key="item.id" :index="index">
              <view class="grid-cell">
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="实时排序 (Move + 实时)">
        <view class="tip">设置 realtime 为 true，拖拽过程中实时交换位置</view>
        <wd-drag-sort
          v-model="list4"
          realtime
          :scroll-top="scrollTop"
          @change="handleChange"
          @scroll="handleScroll"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list4" :key="item.id" :index="index">
              <view class="grid-cell">
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="交换排序 (Swap + 非实时)">
        <view class="tip">设置 sort-type 为 'swap'，直接交换位置而非插入</view>
        <wd-drag-sort v-model="list5" sort-type="swap" @change="handleChange" @drag-start="handleDragStart" @drag-end="handleDragEnd">
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list5" :key="item.id" :index="index">
              <view class="grid-cell">
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="交换排序 (Swap + 实时)">
        <view class="tip">设置 sort-type 为 'swap' 且 realtime 为 true</view>
        <wd-drag-sort v-model="list12" sort-type="swap" realtime @change="handleChange" @drag-start="handleDragStart" @drag-end="handleDragEnd">
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list12" :key="item.id" :index="index">
              <view class="grid-cell">
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="禁止拖拽">
        <view class="tip">设置 disabled 属性，禁止所有拖拽</view>
        <wd-drag-sort v-model="list8" disabled @change="handleChange" @drag-start="handleDragStart" @drag-end="handleDragEnd">
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list8" :key="item.id" :index="index" custom-style="width: 30%">
              <view class="grid-item-3" style="width: 100%">
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="指定元素不可拖拽 (Disabled)">
        <view class="tip">设置 item 的 disabled 属性，禁止特定元素拖拽，但仍然可以被其他元素挤开。</view>
        <wd-drag-sort v-model="list9" @change="handleChange">
          <view class="grid-container">
            <wd-drag-sort-item
              v-for="(item, index) in list9"
              :key="item.id"
              :index="index"
              :disabled="index === 0 || index === list9.length - 1"
              @drag-start="handleDragStart"
              @drag-end="handleDragEnd"
            >
              <view class="grid-cell" :style="{ opacity: index === 0 || index === list9.length - 1 ? 0.5 : 1 }">
                <text class="text">{{ item.text }}</text>
                <text v-if="index === 0 || index === list9.length - 1" style="font-size: 10px; color: red">不可拖拽</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="固定元素 (Sortable) move">
        <view class="tip">设置 item 的 sortable 属性为 false，该元素既不可拖拽，也不会被其他元素挤开。</view>
        <wd-drag-sort v-model="list10" custom-style="display: flex; flex-wrap: wrap" @change="handleChange">
          <view class="grid-container">
            <wd-drag-sort-item
              v-for="(item, index) in list10"
              :key="item.id"
              :index="index"
              :sortable="index !== 0 && index !== list10.length - 1"
              @drag-start="handleDragStart"
              @drag-end="handleDragEnd"
            >
              <view class="grid-cell" :style="{ backgroundColor: index === 0 || index === list10.length - 1 ? '#f5f5f5' : '#fff' }">
                <text class="text">{{ item.text }}</text>
                <text v-if="index === 0 || index === list10.length - 1" style="font-size: 10px; color: #999">固定位置</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>
      <demo-block title="固定元素 (Sortable) swap">
        <view class="tip">设置 item 的 sortable 属性为 false，该元素既不可拖拽，也不会被其他元素挤开。</view>
        <wd-drag-sort
          v-model="list10"
          custom-style="display: flex; flex-wrap: wrap"
          @change="handleChange"
          sort-type="swap"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list10" :key="item.id" :index="index" :sortable="index !== 0 && index !== list10.length - 1">
              <view class="grid-cell" :style="{ backgroundColor: index === 0 || index === list10.length - 1 ? '#f5f5f5' : '#fff' }">
                <text class="text">{{ item.text }}</text>
                <text v-if="index === 0 || index === list10.length - 1" style="font-size: 10px; color: #999">固定位置</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>
      <demo-block title="事件监听">
        <wd-drag-sort
          v-model="list6"
          custom-style="display: flex; flex-wrap: wrap"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
          @change="handleListChange"
        >
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in list6" :key="item.id" :index="index">
              <view class="grid-cell">
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>

      <demo-block title="手动更新">
        <view class="tip">调整大小后需手动更新。</view>
        <view style="margin-bottom: 12px; display: flex; gap: 12px">
          <wd-button size="small" @click="toggleSize">调整大小</wd-button>
          <wd-button size="small" type="success" @click="updateLayout">手动更新布局</wd-button>
        </view>
        <wd-drag-sort
          ref="dragSortRef"
          v-model="listStrict"
          custom-style="display: flex; flex-wrap: wrap"
          strict
          @change="handleChange"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        >
          <view class="grid-container">
            <wd-drag-sort-item
              v-for="(item, index) in listStrict"
              :key="item.id"
              :index="index"
              :custom-style="`height: ${item.large ? '170px' : '80px'}; background-color: ${item.large ? '#f0f9eb' : '#fff'}`"
            >
              <view class="grid-cell" :style="{ height: item.large ? '170px' : '80px' }">
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>
      <demo-block title="程序化改变顺序 (不可拖拽)">
        <view class="tip">禁用拖拽，通过代码修改列表顺序，观察动画效果。</view>
        <view style="margin-bottom: 12px; display: flex; gap: 12px">
          <wd-button size="small" @click="moveItem">首项移至末尾</wd-button>
          <wd-button size="small" type="success" @click="shuffleList">随机打乱</wd-button>
        </view>
        <wd-drag-sort v-model="listProgrammatic" disabled custom-style="display: flex; flex-wrap: wrap" @change="handleChange">
          <view class="grid-container">
            <wd-drag-sort-item v-for="(item, index) in listProgrammatic" :key="item.id" :index="index">
              <view class="grid-cell">
                <text class="text">{{ item.text }}</text>
              </view>
            </wd-drag-sort-item>
          </view>
        </wd-drag-sort>
      </demo-block>
    </scroll-view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const scrollTop = ref(0)
const currentScrollTop = ref(0)
const canScrollY = ref(true)

function onScroll(e: any) {
  scrollTop.value = e.detail.scrollTop
}
function handleScroll({ dy }: { dx: number; dy: number }) {
  currentScrollTop.value += dy
}
const generateList = (count: number, prefix = 'Item') => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i}`,
    text: `${prefix} ${i + 1}`,
    color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#303133'][i % 6]
  }))
}

const list1 = ref(generateList(8, '基础'))

const listPseudo = ref(
  generateList(6, 'Pseudo').map((item, i) => ({
    ...item,
    large: i === 0 || i === 3
  }))
)

const list2 = ref([
  { id: 'img1', src: 'https://img.yzcdn.cn/vant/cat.jpeg' },
  { id: 'img2', src: 'https://img.yzcdn.cn/vant/leaf.jpg' },
  { id: 'img3', src: 'https://img.yzcdn.cn/vant/sand.jpg' },
  { id: 'img4', src: 'https://img.yzcdn.cn/vant/tree.jpg' },
  { id: 'img5', src: 'https://img.yzcdn.cn/vant/apple-1.jpg' },
  { id: 'img6', src: 'https://img.yzcdn.cn/vant/apple-2.jpg' }
])

const listMix = ref([
  { id: 'm1', w: 1, h: 1, text: '1x1 A', color: '#409EFF' },
  { id: 'm2', w: 1, h: 2, text: '1x2 B', color: '#67C23A' },
  { id: 'm3', w: 1, h: 1, text: '1x1 C', color: '#E6A23C' },
  { id: 'm4', w: 1, h: 1, text: '1x1 D', color: '#F56C6C' },
  { id: 'm5', w: 1, h: 1, text: '1x1 E', color: '#909399' },
  { id: 'm6', w: 2, h: 1, text: '2x1 F', color: '#303133' },
  { id: 'm7', w: 2, h: 2, text: '2x2 G', color: '#8e44ad' },
  { id: 'm8', w: 2, h: 1, text: '2x1 H', color: '#16a085' },
  { id: 'm9', w: 1, h: 1, text: '1x1 I', color: '#d35400' },
  { id: 'm10', w: 1, h: 1, text: '1x1 J', color: '#2c3e50' }
])

const list3 = ref(generateList(5, '列表'))
const list7 = ref(generateList(5, '手柄'))
const list4 = ref(generateList(9, '实时'))
const list5 = ref(generateList(6, 'Swap'))
const list8 = ref(generateList(6, '禁用'))
const list9 = ref(generateList(6, '部分禁用'))
const list10 = ref(generateList(6, '固定'))
const list6 = ref(generateList(6, 'Event'))
const list11 = ref(generateList(8, '占位'))
const list12 = ref(generateList(6, 'SwapReal'))
const list13 = ref(generateList(6, 'Dynamic'))
const listStrict = ref(generateList(6, 'Strict').map((item) => ({ ...item, large: false })))
const listProgrammatic = ref(generateList(6, 'Pro'))
const dragSortRef = ref()

function handleChange(val: any) {
  console.log('list changed', val)
}

function toggleSize() {
  if (listStrict.value.length > 0) {
    listStrict.value[0].large = !listStrict.value[0].large
    // 数据变化导致尺寸变化后，建议在 nextTick 后主动更新一次布局
    // 这样可以确保拖拽开始时的占位符大小是正确的
    nextTick(() => {
      dragSortRef.value?.init()
    })
  }
}

function updateLayout() {
  if (dragSortRef.value) {
    dragSortRef.value.init()
    toast.show('布局已更新')
  }
}

function moveItem() {
  const item = listProgrammatic.value.shift()
  if (item) {
    listProgrammatic.value.push(item)
  }
}

function shuffleList() {
  listProgrammatic.value = [...listProgrammatic.value].sort(() => Math.random() - 0.5)
}

function addItem() {
  const id = Date.now().toString()
  list13.value.push({
    id,
    text: `New Item ${list13.value.length + 1}`,
    color: '#409EFF'
  })
}

function removeItem() {
  if (list13.value.length > 0) {
    list13.value.pop()
  } else {
    toast.show('列表为空')
  }
}

function handleDragStart(index: number) {
  // 拖拽开始时，同步当前滚动位置
  currentScrollTop.value = scrollTop.value

  // #ifdef MP | APP-PLUS
  canScrollY.value = false
  // #endif

  toast.show(`开始拖拽索引: ${index}`)
}
function handleDragEnd(index: number) {
  // toast.show('拖拽结束')
  // #ifdef MP | APP-PLUS
  canScrollY.value = true
  // #endif
}

function handleListChange(val: any[], { oldIndex, newIndex }: any) {
  toast.success(`位置从 ${oldIndex + 1} 变更为 ${newIndex + 1}`)
}
</script>

<style lang="scss" scoped>
/* 九宫格样式 */
.grid-container {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  gap: 20rpx;
  border-radius: 16rpx;
  width: fit-content;

  .item-img {
    height: 100px;
    width: 100px;
    flex: 1;
    border-radius: 8rpx;
    overflow: hidden;

    .image {
      height: 100px;
      width: 100px;
      display: flex;
    }
  }

  .grid-cell {
    width: 150rpx;
    height: 150rpx;
    background: #f8f8f8;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: relative; // 确保 delete-btn 绝对定位相对于 grid-cell
    border: 1px solid #eee;

    .grid-text {
      font-size: 24rpx;
      color: #666;
    }
  }

  .grid-item-3 {
    width: 100%;
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8rpx;
    border: 1px solid #eee;
    background-color: #fff;
  }
}

.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;

  .list-item {
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-bottom: 1px solid #eee;

    .icon {
      margin-right: 10px;
      color: #409eff;
    }

    .text {
      flex: 1;
      font-size: 14px;
      color: #333;
      padding-left: 10px;
    }

    .handle {
      color: #999;
    }
  }
}

.tip {
  margin: 10px 15px;
  color: #999;
  font-size: 12px;
}

.drag-item-3 {
  width: 33.33%;
}

.item {
  height: 80px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8rpx;
  border: 1px solid #eee;
}

.item-mix {
  background: #f0f9eb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8rpx;
  border: 1px solid #e1f3d8;
  .text-white {
    color: #fff;
  }
}

:deep(.custom-placeholder) {
  border: 1px dashed #409eff !important;
  background: rgba(64, 158, 255, 0.1) !important;
  border-radius: 8rpx;
}
</style>
