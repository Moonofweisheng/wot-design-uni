# 更新日志 


### [1.2.8](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.2.7...v1.2.8) (2024-03-30)


### 🐛 Bug Fixes | Bug 修复

* 修复useLocale 不传 message 会丢失原有语言配置的问题 ([#209](https://github.com/Moonofweisheng/wot-design-uni/issues/209)) ([e854d0e](https://github.com/Moonofweisheng/wot-design-uni/commit/e854d0e758e44cba9213992794974b7ae5985abf))


### ✨ Features | 新功能

* ✨ SelectPicker单选模式支持自动完成 ([#207](https://github.com/Moonofweisheng/wot-design-uni/issues/207)) ([11aa887](https://github.com/Moonofweisheng/wot-design-uni/commit/11aa887ae36153c0a6a0cd9053fc94c70acbcb0d)), closes [#206](https://github.com/Moonofweisheng/wot-design-uni/issues/206)


### ✏️ Documentation | 文档

* ✏️  文档中增加@uni-helper/vite-plugin-uni-components的使用提示 ([37d9d46](https://github.com/Moonofweisheng/wot-design-uni/commit/37d9d4631e434792b1e97dccac8a52a6d253d616))

### [1.2.7](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.2.6...v1.2.7) (2024-03-29)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复DatePicker占位符展示缺失的问题 ([8fbca94](https://github.com/Moonofweisheng/wot-design-uni/commit/8fbca94e3690e8b86ce59fbe668805839c50192b))
* 🐛 修复DateTimePicker区域选择极值计算错误的问题 ([a1e9530](https://github.com/Moonofweisheng/wot-design-uni/commit/a1e9530a917981ca4cf96dde1aa268eaf3da059f))
* 🐛 修复picker-view初始化报错的问题 ([2102f38](https://github.com/Moonofweisheng/wot-design-uni/commit/2102f38a107a7cc8a316cb7fdc5a9738a5bb7499)), closes [#205](https://github.com/Moonofweisheng/wot-design-uni/issues/205)
* 🐛 修复picker选择器在APP端包装二维数组逻辑错误导致无法实现多列选择器的问题 ([ed5d7ac](https://github.com/Moonofweisheng/wot-design-uni/commit/ed5d7ace2050f5ae7541c8fd2ec395de56fa73cc))
* 🐛 移除文件移动时volar变更文件路径错误导致.vue文件中多出的无用路径字符串 ([1f8f8ae](https://github.com/Moonofweisheng/wot-design-uni/commit/1f8f8ae2bfb2b13a6b6fcd6435a2d75f47d0e775))

### [1.2.6](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.2.5...v1.2.6) (2024-03-27)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Picker 未选择时显示第一列值的问题 ([21839e0](https://github.com/Moonofweisheng/wot-design-uni/commit/21839e0caf170248f454d80645bc3aa2f3ae2cdb))
* 🐛 修复DatetimePicker区间模式未选值时显示占位符错误的问题 ([37350ee](https://github.com/Moonofweisheng/wot-design-uni/commit/37350ee5234a0f30debd22d33fb168415ec4e72d))

### [1.2.5](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.2.4...v1.2.5) (2024-03-24)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复textarea在支付宝小程序上清除按钮点击热区失效的问题 ([84662f2](https://github.com/Moonofweisheng/wot-design-uni/commit/84662f254b85d3b554113c9ba4f73ca695596fe9))

### [1.2.4](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.2.3...v1.2.4) (2024-03-23)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复textarea、input的label存在icon时高度异常的问题 ([e487ced](https://github.com/Moonofweisheng/wot-design-uni/commit/e487ced1624ce9ba35b29537481302e07050612c))
* 🐛 修复textarea无法换行的问题 ([25bd564](https://github.com/Moonofweisheng/wot-design-uni/commit/25bd56485508ae8b3dfffd13d47c306fbf42d65e))


### ✏️ Documentation | 文档

* ✏️  调整组件库基于vite配置自动引入组件的介绍 ([2d23607](https://github.com/Moonofweisheng/wot-design-uni/commit/2d2360706fbe2a5d4024ceebd82720014c6b1ea2))
* ✏️  文档推荐用户从wot-design-uni.cn迁移至wot-design-uni.gitee.io ([72a567c](https://github.com/Moonofweisheng/wot-design-uni/commit/72a567c44867f049c1526f5d682e46155047516a))
* ✏️  增加steps设置激活项的介绍 ([7c0d36c](https://github.com/Moonofweisheng/wot-design-uni/commit/7c0d36c36214517d959aa27e284aacf59d2b074b))

### [1.2.3](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.2.2...v1.2.3) (2024-03-20)


### ✏️ Documentation | 文档

* ✏️  修复部分外部链接不可用的问题 ([e2fb515](https://github.com/Moonofweisheng/wot-design-uni/commit/e2fb5155c40e58e44920329cdfb4f2391bb81970))


### 🐛 Bug Fixes | Bug 修复

* 修复 checkbox 单独使用时无法切换选中状态的问题 ([#198](https://github.com/Moonofweisheng/wot-design-uni/issues/198)) ([4a20219](https://github.com/Moonofweisheng/wot-design-uni/commit/4a2021908f0d63ca398660950609bd5f4a7ca9b9))

### [1.2.2](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.2.1...v1.2.2) (2024-03-19)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复picker选择器绑定值value值为0时无法生效的问题 ([d4de4ba](https://github.com/Moonofweisheng/wot-design-uni/commit/d4de4ba93824905840adc49e2d85d7168c9fd48e)), closes [#195](https://github.com/Moonofweisheng/wot-design-uni/issues/195)

### [1.2.1](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.2.0...v1.2.1) (2024-03-19)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复部分可为null的props丢失null类型的问题 ([604e9f3](https://github.com/Moonofweisheng/wot-design-uni/commit/604e9f3810f38637ee1a7640e642790719cd9d3f))

## [1.2.0](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.10...v1.2.0) (2024-03-19)


### ✨ Features | 新功能

* ✨ typescript类型支持增强 ([#192](https://github.com/Moonofweisheng/wot-design-uni/issues/192)) ([201e7a1](https://github.com/Moonofweisheng/wot-design-uni/commit/201e7a12b9c4023e35ff9540f5da09794ea3c6f7))

### [1.1.10](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.9...v1.1.10) (2024-03-15)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复tabbar默认shape固定底部安全区无遮挡的问题 ([03048bb](https://github.com/Moonofweisheng/wot-design-uni/commit/03048bba17966e13e864c4a3d29047986778d586))

### [1.1.9](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.8...v1.1.9) (2024-03-11)


### ✏️ Documentation | 文档

* ✏️  推荐使用托管在gitee上的文档地址 ([24ae6ca](https://github.com/Moonofweisheng/wot-design-uni/commit/24ae6cac05b150ff8da3ab47cc4bb3eeac48a369))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复textarea在微信小程序平台下部分安卓手机maxlength不生效的问题 ([512e63b](https://github.com/Moonofweisheng/wot-design-uni/commit/512e63b0ad30ff7acb14fffbb124dba59e34d450))

### [1.1.8](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.7...v1.1.8) (2024-03-10)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复transitiont打开后立即关闭时无法关闭的问题 ([c1cebf6](https://github.com/Moonofweisheng/wot-design-uni/commit/c1cebf6de0b1c6a2f8a32aa4815adc8c0466eeca))

### [1.1.7](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.6...v1.1.7) (2024-03-09)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复badge组件多出一个script标签的问题 ([e1819b4](https://github.com/Moonofweisheng/wot-design-uni/commit/e1819b4dbcb3dc1244bbe5641cdb538d0ad9c5e7)), closes [#188](https://github.com/Moonofweisheng/wot-design-uni/issues/188)

### [1.1.6](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.5...v1.1.6) (2024-03-06)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复Tabar为round类型时开启safeAreaInsetBottom是样式异常的问题 ([aa9ae88](https://github.com/Moonofweisheng/wot-design-uni/commit/aa9ae88f35236dec15635bd8e4fd0c7023e5fb70))

### [1.1.5](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.4...v1.1.5) (2024-03-05)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复Search、Input等组件clear事件在value变更前触发的问题 ([8d113a2](https://github.com/Moonofweisheng/wot-design-uni/commit/8d113a285dbffa705e44a31ad05e48f36978c46c)), closes [#185](https://github.com/Moonofweisheng/wot-design-uni/issues/185)


### ✏️ Documentation | 文档

* ✏️  首页增加常见问题的入口 ([fd7a7dd](https://github.com/Moonofweisheng/wot-design-uni/commit/fd7a7dd287226f670cf02db9cf2856c9ebe52498))

### [1.1.4](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.3...v1.1.4) (2024-03-04)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Navbar显示下边框时fixed不生效的问题 ([18c09d8](https://github.com/Moonofweisheng/wot-design-uni/commit/18c09d87384699c044a9f84838b17f74eaff77b3))


### ✏️ Documentation | 文档

* ✏️  增加支付宝小程序styleIsolation配置的文档 ([68d1262](https://github.com/Moonofweisheng/wot-design-uni/commit/68d1262ed5ac6ccf8c078ba089e045739c2275e8))

### [1.1.3](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.2...v1.1.3) (2024-03-03)


### ✏️ Documentation | 文档

* ✏️  文档中增加提问的智慧和toast、message组件的常见问题 ([2fdd4b1](https://github.com/Moonofweisheng/wot-design-uni/commit/2fdd4b1c050ed8805637ec0b082ca4d20c3c17b6))

### [1.1.2](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.1...v1.1.2) (2024-03-01)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复Button会存在一个默认border的问题 ([#182](https://github.com/Moonofweisheng/wot-design-uni/issues/182)) ([3714ffb](https://github.com/Moonofweisheng/wot-design-uni/commit/3714ffb0f1de55f3eae5a36b9235bdbc518b0738))

### [1.1.1](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.1.0...v1.1.1) (2024-02-29)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 ImgCropper 在钉钉小程序平台无法展示所选图片的问题 ([db8d029](https://github.com/Moonofweisheng/wot-design-uni/commit/db8d029db3a227cd062c6e9d7c14eb9d0f3dae87))
* 🐛 修复微信小程序css使用标签选择器抛出警告的问题（wd-img） ([#181](https://github.com/Moonofweisheng/wot-design-uni/issues/181)) ([ee3da01](https://github.com/Moonofweisheng/wot-design-uni/commit/ee3da016439d68f1d9d061bb1b1cbd10f2863aa4))

## [1.1.0](https://github.com/Moonofweisheng/wot-design-uni/compare/v1.0.0...v1.1.0) (2024-02-27)


### ✨ Features | 新功能

* ✨ Button 支持微信小程序chooseavatar和agreeprivacyauthorization事件 ([177c726](https://github.com/Moonofweisheng/wot-design-uni/commit/177c726e0d0f9bc435f815af2e4fc8e917ef144d))
* ✨ DropDown组件支持钉钉小程序 ([924c65b](https://github.com/Moonofweisheng/wot-design-uni/commit/924c65b4f66e7d1ff75aa2bcb5c6cbe4e045fb92))
* ✨ Slider 支持钉钉小程序 ([bea7a49](https://github.com/Moonofweisheng/wot-design-uni/commit/bea7a499edc3e0681ec11dd26333d8a969dd9b0e))


### ✏️ Documentation | 文档

* ✏️  新增支持钉钉小程序平台 ([9525f23](https://github.com/Moonofweisheng/wot-design-uni/commit/9525f23f207af47c10c37614279b8318500e3ede))
* ✏️  修复Segment演示demo在钉钉小程序平台展示异常的问题 ([4fbe556](https://github.com/Moonofweisheng/wot-design-uni/commit/4fbe5569b3cb1761c2ef7847a4abc1721d3ed220))
* ✏️  支持平台的介绍中新增支付宝小程序 ([320e4dd](https://github.com/Moonofweisheng/wot-design-uni/commit/320e4dd2e102146b8a466d378c8356286faeb28c))

## [1.0.0](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.3.1...v1.0.0) (2024-02-26)


### ✨ Features | 新功能

* ✨ 支持支付宝小程序并提供ConfigProvider的便利性优化 ([e1baca3](https://github.com/Moonofweisheng/wot-design-uni/commit/e1baca3ce5201c38e6b0aee5e6cb7099ecba9772))
* ✨ sticky组件支持支付宝平台 ([3805882](https://github.com/Moonofweisheng/wot-design-uni/commit/3805882b8b1f8ad165d8cda528fa0b5cf3f96c27))


### ✏️ Documentation | 文档

* ✏️  演示demo增加组件库版本号的显示 ([19a00e3](https://github.com/Moonofweisheng/wot-design-uni/commit/19a00e34652bf672f7fdfd28899625dac977a1b6))

### [0.3.1](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.3.0...v0.3.1) (2024-02-26)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复大尺寸checkbox选中样式异常的问题 ([413cf3b](https://github.com/Moonofweisheng/wot-design-uni/commit/413cf3b6a04358bca5284704d750cfd224c1d277))

## [0.3.0](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.23...v0.3.0) (2024-02-21)


### ✨ Features | 新功能

* ✨ 调整Button 按钮样式受主色控制并优化幽灵按钮显示效果 ([5f0d1f5](https://github.com/Moonofweisheng/wot-design-uni/commit/5f0d1f5f8bac81435d248348ec5823e82d35f7a4))


### ✏️ Documentation | 文档

* ✏️  修复select-picker组件绑定值描述错误的问题 ([b287111](https://github.com/Moonofweisheng/wot-design-uni/commit/b2871114311656580ade25c25f0775d9246f32b7)), closes [#178](https://github.com/Moonofweisheng/wot-design-uni/issues/178)
* ✏️  增加Button细边框幽灵按钮的使用说明 ([366c34b](https://github.com/Moonofweisheng/wot-design-uni/commit/366c34b69faedee4874221c604d1a6d5c8c1a8e0))

### [0.2.23](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.22...v0.2.23) (2024-02-07)


### ✏️ Documentation | 文档

* ✏️  文档支持显示友情链接 ([adac43f](https://github.com/Moonofweisheng/wot-design-uni/commit/adac43f2a1b300d4169249e108389b3a24ac9ffa))
* ✏️  友情链接支持来自线上配置 ([50896bb](https://github.com/Moonofweisheng/wot-design-uni/commit/50896bb475c5e1c5be42bdc22a56a47db9a51481))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 MessageBox 国际化不生效的问题 ([48404a1](https://github.com/Moonofweisheng/wot-design-uni/commit/48404a1ccccf9081cf3e9f9918e20cb58a6bb12f)), closes [#177](https://github.com/Moonofweisheng/wot-design-uni/issues/177)

### [0.2.22](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.21...v0.2.22) (2024-01-30)


### ✏️ Documentation | 文档

* ✏️  修正 Popover 组件文档中menuclick示例错误的问题 ([9df96e7](https://github.com/Moonofweisheng/wot-design-uni/commit/9df96e7629296bfba2b7f951b83508cc9e4a3935))

### [0.2.21](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.19...v0.2.21) (2024-01-28)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Dropdown 组件点击已展开项时无法关闭的问题 ([3846590](https://github.com/Moonofweisheng/wot-design-uni/commit/38465905e76b929a4d4af93dfe4ad9f31503b2ad))


### ✨ Features | 新功能

* ✨ 支持国际化 ([#168](https://github.com/Moonofweisheng/wot-design-uni/issues/168)) ([ce9f192](https://github.com/Moonofweisheng/wot-design-uni/commit/ce9f19244e4d376c5104be2b89d57426bf722aee))

### [0.2.19](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.18...v0.2.19) (2024-01-25)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Input 绑定值无法为null的问题 ([f745e14](https://github.com/Moonofweisheng/wot-design-uni/commit/f745e14d10d64b643aa2f9c0170f72db3a99bb3e))
* 🐛 修复多列、单复选选择器列更新时显示值未更新的问题 ([5ba45b9](https://github.com/Moonofweisheng/wot-design-uni/commit/5ba45b94b711e1129873fa29b243a616087ddc2a)), closes [#167](https://github.com/Moonofweisheng/wot-design-uni/issues/167)

### [0.2.18](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.17...v0.2.18) (2024-01-24)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 CheckBox 组件的选中色无法应用到css变量的问题 ([febfb61](https://github.com/Moonofweisheng/wot-design-uni/commit/febfb61cab3b55a9f78920ed4715f05a232fb9f6))
* 🐛 修复 Radio 组件的选中色无法应用到css变量的问题 ([b7e8631](https://github.com/Moonofweisheng/wot-design-uni/commit/b7e86314139cc6291e851c350219fce837f0f26e))

### [0.2.17](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.16...v0.2.17) (2024-01-23)


### ✨ Features | 新功能

* ✨ Form 表单组件提供开关控制是否model变化时重置提示信息 ([b9f46ba](https://github.com/Moonofweisheng/wot-design-uni/commit/b9f46ba0da85acd7312753a34dd0ad3f2f7379a2)), closes [#166](https://github.com/Moonofweisheng/wot-design-uni/issues/166)

### [0.2.16](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.15...v0.2.16) (2024-01-21)


### ✏️ Documentation | 文档

* ✏️  修复文档中关于日期选择器最大日期描述错误的问题 ([bb76ce3](https://github.com/Moonofweisheng/wot-design-uni/commit/bb76ce332c6977cbae981790aa356bc27c0d9efa))

### [0.2.15](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.14...v0.2.15) (2024-01-15)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Tab class类名属性错误的问题 ([dc87df7](https://github.com/Moonofweisheng/wot-design-uni/commit/dc87df70c7920d7cfabc571ace8beb2ce0dc2a7c))


### ✏️ Documentation | 文档

* ✏️  修复 Upload 文档中before-upload钩子参数描述错误的问题 ([3ec7299](https://github.com/Moonofweisheng/wot-design-uni/commit/3ec7299ce724fce771b782f6110ba6ec29376291))

### [0.2.14](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.13...v0.2.14) (2024-01-14)


### ✨ Features | 新功能

* ✨ InputNumber步进器支持禁用输入框 ([933bce3](https://github.com/Moonofweisheng/wot-design-uni/commit/933bce314618956ff922daacef5b3594f36baf9b))

### [0.2.13](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.12...v0.2.13) (2024-01-12)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复演示文档刷新后指向localhost的问题 ([4cd8b16](https://github.com/Moonofweisheng/wot-design-uni/commit/4cd8b16bdf5ea8e93cff85396025844e9ebd031c))

### [0.2.12](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.11...v0.2.12) (2024-01-11)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Tabbar 错误地抛出提示信息的问题 ([1c89ed0](https://github.com/Moonofweisheng/wot-design-uni/commit/1c89ed0a7158e79556e83c6aeb89bd1e93e4ea0d))


### ✏️ Documentation | 文档

* ✏️  增加 Circle 组件使用插槽的示例 ([6341594](https://github.com/Moonofweisheng/wot-design-uni/commit/6341594295732dac951c465d95537f36addbbf9c))
* ✏️  增加展示gitee的star徽标 ([1abf962](https://github.com/Moonofweisheng/wot-design-uni/commit/1abf962e37e27c1c1688bed2026c66022e63ce9b))

### [0.2.11](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.10...v0.2.11) (2024-01-09)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Overlay 类型声明错误的问题 ([930e59a](https://github.com/Moonofweisheng/wot-design-uni/commit/930e59a9b09aee535ec4c316e44ed3c0e31be628))


### ✏️ Documentation | 文档

* ✏️  提供托管在Giteee上的文档网站 ([6d62e9e](https://github.com/Moonofweisheng/wot-design-uni/commit/6d62e9e7ddda0bd9f51f2ad9e2893f1ed3709c63))

### [0.2.10](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.9...v0.2.10) (2024-01-08)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 col-picker 暗黑模式下标题文字颜色不清楚的问题 ([217ffb7](https://github.com/Moonofweisheng/wot-design-uni/commit/217ffb7dacb66b2017145c6e43fc8c873a6e9dd2))
* 🐛 修复 steps 组件自定义图标显示异常的问题 ([0300f63](https://github.com/Moonofweisheng/wot-design-uni/commit/0300f63f35a5afcd278aba3b4ab721f498716d94))
* 🐛 修复支付宝小程序暗黑模式下 Input、Textarea 组件显示异常的问题 ([8a9c344](https://github.com/Moonofweisheng/wot-design-uni/commit/8a9c344872bfcd81a73f71520f51b6b849f516d5))

### [0.2.9](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.8...v0.2.9) (2024-01-07)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 col-picker 组件首次打开指示线位置异常的问题 ([323fb00](https://github.com/Moonofweisheng/wot-design-uni/commit/323fb00942b7032b678d92ab03360dc7bb8faae8))

### [0.2.8](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.7...v0.2.8) (2024-01-06)


### ✏️ Documentation | 文档

* ✏️  展示netlify支持 ([410b180](https://github.com/Moonofweisheng/wot-design-uni/commit/410b180ec9c660ab9c49d6eb203d53c35919c512))

### [0.2.7](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.5...v0.2.7) (2024-01-06)


### ✨ Features | 新功能

* ✨ 优化provide/inject的使用方式 ([892f467](https://github.com/Moonofweisheng/wot-design-uni/commit/892f4675a848ee3d4c965c36d5c4034aa5806b6d))


### ✏️ Documentation | 文档

* ✏️  文档网站增加自定义footer ([dd8bc00](https://github.com/Moonofweisheng/wot-design-uni/commit/dd8bc003eedcdc43cdd60bb896c897d108dd4a51))
* ✏️  修复vitepress自定义footer展示错误的问题 ([c0701d5](https://github.com/Moonofweisheng/wot-design-uni/commit/c0701d584e5d9b84e6d913dd23666b80d803407b))

### [0.2.6](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.5...v0.2.6) (2024-01-06)


### ✨ Features | 新功能

* ✨ 优化provide/inject的使用方式 ([892f467](https://github.com/Moonofweisheng/wot-design-uni/commit/892f4675a848ee3d4c965c36d5c4034aa5806b6d))


### ✏️ Documentation | 文档

* ✏️  文档网站增加自定义footer ([dd8bc00](https://github.com/Moonofweisheng/wot-design-uni/commit/dd8bc003eedcdc43cdd60bb896c897d108dd4a51))

### [0.2.5](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.4...v0.2.5) (2023-12-28)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Form 导入FormRules、ErrorMessage时未指定为type的问题 ([c88c84e](https://github.com/Moonofweisheng/wot-design-uni/commit/c88c84e8b71fc2404643a623c28f4953ffe36e71))
* 🐛 修复 SwipeAction 组件在H5端导致页面无法上下滚动的问题 ([1f68ce1](https://github.com/Moonofweisheng/wot-design-uni/commit/1f68ce13c8109dd92ca4bf055f66aa8dff24c83d)), closes [#149](https://github.com/Moonofweisheng/wot-design-uni/issues/149)

### [0.2.4](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.3...v0.2.4) (2023-12-27)

### [0.2.3](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.2...v0.2.3) (2023-12-27)


### ✏️ Documentation | 文档

* ✏️  修复动态表单演示页面标题错误的问题 ([7c65359](https://github.com/Moonofweisheng/wot-design-uni/commit/7c65359c88614ae53c4800d0946d8e09ef547a26))

### [0.2.2](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.1...v0.2.2) (2023-12-26)


### 🐛 Bug Fixes | Bug 修复

* 🐛 移除 Swiper 的list中不必填的属性 ([672f680](https://github.com/Moonofweisheng/wot-design-uni/commit/672f680051009edd23a67d4e32722839f519d9ba))


### ✏️ Documentation | 文档

* ✏️  修复 Textarea 文档示例错误的问题 ([7da3a4c](https://github.com/Moonofweisheng/wot-design-uni/commit/7da3a4cdfe35f87193f57139de0819130424d6ea))
* ✏️  优化 Form 相关组件的文档介绍 ([6a0a7a7](https://github.com/Moonofweisheng/wot-design-uni/commit/6a0a7a730fcd8904609f8a48339e1079baf3e9be))

### [0.2.1](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.2.0...v0.2.1) (2023-12-25)


### ✏️ Documentation | 文档

* ✏️  PassowrdInput 密码输入框组件增加文档标题 ([cccc4cc](https://github.com/Moonofweisheng/wot-design-uni/commit/cccc4cc0d4952f594e5387bad32a7248009ebd9e))

## [0.2.0](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.70...v0.2.0) (2023-12-24)


### ✨ Features | 新功能

* ✨ 新增 Form 表单组件 ([c8086d6](https://github.com/Moonofweisheng/wot-design-uni/commit/c8086d624c01bfbae3b9dfc324d33d6bfe46e041))
* ✨ 新增 PasswordInput 密码输入框 ([b8c68f9](https://github.com/Moonofweisheng/wot-design-uni/commit/b8c68f92f7ddbf3ae2a58bf36593a0cd0340f225))
* ✨ 新增 textarea 文本域组件 ([ed56bcd](https://github.com/Moonofweisheng/wot-design-uni/commit/ed56bcdb0337c198e8834182d47d1cd83513091d))
* ✨ 增加父子组件 Provide/Inject 的hooks ([eb971d4](https://github.com/Moonofweisheng/wot-design-uni/commit/eb971d4e86733b0337de0c63f26b373424a842f0))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Input 组件在支付宝平台存在一个默认padding的问题 ([921c906](https://github.com/Moonofweisheng/wot-design-uni/commit/921c90606e05ea1b29cdee39cde7858907b2cd4d))


### ✏️ Documentation | 文档

* ✏️  调整主题定制相关文档 ([2d5b1af](https://github.com/Moonofweisheng/wot-design-uni/commit/2d5b1af2787d33ec24eb6e6ab9db6ff941d80c2b))
* ✏️  增加 textarea 文本域组件功能的迁移说明 ([61ebc7d](https://github.com/Moonofweisheng/wot-design-uni/commit/61ebc7db1e1db3e8634a87c24fae0869f4b6f17b))
* ✏️  PasswordInput 密码输入框文档增加版本介绍 ([56ccf60](https://github.com/Moonofweisheng/wot-design-uni/commit/56ccf6005e502237e1ff45b5b52e852b402a10c9))

### [0.1.70](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.69...v0.1.70) (2023-12-23)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 picker 的列value为0时回显异常的问题 ([2ba93c3](https://github.com/Moonofweisheng/wot-design-uni/commit/2ba93c328c54c41b6e1e9ead946e9c46e278ebb9)), closes [#155](https://github.com/Moonofweisheng/wot-design-uni/issues/155)

### [0.1.69](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.68...v0.1.69) (2023-12-13)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Notify 使用文档错误的问题 ([3fe6423](https://github.com/Moonofweisheng/wot-design-uni/commit/3fe6423c9c6727eaa3655029bf862b9be182b70b)), closes [#148](https://github.com/Moonofweisheng/wot-design-uni/issues/148)

### [0.1.68](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.67...v0.1.68) (2023-12-07)


### ✏️ Documentation | 文档

* ✏️  增加 Gap 组件的文档 ([9e3a8c1](https://github.com/Moonofweisheng/wot-design-uni/commit/9e3a8c1506f9ef93f9f0155ac948c8bc4d215ea8))

### [0.1.67](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.66...v0.1.67) (2023-12-06)


### ✨ Features | 新功能

* ✨ 新增 Gap 间隔槽组件 ([#147](https://github.com/Moonofweisheng/wot-design-uni/issues/147)) ([fa7cd16](https://github.com/Moonofweisheng/wot-design-uni/commit/fa7cd163810cbcd63fc2a99a6a92ccd8a803b2f1))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复Picker组件v-model数据不更新的问题 ([e60f475](https://github.com/Moonofweisheng/wot-design-uni/commit/e60f47538130625a8c8f93e3a6795b7e71588002)), closes [#146](https://github.com/Moonofweisheng/wot-design-uni/issues/146)

### [0.1.66](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.65...v0.1.66) (2023-12-01)


### ✨ Features | 新功能

* ✨ Tag 组件type增加属性值default ([#143](https://github.com/Moonofweisheng/wot-design-uni/issues/143)) ([48f0e4b](https://github.com/Moonofweisheng/wot-design-uni/commit/48f0e4b3c484755a0da4eb11fa814c6b52be74b1))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 ActionSheet 组件设置custom-class无效的问题 ([1e5bcf7](https://github.com/Moonofweisheng/wot-design-uni/commit/1e5bcf7d0a8be66b80de81a0359d3fb429fdf52d))

### [0.1.65](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.64...v0.1.65) (2023-11-29)


### ✨ Features | 新功能

* ✨ 新增 NumberKeyboard 数字键盘组件 ([#139](https://github.com/Moonofweisheng/wot-design-uni/issues/139)) ([7bb4455](https://github.com/Moonofweisheng/wot-design-uni/commit/7bb4455c6d9eca179ba174b8ad0da6ae8a09defc))
* Tag新增类型标签添加slot ([7977dbb](https://github.com/Moonofweisheng/wot-design-uni/commit/7977dbbe3565eb06b700f2c55a31803647760fa9))


### ✏️ Documentation | 文档

* ✏️  新增关于 Tag 组件的add插槽的介绍 ([537fa5e](https://github.com/Moonofweisheng/wot-design-uni/commit/537fa5ebf8dcdc14ee12fc1f1e5a5f829653a14a))

### [0.1.64](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.63...v0.1.64) (2023-11-25)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复DateTimePicker标题展示和模式为区间时before-confirm参数错误的问题 ([7bcd12b](https://github.com/Moonofweisheng/wot-design-uni/commit/7bcd12ba633224dd42b160f0b43fadc99ac76707))

### [0.1.63](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.62...v0.1.63) (2023-11-23)


### ✨ Features | 新功能

* ✨ CountDown 倒计时组件支持custom-class和custom-style ([dd60d6d](https://github.com/Moonofweisheng/wot-design-uni/commit/dd60d6df855cc49eba36beb7bcfb9eeb96ed0c82))
* ✨ Search 搜索组件支持自动聚焦和清空后自动聚焦 ([2e3ab63](https://github.com/Moonofweisheng/wot-design-uni/commit/2e3ab63d3dad582c44d9d9f8d2b57e21ee22f380))


### ✏️ Documentation | 文档

* ✏️  修复文档中config-provider等页面的错误 ([f71e641](https://github.com/Moonofweisheng/wot-design-uni/commit/f71e6412e770f2043e4cb9a35950a68aacf0e542))

### [0.1.62](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.61...v0.1.62) (2023-11-22)


### ✨ Features | 新功能

* ✨ Badge 徽标组件支持控制是否显示0值 ([65cfb2c](https://github.com/Moonofweisheng/wot-design-uni/commit/65cfb2ca15c29783f6de48de0bda4ddc3d43664a))
* ✨ Upload 上传组件支持h5端获取文件后缀名 ([59fe70c](https://github.com/Moonofweisheng/wot-design-uni/commit/59fe70c0d0c55c7ecca26902b41599be94e34fe3))


### ✏️ Documentation | 文档

* ✏️  优化 Upload 文档中关于云存储内容的样式 ([607ce05](https://github.com/Moonofweisheng/wot-design-uni/commit/607ce05100ffef9c5c98b503e580a718551f5552))

### [0.1.61](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.60...v0.1.61) (2023-11-20)


### ✏️ Documentation | 文档

* ✏️  修复 Tag 标签组件文档错乱的问题 ([502203b](https://github.com/Moonofweisheng/wot-design-uni/commit/502203bebf08d7e6851b8dd2f94768f6c620da26))
* ✏️  ImgCropper 组件演示页面增加微信小程序隐私协议弹框 ([3af9246](https://github.com/Moonofweisheng/wot-design-uni/commit/3af9246d1f1876ba3c83f6829a9716ad37ae5829))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Calendar 日历组件存在未定义属性导致警告的问题 ([d0d3152](https://github.com/Moonofweisheng/wot-design-uni/commit/d0d3152a5ca1a3e06135b12f4565211258619d1f))
* 🐛 修复 CountDown 倒计时组件文档手动控制示例错误的问题 ([3c373fb](https://github.com/Moonofweisheng/wot-design-uni/commit/3c373fbf3af02c8a73ddd3a4063f9408ec4f33ff))
* 🐛 修复 SelectPicker 组件loading状态仍可以滚动的问题 ([c5a1bff](https://github.com/Moonofweisheng/wot-design-uni/commit/c5a1bfff576aad8a6f03288a6a12a8ed24f776f2))


### ✨ Features | 新功能

* ✨ Upload 上传组件支持上传至云存储 ([523a6be](https://github.com/Moonofweisheng/wot-design-uni/commit/523a6be40b065c4cc28cfe81fdcb200142d9a455))

### [0.1.60](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.59...v0.1.60) (2023-11-20)


### ✏️ Documentation | 文档

* ✏️  修复 CountDown 倒计时组件默认slot用法的介绍错误的问题 ([2fbb88f](https://github.com/Moonofweisheng/wot-design-uni/commit/2fbb88fcd9fe21de09637d48149278d9aef5e1d9))

### [0.1.59](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.58...v0.1.59) (2023-11-19)

### [0.1.58](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.57...v0.1.58) (2023-11-19)


### ✨ Features | 新功能

* ✨ 新增 CountDown 倒计时组件 ([a805d04](https://github.com/Moonofweisheng/wot-design-uni/commit/a805d04827600525c08fbc1848cb3a524b48e81a))
* ✨ CountDown 倒计时组件支持小程序 ([22f249a](https://github.com/Moonofweisheng/wot-design-uni/commit/22f249ae5bdedea1ecebfe31350c7b5a1e394f2e))

### [0.1.57](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.56...v0.1.57) (2023-11-17)


### ✨ Features | 新功能

* ✨ 新增 Fab 悬浮动作按钮组件 ([3c526fe](https://github.com/Moonofweisheng/wot-design-uni/commit/3c526feb102ccf17da0678a6e1c004bb82d57f0f))


### ✏️ Documentation | 文档

* ✏️  修复 Cell 组件点击反馈的介绍错误的问题 ([9096d81](https://github.com/Moonofweisheng/wot-design-uni/commit/9096d81f514348d6103f33590387d0406b217198))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Table 表格组件数字英文换行失效的问题 ([47ac339](https://github.com/Moonofweisheng/wot-design-uni/commit/47ac3390cb58d250129a9db6ade8d90f980855a1))

### [0.1.56](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.55...v0.1.56) (2023-11-12)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Tabbar 标签栏组件 bordered 属性无效的问题 ([69c2656](https://github.com/Moonofweisheng/wot-design-uni/commit/69c265638c6fc36a1479a37c052a572da333006f))

### [0.1.55](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.54...v0.1.55) (2023-11-12)


### 🐛 Bug Fixes | Bug 修复

* 修正README.md 中[贡献指南]链接错误，跳转失败的问题。 ([071de88](https://github.com/Moonofweisheng/wot-design-uni/commit/071de88f98fa90492032193606941fbcdfe9283d))


### ✨ Features | 新功能

* ✨ Swiper 轮播图组件增加imageMode属性支持自定义图片裁剪缩放模式 ([4205c01](https://github.com/Moonofweisheng/wot-design-uni/commit/4205c0149d3224e318ef21563e96f0a843ad13bc))

### [0.1.54](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.53...v0.1.54) (2023-11-10)


### 🐛 Bug Fixes | Bug 修复

* 修正ColPicker多列选择器v-model类型提示使用Record<string, any>[]实际上的数据是单维数组的问题 ([c490ac6](https://github.com/Moonofweisheng/wot-design-uni/commit/c490ac607e6f9eb7207b90943b83ce1696a30fd4))

### [0.1.53](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.52...v0.1.53) (2023-11-09)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Input 输入框组件包含无用显示内容的问题 ([13a3106](https://github.com/Moonofweisheng/wot-design-uni/commit/13a3106055d66083d640912bfff67f2e08781f03))

### [0.1.52](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.51...v0.1.52) (2023-11-09)


### ✨ Features | 新功能

* ✨ Input绑定值为null时的警告从error改为warn ([70f1407](https://github.com/Moonofweisheng/wot-design-uni/commit/70f1407eec057668da0117c9861b523ab667da70))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Badge 徽标组件暗黑模式下边框颜色未兼容的问题 ([c0a0b5a](https://github.com/Moonofweisheng/wot-design-uni/commit/c0a0b5aaea238f144978a3a9b2ab6db202dfdc21)), closes [#115](https://github.com/Moonofweisheng/wot-design-uni/issues/115)

### [0.1.51](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.50...v0.1.51) (2023-11-06)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复引入错误依赖的问题 ([15bc876](https://github.com/Moonofweisheng/wot-design-uni/commit/15bc876a3026319c88ce4b757593243f9869ce39))

### [0.1.50](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.49...v0.1.50) (2023-11-06)


### ✨ Features | 新功能

* ✨ SidebarItem、TabbarItem、GridItem组件增加徽标自定义属性badge-props ([7143098](https://github.com/Moonofweisheng/wot-design-uni/commit/71430989bff81a137fc5199eeeefe0a4da3ce31d))

### [0.1.49](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.48...v0.1.49) (2023-11-05)


### ✨ Features | 新功能

* ✨ 新增 Sidebar 侧边栏组件 ([#113](https://github.com/Moonofweisheng/wot-design-uni/issues/113)) ([d189378](https://github.com/Moonofweisheng/wot-design-uni/commit/d189378a02aeb36c275218358849a187e88ce687))

### [0.1.48](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.47...v0.1.48) (2023-11-04)


### ✨ Features | 新功能

* ✨ Input 输入框增加支持微信小程序原生属性always-embed ([57d00ec](https://github.com/Moonofweisheng/wot-design-uni/commit/57d00ececd9849a2d21f59fc863b6ad8933419d8))

### [0.1.47](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.46...v0.1.47) (2023-11-02)


### ✏️ Documentation | 文档

* ✏️  修复 Image 图片组件演示demo样式不友好的问题 ([cbdab19](https://github.com/Moonofweisheng/wot-design-uni/commit/cbdab1959efff642a60a351ffd6454dcd173b9a4))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Input 组件为textarea类型时show-confirm-bar不生效的问题 ([eebec8a](https://github.com/Moonofweisheng/wot-design-uni/commit/eebec8a74fa9399bfd305cadb1a9b6a526e88568))
* 🐛 img 预览demo布局错位 ([0397809](https://github.com/Moonofweisheng/wot-design-uni/commit/0397809d81010e109c238eefea56c82bd06a50cb))


### ✨ Features | 新功能

* ✨ 图片添加圆角大小设置 ([98edaed](https://github.com/Moonofweisheng/wot-design-uni/commit/98edaed6cb1c81b9ed6e05561814aaa51b31b2b3))
* ✨ Badge 徽标组件增加customStyle自定义样式 ([d194106](https://github.com/Moonofweisheng/wot-design-uni/commit/d194106f07fb46f6a979967ba327dee1b41ca70e))

### [0.1.46](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.45...v0.1.46) (2023-11-02)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Tabs 组件在微信小程序端有概率不绘制下划线的问题 ([d70ec65](https://github.com/Moonofweisheng/wot-design-uni/commit/d70ec65998d1ca1fbdbd3b4ef1af4a292a597f55))

### [0.1.45](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.44...v0.1.45) (2023-11-01)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Switch 开关组件自定义大小无效的问题 ([15ffa1f](https://github.com/Moonofweisheng/wot-design-uni/commit/15ffa1f9172d3c11722c71ca370c1016e25f2b41))

### [0.1.44](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.43...v0.1.44) (2023-11-01)


### ✨ Features | 新功能

* ✨ 使用 useQueue hook替换clickOut实现关闭多个气泡等组件的功能 ([3a24999](https://github.com/Moonofweisheng/wot-design-uni/commit/3a24999c1e28414b12806cad3c3bc6f7a445593f))


### ✏️ Documentation | 文档

* ✏️  优化演示项目首页样式 ([e98f30e](https://github.com/Moonofweisheng/wot-design-uni/commit/e98f30e0125e287d2bc5cdbcfff69a35cb7436d8))

### [0.1.43](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.42...v0.1.43) (2023-10-31)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Tooltip 文字提示组件微信端关闭按钮样式错误的问题 ([ec1b949](https://github.com/Moonofweisheng/wot-design-uni/commit/ec1b9490b9517d0e4ebe4a5130a418a684b1a589))

### [0.1.42](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.41...v0.1.42) (2023-10-31)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Popover、Tooltip 组件展开过程中无法遮盖图片的问题 ([db009c1](https://github.com/Moonofweisheng/wot-design-uni/commit/db009c1229413f7ecc446e3e3a1db4d7678268b3))

### [0.1.41](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.40...v0.1.41) (2023-10-31)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Popover、Tooltip 组件展开切换动画不流畅的问题 ([c765b08](https://github.com/Moonofweisheng/wot-design-uni/commit/c765b085a6018433bb95fd7647c091393e2e6e7c)), closes [#101](https://github.com/Moonofweisheng/wot-design-uni/issues/101)

### [0.1.40](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.39...v0.1.40) (2023-10-30)


### ✏️ Documentation | 文档

* ✏️  移除文档中 Search 组件未支持的插槽 ([325e140](https://github.com/Moonofweisheng/wot-design-uni/commit/325e14046de38eb7c4e792a64a290c9997af5cba))

### [0.1.39](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.38...v0.1.39) (2023-10-29)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 DateTimePicker 日期选择器组件双向绑定错误的问题 ([1b13873](https://github.com/Moonofweisheng/wot-design-uni/commit/1b13873cef4b7c760698abce7dca500cd548c660))


### ✨ Features | 新功能

* ✨ 新增 Table 表格组件 ([#98](https://github.com/Moonofweisheng/wot-design-uni/issues/98)) ([c8395f8](https://github.com/Moonofweisheng/wot-design-uni/commit/c8395f8a7e1ad041b003672081b715a7c755adc1))
* ✨ Collapse 折叠面板组件增加分割线 ([adc6633](https://github.com/Moonofweisheng/wot-design-uni/commit/adc6633ad80b74e801a48a50917c9a2d378de9e0)), closes [#97](https://github.com/Moonofweisheng/wot-design-uni/issues/97)

### [0.1.38](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.37...v0.1.38) (2023-10-25)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Upload 组件showLimitNum属性名拼写错误的问题 ([301cbff](https://github.com/Moonofweisheng/wot-design-uni/commit/301cbff20facf60b5645108972f22c8c14235f87))

### [0.1.37](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.36...v0.1.37) (2023-10-25)


### ✏️ Documentation | 文档

* ✏️  修复Tabbar组件类型警告的问题并优化文档相关链接 ([28c3cef](https://github.com/Moonofweisheng/wot-design-uni/commit/28c3cefdfc24f3f6f2669de5f93456a0db281f72))
* ✏️  issues 模板更新 ([e34c5cd](https://github.com/Moonofweisheng/wot-design-uni/commit/e34c5cded1c850d22165c544a3c6a351701479ec))

### [0.1.36](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.35...v0.1.36) (2023-10-21)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Tabs 指定name时双向绑定值仍为index的问题 ([756cad8](https://github.com/Moonofweisheng/wot-design-uni/commit/756cad8d6fcaefb0bf73f1cd2b9f4a24f5827b37)), closes [#91](https://github.com/Moonofweisheng/wot-design-uni/issues/91)

### [0.1.35](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.34...v0.1.35) (2023-10-21)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Tabs 组件通过name匹配时抛出异常的问题 ([b36fb1f](https://github.com/Moonofweisheng/wot-design-uni/commit/b36fb1f9def0aa99c521ffc20c6cae8074b56838)), closes [#91](https://github.com/Moonofweisheng/wot-design-uni/issues/91)

### [0.1.34](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.33...v0.1.34) (2023-10-18)


### ✨ Features | 新功能

* ✨ SelectPicker 单复选选择器增加 scroll-into-view 属性支持定位到选中值 ([00b27c1](https://github.com/Moonofweisheng/wot-design-uni/commit/00b27c187438426471dab2ea15bc39d627773ab2)), closes [#68](https://github.com/Moonofweisheng/wot-design-uni/issues/68)

### [0.1.33](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.32...v0.1.33) (2023-10-17)


### ✨ Features | 新功能

* ✨ 新增 Navbar 导航栏组件 ([#86](https://github.com/Moonofweisheng/wot-design-uni/issues/86)) ([5f66f71](https://github.com/Moonofweisheng/wot-design-uni/commit/5f66f713fae9e693fda4a472bc3e0767a1a6d3e8))

### [0.1.32](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.31...v0.1.32) (2023-10-16)


### ✨ Features | 新功能

* ✨ Tabs 组件调整为受控组件 ([b2a70bc](https://github.com/Moonofweisheng/wot-design-uni/commit/b2a70bc8f32800119924b29283db760af8a3ddb1)), closes [#82](https://github.com/Moonofweisheng/wot-design-uni/issues/82)

### [0.1.31](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.30...v0.1.31) (2023-10-16)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复wd-popup组件的click-modal方法错误调用的问题 ([224e3e5](https://github.com/Moonofweisheng/wot-design-uni/commit/224e3e53f912a236e8e24f8afef64fa09f6a89aa))


### ✏️ Documentation | 文档

* ✏️  更新文档中关于组件数量的介绍 ([4fa7355](https://github.com/Moonofweisheng/wot-design-uni/commit/4fa7355e69a8bb32d1c9924cfc717caaf3345ee5))
* ✏️  增加 Overlay 遮罩层组件的文档 ([3bca4b6](https://github.com/Moonofweisheng/wot-design-uni/commit/3bca4b65c2bc7cd7f90e8b9513c619799f9a438b))

### [0.1.30](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.29...v0.1.30) (2023-10-14)


### ✨ Features | 新功能

* ✨ 新增 Overlay 遮罩层组件 ([41b2c4f](https://github.com/Moonofweisheng/wot-design-uni/commit/41b2c4f3677dcce9c3e18875b7a1ec32d02b3d6a))
* ✨ Popup 弹出层组件增加 lock-scroll 属性 ([a6987e6](https://github.com/Moonofweisheng/wot-design-uni/commit/a6987e65da2f121d4e95c1b5cb271ed8f9a06e58))

### [0.1.29](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.28...v0.1.29) (2023-10-13)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Tabbar 标签栏组件固定底部时不设置placeholder情况下仍占据相应空间的问题 ([b58f9df](https://github.com/Moonofweisheng/wot-design-uni/commit/b58f9dfc8230e9427f2af658c8315c5b022b232c))

### [0.1.28](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.27...v0.1.28) (2023-10-12)


### ✏️ Documentation | 文档

* ✏️  文档样式优化 ([f21ecb9](https://github.com/Moonofweisheng/wot-design-uni/commit/f21ecb9dfbfbf0afe49a760d24ebdc08e4799717))

### [0.1.27](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.26...v0.1.27) (2023-10-12)


### ⚡ Performance Improvements | 性能优化

* ⚡ Segmented 分段器组件兼容支付宝小程序 ([3fd57a6](https://github.com/Moonofweisheng/wot-design-uni/commit/3fd57a600b537b945a8224bb97344baa9b0929e0))


### ✏️ Documentation | 文档

* ✏️  调整文档中图片的CDN地址 ([f704568](https://github.com/Moonofweisheng/wot-design-uni/commit/f704568f0299acbd3cc2d88934bfa1641b6cc792))
* ✏️  修复文档中根节点错写为根结点的问题 ([6da4145](https://github.com/Moonofweisheng/wot-design-uni/commit/6da414503ceb8b6de680b10332af45dbbbe7229d))


### ✨ Features | 新功能

* ✨ 新增 Tabbar 标签栏组件 ([aa0bf19](https://github.com/Moonofweisheng/wot-design-uni/commit/aa0bf194865e381af41f7afa18e46105e0c812a9))
* ✨ Icon 组件新增图标并支持第三方iconfont ([bc241ac](https://github.com/Moonofweisheng/wot-design-uni/commit/bc241acfc103309f196f4c04e08288526a056073))

### [0.1.26](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.25...v0.1.26) (2023-10-10)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Slider 滑块组件双向滑动时右边滑块百分比计算错误的问题 ([92db0f2](https://github.com/Moonofweisheng/wot-design-uni/commit/92db0f2c7fb60b04e1562c55f6296b1b2b456144))

### [0.1.25](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.24...v0.1.25) (2023-10-10)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Silder 滑块组件双向滑动时自定义最大值小于100无法滚动到最大值的问题 ([a70afa4](https://github.com/Moonofweisheng/wot-design-uni/commit/a70afa43239bc233ee0250e26227dbacd5c7021b)), closes [#69](https://github.com/Moonofweisheng/wot-design-uni/issues/69)

### [0.1.24](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.23...v0.1.24) (2023-10-10)


### 🐛 Bug Fixes | Bug 修复

* 🐛 优化 Badge 徽标组件超出max的显示并修复分段器组件错误依赖的问题 ([a48adc8](https://github.com/Moonofweisheng/wot-design-uni/commit/a48adc8395ab167bb88a7a647420b467d7e4c46d))

### [0.1.23](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.22...v0.1.23) (2023-09-28)


### ✨ Features | 新功能

* ✨ 增加 segmented 分段器组件 ([00f52c8](https://github.com/Moonofweisheng/wot-design-uni/commit/00f52c89e0aebc86f70aa8a7391ce1f17412333d))

### [0.1.22](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.21...v0.1.22) (2023-09-25)


### ✨ Features | 新功能

* ✨ 新增 Swiper 轮播图组件 ([cf9fe98](https://github.com/Moonofweisheng/wot-design-uni/commit/cf9fe9807efe863e786bc56eedf506647ac143d2))

### [0.1.21](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.20...v0.1.21) (2023-09-22)

### [0.1.20](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.19...v0.1.20) (2023-09-20)


### ✏️ Documentation | 文档

* ✏️  恢复展示 Circle 组件的演示Demo ([c2cba05](https://github.com/Moonofweisheng/wot-design-uni/commit/c2cba056578593172998f03592652ab63ed23aef))
* ✏️  文档演示项目 Circle 页面文件调整为大写 ([fff8de8](https://github.com/Moonofweisheng/wot-design-uni/commit/fff8de8f8d5f829c5b054d863905a7bb116f45f4))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Circle 组件重复创建canvas导致警告的问题 ([6917201](https://github.com/Moonofweisheng/wot-design-uni/commit/69172016ba840458dd40755050929a8231fd4cd5))
* 🐛 修复 Skeleton 骨架屏组件编译到APP端异常的问题([#52](https://github.com/Moonofweisheng/wot-design-uni/issues/52)) ([7a9a31b](https://github.com/Moonofweisheng/wot-design-uni/commit/7a9a31bd5db76419408a114fbed02c108b972049))
* 🐛 修复 Tag 组件编译到微信小程序平台样式错误的问题([#53](https://github.com/Moonofweisheng/wot-design-uni/issues/53)) ([6aec241](https://github.com/Moonofweisheng/wot-design-uni/commit/6aec2414a384c68e7b4b09f57d028173be942f7b))

### [0.1.19](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.18...v0.1.19) (2023-09-20)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Cell、Grid 组件跳转方法在编译到H5端失效的问题([#49](https://github.com/Moonofweisheng/wot-design-uni/issues/49)) ([51425b1](https://github.com/Moonofweisheng/wot-design-uni/commit/51425b107a8b262bf9c1f0c7ee41bb8d56a12837))


### ✨ Features | 新功能

* ✨ 新增 Circle 环形进度条组件，支持进度渐变动画 ([7c38a6f](https://github.com/Moonofweisheng/wot-design-uni/commit/7c38a6f03e76d91d82a80d2a4cdd875acfb7290b))

### [0.1.18](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.17...v0.1.18) (2023-09-19)


### ✏️ Documentation | 文档

* ✏️  README中增加展示 star-history ([e7cd794](https://github.com/Moonofweisheng/wot-design-uni/commit/e7cd794201435ae8109b562daf70def74ab4ac98))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 PickerView 组件选中框被遮盖的问题([#46](https://github.com/Moonofweisheng/wot-design-uni/issues/46)) ([a60440b](https://github.com/Moonofweisheng/wot-design-uni/commit/a60440b8c52723e4c194b103e9b1b236a7cb29fe))

### [0.1.17](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.16...v0.1.17) (2023-09-19)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复 Slider 滑块组件最大值和最小值不生效的问题([#43](https://github.com/Moonofweisheng/wot-design-uni/issues/43)) ([0fa7f46](https://github.com/Moonofweisheng/wot-design-uni/commit/0fa7f46718e918007491a3d9494292a003924243))

### [0.1.16](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.15...v0.1.16) (2023-09-18)


### ✨ Features | 新功能

* ✨ 新增 WaterMark 水印组件 ([70d8c25](https://github.com/Moonofweisheng/wot-design-uni/commit/70d8c2546135fce1709edb0e1ba0c3b66c1e9e2e))

### [0.1.15](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.14...v0.1.15) (2023-09-18)


### ✏️ Documentation | 文档

* ✏️  优化DateTimePicker组件关于time类型选择器绑定值格式的介绍 ([9e958c7](https://github.com/Moonofweisheng/wot-design-uni/commit/9e958c73f1d09ee0e02097e3ca8eeabfcc1bc59b))

### [0.1.14](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.13...v0.1.14) (2023-09-14)


### ✏️ Documentation | 文档

* ✏️  增加QQ群沟通渠道 ([80efad9](https://github.com/Moonofweisheng/wot-design-uni/commit/80efad950613d65e7e65d305ad6efe7cd0e201d8))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复SelectPicker 单复选选择器单选可搜索状态搜索报错的问题([#38](https://github.com/Moonofweisheng/wot-design-uni/issues/38)) ([01cf01d](https://github.com/Moonofweisheng/wot-design-uni/commit/01cf01d46fbc4ac35f0c09e3db6f6d18b2d3455e))

### [0.1.13](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.12...v0.1.13) (2023-09-12)


### ✨ Features | 新功能

* ✨ Tabs组件增加animated属性支持切换动画 ([2572ea4](https://github.com/Moonofweisheng/wot-design-uni/commit/2572ea4c31f834bb9c8776322c24148ca2bda4e2))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复Popover组件content属性必填警告的问题 ([4d8f8e6](https://github.com/Moonofweisheng/wot-design-uni/commit/4d8f8e640742b0588b91b0a5b82a062b976f8306))

### [0.1.12](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.11...v0.1.12) (2023-09-12)


### ✏️ Documentation | 文档

* ✏️  修复文档中定制主题和反馈组件404的问题 ([c0302ad](https://github.com/Moonofweisheng/wot-design-uni/commit/c0302ada89ea15039ef516f4a425b5e18512c2d5))
* ✏️  修复Button组件文档中loading属性重复的问题 ([b26da5a](https://github.com/Moonofweisheng/wot-design-uni/commit/b26da5aba7d698adc75c3e1d143660a698ce5de8))

### [0.1.11](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.10...v0.1.11) (2023-09-08)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复文档中部分页面存在死链问题 ([b3e5cbe](https://github.com/Moonofweisheng/wot-design-uni/commit/b3e5cbef1116d9a356f7c9c18dffc1caec20ea22))

### [0.1.10](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.9...v0.1.10) (2023-09-08)


### ✏️ Documentation | 文档

* ✏️  将驼峰命名的文档文件改为短横线命名便于爬虫爬取及搜索 ([497e991](https://github.com/Moonofweisheng/wot-design-uni/commit/497e991903559c9d62dcb1b00842ee377d70b445))
* ✏️  优化icon组件文档的体验，支持点击图标复制使用示例 ([ce0526b](https://github.com/Moonofweisheng/wot-design-uni/commit/ce0526b99dcd203d3f1081a8fd6a0551da88b9b8))

### [0.1.9](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.8...v0.1.9) (2023-09-08)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复npm包未配置主入口导致在使用Hbx创建的项目中通过npm安装编译警告的问题 ([fa95a0d](https://github.com/Moonofweisheng/wot-design-uni/commit/fa95a0d19b6e13157154405ddaa2525545bd9f7e))

### [0.1.8](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.7...v0.1.8) (2023-09-07)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复ActionSheet等组件在H5端隐藏导航栏或在tabbar页面高度计算错误的问题 ([39201cb](https://github.com/Moonofweisheng/wot-design-uni/commit/39201cbeddde1c7ea883ad331c0607bced755475))
* 🐛 修复pmpm安装时ts导入类型信息在H5平台报错的问题 ([237c03c](https://github.com/Moonofweisheng/wot-design-uni/commit/237c03c6ae8d041c565ca6bb984765be4418f9e1))

### [0.1.7](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.6...v0.1.7) (2023-09-06)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复tabs组件change事件执行两次的问题 ([819059a](https://github.com/Moonofweisheng/wot-design-uni/commit/819059abe19fcf8f9646703fcc7a472b6ae62d4e))

### [0.1.6](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.5...v0.1.6) (2023-09-06)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复Input组件内置变量showClear和showWordCount定义为props的问题 ([8021a35](https://github.com/Moonofweisheng/wot-design-uni/commit/8021a35ac9d05d549909531ff4f1c7325127833e))
* 🐛 修复pnpm安装时运行到h5平台Ref导入报错的问题 ([39c68bf](https://github.com/Moonofweisheng/wot-design-uni/commit/39c68bf57720c1a12b99412c96e46b341cf536b5))

### [0.1.5](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.4...v0.1.5) (2023-09-05)


### ✏️ Documentation | 文档

* ✏️  增加Stickty和Tabs组件关于H5端自定义导航栏的offset-top的处理方案 ([8a03c4d](https://github.com/Moonofweisheng/wot-design-uni/commit/8a03c4da64296e88a7b3aff5efed4ac04cd039b6))

### [0.1.4](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.3...v0.1.4) (2023-09-05)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复CollapseItem组件在微信小程序中展开/收起时指向图标未跟随转动的问题 ([7d0eeae](https://github.com/Moonofweisheng/wot-design-uni/commit/7d0eeae92f2f7b7664a23f7d548187ed8075d5b0))

### [0.1.3](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.2...v0.1.3) (2023-09-03)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复通过npm安装时配置自动导入Notify、Toast、Message组件无法打开的问题 ([f45b739](https://github.com/Moonofweisheng/wot-design-uni/commit/f45b73907227c25d9c2fd7b7f0018cc2ab5c47d1))

### [0.1.2](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.1...v0.1.2) (2023-09-03)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复部分js引入路径问题 ([67cdfae](https://github.com/Moonofweisheng/wot-design-uni/commit/67cdfaebf9478e286758b2ef851e1a44dc8565a6))

### [0.1.1](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.1.0...v0.1.1) (2023-09-02)

## [0.1.0](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.14...v0.1.0) (2023-09-02)


### ✏️ Documentation | 文档

* ✏️  ConfigProvider组件演示页面增加手动切换暗黑模式 ([e5f55c7](https://github.com/Moonofweisheng/wot-design-uni/commit/e5f55c72fc1ed6e603f22e501d6cff9d8212a976))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复Grid组件不展示border的问题 ([819bbbc](https://github.com/Moonofweisheng/wot-design-uni/commit/819bbbca6ab1c999096936da5e9d2dd664e480ce))
* 🐛 修复MessageBox组件取消按钮不展示的问题 ([d8563d8](https://github.com/Moonofweisheng/wot-design-uni/commit/d8563d833d75b27d0c497c6c945fae8c00ef8dc7))

### [0.0.14](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.13...v0.0.14) (2023-09-02)


### ✨ Features | 新功能

* ✨ 优化缺省状态组件StautsTip，增加支持自定义url和图片大小 ([f463d32](https://github.com/Moonofweisheng/wot-design-uni/commit/f463d3258a954e64352df36004d34b0f12be9a8f))


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复util中addUnit无法处理有单位的字符串的问题 ([8967540](https://github.com/Moonofweisheng/wot-design-uni/commit/8967540ad0f3f0ad7426ee79571cfc4dee6c4d0c))


### ✏️ Documentation | 文档

* ✏️  完善和修复文档中不详细不正确的内容 ([d1b118e](https://github.com/Moonofweisheng/wot-design-uni/commit/d1b118ea78a797499f465269d3a838c0770d993a))

### [0.0.13](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.12...v0.0.13) (2023-09-01)


### ✏️ Documentation | 文档

* ✏️  官网地址迁移至阿里云oss ([a98868a](https://github.com/Moonofweisheng/wot-design-uni/commit/a98868ae6213c7d7002e5a88893aabe1d0f5d11b))

### [0.0.12](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.11...v0.0.12) (2023-08-30)

### [0.0.11](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.10...v0.0.11) (2023-08-30)


### ✨ Features | 新功能

* ✨ util工具类提供更好的类型提示 ([4fed439](https://github.com/Moonofweisheng/wot-design-uni/commit/4fed43926f49be6a86ebab54bb36a1a086df4ac6))

### [0.0.10](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.9...v0.0.10) (2023-08-27)


### ✨ Features | 新功能

* ✨ 新增Notify组件、演示demo、文档 ([#9](https://github.com/Moonofweisheng/wot-design-uni/issues/9)) ([996fc39](https://github.com/Moonofweisheng/wot-design-uni/commit/996fc39d708699214faf2e54224b8d38a8a706f7))
* ✨ 新增Skeleton组件、演示demo、文档 ([#12](https://github.com/Moonofweisheng/wot-design-uni/issues/12)) ([a49e22c](https://github.com/Moonofweisheng/wot-design-uni/commit/a49e22c370163ec3c93bbeb360cc89b3b3c0abc0))

### [0.0.9](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.8...v0.0.9) (2023-08-25)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复Cell 单格组件 is-link 不触发 click ([ece5568](https://github.com/Moonofweisheng/wot-design-uni/commit/ece5568ecc03fd8470c2c02120b94c1ee27d55e7))

### [0.0.8](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.7...v0.0.8) (2023-08-24)


### ✨ Features | 新功能

* ✨ 演示项目新增用户隐私保护指引的处理 ([4dd7efe](https://github.com/Moonofweisheng/wot-design-uni/commit/4dd7efe4049c4c815ea1bc57a7fd1819055f10bc))
* ✨ ActionSheet组件调整为使用v-model设置显示与隐藏 ([aa92332](https://github.com/Moonofweisheng/wot-design-uni/commit/aa92332f3913be000d1aef36a8aed7f34b736ad6))

### [0.0.7](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.6...v0.0.7) (2023-08-23)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复部分组件某些属性必填警告的问题 ([1b866c0](https://github.com/Moonofweisheng/wot-design-uni/commit/1b866c062eb7a4ab894d5b2ecd7b7b3fd50ef864))

### [0.0.6](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.5...v0.0.6) (2023-08-22)

### [0.0.5](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.4...v0.0.5) (2023-08-22)

### [0.0.4](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.3...v0.0.4) (2023-08-21)


### ✨ Features | 新功能

* ✨ Picker组件优化性能 ([24dd43f](https://github.com/Moonofweisheng/wot-design-uni/commit/24dd43f3a05b7b4ce6bb897219a215f8198e64ac))

### [0.0.3](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.2...v0.0.3) (2023-08-18)

### [0.0.2](https://github.com/Moonofweisheng/wot-design-uni/compare/v0.0.1...v0.0.2) (2023-08-18)


### 🐛 Bug Fixes | Bug 修复

* 🐛 修复CheckBoxGroup组件的disabled属性作用在子组件上失效的问题 ([1bab820](https://github.com/Moonofweisheng/wot-design-uni/commit/1bab820c0335c89e099c597caa47af16bb998d83))

### 0.0.1 (2023-08-16)


### ✨ Features | 新功能

* ✨ 适配暗黑模式 ([f5946a4](https://github.com/Moonofweisheng/wot-design-uni/commit/f5946a4b7134fed161bc123d66485e7bc91cdc68))
* ✨ 新增 50+ 组件
