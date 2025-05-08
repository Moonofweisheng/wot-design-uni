---
url: 'https://wot-design-uni.cn/component/signature.md'
---
# Signature 签名 1.6.0

用于签名场景，基于 Canvas 实现的签名组件。提供了基础签名、历史记录、笔锋效果等功能。

:::tip 提醒
如果遇到导出图片不清晰，可以将 `exportScale` 设置为 `2` 以上。
:::

## 基础用法

基础的电子签名功能。签名完成后会使用预览组件显示签名图片。

```html
<wd-signature @confirm="confirm" @clear="clear" :export-scale="2" background-color="#ffffff" />
```

```typescript
const img = ref<Partial<SignatureResult>>({})

function confirm(result: SignatureResult) {
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}

function clear() {
  img.value = {}
}
```

## 历史记录

通过 `enable-history` 开启历史记录功能，可以进行撤销和恢复操作。

```html
<wd-signature enable-history background-color="#f5f5f5" />
```

## 笔锋模式

通过 `pressure` 开启笔锋模式，模拟真实书写效果。笔锋模式下笔画粗细会随书写速度变化。

### 基础笔锋效果

```html
<wd-signature pressure :height="300" />
```

:::tip 使用建议

1. 笔锋模式推荐参数范围：
   * min-width: 1-2
   * max-width: 4-6
   * min-speed: 1-2
2. max-width 和 min-width 的差值建议保持在 3-5 之间
3. min-speed 值越小，压感越灵敏，建议根据实际书写习惯调整
4. 对于签名场景，建议将画布高度设置在 300-400 之间
   :::

### 自定义笔锋参数

可以通过以下属性精确控制笔锋效果：

* `min-width`: 最小笔画宽度，快速书写时的线条粗细
* `max-width`: 最大笔画宽度，慢速书写时的线条粗细
* `min-speed`: 速度阈值，用于调整压感灵敏度

```html
<wd-signature 
  pressure 
  :height="300" 
  :min-width="1" 
  :max-width="6" 
  :min-speed="1.5"
  background-color="#f5f5f5"
/>
<view class="tip-text">快速书写产生细线条，慢速书写产生粗线条</view>
```

### 笔锋模式 + 历史记录

笔锋模式可以与历史记录功能结合使用，支持对带有笔锋效果的线条进行撤销和恢复操作。

```html
<wd-signature 
  pressure 
  enable-history 
  :height="300" 
  :min-width="1" 
  :max-width="6"
  background-color="#f5f5f5" 
/>
<view class="tip-text">结合历史记录，支持笔锋效果的撤销与恢复</view>
```

## 自定义功能

### 自定义按钮

通过 `footer` 插槽自定义底部按钮。

```html
<wd-signature :disabled="disabled" enable-history :step="3">
  <template #footer="{ clear, confirm, currentStep, restore, revoke, historyList }">
    <wd-button block @click="changeDisabled" v-if="disabled">开始签名</wd-button>
    <block v-if="!disabled">
      <wd-button size="small" plain @click="revoke" :disabled="currentStep <= 0">撤回</wd-button>
      <wd-button size="small" plain @click="restore" :disabled="currentStep >= historyList.length">恢复</wd-button>
      <wd-button size="small" plain @click="clear">清除</wd-button>
      <wd-button size="small" @click="confirm">确定</wd-button>
    </block>
  </template>
</wd-signature>
```

```typescript
const disabled = ref(true)

function changeDisabled() {
  disabled.value = false
}
```

### 自定义画笔

可以自定义画笔的颜色和宽度。

```html
<wd-signature pen-color="#0083ff" :line-width="4" />
```

### 弹窗中使用

结合 `wd-popup` 组件在弹窗中使用签名板。建议使用 `after-enter` 事件调用签名板的 `init` 方法以确保正确初始化。

```html
<wd-button type="primary" @click="show = true">打开签名板</wd-button>

<wd-popup 
  v-model="show" 
  closable
  safe-area-inset-bottom
  position="bottom"
  custom-style="padding: 48px 20px 20px 20px; border-radius: 16px 16px 0 0;"
  @after-enter="signatureRef?.init()"
>
  <wd-signature 
    ref="signatureRef"
    :height="300"
    enable-history
    pressure
    background-color="#f5f5f5"
    @confirm="handleConfirm" 
  />
</wd-popup>

<wd-img v-if="img.tempFilePath" mode="widthFix" width="100%" :src="img.tempFilePath" />
```

