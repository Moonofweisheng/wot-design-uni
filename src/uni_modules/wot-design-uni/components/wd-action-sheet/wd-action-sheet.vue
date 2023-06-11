<template>
  <wd-popup
    custom-class="wd-action-sheet__popup"
    custom-style="{{ (actions && actions.length || panels && panels.length) ? 'background: transparent;' : '' }}"
    show="{{ show }}"
    duration="{{ duration }}"
    position="bottom"
    close-on-click-modal="{{ closeOnClickModal }}"
    safe-area-inset-bottom="{{ safeAreaInsetBottom }}"
    lazy-render="{{ lazyRender }}"
    bind:enter="handleOpen"
    bind:close="close"
    bind:afterenter="handleOpened"
    bind:afterleave="handleClosed"
    z-index="{{ zIndex }}"
  >
    <view
      class="wd-action-sheet"
      style="{{ (actions && actions.length || panels && panels.length) ? 'margin: 0 10px 10px; border-radius: 16px;' : '' }}"
    >
      <view v-if="{{ title }}" class="wd-action-sheet__header custom-header-class">
        {{ title }}
        <wd-icon custom-class="wd-action-sheet__close" name="add" bind:tap="close" />
      </view>
      <view class="wd-action-sheet__actions" v-if="{{ actions && actions.length }}">
        <button
          jd:for="{{ actions }}"
          jd:key="rowIndex"
          class="wd-action-sheet__action {{ item.disabled ? 'wd-action-sheet__action--disabled' : '' }} {{ item.loading ? 'wd-action-sheet__action--loading' : '' }}"
          style="color: {{ item.color }}"
          jd:for-index="rowIndex"
          data-row-index="{{ rowIndex }}"
          data-type="action"
          bind:tap="select"
        >
          <wd-loading v-if="{{ item.loading }}" size="20px" />
          <view v-else class="wd-action-sheet__name">{{ item.name }}</view>
          <view v-if="{{ !item.loading && item.subname }}" class="wd-action-sheet__subname">{{ item.subname }}</view>
        </button>
      </view>
      <view v-if="{{ formatPanels && formatPanels.length }}">
        <view
          jd:for="{{ formatPanels }}"
          data-index="{{ rowIndex }}"
          jd:for-item="item"
          jd:for-index="rowIndex"
          jd:key="rowIndex"
          class="wd-action-sheet__panels"
        >
          <view class="wd-action-sheet__panels-content">
            <view
              jd:for="{{ item }}"
              data-col-index="{{ colIndex }}"
              data-row-index="{{ rowIndex }}"
              data-type="panels"
              jd:for-item="panel"
              jd:for-index="colIndex"
              jd:key="colIndex"
              class="wd-action-sheet__panel"
              bind:tap="select"
            >
              <image class="wd-action-sheet__panel-img" src="{{ panel.iconUrl }}" />
              <view class="wd-action-sheet__panel-title">{{ panel.title }}</view>
            </view>
          </view>
        </view>
      </view>
      <slot />
      <button v-if="{{ cancelText }}" class="wd-action-sheet__cancel" bind:tap="handleCancel">{{ cancelText }}</button>
    </view>
  </wd-popup>
</template>

