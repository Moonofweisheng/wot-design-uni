<frame/>

# JS工具库

JS工具类，部分功能由其它开源框架。每个JS库的来源都已写在源码中。位置在 wot-design-uni>tool下,每一个js类都有来源说明。

## 全局使用

```main.ts
import { createSSRApp } from 'vue'
import App from './App.vue'
// #ifdef H5
import '@vant/touch-emulator'
// #endif

import wd from '@/uni_modules/wot-design-uni/tools'

export function createApp() {
  const app = createSSRApp(App)
  app.use(wd)
  // app.config.warnHandler = () => null
  return {
    app
  }
}

```


此js函数方法，为框架提供的一部分功能，它的实现，需要通过js调用，而不是组件的形式。

工具库中的所有方法，如果按照扩展配置进行配置后，均挂载在$wd对象下，调用方法如下：



```html

console.log(uni.$wd.trim(' abc '));	// 去除两端空格
```

## 按需使用

如果未做全局扩展配置，可以按需引入，具体引入路径等请到具体API中查看：

```html
import { trim } from '@/uni_modules/wot-design-uni/tool/function/index.js';
// 使用
console.log(trim('你好   '))
```


## os()

* 此方法用于返回平台的名称：

```js
// 300ms后触发回调
uni.$wd.os()
```

## sys()

* 此方法用于获取设备的信息，相当于uni.getSystemInfoSync()的效果：

```js
// 300ms后触发回调
uni.$wd.sys()
```


## callPhone(phoneNumber) 打电话

* 此方法用于获取设备的信息，相当于uni.getSystemInfoSync()的效果：

```js
uni.$wd.callPhone(18888888888)
```


## range(min, max, value)

* 此方法用于限制value的大小，如果其在min和max之间，则不变；如果其小于min，则取min值；如果其大于max，则取max值。：

```js
// 最终结果为5
uni.$wd.range(1, 5, 8)

// 最终结果为4
uni.$wd.range(1, 5, 4)
```

## sleep(value) 延时

* 延时一定时间进行回调，类似于promise的使用方式：

```js
// 300ms后触发回调
uni.$wd.sleep(300).then(() => {
	console.log('定时结束')
})
```


## random(min, max) 随机数值

* 该方法可以返回在 min 和 max 之间的数值，要求 min 和 max 都为数值，且 max 大于或等于 min，否则返回0：
* min ```<Number>``` 最小值，最小值可以等于该值
* min ```<Number>``` 最小值，最小值可以等于该值

```js
uni.$wd.random(1, 3)
```


## guid 全局唯一标识符

* guid(length = 32, firstU = true, radix = 62)：
* min ```<Number>``` 最小值，最小值可以等于该值
* min ```<Number>``` 最小值，最小值可以等于该值

```js
uni.$wd.random(1, 3)
```


## deepClone(object = {}) 对象深度克隆

* 我们平时可能会遇到需要通过console.log打印一个对象，至执行打印的时刻，此对象为空，后面的逻辑中对此对象进行了修改赋值，但是我们在控制台直接看到的打印结果 却是修改后的值，这让人匪夷所思，虽然我们可以通过console.log(JSON.parse(JSON.stringify(object)))的形式处理，但是需要写这长长的一串，难免让人心生抵触。
* 当我们将一个对象(变量A)赋值给另一个变量(变量B)时，修改变量B，因为对象引用的特性，导致A也同时被修改，所以有时候我们需要将A克隆给B，这样修改B的时候，就不会 导致A也被修改。
* object ```<Object>``` 需要被克隆的对象


```js
let a = {
	name: 'mary'
};

// 直接赋值，为对象引用，即修改b等于修改a，因为a和b为同一个值
let b = a;

b.name = 'juli';
console.log(b); // 结果为 {name: 'juli'}
console.log(a); // 结果为 {name: 'juli'}


// 深度克隆
let b = uni.$wd.deepClone(a);

b.name = 'juli';
console.log(b); // 结果为 {name: 'juli'}
console.log(a); // 结果为 {name: 'mary'}
```



## deepMerge(target = {}, source = {}) 对象深度合并

* 在ES6中，我们可以很方便的使用Object.assign进行对象合并，但这只是浅层的合并，如果对象的属性为数组或者对象的时候，会导致属性内部的值丢失。
* 注意： 此处合并不同于Object.assign，因为Object.assign(a, b)会修改a的值为最终的结果(这往往不是我们所期望的)，但是deepMerge(a, b)并不会修改a的值。
* target ```<Object>``` 目标对象
* source ```<Object>``` 源对象

##### Object.assign浅合并示例：
```js
let a = {
	info: {
		name: 'mary'
	}
}

let b = {
	info: {
		age: '22'
	}
}

// 使用Object.assign进行合并，注意此时a被修改了
let c = Object.assign(a, b);

// 我们期望的结果为：
c = {
	info: {
		name: 'mary',
		age: '22'
	}
}

// 事实上，我们得到的结果却为：
c = {
	info: {
		age: '22'
	}
}
```

