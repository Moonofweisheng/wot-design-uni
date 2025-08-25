<template>
  <view class="wd-guide" v-if="modelValue">
    <view
      class="wd-guide__mask"
      :class="{ 'is-show': mask }"
      @touchmove.stop.prevent
      @click="handleMask"
    >
      <view class="wd-guide__highlight" :style="highlightStyle"></view>
      <view class="wd-guide__popover" :style="popoverStyle">
        <slot name="content" v-if="$slots.content"></slot>
        <view class="wd-guide__info" v-else>
          <rich-text :nodes="currentStep.content"></rich-text>
        </view>
        <view class="wd-guide__buttons">
          <!-- 上一步按钮 -->
          <view
            class="wd-guide__prev"
            v-if="currentIndex > 0"
            @click="handlePrev"
          >
            <slot name="prev" v-if="$slots.prev"></slot>
            <view class="prev" v-else>{{ prevText }}</view>
          </view>

          <!-- 跳过按钮 -->
          <view class="wd-guide__skip" @click="handleSkip">
            <slot name="skip" v-if="$slots.skip"></slot>
            <view class="skip" v-else>{{ skipText }}</view>
          </view>

          <!-- 下一步按钮 -->
          <view
            class="wd-guide__next"
            v-if="currentIndex < steps.length - 1"
            @click="handleNext"
          >
            <slot name="next" v-if="$slots.next"></slot>
            <view class="next" v-else>
              {{ `${nextText}(${currentIndex + 1}/${steps.length})` }}
            </view>
          </view>

          <!-- 完成按钮 -->
          <view
            class="wd-guide__finish"
            v-if="currentIndex === steps.length - 1"
            @click="handleFinish"
          >
            <slot name="finish" v-if="$slots.finish"></slot>
            <view class="finish" v-else>{{ finishText }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "wd-guide",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from "vue";
import { guideProps, ElementRect } from "./types";

const props = defineProps(guideProps);
const emit = defineEmits([
  "update:modelValue",
  "change",
  "prev",
  "next",
  "finish",
  "skip",
  "error",
]);

// 响应式数据
const currentIndex = ref(0);
const elementInfo = ref({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
});
const windowHeight = ref(0);
const windowTop = ref(0);
const isUp = ref(1); // 判断元素位置，确定提示信息在该元素的上方还是下方
const oldscrollTop = ref(0); //记录上一次滚动位置
const statusBarHeight = ref(0);
const menuButtonInfo = ref(null);
const topOffset = ref(0);

// 计算属性
const currentStep = computed(() => {
  return props.steps[currentIndex.value] || {};
});

const highlightStyle = computed(() => {
  const padding = uni.upx2px(props.padding);
  // 根据是否显示蒙版来设置阴影效果
  const boxShadow = props.mask ? `0 0 0 100vh ${props.maskColor}` : "none";
  return {
    top: elementInfo.value.top - padding + "px",
    left: elementInfo.value.left - padding + "px",
    height: elementInfo.value.height + "px",
    width: elementInfo.value.width + "px",
    transition: props.duration + "ms all",
    borderRadius: props.borderRadius + "px",
    padding: props.padding + "rpx",
    boxShadow: boxShadow,
  };
});

const popoverStyle = computed(() => {
  const style: Record<string, string> = {
    transition: props.duration + "ms all",
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "686rpx",
    textAlign: "center",
    zIndex: "10000",
  };
  if (isUp.value === 1) {
    // 提示在元素下方
    style.top =
      elementInfo.value.top +
      elementInfo.value.height +
      Number(props.offset) +
      "px";
  } else {
    // 提示在元素上方
    style.bottom =
      windowHeight.value +
      windowTop.value -
      elementInfo.value.top +
      Number(props.offset) +
      "px";
  }

  return style;
});

// 方法
function updateElementInfo() {
  const element = currentStep.value.element;
  if (!element) return;

  nextTick(() => {
    const query = uni.createSelectorQuery();
    query
      .select(element)
      .boundingClientRect((res: any) => {
        if (!res) {
          console.error("无法找到元素:", element);
          emit("error", {
            message: "无法找到指定的引导元素",
            element: element,
          });
          return;
        }

        // 初始化元素信息
        initializeElementInfo(res);

        // 获取有效的页面边界
        const effectiveBoundaries = getEffectiveBoundaries();

        // 检查是否需要滚动
        const scrollNeeds = checkScrollNeeds(res, effectiveBoundaries);

        // 处理滚动逻辑
        handleScrolling(res, scrollNeeds, effectiveBoundaries);

        // 计算提示框显示位置
        calculateTipPosition(res, effectiveBoundaries);
      })
      .exec();
  });
}
// 初始化元素信息
function initializeElementInfo(res: ElementRect) {
  elementInfo.value = res;
  // 调整元素位置信息，加上窗口顶部偏移量
  elementInfo.value.top = res.top + windowTop.value;
  elementInfo.value.bottom = res.bottom + windowTop.value;
}
// 获取有效的页面边界（顶部和底部安全区域）
function getEffectiveBoundaries() {
  // 有效顶部边界初始化为窗口顶部 + 顶部偏移量
  let effectiveWindowTop = windowTop.value + Number(topOffset.value);
  // 有效底部边界为窗口高度
  let effectiveWindowBottom = windowHeight.value;

  return {
    top: effectiveWindowTop,
    bottom: effectiveWindowBottom,
  };
}
// 检查是否需要滚动
function checkScrollNeeds(
  res: ElementRect,
  boundaries: { top: number; bottom: number }
) {
  // 判断元素是否被顶部遮挡（需要向上滚动）
  const needScrollUp = res.top < boundaries.top;

  // 判断元素是否被底部遮挡（需要向下滚动）
  const needScrollDown =
    (res.bottom !== undefined ? res.bottom : 0) +
      Number(props.bottomSafetyOffset) >
    boundaries.bottom;

  return {
    up: needScrollUp, //提示框往上走
    down: needScrollDown, //提示框往下走
  };
}

// 处理滚动逻辑
function handleScrolling(
  res: ElementRect,
  scrollNeeds,
  boundaries: { top: number; bottom: number }
) {
  if (scrollNeeds.up) {
    // 元素被顶部遮挡，需要提示框往上走，页面往下走
    scrollUp(res, boundaries);
  } else if (scrollNeeds.down) {
    // 元素被底部遮挡，需要提示框向下走，页面向上走
    scrollDown(res);
  }
}

// 向引导上滚动处理
function scrollUp(
  res: ElementRect,
  boundaries: { top: number; bottom: number }
) {
  // 计算需要滚动的距离
  let scrollDistance = oldscrollTop.value + res.top - props.padding - boundaries.top;
  // 更新元素位置信息（滚动后）
  elementInfo.value.top = boundaries.top + props.padding;
  elementInfo.value.bottom = windowHeight.value - (boundaries.top + props.padding);
  uni.pageScrollTo({
    scrollTop: scrollDistance,
    duration: Number(props.duration),
    success: () => {
      // 更新已滚动距离
      oldscrollTop.value = scrollDistance;
    },
  });
}

// 引导向下滚动处理
function scrollDown(res: ElementRect) {
  // 计算需要滚动的距离
  let scrollDistance =
    (res.bottom ?? 0) -
    windowHeight.value +
    props.padding +
    Number(props.bottomSafetyOffset);

  // 更新元素位置信息（滚动后）
  elementInfo.value.top =
    windowHeight.value -
    res.height -
    props.padding -
    Number(props.bottomSafetyOffset); // 应该是减去安全偏移量

  elementInfo.value.bottom =
    windowHeight.value - props.padding - Number(props.bottomSafetyOffset);

  uni.pageScrollTo({
    scrollTop: scrollDistance + oldscrollTop.value,
    duration: Number(props.duration),
    success: () => {
      // 更新已滚动距离
      oldscrollTop.value = scrollDistance + oldscrollTop.value;
    },
  });
}

// 计算提示框显示位置（上方或下方）
function calculateTipPosition(
  res: ElementRect,
  boundaries: { top: number; bottom: number }
) {
  // 计算导航区域总高度
  let totalNavHeight = statusBarHeight.value;

  // #ifdef MP
  // 微信小程序平台考虑菜单按钮高度
  //   if (props.customNav) {
  //     // const menuBottom = this.menuButtonInfo.top + this.menuButtonInfo.height;
  //     const menuBottom = menuButtonInfo.value.top;
  //     totalNavHeight = Math.max(totalNavHeight, menuBottom);
  //   }
  // #endif
  // totalNavHeight = Math.max(totalNavHeight, topOffset.value);

  // 计算屏幕中心点位置
  const screenCenter =
    (windowHeight.value + totalNavHeight) / 2 + windowTop.value;

  // 计算元素中心点位置
  const elementCenter = res.top + res.height / 2 + windowTop.value;

  // 根据元素位置决定提示框显示在上方还是下方
  if (elementCenter < screenCenter) {
    isUp.value = 1; // 提示在元素下方
  } else {
    isUp.value = 0; // 提示在元素上方
  }
}

function handlePrev() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    emit("prev", {
      current: currentIndex.value,
      total: props.steps.length,
    });
    emit("change", currentIndex.value);
    updateElementInfo();
  }
}

