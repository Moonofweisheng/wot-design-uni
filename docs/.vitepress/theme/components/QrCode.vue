<template>
  <div @mouseenter="showQRCode = true" @mouseleave="showQRCode = false">
    <el-tooltip
      placement="bottom"
       effect="light"
      :visible="showQRCode"
      :popper-options="{ modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M2 2h9v9H2zm2 2v5h5V4zm9-2h9v9h-9zm2 2v5h5V4zM5.5 5.5h2.004v2.004H5.5zm11 0h2.004v2.004H16.5zm-3.504 7.496H15V15h-2.004zm7 0H22V15h-2.004zM2 13h9v9H2zm2 2v5h5v-5zm11.996.996H18v2h2v2h2V22h-2.004v-2h-2v-2h-2zM5.5 16.5h2.004v2.004H5.5zm7.496 3.496H15V22h-2.004z"></path>
      </svg>
      <template #content>
        <div class="qr-code">
          <img :src="src" alt="二维码" />
        </div>
      </template>
    </el-tooltip>
  </div> 
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElTooltip } from 'element-plus';
interface Props {
  /** 二维码资源 */
  src: string
}

const props = withDefaults(defineProps<Props>(), {
  src: ''
})

const showQRCode = ref(false);
</script>

<style scoped>

.qr-code {
  width: 130px; /* 设置二维码的宽度 */
  height: auto; /* 高度自适应 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}
</style>
