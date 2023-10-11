<frame/>

# Tabbar 标签栏

底部导航栏，用于在不同页面之间进行切换。



## Attributes
| 参数                  | 说明                                       | 类型                        | 可选值                               | 默认值            | 最低版本   |
|-----------------------|--------------------------------------------|-----------------------------|--------------------------------------|-------------------|------------|
| v-model/modelValue    | 选中标签的索引值或者名称                   | number / string             | -                                    | 0                 | 0.1.27     |
| fixed                | 是否固定在底部                             | boolean                     | -                                    | false             | 0.1.27     |
| safeAreaInsetBottom   | 是否设置底部安全距离（iPhone X 类型的机型） | boolean                     | -                                    | -                 | 0.1.27     |
| bordered              | 是否显示顶部边框                           | boolean                     | -                                    | true              | 0.1.27     |
| shape                | 标签栏的形状                               | TabbarShape                 | 'default' / 'round'                  | 'default'         | 0.1.27     |
| activeColor           | 激活标签的颜色                             | string                      | -                                    | ''                | 0.1.27     |
| inactiveColor         | 未激活标签的颜色                         | string                      | -                                    | ''                | 0.1.27     |
| placeholder           | 固定在底部时，是否在标签位置生成一个等高的占位元素 | boolean              | -                                    | false             | 0.1.27     |
| zIndex                | tabbar组件的层级                          | number                      | -                                    | 500               | 0.1.27     |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | 根节点样式类 | - |
| custom-style | 根节点样式 | - |