##### 深度合并示例：
```js
let a = {
	info: {
		name: 'mary'
	}
}

let b = {
	info: {
		age: '22'
	}
}

let c = uni.$wd.deepMerge(a, b);

// c为我们期望的结果
c = {
	info: {
		age: '22',
		name: 'mary'
	}
}
```


## randomArray 数组乱序

* 该函数可以打乱一维数组元素的顺序，这是随机过程：
* array ```<Array>``` 一维数组


```js
uni.$wd.randomArray([1,2,3,4,5,6,7,8,9])
```


## Time 时间格式化

### timeFormat(time,format) | date(time,format) 格式化时间

* 该函数必须传入第一个参数，第二个参数是可选的，函数返回一个格式化好的时间。
* time ```<String>``` 任何合法的 时间格式、秒 或 毫秒 的时间戳
* format ```<String>``` 时间格式，可选。默认为yyyy-mm-dd，年为"yyyy"，月为"mm"，日为"dd"，时为"hh"，分为"MM"，秒为"ss"，格式可以自由搭配，如： yyyy:mm:dd，yyyy-mm-dd，yyyy年mm月dd日，yyyy年mm月dd日 hh时MM分ss秒，yyyy/mm/dd/，MM:ss等组合

```js
//2024-07-08
uni.$wd.timeFormat(new Date().getTime())
//2024年07月08日 16时08分27秒
uni.$wd.timeFormat(new Date().getTime(),'yyyy年mm月dd日 hh时MM分ss秒')
//2024/07/08
uni.$wd.timeFrom(new Date().getTime(),'yyyy/mm/dd')
//2024年07月08日
uni.$wd.timeFormat(new Date().getTime(),'yyyy年mm月dd日')
```


### timeFrom(time, format = String | false) 多久以前

* 该函数必须传入第一个参数，格式为任何合法的时间格式、秒或毫秒的时间戳，第二个参数是可选的，返回的值类似刚刚，25分钟前，3小时前，7天前的结果。
* 如果第二个参数是时间的格式，当前和传入时间戳相差大于一个月时，返回格式化好的时间；如果第二个参数为false，则不会返回格式化好的时间，而是诸如"xxx年前"的结果。
* timestamp ```<String>``` 时间戳
* format ```<String / false>``` 时间格式，默认为```yyyy-mm-dd```，年为"yyyy"，月为"mm"，日为"dd"，时为"hh"，分为"MM"，秒为"ss"，格式可以自由搭配，如： yyyy:mm:dd，yyyy-mm-dd，yyyy年mm月dd日，yyyy年mm月dd日 hh时MM分ss秒，yyyy/mm/dd/，MM:ss等组合。 如果时间戳距离此时的时间，大于一个月，则返回一个格式化好的时间，如果此参数为false，返回均为"多久之前"的结果。

```js
//刚刚
uni.$wd.timeFrom(new Date().getTime())
//6个月前
uni.$wd.timeFrom(new Date('2023-02-06').getTime(),false)
//2023年02月06日
uni.$wd.timeFrom(new Date('2023-02-06').getTime(),'yyyy年mm月dd日')

```


## Trim 去除空格

* 该方法可以去除空格，分别可以去除所有空格，两端空格，左边空格，右边空格，默认为去除两端空格
* str ```<String>``` 字符串
* pos ```<String>``` 去除那些位置的空格，可选为：```both```-默认值，去除两端空格，```left```-去除左边空格，```right```-去除右边空格，```all```-去除包括中间和两端的所有空格

```js
uni.$wd.trim('abc    b ', 'all') // 去除所有空格
uni.$wd.trim(' abc ')	// 去除两端空格
```

## priceFormat(value [, decimals = 0 [, decimalPoint = '.' [, thousandsSeparator = ',']]])

此方法可用于对数值形式的金额进行格式化

* value，需要格式化的金额数值，只能为数值，如```300.52```，```300```，而不能为诸如带千分位的写法```3,000.5```
* decimals，可选，格式化后小数点的位数，默认为```0```，小数最后一位会进行四舍五入
* decimalPoint，可选，小数点的符号，默认为```.```
* thousandsSeparator，可选，千分位分隔符，默认为英文逗号```,```

```js
// 3,232.37
uni.$wd.priceFormat(3232.365, 2)
// 2,322
uni.$wd.priceFormat(2322.365)
```


## padZero(value)

* 日期的月或日补零操作


```js
// 01
uni.$wd.padZero(1)
// 12
uni.$wd.padZero(22)
```


## page()

* 此方法用于获取当前页面的路径，返回的路径以```/```开头。


```js
// 返回类似/pages/index/index
uni.$wd.page()
```


## pages()

* 本方法为```getCurrentPages()```的封装，用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。


```js
// 返回类似/pages/index/index
uni.$wd.pages()
```


## getHistoryPage(back = 0)

* 表示获取历史栈的哪一层，```0```表示获取当前页面实例，```-1``` 表示获取上一个页面实例。默认```0```


```js
// 返回类似/pages/index/index
uni.$wd.getHistoryPage()
```


## pageHidden && pageVisible 微信小程序-滚动穿透

* ``` 微信小程序```

```js
// overflow: 'hidden',
uni.$wd.pageHidden()
// overflow: 'visible',
uni.$wd.pageVisible()
```