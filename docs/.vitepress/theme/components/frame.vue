<!--
 * @Author: weisheng
 * @Date: 2022-12-16 18:03:21
 * @LastEditTime: 2023-07-28 10:48:01
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\theme\components\frame.vue
 * 记得注释
-->
<template>
  <iframe id="demo-modal" class="iframe demo-model" scrolling="auto" frameborder="0" :src="href"></iframe>
</template>

<script setup>
import { useRoute } from 'vitepress';
import {  onBeforeMount, ref } from 'vue'
let props = defineProps({
  url: String,
})
const route = useRoute()
const href = ref('')
onBeforeMount(() => {
  const baseUrl = process.env.NODE_ENV === 'production' ? location.origin + '/demo/#/' : 'http://localhost:5173/#/'
  const path = route.path
  const paths = path ? path.split('.')[0].split('/') : []
  if (paths.length) {
    href.value = baseUrl + `pages/${paths[paths.length - 1]}/Index`
  } else {
    href.value = baseUrl
  }
})



</script>
<style scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

@media screen and (min-width: 1301px) and (max-width: 1449px) {
  .page-demo {
    padding-right: 340px;
  }
}

@media screen and (min-width: 1450px) and (max-width: 1679px) {
  .page-demo {
    padding-right: 350px;
  }
}

@media screen and (min-width: 1680px) {
  .page-demo {
    padding-right: 330px;
  }
}

@media screen and (min-width: 1920px) {
  .page-demo {
    padding-right: 370px;
  }
}

.demo-model {
  font-size: 16px;
  background-color: #fff;
  width: 330px;
  position: fixed;
  right: 50%;
  z-index: 10;
  margin: 0;
  right: 12px;
  top: 0;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: 100%;
  box-shadow: 0 4px 25px 0 rgba(4, 40, 60, 0.18);
  overflow: hidden;
  background: #eff2f5;
  border-radius: 20px;
}

.iframe {
  height: 100%;
  width: 100%;
  border-radius: 20px;
}

@media screen and (min-width: 1200px) {
  .demo-model {
    width: 310px;
    height: calc(310px * 143.6 / 70.9);
    top: calc((100vh - 310px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
  }
}

@media (max-width: 1300px) {
  .demo-model {
    display: none;
  }
}

@media screen and (min-width: 1366px) {
  .demo-model {
    width: 270px;
    height: calc(270px * 143.6 / 70.9);
    top: calc((100vh - 270px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
  }
}

@media screen and (min-width: 1500px) {
  .demo-model {
    width: 310px;
    height: calc(310px * 143.6 / 70.9);
    top: calc((100vh - 310px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
  }
}

@media screen and (min-width: 1920px) {
  .demo-model {
    width: 360px;
    height: calc(360px * 143.6 / 70.9);
    top: calc((100vh - 350px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
  }
}
</style>
