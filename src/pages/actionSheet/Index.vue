<template>
  <page-wraper>
    <wd-toast />
    <view>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-button @click="showActions1">{{ $t('danChuCaiDan') }}</wd-button>
        <wd-action-sheet v-model="show" :actions="actions" />
      </demo-block>
      <demo-block :title="$t('xuanXiangZhuangTai')">
        <wd-button @click="showActions2">{{ $t('danChuCaiDan') }}</wd-button>
      </demo-block>
      <demo-block :title="$t('quXiaoAnNiu')">
        <wd-button @click="showActions3">{{ $t('danChuCaiDan') }}</wd-button>
        <wd-action-sheet v-model="show1" :actions="actions" :cancel-text="$t('qu-xiao')" @close="close1" />
      </demo-block>
      <demo-block :title="$t('ziDingYiMianBanDanHang')">
        <wd-button @click="showActions4">{{ $t('danChuCaiDan') }}</wd-button>
        <wd-action-sheet v-model="show2" :panels="panels" :cancel-text="$t('qu-xiao')" @close="close2" @select="select" />
      </demo-block>
      <demo-block :title="$t('ziDingYiMianBanDuoHang')">
        <wd-button @click="showActions5">{{ $t('danChuCaiDan') }}</wd-button>
        <wd-action-sheet v-model="show3" :panels="panels" :cancel-text="$t('qu-xiao')" @close="close3" @select="select1" />
      </demo-block>
      <demo-block :title="$t('biaoTi-0')">
        <wd-button @click="showActions6">{{ $t('danChuCaiDan') }}</wd-button>
      </demo-block>
      <wd-action-sheet v-model="show4" :title="$t('biaoTi-0')" @close="close4" :cancelText="cancelText">
        <view style="padding: 15px 15px 150px 15px">{{ $t('neiRong') }}</view>
      </wd-action-sheet>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const show = ref<boolean>(false)
const actions = ref<any[]>([])
const panels = ref<any[]>([])
const cancelText = ref<string>('')
const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)

function showActions1() {
  show.value = true
  actions.value = [
    {
      name: t('xuanXiang_1-0')
    },
    {
      name: t('xuanXiang_2-0')
    },
    {
      name: t('xuanXiang_3-0'),
      subname: t('miaoShuXinXi-0')
    }
  ]
}
function showActions2() {
  show.value = true
  actions.value = [
    {
      name: t('yanSe'),
      color: '#0083ff'
    },
    {
      name: t('jinYong'),
      disabled: true
    },
    {
      loading: true
    }
  ]
}
function showActions3() {
  show1.value = true
  actions.value = [
    {
      name: t('xuanXiang_1-0')
    },
    {
      name: t('xuanXiang_2-0')
    },
    {
      name: t('xuanXiang_3-0'),
      subname: t('miaoShuXinXi-0')
    }
  ]
}
function showActions4() {
  show2.value = true
  panels.value = [
    {
      iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
      title: t('weiXinHaoYou')
    },
    {
      iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
      title: t('weiXinPengYouQuan')
    },
    {
      iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
      title: t('qqHaoYou')
    },
    {
      iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
      title: t('weiXinShouCang')
    },
    {
      iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
      title: t('weiXinPengYouQuan')
    },
    {
      iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
      title: t('qqHaoYou')
    }
  ]
}
function showActions5() {
  show3.value = true
  panels.value = [
    [
      {
        iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
        title: t('weiXinHaoYou')
      },
      {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
        title: t('weiXinPengYouQuan')
      },
      {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
        title: t('qqHaoYou')
      },
      {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
        title: t('weiXinShouCang')
      },
      {
        iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
        title: t('weiXinHaoYou')
      },
      {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
        title: t('weiXinPengYouQuan')
      },
      {
        iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
        title: t('weiXinHaoYou')
      },
      {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
        title: t('weiXinPengYouQuan')
      }
    ],
    [
      {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
        title: t('qqHaoYou')
      },
      {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
        title: t('weiXinShouCang')
      },
      {
        iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
        title: t('weiXinHaoYou')
      }
    ]
  ]
}
function showActions6() {
  show4.value = true
}
function close() {
  show.value = false
}
function close1() {
  show1.value = false
}
function close2() {
  show2.value = false
}
function close3() {
  show3.value = false
}
function close4() {
  show4.value = false
}

const toast = useToast()
function select({ item, index }: { item: any; index: number }) {
  toast.show(t('dangQianXuanZhongXiangItemtitleXiaBiaoIndex', [item.title, index]))
}
function select1({ item, rowIndex, colIndex }: { item: any; rowIndex: number; colIndex: number }) {
  toast.show(t('dangQianXuanZhongXiangItemtitleHangXiaBiaoRowindexLieXiaBiaoColindex', [item.title, rowIndex, colIndex]))
}
</script>
<style lang="scss" scoped></style>
