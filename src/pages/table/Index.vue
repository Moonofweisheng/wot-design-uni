<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-table :data="dataList" @sort-method="handleSort" :height="400" @row-click="handleRowClick">
        <wd-table-col prop="name" :label="$t('xing-ming')" align="center" width="50%"></wd-table-col>
        <wd-table-col prop="grade" :label="$t('fen-shu')" align="center" width="50%"></wd-table-col>
      </wd-table>
    </demo-block>

    <demo-block :title="$t('wu-bian-kuang')">
      <wd-table :data="dataList" @sort-method="handleSort" :height="400" :border="false" @row-click="handleRowClick">
        <wd-table-col prop="name" :label="$t('xing-ming')" align="center" width="50%"></wd-table-col>
        <wd-table-col prop="grade" :label="$t('fen-shu')" align="center" width="50%"></wd-table-col>
      </wd-table>
    </demo-block>

    <demo-block :title="$t('wu-ban-ma-wen')">
      <wd-table :data="dataList" @sort-method="handleSort" :height="400" :stripe="false" @row-click="handleRowClick">
        <wd-table-col prop="name" :label="$t('xing-ming')" align="center" width="50%"></wd-table-col>
        <wd-table-col prop="grade" :label="$t('fen-shu')" align="center" width="50%"></wd-table-col>
      </wd-table>
    </demo-block>

    <demo-block :title="$t('bu-zhan-shi-biao-tou')">
      <wd-table :data="dataList" @sort-method="handleSort" :height="400" :show-header="false" @row-click="handleRowClick">
        <wd-table-col prop="name" :label="$t('xing-ming')" align="center" width="50%"></wd-table-col>
        <wd-table-col prop="grade" :label="$t('fen-shu')" align="center" width="50%"></wd-table-col>
      </wd-table>
    </demo-block>

    <demo-block :title="$t('gu-ding-lie')">
      <wd-table :data="dataList" @sort-method="handleSort" @row-click="handleRowClick" :height="400">
        <wd-table-col prop="name" :label="$t('xing-ming')" fixed sortable align="center"></wd-table-col>
        <wd-table-col prop="grade" :label="$t('fen-shu')" fixed sortable align="center"></wd-table-col>
        <wd-table-col prop="hobby" :label="$t('yi-yan-yi-bi-zhi')" sortable :width="160"></wd-table-col>
        <wd-table-col prop="school" :label="$t('qiu-xue-zhi-suo')" :width="180"></wd-table-col>
        <wd-table-col prop="major" :label="$t('zhuan-ye')"></wd-table-col>
        <wd-table-col prop="gender" :label="$t('xing-bie')"></wd-table-col>
      </wd-table>
    </demo-block>

    <demo-block :title="$t('xian-shi-suo-yin')">
      <wd-table :data="dataList" :height="400" @sort-method="handleSort" :index="{ align: 'center' }">
        <wd-table-col prop="name" :label="$t('xing-ming')" sortable align="center"></wd-table-col>
        <wd-table-col prop="grade" :label="$t('fen-shu')" sortable align="center"></wd-table-col>
        <wd-table-col prop="hobby" :label="$t('yi-yan-yi-bi-zhi')" sortable :width="160"></wd-table-col>
        <wd-table-col prop="school" :label="$t('qiu-xue-zhi-suo')" :width="180"></wd-table-col>
        <wd-table-col prop="major" :label="$t('zhuan-ye-0')"></wd-table-col>
        <wd-table-col prop="gender" :label="$t('xing-bie')"></wd-table-col>
      </wd-table>
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-lie-mo-ban')">
      <wd-table :data="dataList" @sort-method="handleSort" @row-click="handleRowClick" :height="400">
        <wd-table-col prop="name" :label="$t('xing-ming')" fixed sortable align="center"></wd-table-col>
        <wd-table-col prop="grade" :label="$t('fen-shu')" fixed sortable align="center">
          <template #value="{ row }">
            <view class="custom-class">
              <text>{{ row.grade }}</text>
              <text>{{ '同比' }}{{ row.compare }}</text>
            </view>
          </template>
        </wd-table-col>
        <wd-table-col prop="hobby" :label="$t('yi-yan-yi-bi-zhi')" sortable :width="160"></wd-table-col>
        <wd-table-col prop="school" :label="$t('qiu-xue-zhi-suo')" :width="180"></wd-table-col>
        <wd-table-col prop="major" :label="$t('zhuan-ye-1')"></wd-table-col>
        <wd-table-col prop="gender" :label="$t('xing-bie')"></wd-table-col>
        <wd-table-col prop="graduation" :label="$t('xue-cheng-shi-jian')"></wd-table-col>
      </wd-table>
    </demo-block>

    <demo-block :title="$t('bu-gu-ding-biao-tou-jie-he-fen-ye-qi')">
      <wd-table :data="paginationData" :fixed-header="false">
        <wd-table-col prop="name" :label="$t('xing-ming')" fixed align="center"></wd-table-col>
        <wd-table-col prop="grade" :label="$t('fen-shu')" fixed align="center"></wd-table-col>
        <wd-table-col prop="hobby" :label="$t('yi-yan-yi-bi-zhi')" :width="160"></wd-table-col>
        <wd-table-col prop="school" :label="$t('qiu-xue-zhi-suo')" :width="180"></wd-table-col>
        <wd-table-col prop="major" :label="$t('zhuan-ye-2')"></wd-table-col>
        <wd-table-col prop="gender" :label="$t('xing-bie')"></wd-table-col>
      </wd-table>
      <wd-pagination custom-style="border: 1px solid #ececec;border-top:none" v-model="page" :total="total"></wd-pagination>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { TableColumn } from '@/uni_modules/wot-design-uni/components/wd-table-col/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface TableData {
  name: string
  school: string
  major: string
  gender: string
  graduation: string
  grade: number
  compare: string
  hobby: string
}

