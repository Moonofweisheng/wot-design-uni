
## 代码演示
### 基础用法

通过`prop`设置表格该列的对应字段，并通过`label`设置表格该列的标题。

``` html
<hd-table-column prop="name" label="姓名"></hd-table-column>
<hd-table-column prop="school" label="求学之所"></hd-table-column>
<hd-table-column prop="major" label="专业"></hd-table-column>
```
### 列宽度

通过`width`设置表格该列的列宽度。

``` html
<hd-table-column prop="name" label="姓名" :width="90"></hd-table-column>
```
### 是否固定列

通过`fixed`设置表格该列是否固定，默认为`false`(不固定)，且只支持钉钉固定在左侧。

``` html
<hd-table-column prop="name" label="姓名" :fixed="true"></hd-table-column>
<hd-table-column prop="school" label="求学之所"></hd-table-column>
<hd-table-column prop="major" label="专业"></hd-table-column>
```
### 列排序

通过`sortable`设置表格该列是否参与排序，默认为`false`(不排序)。

``` html
<hd-table-column prop="name" label="姓名" :sortable="true"></hd-table-column>
<hd-table-column prop="school" label="求学之所" :sortable="true"></hd-table-column>
<hd-table-column prop="major" label="专业"></hd-table-column>
```