```typescript
import { ref } from 'vue'
import type { SignatureInstance, SignatureResult } from '@/uni_modules/wot-design-uni/components/wd-signature/types'

const show = ref(false)
const img = ref<Partial<SignatureResult>>({})
const signatureRef = ref<SignatureInstance>()

function handleConfirm(result: SignatureResult) {
  show.value = false
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}
```

```scss
.popup-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

:::tip 提示
弹窗中使用签名板时，建议：

1. 开启 `closable` 显示关闭按钮
2. 设置 `safe-area-inset-bottom` 以适配底部安全区
3. 使用 `custom-style` 调整弹窗内边距，为关闭按钮留出空间
4. 在弹窗的 `after-enter` 事件中调用签名板的 `init` 方法，确保正确初始化
   :::

### 横屏签名页面

可以通过配置页面的 `pageOrientation` 来实现横屏签名页面。

```json
// pages.json
{
  "pages": [
    {
      "path": "pages/signature-landscape/Index",
      "style": {
        "navigationBarTitleText": "横屏签名",
        "pageOrientation": "landscape"
      }
    }
  ]
}
```

```html
<template>
  <view class="landscape-signature">
    <wd-signature
      ref="signatureRef"
      :height="height"
      :width="width"
      pressure
      enable-history
      background-color="#f5f5f5"
      @confirm="handleConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const height = ref(0)
const width = ref(0)

onMounted(() => {
  const { windowWidth, windowHeight } = uni.getSystemInfoSync()
  // 减去页面边距
  height.value = windowWidth - 40
  width.value = windowHeight - 40
})
</script>