const dataList = ref<TableData[]>([
  {
    name: t('guan-yu'),
    school: t('wu-han-shi-yang-luo-lv-dou-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye'),
    gender: t('nan'),
    graduation: t('2022-nian-1-yue-12-ri'),
    grade: 66,
    compare: '48%',
    hobby: t('yan-liang-wen-chou-yi-wu-guan-zhi-ru-tu-ji-wa-quan-er')
  },
  {
    name: t('liu-bei'),
    school: t('wu-han-shi-yang-luo-bian-zhi-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-0'),
    gender: t('nan-0'),
    graduation: t('2022-nian-1-yue-12-ri-0'),
    grade: 68,
    compare: '21%',
    hobby: t('wo-de-kong-ming-ru-yu-de-shui-ye')
  },
  {
    name: t('zhao-yun'),
    school: t('wu-han-shi-yang-luo-fu-you-bao-jian-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-1'),
    gender: t('nan-1'),
    graduation: t('2022-nian-1-yue-12-ri-1'),
    grade: 91,
    compare: '12%',
    hobby: t('zi-long-zi-long-shi-wu-shuang')
  },
  {
    name: t('zhao-yun'),
    school: t('wu-han-shi-yang-luo-fu-you-bao-jian-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-2'),
    gender: t('nan-2'),
    graduation: t('2022-nian-1-yue-12-ri-2'),
    grade: 91,
    compare: '12%',
    hobby: t('zi-long-zi-long-shi-wu-shuang-0')
  },
  {
    name: t('kong-ming'),
    school: t('wu-han-shi-yang-luo-wo-long-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-3'),
    gender: t('nan-3'),
    graduation: t('2022-nian-1-yue-12-ri-3'),
    grade: 99,
    compare: '18%',
    hobby: t('xing-han-tao-zei-ke-fu-zhong-yuan')
  },
  {
    name: t('zhao-yun'),
    school: t('wu-han-shi-yang-luo-fu-you-bao-jian-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-4'),
    gender: t('nan-4'),
    graduation: t('2022-nian-1-yue-12-ri-4'),
    grade: 36,
    compare: '48%',
    hobby: t('zi-long-zi-long-shi-wu-shuang-1')
  },
  {
    name: t('guan-yu-0'),
    school: t('wu-han-shi-yang-luo-lv-dou-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-5'),
    gender: t('nan-5'),
    graduation: t('2022-nian-1-yue-12-ri-5'),
    grade: 66,
    compare: '48%',
    hobby: t('yan-liang-wen-chou-yi-wu-guan-zhi-ru-tu-ji-wa-quan-er-0')
  },
  {
    name: t('liu-bei'),
    school: t('wu-han-shi-yang-luo-bian-zhi-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-6'),
    gender: t('nan-6'),
    graduation: t('2022-nian-1-yue-12-ri-6'),
    grade: 68,
    compare: '21%',
    hobby: t('wo-de-kong-ming-ru-yu-de-shui-ye-0')
  },
  {
    name: t('zhao-yun'),
    school: t('wu-han-shi-yang-luo-fu-you-bao-jian-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-7'),
    gender: t('nan-7'),
    graduation: t('2022-nian-1-yue-12-ri-7'),
    grade: 91,
    compare: '12%',
    hobby: t('zi-long-zi-long-shi-wu-shuang-2')
  },
  {
    name: t('kong-ming-0'),
    school: t('wu-han-shi-yang-luo-wo-long-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-8'),
    gender: t('nan-8'),
    graduation: t('2022-nian-1-yue-12-ri-8'),
    grade: 99,
    compare: '18%',
    hobby: t('xing-han-tao-zei-ke-fu-zhong-yuan')
  },
  {
    name: t('zhao-yun'),
    school: t('wu-han-shi-yang-luo-fu-you-bao-jian-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-9'),
    gender: t('nan-9'),
    graduation: t('2022-nian-1-yue-12-ri-9'),
    grade: 36,
    compare: '48%',
    hobby: t('zi-long-zi-long-shi-wu-shuang-3')
  },
  {
    name: t('guan-yu-1'),
    school: t('wu-han-shi-yang-luo-lv-dou-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-10'),
    gender: t('nan-10'),
    graduation: t('2022-nian-1-yue-12-ri-10'),
    grade: 66,
    compare: '48%',
    hobby: t('yan-liang-wen-chou-yi-wu-guan-zhi-ru-tu-ji-wa-quan-er-1')
  },
  {
    name: t('liu-bei'),
    school: t('wu-han-shi-yang-luo-bian-zhi-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-11'),
    gender: t('nan-11'),
    graduation: t('2022-nian-1-yue-12-ri-11'),
    grade: 68,
    compare: '21%',
    hobby: t('wo-de-kong-ming-ru-yu-de-shui-ye-1')
  },
  {
    name: t('zhao-yun'),
    school: t('wu-han-shi-yang-luo-fu-you-bao-jian-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-12'),
    gender: t('nan-12'),
    graduation: t('2022-nian-1-yue-12-ri-12'),
    grade: 91,
    compare: '12%',
    hobby: t('zi-long-zi-long-shi-wu-shuang-4')
  },
  {
    name: t('kong-ming-1'),
    school: t('wu-han-shi-yang-luo-wo-long-xue-yuan'),
    major: t('ji-suan-ji-ke-xue-yu-ji-shu-zhuan-ye-13'),
    gender: t('nan-13'),
    graduation: t('2022-nian-1-yue-12-ri-13'),
    grade: 99,
    compare: '18%',
    hobby: t('xing-han-tao-zei-ke-fu-zhong-yuan')
  }
])
const page = ref<number>(1)
const pageSize = ref<number>(10)

const total = ref<number>(dataList.value.length)

const paginationData = computed(() => {
  // 按页码和每页条数截取数据
  return dataList.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
})

/**
 * 排序
 * @param e
 */
function handleSort(column: TableColumn) {
  dataList.value = dataList.value.reverse()
}

function handleRowClick({ rowIndex }: any) {
  console.log(rowIndex)
}
</script>
<style lang="scss" scoped>
.custom-class {
  height: 80rpx;
  width: 220rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