<script>
export default {
  props: {
    show: Boolean,
    actions: {
      type: Array,
      value: []
    },
    panels: {
      type: Array,
      value: [],
      observer: 'computedValue'
    },
    title: String,
    cancelText: String,
    closeOnClickAction: {
      type: Boolean,
      value: true
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    duration: {
      type: Number,
      value: 200
    },
    zIndex: {
      type: Number,
      value: 10
    },
    lazyRender: {
      type: Boolean,
      value: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data() {
    return {
      formatPanels: []
    }
  },
  methods: {
    isArray() {
      return this.data.panels.length && !(this.data.panels[0] instanceof Array)
    },
    computedValue() {
      this.setData({
        formatPanels: this.isArray() ? [this.data.panels] : this.data.panels
      })
    },
    select(event) {
      const { rowIndex, colIndex, type } = event.currentTarget.dataset
      if (type === 'action') {
        this.$emit('select', {
          item: this.data.actions[rowIndex],
          index: rowIndex
        })
      } else if (this.isArray()) {
        this.$emit('select', {
          item: this.data.panels[colIndex],
          index: colIndex
        })
      } else {
        this.$emit('select', {
          item: this.data.panels[rowIndex][colIndex],
          rowIndex,
          colIndex
        })
      }
      this.close()
    },
    handleClickModal() {
      this.$emit('clickmodal')
      if (this.data.closeOnClickModal) {
        this.close()
      }
    },
    handleCancel() {
      this.$emit('cancel')
      this.close()
    },
    close() {
      this.$emit('close')
    },
    handleOpen() {
      this.$emit('open')
    },
    handleOpened() {
      this.$emit('opened')
    },
    handleClosed() {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common/abstracts/variable';
@import '../common/abstracts/mixin';

@include b(action-sheet) {
  background-color: #fff;
  padding-bottom: 1px;

  @include e(popup) {
    border-radius: $-action-sheet-radius $-action-sheet-radius 0 0;
  }
  @include e(actions) {
    padding: 8px 0;
    max-height: 50vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  @include e(action) {
    position: relative;
    display: block;
    width: 100%;
    height: $-action-sheet-action-height;
    line-height: $-action-sheet-action-height;
    color: $-action-sheet-color;
    font-size: $-action-sheet-fs;
    text-align: center;
    border: none;
    background: $-action-sheet-bg;
    outline: none;

    &:after {
      display: none;
    }

    &:active {
      background: $-action-sheet-active-color;
    }

    @include m(disabled) {
      color: $-action-sheet-disabled-color;
    }

    @include m(loading) {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: initial;
    }
  }

  @include e(name) {
    display: inline-block;
  }

  @include e(subname) {
    display: inline-block;
    margin-left: 4px;
    font-size: $-action-sheet-subname-fs;
    color: $-action-sheet-subname-color;
  }

  @include e(cancel) {
    display: block;
    width: calc(100% - 48px);
    line-height: $-action-sheet-cancel-height;
    padding: 0;
    color: $-action-sheet-cancel-color;
    font-size: $-action-sheet-fs;
    text-align: center;
    border-radius: $-action-sheet-cancel-radius;
    border: none;
    background: $-action-sheet-cancel-bg;
    outline: none;
    margin: 0 auto 24px;
    font-weight: $-action-sheet-weight;

    &:active {
      background: $-action-sheet-active-color;
    }

    &:after {
      display: none;
    }
  }

  @include e(header) {
    color: $-action-sheet-color;
    position: relative;
    height: $-action-sheet-title-height;
    line-height: $-action-sheet-title-height;
    text-align: center;
    font-size: $-action-sheet-title-fs;
    font-weight: $-action-sheet-weight;
  }

  @include e(close) {
    position: absolute;
    top: $-action-sheet-close-top;
    right: $-action-sheet-close-right;
    color: $-action-sheet-close-color;
    font-size: $-action-sheet-close-fs;
    transform: rotate(-45deg);
    line-height: 1.1;
  }

  @include e(panels) {
    height: 84px;
    overflow-y: hidden;

    &:first-of-type {
      margin-top: 20px;
    }

    &:last-of-type {
      margin-bottom: 12px;
    }
  }

  @include e(panels-content) {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  @include e(panel) {
    width: 88px;
    flex: 0 0 auto;
    display: inline-block;
    padding: $-action-sheet-panel-padding;
  }

  @include e(panel-img) {
    display: block;
    width: $-action-sheet-panel-img-fs;
    height: $-action-sheet-panel-img-fs;
    margin: 0 auto;
    margin-bottom: 7px;
    border-radius: $-action-sheet-panel-img-radius;
  }

  @include e(panel-title) {
    font-size: $-action-sheet-subname-fs;
    line-height: 1.2;
    text-align: center;
    color: $-action-sheet-color;
    @include lineEllipsis;
  }
}
</style>
