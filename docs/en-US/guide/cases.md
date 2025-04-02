# Cases

We warmly welcome everyone to contribute excellent demos and cases. Feel free to submit cases in this [issue](https://github.com/Moonofweisheng/wot-design-uni/issues/16).

Wot UI is being used in production environments by many companies and teams. Here are some excellent cases:

<div class="cases-container">
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">Tiaojibao</span>
    </template>
    <el-image src="/cases/tiaojibao.jpg" />
  </el-card>
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">BodyLang Posture Assessment</span>
    </template>
    <el-image src="/cases/BodyLang.png" />
  </el-card>
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">Chencai Consulting</span>
    </template>
    <el-image src="/cases/chencaizixun.png" />
  </el-card>
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">Daily Counter</span>
    </template>
    <el-image src="/cases/richangjishuqi.jpg" />
  </el-card> 
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">Woqu Bookkeeping</span>
    </template>
    <el-image src="/cases/woqujizhang.jpg" />
  </el-card> 
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">Salary Calculator</span>
    </template>
    <el-image src="/cases/salary-calculator.jpg" />
  </el-card>
  <el-card shadow="hover">
    <template #header>
      <span class="case-title">Suixiang Xiaozhan</span>
      <!-- Add a description line -->
      <span class="case-description">A warm, anonymous, and safe social mini program for sharing thoughts.</span>
    </template>
    <el-image src="/cases/suixiangxiaozhan.png" />
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
</script>