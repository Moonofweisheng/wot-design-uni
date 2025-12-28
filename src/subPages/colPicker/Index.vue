<template>
  <page-wraper>
    <view>
      <wd-cell-group border>
        <wd-col-picker :label="$t('xuan-ze-di-zhi')" v-model="value1" :columns="areaData1" :column-change="columnChange1" @confirm="handleValue" />
        <wd-col-picker :label="$t('chu-shi-xuan-xiang')" v-model="value2" :columns="areaData2" :column-change="columnChange" auto-complete />
        <wd-col-picker :label="$t('jinYong')" disabled v-model="value3" :columns="areaData3" :column-change="columnChange1" />
        <wd-col-picker :label="$t('zhi-du')" readonly v-model="value3" :columns="areaData3" :column-change="columnChange1" />
        <wd-col-picker :label="$t('jin-yong-xuan-xiang')" v-model="value4" :columns="areaData4" :column-change="columnChange1" />
        <wd-col-picker :label="$t('xuan-xiang-ti-shi-xin-xi')" v-model="value5" :columns="areaData5" :column-change="columnChange1" />
        <wd-col-picker
          :label="$t('zhan-shi-ge-shi-hua')"
          v-model="value6"
          :columns="areaData3"
          :column-change="columnChange1"
          :display-format="displayFormat"
        />
        <wd-col-picker :label="$t('biaoTi-0')" v-model="value7" :title="$t('xuan-ze-di-zhi')" :columns="areaData1" :column-change="columnChange1" />
        <wd-col-picker label="before-confirm" v-model="value8" :columns="areaData1" :column-change="columnChange1" :before-confirm="beforeConfirm" />
        <wd-col-picker :label="$t('cuo-wu')" error v-model="value9" :columns="areaData1" :column-change="columnChange1" />
        <wd-col-picker :label="$t('bi-tian')" required v-model="value10" :columns="areaData1" :column-change="columnChange1" />
        <wd-col-picker
          :label="$t('bi-tian-xing-hao-zai-you-ce')"
          required
          v-model="value16"
          :columns="areaData1"
          :column-change="columnChange1"
          marker-side="after"
        />
      </wd-cell-group>
      <wd-col-picker :label="$t('local-search')" filterable v-model="valueLocal" :columns="areaDataLocal" :column-change="columnChangeLocal" />
      <!-- 纯净解耦方案 - 远程搜索 -->
      <wd-col-picker
        ref="remotePicker"
        :label="$t('remote-search')"
        filterable
        filterType="remote"
        v-model="value17"
        :columns="areaDataSearch"
        :column-change="remoteColumnChange"
        @search-change="onSearchChange"
        @search="onSearch"
        @search-clear="onSearchClear"
      ></wd-col-picker>
    </view>
    <demo-block
      :title="
        $t(
          'yi-ban-columnchange-shi-ge-yi-bu-huo-qu-shu-ju-de-cao-zuo-chu-fa-columnchange-zu-jian-hui-you-mo-ren-loading-shu-ju-xiang-ying-hou-guan-bi-loading'
        )
      "
      transparent
    >
      <wd-col-picker :label="$t('xuan-ze-di-zhi')" v-model="value11" :columns="areaData1" :column-change="columnChange2" />
    </demo-block>
    <demo-block :title="$t('label-bu-chuan')" transparent>
      <wd-col-picker v-model="value12" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block :title="$t('da-xiao')" transparent>
      <wd-col-picker :label="$t('xuan-ze-di-zhi')" v-model="value13" size="large" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block :title="$t('zhi-kao-you-zhan-shi')" transparent>
      <wd-col-picker :label="$t('xuan-ze-di-zhi')" align-right v-model="value14" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-xuan-ze-qi')" transparent>
      <view style="margin-left: 15px">
        <view style="margin-bottom: 10px"></view>
        <view style="margin-bottom: 10px">{{ $t('dang-qian-xuan-zhong-xiang-displayvalue') }} {{ displayValue }}</view>

        <wd-col-picker
          v-model="value15"
          use-default-slot
          :columns="areaData1"
          :column-change="columnChange1"
          style="display: inline-block"
          @confirm="handleConfirm"
        >
          <wd-button>{{ $t('xuan-ze-di-zhi') }}</wd-button>
        </wd-col-picker>
      </view>
    </demo-block>

    <!-- 纯净解耦方案 - 下拉刷新上拉加载 -->
    <demo-block title="下拉刷新上拉加载" transparent>
      <wd-col-picker
        ref="asyncPicker"
        :label="$t('down-and-load-more')"
        v-model="valueAsync"
        :columns="columnsAsync"
        :column-change="columnChangeAsync"
        refresherEnabled
        scrollToLowerEnabled
        @refresh="onRefresh"
        @scroll-to-lower="onScrollToLower"
      />
    </demo-block>
    <demo-block title="综合案例：搜索+刷新+加载" transparent>
      <wd-col-picker
        ref="complexPicker"
        :label="$t('remote_down-and-load-more')"
        v-model="valueComplex"
        :columns="columnsComplex"
        :column-change="columnChangeComplex"
        filterable
        filterType="remote"
        refresherEnabled
        scrollToLowerEnabled
        @search="onSearchComplex"
        @search-change="onSearchComplex"
        @search-clear="onSearchClearComplex"
        @refresh="onRefreshComplex"
        @scroll-to-lower="onScrollToLowerComplex"
      />
    </demo-block>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'
