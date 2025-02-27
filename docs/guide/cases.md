# 案例

我们非常欢迎大家一起贡献优秀的 Demo 与案例，欢迎在此 [issue](https://github.com/Moonofweisheng/wot-design-uni/issues/16) 提交案例。

Wot UI 已被很多公司和团队在生产环境使用，下面是一些优秀的案例：

<div class="cases-container">
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">调剂宝</span>
    </template>
    <el-image src="/cases/tiaojibao.jpg" />
  </el-card>
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">BodyLang体态评估</span>
    </template>
    <el-image src="/cases/BodyLang.png" />
  </el-card>
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">尘才咨询</span>
    </template>
    <el-image src="/cases/chencaizixun.png" />
  </el-card>
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">日常计数器</span>
    </template>
    <el-image src="/cases/richangjishuqi.jpg" />
  </el-card> 
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">蜗趣记账</span>
    </template>
    <el-image src="/cases/woqujizhang.jpg" />
  </el-card> 
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">薪资速算器</span>
    </template>
    <el-image src="/cases/salary-calculator.jpg" />
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

:deep(.el-card__body .el-image) {
  width: 100%;
  border-radius: 4px;
}
</style>

<script setup>
</script>
