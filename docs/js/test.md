<frame/>

# Test 规则校验

* 内置了一些校验规则，如是否手机号，邮箱号，URL等
* 这些规则方法，挂载在```$wd.test```下面，如验证是否手机号：```$wd.test.mobile('13888889999')```，如果验证通过，返回```true```，否则返回```false```


## 按需使用

如果未做全局扩展配置，可以按需引入，具体引入路径等请到具体API中查看：

```html
// 据需求写
import { code, array } from '@/uni_modules/wot-design-uni/tool/function/test.js';

```

## code(value, len = 6)

* 校验是否验证码(要求为数字)，返回true或者false。

* value ```<String>``` 验证码字符串
* len ```<Number>``` 验证码长度，默认为6

```js
// true
uni.$wd.test.code('4567', 4)
// false
uni.$wd.test.code('1234567', 4)
```


## array(array)

* 校验是否数组，返回```true```或者```false```。

```js
// true
uni.$wd.test.array([1, 2, 3])
// false
uni.$wd.test.array({})
```

## jsonString(json)

* 校验是否是Json字符串，返回```true```或者```false```。
* json ```<Json>``` Json字符串
* 注意：请留意json字符串的要求：
1.   整体为一个字符串
2.   字符串对象内的属性需要用""双引号包含

```js
// true
uni.$wd.test.jsonString('{"a": 1}')
```

## object(object)

* 校验是否是是对象，返回```true```或者```false```。
* object ```<Object>``` 对象

```js
// true
uni.$wd.test.jsonString('{"a": 1}')
```


## email(email)

* 校验是否邮箱号，返回```true```或者```false```。
* email ```<String>``` 字符串

```js
// true
uni.$wd.test.email('123465798@gmail.com')
```


## mobile(mobile)

* 校验是否手机号，返回```true```或者```false```。
* mobile  ```<String>``` 字符串

```js
// false
uni.$wd.test.mobile('123465798@gmail.com')
// true
uni.$wd.test.mobile('13845678900')
```


## empty(value)

* 校验值是否为空，返回```true```或者```false```。
* 这里指的“空”，包含如下几种情况：
1.   值为```undefined```(一种类型)，非字符串```"undefined"```
2.   字符串长度为0，也即空字符串
3.   值为```false```(布尔类型)，非字符串```"false"```
4.   值为数值```0```(非字符串```"0"```)，或者```NaN```
5.   值为```null```，空对象```{}```，或者长度为```0```的数组

value ```<any>``` 字符串

```js
// true
uni.$wd.test.empty('')
```



## idCard(idCard)

* 效验是否身份证号，包括尾数为"X"的类型，可以校验通过，结果返回```true```或者```false```。

idCard ```<String>``` 身份证号

```js
// true
uni.$wd.test.idCard('110101199003070134')
```


## chinese(zh)

* 效验是否汉字，可以为单个汉字，或者汉字组成的字符串，结果返回```true```或者```false```。

zh ```<String>``` 中文字符串

```js
// true
uni.$wd.test.chinese('更上一层楼')
```


## letter(en)

* 效验是否字母，只能为"a-z"或者"A-Z"之间的字符，结果返回```true```或者```false```。

en ```<String>``` 字母串

```js
// true
uni.$wd.test.letter('wot-design-uni')
```


## enOrNum(str)

* 效验是否字母或者数字，只能是字母或者数字，结果返回```true```或者```false```。

str ```<String>``` 字母或者数字字符串

```js
// true
uni.$wd.test.enOrNum('wot-design-uni')
```


## contains(str, subStr)

* 效验是否包含某个值，字符串中是否包含某一个子字符串，区分大小写，结果返回```true```或者```false```。
* str ```<String>``` 字符串
* subStr ```<String>``` 子字符串


```js
// false
uni.$wd.test.contains('wot-design-uni', 'View')
// true
uni.$wd.test.contains('wot-design-uni', 'uni')
```


## range(number, range)

* 效验数值是否在某个范围内，如30在"29-35"这个范围内，不在"25-28"这个范围内，结果返回```true```或者```false```。
1. number ```<Number>``` 数值
2. range ```<Array>``` 如"```[30-40]```"

```js
// true
uni.$wd.test.range(35, [30, 40])
```


## rangeLength(str, range)

* 效验字符串长度是否在某个范围内，如"abc"长度为3，范围在"2-5"这个区间，结果返回```true```或者```false```。
1. str ```<String>``` 数值
2. range ```<Array>``` 如"```[25, 35]```"

```js
console.log(uni.$wd.test.rangeLength('abc', [3, 10]));
```