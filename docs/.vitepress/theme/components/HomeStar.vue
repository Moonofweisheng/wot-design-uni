<!--
 * @Author: weisheng
 * @Date: 2024-04-01 17:10:05
 * @LastEditTime: 2024-04-01 17:14:38
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\theme\components\HomeStar.vue
 * 记得注释
-->
<script setup lang="ts"></script>

<template>
  <p class="home-star">
    <a href="https://github.com/Moonofweisheng/wot-design-uni">
      <img
        alt="GitHub Repo stars"
        src="https://img.shields.io/github/stars/Moonofweisheng/wot-design-uni?logo=github&color=%234d80f0&link=https%3A%2F%2Fgithub.com%2FMoonofweisheng%2Fwot-design-uni"
      />
    </a>

    <a href="https://gitee.com/wot-design-uni/wot-design-uni/stargazers">
      <img src="https://gitee.com/wot-design-uni/wot-design-uni/badge/star.svg?theme=gray" alt="star" />
    </a>

    <a href="https://github.com/Moonofweisheng/wot-design-uni">
      <img alt="GitHub" src="https://img.shields.io/github/license/Moonofweisheng/wot-design-uni?logo=github" />
    </a>

    <a href="https://www.npmjs.com/package/wot-design-uni">
      <img alt="npm" src="https://img.shields.io/npm/dw/wot-design-uni?logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwot-design-uni" />
    </a>

    <a href="https://www.npmjs.com/package/wot-design-uni">
      <img src="https://img.shields.io/npm/dt/wot-design-uni?style=flat-square" />
    </a>


  </p>
</template>

<style>
.home-star{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
