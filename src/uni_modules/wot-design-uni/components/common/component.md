### 使用方法
```javascript

import VueComponent from '/packages/common/component.js'

VueComponent({
    props: {},
    beforeCreate(){},
    created(){},
    mounted(){},
    destroyed(){}
})
```

### 映射关系

>如果使用封装的`VueComponent`组件，以下小程序`原生属性/方法`必须替换为对应的`封装属性/方法`

| 封装          | 原生        |
|--------------|----------- |
| props        | properties |
| beforeCreate | created    |
| created      | attached   |
| mounted      | ready      |
| destroyed    | detached   |

### 全局样式类

* 使用VueComponent组件时，会自动添加custom-class类，外部可以通过此类修改组件内部的样式。
```html
<view>
  <wd-button custom-class="custom">确定</wd-button>
</view>
```
```css
.custom{
    background-color: red;
}
```
### 原生生命周期

> 必须要弄清楚的声明周期，执行顺序按照降序排列。

| hook                    | 描述        |
|-------------------------|----------- |
| properties              | 类型vue的props。 |
| data                    | 类型vue的data。 |
| created                 | 在组件实例刚刚被创建时执行，此时可以拿到data，但是拿不到props的最新值，只能拿到默认值，不能调用setData，可以操作设置this。 |
| properties:observer     | 如果实例初始化时给properties传值，会触发observer，先于attached执行 |
| attached                | 在组件实例进入页面节点树时执行，可以调用setData。 |
| relations               | DOM build，父组件建立连接，双方可以在此hook互相操作对方。 |
| ready                   | DOM painted。 |

