<script setup lang="ts">
import { computed } from 'vue'
import { useAdSponsor } from '../composables/adSponsor'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: '铂金赞助商',
})

const { data } = useAdSponsor()

// 获取第一个铂金赞助商
const platinumSponsor = computed(() => {
  const platinum = data.value?.find(sponsor => sponsor.tier === 'Platinum')
  return platinum?.items?.[0] || null
})
</script>

<template>
  <section v-if="platinumSponsor" class="special-sponsor">
    <h3>{{ title }}</h3>
    <div class="special-sponsor-container">
      <a class="logo" :href="platinumSponsor.url" target="_blank" rel="sponsored noopener">
        <picture >
          <img :src="platinumSponsor.img" :alt="platinumSponsor.name" style="height: 72px;" />
        </picture>
      
      </a>
      <span>{{ platinumSponsor.name }}</span>
    </div>
  </section>
</template>

<style scoped>
.special-sponsor {
  border-top: 1px solid var(--vp-c-gray-soft);
  border-bottom: 1px solid var(--vp-c-gray-soft);
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 64px;
}

.special-sponsor h3 {
  text-align: center;
  font-size: 13px;
  font-weight: 500;
}

.special-sponsor-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.special-sponsor .logo {
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.special-sponsor span {
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  flex: 1;
}

.special-sponsor a {
  display: flex;
  justify-content: center;
  padding: 0 24px;
}

.special-sponsor-empty {
  border-top: 1px solid var(--vp-c-gray-soft);
  border-bottom: 1px solid var(--vp-c-gray-soft);
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 64px;
}

.special-sponsor-empty span:first-child {
  text-align: right;
}

.special-sponsor-empty img {
  height: 42px;
  margin: -6px 0;
}

.dark .special-sponsor-empty img {
  filter: grayscale(1) invert(1);
}

@media (max-width: 576px) {
  .special-sponsor-empty {
    flex-direction: column;
    height: auto;
  }
  .special-sponsor-empty img {
    height: 36px;
    margin: 8px 0;
  }
  .special-sponsor-empty span {
    text-align: center !important;
  }
}
</style>