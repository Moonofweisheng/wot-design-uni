# 🤖 生活小工具

本章节提供了一些工作、生活中常用的一些小工具，大家可以使用，也是对我们的支持。

如果对您有帮助，可以点赞转发给朋友，谢谢！

## 工具列表

<div class="tools-container">
  <el-card class="tool-card" shadow="hover">
    <template #header>
      <span class="tool-title">薪资速算器</span>
    </template>
    <el-image
      :src="salaryCalculator"
      class="tool-image"
    />
  </el-card>

  <el-card class="tool-card" shadow="hover">
    <template #header>
      <span class="tool-title">调剂宝——福利码：uh3p</span>
    </template>
    <el-image
      :src="tiaojiHelper"
      class="tool-image"
    />
    <div class="tool-desc">
      2025考研调剂必备神器，助你把握每一个调剂机会！
      <el-link type="primary" href="/ads/tiaojibao.html" target="_blank">查看详情</el-link>
    </div>
  </el-card>
</div>

<style>
.tools-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.tool-card {
  flex: 0 0 250px;
  transition: all 0.3s;
}

.tool-card:hover {
  transform: translateY(-5px);
}

.tool-title {
  font-size: 18px;
  font-weight: 500;
}

.tool-image {
  width: 100%;
  border-radius: 4px;
}

.tool-desc {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}
</style>

<script setup>
import salaryCalculator from '/salary-calculator.jpg'
import tiaojiHelper from '/tiaojibao.png'
</script>
