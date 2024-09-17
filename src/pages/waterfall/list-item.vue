<template>
  <view class="list-item">
    <image :src="item.image" mode="aspectFill" style="width: 100%; height: 100px" />
    <view>{{ item.title }}</view>
    <view>
      <wd-row>
        <wd-col :span="12">
          <wd-button type="error" size="small" plain hairline @click="emit('del', item)">删除</wd-button>
        </wd-col>
        <wd-col :span="12">
          <wd-button size="small" plain hairline @click="emit('update', item)">修改</wd-button>
        </wd-col>
      </wd-row>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['del', 'update'])
</script>

<style scope lang="scss">
.list-item {
  overflow: hidden;
  background-color: #eee;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 14px;
  color: #333;
}
</style>
