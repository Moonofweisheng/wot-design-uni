# Introduction

The `wot-design-uni` component library is built on `vue3` + `Typescript`, following the design specifications of `wot design`. It provides 70+ high-quality components, supports dark mode, internationalization, and custom themes, aiming to provide developers with unified UI interactions while improving development efficiency.

## Quick Start

Please refer to the [Quick Start](/en-US/guide/quick-use.html) documentation.

## Scan QR Code to Experience

<div style="display:flex;gap:24px">
<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="WxQrcode" />
  <div style="text-align: center;">WeChat</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="AlipayQrcode" />
  <div style="text-align: center;">Alipay</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="H5Qrcode" />
  <div style="text-align: center;">Browser</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="AndroidQrcode" />
  <div style="text-align: center;">Browser</div>
</div>
</div>

## ✨ Features

- 🎯 Multi-platform coverage, supporting WeChat Mini Program, Alipay Mini Program, DingTalk Mini Program, H5, APP, etc.
- 🚀 70+ high-quality components covering mainstream mobile scenarios.
- 💪 Built with Typescript, providing a robust component type system.
- 🌍 Internationalization support with 15 built-in language packs.
- 📖 Comprehensive documentation and component examples.
- 🎨 Support for theme customization through CSS variables.
- 🍭 Support for dark mode

## Links

- [Changelog](/en-US/guide/changelog)
- [Common Problems](/en-US/guide/common-problems)
- [Discussions](https://github.com/Moonofweisheng/wot-design-uni/discussions)
- [Communication Group](/en-US/guide/join-group.html)
- [Excellent Cases](/en-US/guide/cases)

## Sponsor Us

If you feel that Wot UI has helped your development work, you can choose to [sponsor](/en-US/reward/reward.html) us. There is no threshold for sponsorship, even a glass of lemonade would be appreciated.

After donation, your nickname and message will be displayed in the [donation list](/en-US/reward/donor.html).

## Ecosystem Recommendations

| Project | Description |
| --- | --- |
| [awesome-uni-app](https://github.com/uni-helper/awesome-uni-app) | A collection of excellent development resources for the multi-platform unified development framework uni-app |
| [create-uni](https://github.com/uni-helper/create-uni) | Quickly create uni-app projects |
| [wot-starter](https://github.com/wot-ui/wot-starter) | A quick-start demo for wot-design-uni based on [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) |
| [wot-starter-retail](https://github.com/Moonofweisheng/wot-starter-retail) | A uni-app retail industry template based on wot-design-uni |
| [Wot UI Snippets](https://marketplace.visualstudio.com/items?itemName=kiko.wot-design-uni-snippets) | Wot UI code snippets |
| [uni-mini-ci](https://github.com/Moonofweisheng/uni-mini-ci) | A plugin that supports CI (Continuous Integration) for uni-app mini program after build |
| [uni-mini-router](https://github.com/Moonofweisheng/uni-mini-router) | A lightweight uni-app router library based on vue3 and Typescript |
| [unibest](https://github.com/unibest-tech/unibest) | A uni-app template based on wot-design-uni |
| [wot-design-uni AI Assistant](https://www.coze.cn/store/bot/7347916532258701363) | An intelligent assistant that can answer your questions about the wot-design-uni component library |
| [uni-ku-root](https://github.com/uni-ku/root) | A root component plugin that simulates App.vue's original capabilities |

## Acknowledgments

- [wot-design](https://github.com/jd-ftf/wot-design-mini) - Thanks to the wot-design team for their continuous maintenance over the years, allowing wot-design-uni to stand on the shoulders of giants.
- [uni-helper](https://github.com/uni-helper) - Thanks to the uni-helper team for providing the uni-app tool library, making wot-design-uni easier to use.
- [Donors](https://wot-ui.cn/reward/donor.html) - Thanks to all donors, your donations help wot-design-uni develop better.

## License

This project is based on the [MIT](https://en.wikipedia.org/wiki/MIT_License) license. Please feel free to enjoy and participate in open source.

<script setup>
import WxQrcode from '/wx.jpg'
import AlipayQrcode from '/alipay.png'
import H5Qrcode from '/h5.png'
import AndroidQrcode from '/android.png'
</script>