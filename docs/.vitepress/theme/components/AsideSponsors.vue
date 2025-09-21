<!--
 * @Author: weisheng
 * @Date: 2025-09-21 17:13:45
 * @LastEditTime: 2025-09-21 22:57:29
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/docs/.vitepress/theme/components/AsideSponsors.vue
 * 记得注释
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useAdSponsor } from '../composables/adSponsor'

const { data } = useAdSponsor()

// 分离超级赞助和金牌赞助
const superSponsors = computed(() => {
  return data.value?.find(sponsor => sponsor.tier === 'Platinum')
})

const goldSponsors = computed(() => {
  return data.value?.find(sponsor => sponsor.tier === 'Gold')
})

// 判断金牌赞助数量是否为奇数
const isGoldSponsorsOdd = computed(() => {
  return (goldSponsors.value?.items?.length || 0) % 2 === 1
})
</script>

<template>
  <div class="VPDocAsideSponsors">
    <a class="sponsors-aside-text" href="/reward/sponsor">赞助位</a>
    <div class="VPSponsors vp-sponsor aside">
      <!-- 超级赞助：一行一个 -->
      <section class="vp-sponsor-section" v-if="superSponsors?.items.length">
        <div class="VPSponsorsGrid vp-sponsor-grid mini" data-vp-grid="1">
          <div class="vp-sponsor-grid-item" v-for="sponsor in superSponsors.items" :key="sponsor.name">
            <a class="vp-sponsor-grid-link" :href="sponsor.url" target="_blank" rel="sponsored noopener">
              <article class="vp-sponsor-grid-box">
                <h4 class="visually-hidden">{{ sponsor.url }}</h4>
                <img v-if="sponsor.img" class="vp-sponsor-grid-image" :src="sponsor.img" :alt="sponsor.name">
                <span v-else class="vp-sponsor-grid-text">{{ sponsor.name }}</span>
              </article>
            </a>
          </div>
        </div>
      </section>

      <!-- 金牌赞助：一行两个 -->
      <section class="vp-sponsor-section" v-if="goldSponsors?.items.length">
        <div class="VPSponsorsGrid vp-sponsor-grid xmini" data-vp-grid="2">
          <div class="vp-sponsor-grid-item" v-for="sponsor in goldSponsors.items" :key="sponsor.name">
            <a class="vp-sponsor-grid-link" :href="sponsor.url" target="_blank" rel="sponsored noopener">
              <article class="vp-sponsor-grid-box">
                <h4 class="visually-hidden">{{ sponsor.name }}</h4>
                <img v-if="sponsor.img" class="vp-sponsor-grid-image" :src="sponsor.img" :alt="sponsor.name">
                <span v-else class="vp-sponsor-grid-text">{{ sponsor.name }}</span>
              </article>
            </a>
          </div>
          <!-- 当金牌赞助为奇数时，默认赞助位填补到金牌赞助位置 -->
          <div class="vp-sponsor-grid-item" v-if="isGoldSponsorsOdd">
            <a class="vp-sponsor-grid-link" href="/reward/sponsor" rel="sponsored noopener">
              <article class="vp-sponsor-grid-box">
                <span class="vp-sponsor-grid-text">成为赞助商</span>
              </article>
            </a>
          </div>
        </div>
      </section>

      <!-- 当金牌赞助为偶数或没有金牌赞助时，默认赞助位占据一整行 -->
      <section class="vp-sponsor-section" v-if="!isGoldSponsorsOdd || !goldSponsors?.items.length">
        <div class="VPSponsorsGrid vp-sponsor-grid xmini" data-vp-grid="1">
          <div class="vp-sponsor-grid-item">
            <a class="vp-sponsor-grid-link" href="/reward/sponsor" rel="sponsored noopener">
              <article class="vp-sponsor-grid-box">
                <span class="vp-sponsor-grid-text">成为赞助商</span>
              </article>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
.vp-sponsor-grid-text {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.dark .vp-sponsor-grid-text {
  color: var(--vp-c-gray-1);
}

.vp-sponsor-grid-image {
  max-width: 120px;
  max-height: 72px !important;
  filter: none !important;
}

a.sponsors-aside-text {
  color: var(--vp-c-text-3);
  display: block;
  margin: 2em 0 1em;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
</style>