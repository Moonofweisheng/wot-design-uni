<!--
 * @Author: weisheng
 * @Date: 2023-10-15 23:07:22
 * @LastEditTime: 2023-10-17 13:33:14
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\pages\navbar\Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block title="基本用法" transparent>
      <wd-navbar title="标题" left-text="返回" right-text="设置" right-disabled left-disabled left-arrow>
        <template #capsule>
          <wd-navbar-capsule></wd-navbar-capsule>
        </template>
      </wd-navbar>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