import type { ColPickerColumnChange } from '@/uni_modules/wot-design-uni/components/wd-col-picker/types'
import { useColPickerData } from '@/hooks/useColPickerData'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { colPickerData, findChildrenByCode } = useColPickerData()
const toast = useToast()

onMounted(async () => {
  toast.loading(t('shu-ju-jia-zai-zhong'))
  await sleep()
  toast.close()
  value2.value = ['150000', '150100', '150121']

  getMockData(0, 1).then((data) => {
    columnsAsync.value = [data]
    pageMap.value[0] = 1
  })
})

const value1 = ref<any[]>([])
const value2 = ref<string[]>([])
const value3 = ref<any[]>(['130000', '130200', '130204'])
const value4 = ref<any[]>([])
const value5 = ref<any[]>([])
const value6 = ref<any[]>(['130000', '130200', '130204'])
const value7 = ref<any[]>([])
const value8 = ref<any[]>([])
const value9 = ref<any[]>([])
const value10 = ref<any[]>([])
const value11 = ref<any[]>([])
const value12 = ref<any[]>([])
const value13 = ref<any[]>([])
const value14 = ref<any[]>([])
const value15 = ref<any[]>([])
const value16 = ref<any[]>([])
const displayValue = ref<string>('')
const areaData1 = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const areaData2 = ref<any[]>([])
const areaData3 = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  }),
  findChildrenByCode(colPickerData, '130000')!.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  }),
  findChildrenByCode(colPickerData, '130200')!.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])
const areaData4 = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
      disabled: item.value === '140000'
    }
  })
])
const areaData5 = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
      disabled: item.value === '140000',
      tip:
        item.value === '140000'
          ? t('gai-di-qu-wu-huo-zan-shi-wu-fa-xuan-ze')
          : item.value === '150000'
          ? t('gai-di-qu-pei-song-shi-jian-ke-neng-jiao-chang')
          : ''
    }
  })
])

const columnChange1: ColPickerColumnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

const columnChange: ColPickerColumnChange = async ({ selectedItem, resolve, finish }) => {
  await sleep(0.3)
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

const columnChange2: ColPickerColumnChange = ({ selectedItem, resolve, finish }) => {
  setTimeout(() => {
    if (Math.random() > 0.7) {
      finish(false)
      toast.error(t('shu-ju-qing-qiu-shi-bai-qing-zhong-shi'))
      return
    }
    const areaData = findChildrenByCode(colPickerData, selectedItem.value)
    if (areaData && areaData.length) {
      resolve(
        areaData.map((item) => {
          return {
            value: item.value,
            label: item.text
          }
        })
      )
    } else {
      finish()
    }
  }, 300)
}

const valueLocal = ref<any[]>([])
const areaDataLocal = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChangeLocal: ColPickerColumnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

const displayFormat = (selectedItems: Record<string, any>[]) => {
  return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
}
const beforeConfirm = (value: (string | number)[], selectedItems: Record<string, any>[], resolve: (isPass: boolean) => void) => {
  if (parseInt(String(value[2])) > 120000) {
    toast.error(t('gai-di-qu-ku-cun-bu-zu'))
    resolve(false)
  } else {
    resolve(true)
  }
}

function sleep(second: number = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000 * second)
  })
}

function handleConfirm({ selectedItems }: any) {
  displayValue.value = selectedItems
    .map((item: any) => {
      return item.label
    })
    .join('')
}
function handleValue({ value }: any) {
  console.log(value)
}
// 远程搜索模式下
// 数据
// 1. 专业数据 - 直接写死
const majors = [
  { label: '计算机', value: 'cs' },
  { label: '数学', value: 'math' },
  { label: '物理', value: 'physics' }
]

