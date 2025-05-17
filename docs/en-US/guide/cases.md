# Cases

We warmly welcome everyone to contribute excellent demos and cases. Feel free to submit cases in this [issue](https://github.com/Moonofweisheng/wot-design-uni/issues/16).

Wot UI is being used in production environments by many companies and teams. Here are some excellent cases:

<div class="cases-container">
  <el-card v-for="(item, index) in cases" :key="index" shadow="hover">
    <template #header>
      <span class="case-title">{{ item.name }}</span>
      <span class="case-description">{{ item.description }}</span>
    </template>
    <el-image :src="item.image" />
  </el-card>
</div>

<style scoped>
.cases-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.case-title {
  font-size: 18px;
  font-weight: 500;
}

.case-description {
  margin-left: 10px;
  font-size: 14px;
  color: #999;
}

:deep(.el-card__body .el-image) {
  width: 100%;
  border-radius: 4px;
}
</style>

<script setup>
import { useCaseData } from '../../.vitepress/theme/composables/cases'
const { data:cases } = useCaseData()
</script>