function handleNext() {
  if (currentIndex.value < props.steps.length - 1) {
    const oldIndex = currentIndex.value;
    currentIndex.value++;
    emit("next", {
      current: currentIndex.value,
      total: props.steps.length,
    });
    emit("change", currentIndex.value);
    updateElementInfo();
  } else {
    handleFinish();
  }
}

function handleFinish() {
  emit("finish", {
    current: currentIndex.value,
    total: props.steps.length,
  });
  emit("update:modelValue", false);
}

function handleSkip() {
  emit("skip", {
    current: currentIndex.value,
    total: props.steps.length,
  });
  emit("update:modelValue", false);
}
function handleMask() {
  if (props.clickMaskNext) {
    handleNext();
  }
}
// 监听器
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      currentIndex.value = 0;
      nextTick(() => {
        setTimeout(() => {
          updateElementInfo();
        }, 50);
      });
    }
  },
  { immediate: true }
);

// 初始化
const sysInfo = uni.getSystemInfoSync();
windowHeight.value = sysInfo.windowHeight;
windowTop.value = sysInfo.windowTop || 0;
statusBarHeight.value = sysInfo.statusBarHeight || 0;

// 所有平台统一处理逻辑
if (props.customNav) {
  // 开启了自定义导航栏
  if (props.topSafetyOffset && Number(props.topSafetyOffset) > 0) {
    // 用户传入了顶部安全偏移量，优先使用用户设置的值
    topOffset.value = Number(props.topSafetyOffset);
  } else {
    // 未传入顶部偏移量
    // #ifdef MP
    // 微信小程序平台获取菜单按钮信息并使用其顶部位置
    menuButtonInfo.value = uni.getMenuButtonBoundingClientRect() || null;
    topOffset.value = menuButtonInfo.value ? menuButtonInfo.value.top : 0;
    // #endif
    // #ifndef MP
    // 非微信小程序平台默认为0
    topOffset.value = 0;
    // #endif
  }
} else {
  // 未开启自定义导航栏，直接使用用户传入的顶部安全偏移量
  topOffset.value = Number(props.topSafetyOffset) || 0;
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