// 2. 班级数据 - 完全静态数据
const getClasses = () => {
  return {
    cs: [
      { label: '计算机1班', value: 'computer-1' },
      { label: '计算机2班', value: 'computer-2' }
    ],
    math: [
      { label: '数学1班', value: 'math-1' },
      { label: '数学2班', value: 'math-2' }
    ],
    physics: [
      { label: '物理1班', value: 'physics-1' },
      { label: '物理2班', value: 'physics-2' }
    ]
  }
}

// 3. 学生数据 - 依赖于班级
const getStudents = () => {
  return {
    'computer-1': [
      { label: '张三', value: 's1' },
      { label: '李四', value: 's2' },
      { label: '王五', value: 's3' }
    ],
    'computer-2': [
      { label: '赵六', value: 's4' },
      { label: '孙七', value: 's5' }
    ],
    'math-1': [
      { label: '周八', value: 's6' },
      { label: '吴九', value: 's7' }
    ],
    'math-2': [{ label: '郑十', value: 's8' }],
    'physics-1': [{ label: '陈十一', value: 's9' }],
    'physics-2': [{ label: '刘十二', value: 's10' }]
  }
}

const value17 = ref<any[]>([])
const areaDataSearch = ref<{ label: string; value: string }[][]>([majors])

/**
 * 通用搜索过滤函数
 * @param items 要过滤的数据数组
 * @param searchText 搜索文本
 * @returns 过滤后的数据数组
 */
function filterData(items: any[], searchText: string): any[] {
  const searchKeyword = searchText.toLowerCase().trim()
  if (!searchKeyword) return items // 空字符串返回全部数据

  return items.filter((item) => item.label.toLowerCase().includes(searchKeyword) || item.value.toLowerCase().includes(searchKeyword))
}

/**
 * 通用数据更新函数 - 更新指定列的数据
 * @param colIndex 列索引
 * @param newData 新数据数组
 */
function updateColumnData(colIndex: number, newData: any[]): void {
  const newColumns = [...areaDataSearch.value]
  newColumns[colIndex] = newData
  areaDataSearch.value = newColumns
}

/**
 * 获取指定列的完整原始数据
 * @param colIndex 列索引
 * @param selectedValues 当前选中的值数组
 * @returns 原始数据数组
 */
function getColumnFullData(colIndex: number, selectedValues: (string | number)[]): any[] {
  if (colIndex === 0) {
    return majors
  } else if (colIndex === 1) {
    // 第1列（班级）数据依赖于第0列（专业）的选择
    const selectedMajor = selectedValues[0] as string
    if (selectedMajor) {
      const classes = getClasses()
      return (classes as Record<string, any[]>)[selectedMajor] || []
    }
    return []
  } else if (colIndex === 2) {
    // 第2列（学生）数据依赖于第1列（班级）的选择
    const selectedClass = selectedValues[1] as string
    if (selectedClass) {
      const students = getStudents()
      return (students as Record<string, any[]>)[selectedClass] || []
    }
    return []
  }
  return []
}

// 远程列变化处理 - 当用户选择某列后加载下一级数据（三级结构）
const remoteColumnChange: ColPickerColumnChange = ({ selectedItem, index, resolve, finish }) => {
  if (index === 0) {
    // 选择了专业(第0列)，加载对应的班级(第1列)
    const classes = getClasses()
    const selectedClasses = (classes as Record<string, any[]>)[selectedItem.value] || []

    // 同步更新父组件数据源，防止搜索更新时丢失列
    updateColumnData(index + 1, selectedClasses)

    resolve(selectedClasses)
  } else if (index === 1) {
    // 选择了班级(第1列)，加载对应的学生(第2列)
    const students = getStudents()
    const selectedStudents = (students as Record<string, any[]>)[selectedItem.value] || []

    // 同步更新父组件数据源
    updateColumnData(index + 1, selectedStudents)

    resolve(selectedStudents)
  } else {
    // 最后一级（学生），结束选择
    finish()
  }
}

const onSearchChange = ({
  searchText,
  colIndex,
  selectedValues,
  selectedItems
}: {
  searchText: string
  colIndex: number
  selectedValues: (string | number)[]
  selectedItems: Record<string, any>[]
}) => {
  // 1. 获取该列的完整数据（基于当前选中项）
  const fullData = getColumnFullData(colIndex, selectedValues)

  // 2. 在完整数据基础上进行过滤
  const filteredData = filterData(fullData, searchText)

  // 3. 更新视图
  updateColumnData(colIndex, filteredData)
}

