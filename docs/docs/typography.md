## 字体

### iOS字体

<table>
  <thead>
    <th></th>
    <th>iOS</th>
  </thead>
  <tbody class="typo-content">
    <tr>
      <td class="typo-content-title typo-PingFang-Semibold">中文</td>
      <td>
        <div class="typo-PingFang-Medium-text">苹方</div>
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
      <td class="typo-content-title typo-PingFang-Semibold">英文</td>
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
      <td class="typo-content-title typo-PingFang-Semibold">数字</td>
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

### Andriod字体

<table>
  <thead>
    <th></th>
    <th>Andriod</th>
  </thead>
  <tbody class="typo-content">
    <tr>
      <td class="typo-content-title typo-PingFang-Semibold">中文</td>
      <td>
        <div class="typo-PingFang-Medium-text">思源黑体</div>
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
      <td class="typo-content-title typo-PingFang-Semibold">英文</td>
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
      <td class="typo-content-title typo-PingFang-Semibold">数字</td>
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

### Font-family 代码
```css
font-family: "San Francisco", Rotobo, arial, "PingFang SC", "Noto SansCJK", "Microsoft Yahei", sans-serif;
```


### 京东正黑 Font-family

CDN：

``` bash
# CDN 地址
https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Light.ttf
https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Light.woff
https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Bold.ttf
https://static.360buyimg.com/bus/fonts/JDZhengHT/JDZhengHT-Bold.woff
```

用法：

```css
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

### 字体使用规范

<table>
  <thead>
    <tr>
      <th>层级</th>
      <th>字体大小</th>
      <th>字号变量</th>
      <th>字体颜色</th>
      <th>字体颜色变量</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="font-size: 24px;">大型标题</td>
      <td>24px</td>
      <td>$-fs-big</td>
      <td style="color: rgba(0, 0, 0, 0.85);">rgba(0, 0, 0, 0.85)</td>
      <td>$-color-content</td>
    </tr>
    <tr>
      <td style="font-size: 19px;">重要数据</td>
      <td>19px</td>
      <td>$-fs-important</td>
      <td style="color: rgba(0, 0, 0, 0.85);">rgba(0, 0, 0, 0.85)</td>
      <td>$-color-content</td>
    </tr>
    <tr>
      <td style="font-size: 16px;">标题字号/重要正文字号</td>
      <td>16px</td>
      <td>$-fs-title</td>
      <td style="color: rgba(0, 0, 0, 0.85);">rgba(0, 0, 0, 0.85)</td>
      <td>$-color-content</td>
    </tr>
    <tr>
      <td style="font-size: 14px;">普通正文</td>
      <td>14px</td>
      <td>$-fs-content</td>
      <td>
        <div style="color: rgba(0, 0, 0, 0.85);">rgba(0, 0, 0, 0.85)</div>
        <div style="color: rgba(0, 0, 0, 0.65);">rgba(0, 0, 0, 0.65)</div>
        <div style="color: rgba(0, 0, 0, 0.45);">rgba(0, 0, 0, 0.45)</div>
        <div style="color: rgba(0, 0, 0, 0.25);">rgba(0, 0, 0, 0.25)</div>
      </td>
      <td>$-color-content</td>
    </tr>
    <tr>
      <td style="font-size: 12px;">次要信息，注释/补充/正文</td>
      <td>12px</td>
      <td>$-fs-secondary</td>
      <td>
        <div style="color: rgba(0, 0, 0, 0.45);">rgba(0, 0, 0, 0.45)</div>
        <div style="color: rgba(0, 0, 0, 0.25);">rgba(0, 0, 0, 0.25)</div>
      </td>
      <td>$-color-aid</td>
    </tr>
    <tr>
      <td style="font-size: 10px;">辅助文字，弱化信息，引导性/不可点文字</td>
      <td>10px</td>
      <td>$-fs-aid</td>
      <td style="color: rgba(0, 0, 0, 0.45);">rgba(0, 0, 0, 0.45)</td>
      <td>$-color-aid</td>
    </tr>
  </tbody>
</table>