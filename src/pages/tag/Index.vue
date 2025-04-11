<template>
  <view>
    <page-wraper>
      <demo-block :title="$t('jiBenYongFa')">
        <view>
          <wd-tag custom-class="space">{{ $t('biao-qian') }}</wd-tag>
          <wd-tag custom-class="space" type="primary">{{ $t('biao-qian-0') }}</wd-tag>
          <wd-tag custom-class="space" type="danger">{{ $t('biao-qian-6') }}</wd-tag>
          <wd-tag custom-class="space" type="warning">{{ $t('biao-qian-7') }}</wd-tag>
          <wd-tag custom-class="space" type="success">{{ $t('biao-qian-8') }}</wd-tag>
        </view>
      </demo-block>

      <demo-block :title="$t('you-ling-biao-qian')">
        <view>
          <wd-tag custom-class="space" plain>{{ $t('biao-qian-9') }}</wd-tag>
          <wd-tag custom-class="space" plain type="primary">{{ $t('biao-qian-10') }}</wd-tag>
          <wd-tag custom-class="space" plain type="danger">{{ $t('biao-qian-11') }}</wd-tag>
          <wd-tag custom-class="space" plain type="warning">{{ $t('biao-qian-12') }}</wd-tag>
          <wd-tag custom-class="space" plain type="success">{{ $t('biao-qian-13') }}</wd-tag>
        </view>
      </demo-block>

      <demo-block :title="$t('biao-ji-biao-qian')">
        <view>
          <wd-tag custom-class="space" mark>{{ $t('biao-qian-14') }}</wd-tag>
          <wd-tag custom-class="space" type="primary" mark>{{ $t('biao-qian-15') }}</wd-tag>
          <wd-tag custom-class="space" type="danger" mark>{{ $t('biao-qian-16') }}</wd-tag>
          <wd-tag custom-class="space" type="warning" mark>{{ $t('biao-qian-17') }}</wd-tag>
          <wd-tag custom-class="space" type="success" mark>{{ $t('biao-qian-18') }}</wd-tag>
        </view>
      </demo-block>

      <demo-block :title="$t('you-ling-biao-ji-biao-qian')">
        <view>
          <wd-tag custom-class="space" mark plain>{{ $t('biao-qian-19') }}</wd-tag>
          <wd-tag custom-class="space" type="primary" mark plain>{{ $t('biao-qian-20') }}</wd-tag>
          <wd-tag custom-class="space" type="danger" mark plain>{{ $t('biao-qian-21') }}</wd-tag>
          <wd-tag custom-class="space" type="warning" mark plain>{{ $t('biao-qian-22') }}</wd-tag>
          <wd-tag custom-class="space" type="success" mark plain>{{ $t('biao-qian-23') }}</wd-tag>
        </view>
      </demo-block>

      <demo-block :title="$t('yuan-jiao-biao-qian')">
        <view>
          <wd-tag custom-class="space" round>{{ $t('biao-qian-24') }}</wd-tag>
          <wd-tag custom-class="space" type="primary" round>{{ $t('biao-qian-25') }}</wd-tag>
          <wd-tag custom-class="space" type="danger" round>{{ $t('biao-qian-26') }}</wd-tag>
          <wd-tag custom-class="space" type="warning" round>{{ $t('biao-qian-27') }}</wd-tag>
          <wd-tag custom-class="space" type="success" round>{{ $t('biao-qian-28') }}</wd-tag>
        </view>
      </demo-block>

      <demo-block :title="$t('she-zhi-tu-biao')">
        <view>
          <wd-tag custom-class="space" icon="clock" mark>{{ $t('biao-qian-29') }}</wd-tag>
          <wd-tag custom-class="space" mark use-icon-slot>
            <text>{{ $t('cha-cao') }}</text>
            <template #icon>
              <wd-icon name="dong" />
            </template>
          </wd-tag>
        </view>
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-yan-se-0')">
        <view>
          <wd-tag custom-class="space" color="#0083ff" bg-color="#d0e8ff">{{ $t('biao-qian-30') }}</wd-tag>
          <wd-tag custom-class="space" color="#FAA21E" bg-color="#FAA21E" plain>{{ $t('biao-qian-31') }}</wd-tag>
        </view>
      </demo-block>

      <demo-block :title="$t('ke-guan-bi')">
        <view>
          <wd-tag
            v-for="(tag, index) in tags"
            :key="index"
            custom-class="space"
            round
            closable
            @click="handleClick(index)"
            @close="handleClose(index)"
          >
            {{ tag.value }}
          </wd-tag>
        </view>
      </demo-block>
      <demo-block :title="$t('xin-zeng-biao-qian')">
        <view>
          <wd-tag v-for="(tag, index) in dynamicTags" :key="index" custom-class="space" round closable @close="handleClose1(index)">
            {{ tag }}
          </wd-tag>
          <wd-tag custom-class="space" round dynamic @confirm="handleConfirm"></wd-tag>
          <wd-tag custom-class="space" round dynamic @confirm="handleConfirm">
            <template #add>
              <wd-icon name="pin" size="12px"></wd-icon>
              <text style="margin-left: 4px">{{ $t('zi-ding-yi') }}</text>
            </template>
          </wd-tag>
        </view>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const tags = ref([
  {
    plain: true,
    closable: true,
    type: 'primary',
    value: t('biao-qian-yi')
  },
  {
    plain: true,
    closable: true,
    type: 'primary',
    value: t('biao-qian-er')
  },
  {
    plain: true,
    closable: true,
    type: 'primary',
    value: t('biao-qian-san')
  }
])
const dynamicTags = ref([t('biao-qian-yi-0'), t('biao-qian-er-0')])

function handleClick(index: number) {
  console.log('click:index' + index)
}
function handleClose(order: number) {
  tags.value = tags.value.filter((value, index) => index !== order)
  console.log('close:index' + order)
}
function handleClose1(order: number) {
  dynamicTags.value = dynamicTags.value.filter((item, index) => {
    return index !== order
  })
}
function handleConfirm({ value }: any) {
  if (!value) return
  dynamicTags.value = [...dynamicTags.value, value]
}
</script>
<style lang="scss" scoped>
:deep(.space) {
  margin: 0 10px 10px;
}
</style>
