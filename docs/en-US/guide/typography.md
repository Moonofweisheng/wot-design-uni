# Typography

## iOS Fonts

<table>
  <thead>
    <th></th>
    <th>iOS</th>
  </thead>
  <tbody class="typo-content">
    <tr>
      <td class="typo-content-title typo-PingFang-Semibold">Chinese</td>
      <td>
        <div class="typo-PingFang-Medium-text">PingFang</div>
        <div class="typo-content-demo">
          <div class="typo-PingFang-Semibold">苹方</div>
          <div class="typo-PingFang-Medium">苹方</div>
          <div class="typo-PingFang">苹方</div>
        </div>
        <div>
          <div class="typo-PingFang-Semibold">PingFang SC(font-weight:600)</div>
          <div class="typo-PingFang-Medium">PingFang SC(font-weight:500)</div>
          <div class="typo-PingFang">PingFang SC</div>
        </div>
      </td>
    </tr>
    <tr>
      <td class="typo-content-title typo-PingFang-Semibold">English</td>
      <td>
        <div class="typo-PingFang-Medium-text">San Francisco</div>
        <div class="typo-content-demo">
          <div class="typo-SanFrancisco-Semibold">San Francisco</div>
          <div class="typo-SanFrancisco-Regular">San Francisco</div>
          <div class="typo-SanFrancisco">San Francisco</div>
        </div>
        <div>
          <div class="typo-SanFrancisco-Semibold">San Francisco(font-weight:600)</div>
          <div class="typo-SanFrancisco-Regular">San Francisco(font-weight:500)</div>
          <div class="typo-SanFrancisco">San Francisco</div>
        </div>
      </td>
    </tr>
    <tr>
      <td class="typo-content-title typo-PingFang-Semibold">Numbers</td>
      <td>
        <div class="typo-PingFang-Medium-text">San Francisco / JDZhengHT-EN</div>
        <div class="typo-content-demo">
          <div class="typo-JDZhengHT-Semibold">1234567890 ￥ % + - = .</div>
          <div class="typo-JDZhengHT-Medium">1234567890 ￥ % + - = .</div>
          <div class="typo-JDZhengHT">1234567890 ￥ % + - = .</div>
        </div>
        <div>
          <div class="typo-PingFang-Semibold">JDZhengHT-Bold</div>
          <div class="typo-PingFang-Medium">JDZhengHT-Light(font-weight:700)</div>
          <div class="typo-PingFang">JDZhengHT-Light</div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

## Android Fonts

<table>
  <thead>
    <th></th>
    <th>Android</th>
  </thead>
  <tbody class="typo-content">
    <tr>
      <td class="typo-content-title typo-PingFang-Semibold">Chinese</td>
      <td>
        <div class="typo-PingFang-Medium-text">Source Han Sans</div>
        <div class="typo-content-demo">
          <div class="typo-Source-Medium">思源黑体</div>
          <div class="typo-Source-Normal">思源黑体</div>
          <div class="typo-Source">思源黑体</div>
        </div>
        <div>
          <div class="typo-Source-Medium">Noto SansCJK(font-weight:600)</div>
          <div class="typo-Source-Normal">Noto SansCJK(font-weight:500)</div>
          <div class="typo-Source">Noto SansCJK</div>
        </div>
      </td>
    </tr>
    <tr>
      <td class="typo-content-title typo-PingFang-Semibold">English</td>
      <td>
        <div class="typo-PingFang-Medium-text">Roboto</div>
        <div class="typo-content-demo">
          <div class="typo-Roboto-Medium">Roboto</div>
          <div class="typo-Roboto-Normal">Roboto</div>
          <div class="typo-Roboto">Roboto</div>
        </div>
        <div>
          <div class="typo-Roboto-Medium">Roboto(font-weight:600)</div>
          <div class="typo-Roboto-Normal">Roboto(font-weight:500)</div>
          <div class="typo-Roboto">Roboto</div>
        </div>
      </td>
    </tr>
    <tr>
      <td class="typo-content-title typo-PingFang-Semibold">Numbers</td>
      <td>
        <div class="typo-PingFang-Medium-text">Roboto / JDZhengHT-EN</div>
        <div class="typo-content-demo">
          <div class="typo-JDZhengHT-Semibold">1234567890 ￥ % + - = .</div>
          <div class="typo-JDZhengHT-Medium">1234567890 ￥ % + - = .</div>
          <div class="typo-JDZhengHT">1234567890 ￥ % + - = .</div>
        </div>
        <div>
          <div class="typo-PingFang-Semibold">JDZhengHT-Bold</div>
          <div class="typo-PingFang-Medium">JDZhengHT-Light(font-weight:700)</div>
          <div class="typo-PingFang">JDZhengHT-Light</div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

## Font-family Code
```scss
font-family: "San Francisco", Rotobo, arial, "PingFang SC", "Noto SansCJK", "Microsoft Yahei", sans-serif;
```

## JD Zheng HT Font-family

CDN:

``` bash
# CDN Address
https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Light.ttf
https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Light.woff
https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Bold.ttf
https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Bold.woff
```

Usage:

```scss
@font-face {
  font-family: 'JDZhengHT-Bold';
  src: url('https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Bold.woff') format('woff'), /* chrome, firefox */
       url('https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Bold.ttf') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  font-weight: normal;
  font-style: normal
}
@font-face {
  font-family: 'JDZhengHT-Light';
  src: url('https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Light.woff') format('woff'), /* chrome, firefox */
       url('https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Light.ttf') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  font-weight: normal;
  font-style: normal
}

.type-JDZhengHT {
  font-family: 'JDZhengHT-Light';
}
.type-JDZhengHT-Semibold {
  font-family: 'JDZhengHT-Bold';
}
```

## Font Usage Specifications

<table>
  <thead>
    <tr>
      <th>Level</th>
      <th>Font Size</th>
      <th>Size Variable</th>
      <th>Font Color</th>
      <th>Color Variable</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="font-size: 24px;">Large Title</td>
      <td>24px</td>
      <td>$-fs-big</td>
      <td style="color: rgba(0, 0, 0, 0.85);">rgba(0, 0, 0, 0.85)</td>
      <td>$-color-content</td>
    </tr>
    <tr>
      <td style="font-size: 19px;">Important Data</td>
      <td>19px</td>
      <td>$-fs-important</td>
      <td style="color: rgba(0, 0, 0, 0.85);">rgba(0, 0, 0, 0.85)</td>
      <td>$-color-content</td>
    </tr>
    <tr>
      <td style="font-size: 16px;">Title Font Size/Important Body Font Size</td>
      <td>16px</td>
      <td>$-fs-title</td>
      <td style="color: rgba(0, 0, 0, 0.85);">rgba(0, 0, 0, 0.85)</td>
      <td>$-color-content</td>
    </tr>
    <tr>
      <td style="font-size: 14px;">Normal Body Text</td>
      <td>14px</td>
      <td>$-fs-content</td>
      <td style="color: rgba(0, 0, 0, 0.85);">rgba(0, 0, 0, 0.85)</td>
      <td>$-color-content</td>
    </tr>
    <tr>
      <td style="font-size: 12px;">Auxiliary Text</td>
      <td>12px</td>
      <td>$-fs-secondary</td>
      <td style="color: rgba(0, 0, 0, 0.45);">rgba(0, 0, 0, 0.45)</td>
      <td>$-color-secondary</td>
    </tr>
  </tbody>
</table>