<style>
.landscape-signature {
  padding: 20px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
</style>
```

:::tip 提示
横屏签名页面的建议：

1. 使用 `pageOrientation: "landscape"` 强制横屏显示
2. 动态计算画布尺寸以适配不同设备
3. 注意横屏时 windowWidth 和 windowHeight 的对调
4. 建议开启笔锋模式提供更好的签名体验
   :::

### 横屏签名

支持以下两种横屏签名实现方案：

#### 1. 通用横屏方案 (推荐)

通过自定义布局和按钮旋转实现横屏效果，适用于所有平台。

```html
<template>
  <view class="landscape-signature">
    <wd-signature
      v-if="inited"
      :height="height"
      :width="width"
      enable-history
      pressure
      background-color="#f5f5f5"
      @confirm="handleConfirm"
    >
      <template #footer="{ clear, confirm, restore, revoke, canUndo, canRedo }">
        <view class="custom-actions">
          <view class="button-group">
            <wd-button size="small" plain @click="revoke" :disabled="!canUndo">撤回</wd-button>
            <wd-button size="small" plain @click="restore" :disabled="!canRedo">恢复</wd-button>
            <wd-button size="small" plain @click="clear">清除</wd-button>
            <wd-button size="small" type="primary" @click="confirm">完成</wd-button>
          </view>
        </view>
      </template>
    </wd-signature>
  </view>
</template>
```

```ts
import { pause } from '@/uni_modules/wot-design-uni/components/common/util'

const height = ref(0)
const width = ref(0)
const inited = ref(false)

onMounted(() => {
  const { windowWidth, windowHeight } = uni.getSystemInfoSync()
  width.value = windowWidth - 48
  height.value = windowHeight - 48
  
  pause(100).then(() => {
    inited.value = true
  })
})
```

```scss
.landscape-signature {
  height: 100vh;
  // #ifdef H5
  height: calc(100vh - 44px);
  // #endif
  background: #fff;
  position: relative;
  padding: 24px 0;
  padding-left: 48px;
  box-sizing: border-box;

  .custom-actions {
    position: fixed;
    left: 0;
    top: 50%;
    width: 48px;
    transform: translateY(-50%) rotate(90deg);
    transform-origin: center;
    z-index: 10;

    .button-group {
      display: flex;
      flex-direction: row;
      gap: 12px;
      white-space: nowrap;
      width: max-content;
      transform: translateX(-50%);
    }
  }
}
```

:::tip 实现说明
通用横屏方案特点：

1. 使用 fixed 布局配合旋转实现左侧垂直按钮栏
2. 通过 footer 插槽自定义操作按钮
3. 使用 transform 实现按钮的旋转效果
4. 适用于所有平台,实现方式一致
5. 建议使用 inited 变量配合延迟加载避免画布初始化问题
   :::

#### 2. 原生横屏方案 (仅微信小程序)

微信小程序提供了原生的横屏支持，使用时需要注意区分平台:

```json
{
  "path": "pages/signature/landscape",
  "style": {
    "navigationBarTitleText": "横屏签名",
    // #ifdef MP-WEIXIN
    "pageOrientation": "landscape"
    // #endif
  }
}
```

```html
<template>
  <view class="landscape-signature">
    <wd-signature
      v-if="inited"
      ref="signatureRef"
      :height="height" 
      :width="width"
      enable-history
      pressure
      background-color="#f5f5f5"
      @confirm="handleConfirm"
    >
    </wd-signature>
  </view>
</template>
```

```ts
import { pause } from '@/uni_modules/wot-design-uni/components/common/util'

const height = ref(0)
const width = ref(0)
const inited = ref(false)

onMounted(() => {
  const { windowWidth, windowHeight } = uni.getSystemInfoSync()
  width.value = windowWidth
  height.value = windowHeight - 60 // 预留底部按钮空间

  pause(100).then(() => {
    inited.value = true
  })
})
```

```scss
.landscape-signature {
  height: 100vh;
  background: #fff;
  position: relative;
  box-sizing: border-box;

  // #ifdef MP-WEIXIN
  padding: 0;
  display: flex;
  flex-direction: column;

  .weixin-actions {
    padding: 12px;
    background-color: #f8f8f8;
    
    .button-group {
      display: flex;
      justify-content: center;
      gap: 12px;
    }
  }
  // #endif
}
```

:::warning 注意事项

1. `pageOrientation` 配置仅在微信小程序端生效
2. 使用条件编译区分不同平台的布局结构
3. 微信小程序页面会自动旋转，按钮布局不需要特殊处理
4. 预留底部按钮空间时需要考虑横屏布局
5. 其他平台请使用通用横屏方案
   :::

## Attributes

| 参数 | 说明 | 类型 | 默认值 | 最低版本 |
|------|------|------|--------|----------|
| pen-color | 签名笔颜色 | string | #000000 | - |
| line-width | 签名笔宽度 | number | 3 | - |
| height | 画布的高度 | number | 200 | - |
| width | 画布的宽度 | number | 300 | - |
| clear-text | 清空按钮的文本 | string | - | - |
| confirm-text | 确认按钮的文本 | string | - | - |
| file-type | 导出图片类型 | string | png | - |
| quality | 导出图片质量(0-1) | number | 1 | - |
| export-scale | 导出图片的缩放比例 | number | 1 | - |
| disabled | 是否禁用签名板 | boolean | false | - |
| background-color | 画板的背景色 | string | - | - |
| disable-scroll | 是否禁用画布滚动 | boolean | true | - |
| enable-history | 是否开启历史记录 | boolean | false | 1.8.0 |
| step | 历史记录步长 | number | 1 | 1.8.0 |
| pressure | 是否启用笔锋模式 | boolean | false | 1.8.0 |
| min-width | 笔锋模式最小宽度 | number | 2 | 1.8.0 |
| max-width | 笔锋模式最大宽度 | number | 6 | 1.8.0 |
| min-speed | 笔锋模式速度阈值 | number | 1.5 | 1.8.0 |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|------|------|----------|
| start | 开始签名时触发 | event: TouchEvent | - |
| end | 结束签名时触发 | event: TouchEvent | - |
| signing | 签名过程中触发 | event: TouchEvent | - |
| confirm | 确认签名时触发 | result: SignatureResult | - |
| clear | 清空签名时触发 | - | - |

## Methods

| 方法名 | 说明 | 参数 | 最低版本 |
|--------|------|------|----------|
| init | 初始化签名板 | forceUpdate?: boolean | - |
| confirm | 确认签名 | - | - |
| clear | 清空签名 | - | - |
| restore | 恢复上一步 | - | - |
| revoke | 撤销上一步 | - | - |

## Slots

| 名称 | 说明 | 参数 | 最低版本 |
|------|------|------|----------|
| footer | 自定义底部按钮 | `{ clear, confirm, restore, revoke, currentStep, historyList }` | - |
