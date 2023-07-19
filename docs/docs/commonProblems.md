## 常见问题FAQ

本节介绍在小程序开发过程当中遇到的部分 **常见问题** 以及 **解决办法**

## 小程序框架

### 数据流

小程序非双向绑定，对于表单类组件如 input 给其绑定 `value` 属性，在组件页面值更改后，需要更新绑定 `value` 的变量。

以`input`为例：

```javascript
page({
  data: {
    value: '',
  },
  handleChange ({ detail }) {
    this.setData({
      value: detail
    })
  }
})
```

```html
<wd-input 
  type="text"
  value="{{ value }}"
  placeholder="请输入..."
  bind:change="handleChange"/>
```

### 在 data 定义的函数变量获取 this

方式一：

```javascript
let self

Page({
  data: {
    myFunction () {
      self.setData({})
    }
  },
  onLoad () {
    self = this
  }
})
```

方式二：

```javascript
Page({
  data: {
    myFunction: null
  },
  onLoad () {
    this.setData({
      myFunction: (function () {
        this.setData({})
      }).bind(this)
    })
  }
})
```

### input

#### input获取焦点时，文案闪烁

因为小程序的 input 组件在展示的时候，是 web组件，当获取焦点后，在上面覆盖1个原生input组件，所以实际上 placeholder 闪烁 是因为小程序框架在切换 web组件 和 原生组件。

#### password模式无法关闭

```html
<input password="{{ show }}" />
 ```

```javascript
Page({
  data: {
    show: true
  },
  methods: {
    click () {
      this.setData({ show: !this.data.show }) 
    }
  }
})
 ```

**参考解决办法：**
* 使用两个input来回切换

#### password模式下，安卓机输入焦点前移 ？

问题已提交京东小程序，待修复

### textarea

#### textarea在真机上无法被遮挡 ？

`textarea` 是原生组件无法被遮盖，层级是最高的，[官网链接](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)

**参考解决办法：**
* 遮盖：用`cover-view` 标签 代替 `view`
* 隐藏：弹出式隐藏 `textarea`

#### slot渲染位置不正确 ? 内部样式不生效 ？

使用组件插槽，插槽没有渲染到指定位置，样式不生效，已输入框前后插槽为例：

```html
<wd-input
  value="{{ value }}"
  clearable
  use-suffix-slot
  use-prefix-slot
  bind:change="handleChange">
    <view slot="prefix">1</view>
    <view slot="suffix">2</view>
</wd-input>
```

此时插槽样式不生效，1/2数字没有在input两端，在生成文档时可以看到，插槽被放到组件文档的尾部。

**参考解决办法：**

* 添加外部样式类 `custom-suffix-class`，可以在外部设置想要的样式

```html
<wd-input
  value="{{ value }}"
  clearable
  use-suffix-slot
  use-prefix-slot
  custom-suffix-class="suffix-slot"
  bind:change="handleChange">
    <view slot="prefix">1</view>
    <view slot="suffix">2</view>
</wd-input>
```

```css
/* 插槽样式 */
.suffix-slot{
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
}
```

### pickerView组件

* 如果某一列(以下简称列)中有10个选项，而且列当前选中第10项。如果此时把列的选项个数修改后还剩下3个，那么选中项会由第10项滑落到第3项，同时触发change事件。
* 修改原生pickerView的columns，当手动触发change事件时，callback中的的event.detail表示的数组长度是修改columns之前的长度,所以event.detail的长度并不会跟随并不会columns缩减。

## 样式

### 非法选择器

在1.0.0版本下，当使用小程序不支持的CSS选择器时，整个GUI进程会崩掉，如下如所示。

```css
::-webkit-scrollbar {
  width:0;
  height:0;
  color:transparent;
}
```

以上代码会在控制台异常抛出

```
Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.
```

### 关于我们

**如果您的问题不在上述列表中或您有更好的建议，请联系我们 [ftf@jd.com](mailto:ftf@jd.com)**