// 搜索执行 - 与搜索变化相同的逻辑
const onSearch = ({
  searchText,
  colIndex,
  selectedValues,
  selectedItems
}: {
  searchText: string
  colIndex: number
  selectedValues: (string | number)[]
  selectedItems: Record<string, any>[]
}) => {
  onSearchChange({ searchText, colIndex, selectedValues, selectedItems })
}

// 清空搜索 - 重新获取该列完整数据
const onSearchClear = ({
  colIndex,
  selectedValues,
  selectedItems
}: {
  colIndex: number
  selectedValues: (string | number)[]
  selectedItems: Record<string, any>[]
}) => {
  // 直接获取完整数据并更新
  const fullData = getColumnFullData(colIndex, selectedValues)
  updateColumnData(colIndex, fullData)
}
const valueAsync = ref<any[]>([])
const columnsAsync = ref<any[]>([])
const pageMap = ref<Record<number, number>>({})

const getMockData = (colIndex: number, page: number, pageSize: number = 15) => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      const data: any[] = []
      for (let i = 0; i < pageSize; i++) {
        const id = (page - 1) * pageSize + i + 1
        data.push({
          label: colIndex === 0 ? `选项${id}` : `子选项${colIndex}-${id}`,
          value: colIndex === 0 ? `${id}` : `${colIndex}-${id}`
        })
      }
      uni.hideLoading()
      resolve(data)
    }, 1000)
  })
}

const columnChangeAsync: ColPickerColumnChange = ({ selectedItem, resolve, finish, index }) => {
  // 模拟加载下一级数据，这里直接根据下一级的 colIndex (index + 1) 获取模拟数据
  const nextColIndex = index + 1
  if (nextColIndex >= 4) {
    finish()
    return
  }
  pageMap.value[nextColIndex] = 1
  uni.showLoading({
    title: '加载中...',
    mask: true,
    icon: 'none'
  })
  getMockData(nextColIndex, 1)
    .then((data) => {
      uni.hideLoading()
      // 同步更新父组件数据源
      const newCols = [...columnsAsync.value]
      newCols[nextColIndex] = data
      // 清除后续列的数据（如果有）
      if (newCols.length > nextColIndex + 1) {
        newCols.splice(nextColIndex + 1)
      }
      columnsAsync.value = newCols

      resolve(data)
    })
    .catch(() => {
      uni.hideLoading()
      finish(false)
    })
}

// 纯净解耦方案 - 下拉刷新事件处理
const onRefresh = ({ searchText, colIndex }: { searchText: string; colIndex: number }) => {
  // 模拟异步刷新
  setTimeout(() => {
    // 获取新数据
    const page = 1
    getMockData(colIndex, page).then((data) => {
      // 更新数据
      const newCols = [...columnsAsync.value]
      newCols[colIndex] = data
      columnsAsync.value = newCols

      // 重置页码
      pageMap.value[colIndex] = page
      // 停止刷新状态
      asyncPicker.value?.stopRefresh()
    })
  }, 1000)
}

// 纯净解耦方案 - 上拉加载更多事件处理
const onScrollToLower = ({ searchText, colIndex }: { searchText: string; colIndex: number }) => {
  // 获取下一页数据
  const nextPage = (pageMap.value[colIndex] || 1) + 1

  uni.showLoading({
    title: '加载中...',
    mask: true,
    icon: 'none'
  })

  // 模拟异步加载
  setTimeout(() => {
    getMockData(colIndex, nextPage).then((newData) => {
      uni.hideLoading()

      // 获取当前数据并拼接
      const currentData = columnsAsync.value[colIndex] || []
      const combinedData = [...currentData, ...newData]

      // 更新数据
      const newCols = [...columnsAsync.value]
      newCols[colIndex] = combinedData
      columnsAsync.value = newCols

      // 更新页码
      pageMap.value[colIndex] = nextPage
    })
  }, 500)
}

// 添加ref引用
const remotePicker = ref()
const asyncPicker = ref()

// --- 综合案例状态 ---
const complexPicker = ref()
const valueComplex = ref<any[]>([])
const columnsComplex = ref<any[]>([])
const pageMapComplex = ref<Record<number, number>>({})

