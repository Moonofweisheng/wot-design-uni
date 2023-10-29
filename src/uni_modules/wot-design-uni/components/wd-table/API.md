# hd-table

Table 表格

## Props

<!-- @vuese:hd-table:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|dataSource|table数据源|`Array`|`false`|[]|
|stripe|是否为斑马纹|`Boolean`|`false`|false|
|height|表格高度|`String`|`false`|默认值：'80vh'|
|rowHeight|行高|`String`/`Number`|`false`|默认值：'80rpx'|



<!-- @vuese:hd-table:props:end -->


## Events

<!-- @vuese:hd-table:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|sort-method|点击排序时触发|value:Object 当前列表头|
|row-click|点击行时触发|{rowIndex:number} 点击行的下标|

<!-- @vuese:hd-table:events:end -->


## Slots

<!-- @vuese:hd-table:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:hd-table:slots:end -->