// 模拟综合数据获取
// 使用闭包缓存“数据库”，避免每次生成不一致
const getComplexMockData = (() => {
  // 生成一个包含100条数据的“数据库”
  const TOTAL_COUNT = 100
  const DB: any[] = []

  return (colIndex: number, page: number, pageSize: number = 15, keyword: string = '') => {
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        // 动态生成数据（为了配合 colIndex 变化，实际业务中是去查表）
        // 这里我们简单模拟：每次请求时根据 colIndex 临时构建“全量表”进行查询
        const fullTable: any[] = []
        for (let i = 1; i <= TOTAL_COUNT; i++) {
          const label = colIndex === 0 ? `省份${i}` : colIndex === 1 ? `城市${i}` : `区县${i}`
          fullTable.push({
            label,
            value: colIndex === 0 ? `${i}` : `${colIndex}-${i}`
          })
        }

        // 1. 过滤 (WHERE label LIKE %keyword%)
        let filteredData = fullTable
        if (keyword) {
          filteredData = fullTable.filter((item) => item.label.includes(keyword))
        }

        // 2. 分页 (LIMIT offset, pageSize)
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const pageData = filteredData.slice(start, end)

        resolve(pageData)
      }, 500)
    })
  }
})()

// 综合案例：列变化
const columnChangeComplex: ColPickerColumnChange = ({ selectedItem, resolve, finish, index }) => {
  const nextColIndex = index + 1
  if (nextColIndex >= 3) {
    finish()
    return
  }

  // 重置下一列页码
  pageMapComplex.value[nextColIndex] = 1

  uni.showLoading({ title: '加载中...', mask: true, icon: 'none' })

  // 加载下一列第一页数据
  getComplexMockData(nextColIndex, 1)
    .then((data) => {
      uni.hideLoading()
      // 注意：这里需要同时更新父组件的数据源，否则搜索或刷新后会丢失列
      // 但对于columnChange，resolve会自动更新组件内部状态
      // 为了保持一致性，我们手动更新一下columnsComplex（虽然组件内部有selectList）
      const newCols = [...columnsComplex.value]
      newCols[nextColIndex] = data
      // 清除后续列的数据（如果有）
      if (newCols.length > nextColIndex + 1) {
        newCols.splice(nextColIndex + 1)
      }
      columnsComplex.value = newCols

      resolve(data)
    })
    .catch(() => {
      uni.hideLoading()
      finish(false)
    })
}

// 综合案例：搜索
const onSearchComplex = ({ searchText, colIndex }: { searchText: string; colIndex: number }) => {
  // 重置页码
  pageMapComplex.value[colIndex] = 1

  // 重新加载第一页，带搜索词
  getComplexMockData(colIndex, 1, 15, searchText).then((data) => {
    // 更新父组件数据源引用
    const newCols = [...columnsComplex.value]
    newCols[colIndex] = data
    columnsComplex.value = newCols
  })
}

// 综合案例：清空搜索
const onSearchClearComplex = ({ colIndex }: { colIndex: number }) => {
  onSearchComplex({ searchText: '', colIndex })
}

// 综合案例：下拉刷新
const onRefreshComplex = ({ searchText, colIndex }: { searchText: string; colIndex: number }) => {
  // 模拟刷新
  setTimeout(() => {
    // 重置页码
    pageMapComplex.value[colIndex] = 1

    // 重新加载第一页，带搜索词
    getComplexMockData(colIndex, 1, 15, searchText).then((data) => {
      // 更新父组件数据源
      const newCols = [...columnsComplex.value]
      newCols[colIndex] = data
      columnsComplex.value = newCols

      // 停止刷新
      complexPicker.value?.stopRefresh()
    })
  }, 500)
}

// 综合案例：上拉加载
const onScrollToLowerComplex = ({ searchText, colIndex }: { searchText: string; colIndex: number }) => {
  const nextPage = (pageMapComplex.value[colIndex] || 1) + 1

  uni.showLoading({ title: '加载更多...', mask: true, icon: 'none' })

  // 加载下一页
  getComplexMockData(colIndex, nextPage, 15, searchText).then((newData) => {
    uni.hideLoading()

    if (newData.length === 0) {
      toast.info('没有更多数据了')
      return
    }

    // 获取当前数据并拼接
    // 注意：这里需要根据searchText来决定拼接逻辑
    // 如果是搜索状态下加载更多，应该追加到搜索结果中
    const currentData = columnsComplex.value[colIndex] || []
    const combinedData = [...currentData, ...newData]

    // 更新父组件数据源
    const newCols = [...columnsComplex.value]
    newCols[colIndex] = combinedData
    columnsComplex.value = newCols

    // 更新页码
    pageMapComplex.value[colIndex] = nextPage
  })
}

// 初始化综合案例第一列数据
onMounted(() => {
  pageMapComplex.value[0] = 1
  getComplexMockData(0, 1).then((data) => {
    columnsComplex.value = [data]
  })
})
</script>
<style lang="scss" scoped></style>
