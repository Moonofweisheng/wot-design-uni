## Steps 标签页

### 引入

```json
{
  "usingComponents": {
    "wd-step": "/wot-design/step/index",
    "wd-steps": "/wot-design/steps/index"
  }
}
```

### 基本用法

`active` 为步骤进度，为 number 类型，步骤的下标。

```html
<wd-steps active="{{ 0 }}">
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

### 水平居中

设置 `align-center` 水平居中，只对横向步骤条有效。

```html
<wd-steps active="{{ 0 }}" align-center>
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

### 设置标题和描述信息

可以通过 `title` 和 `description` 设置步骤的标题和描述信息。如果不设置标题，则会使用默认的文案。

```html
<wd-steps active="{{ 0 }}" align-center>
  <wd-step title="步骤1" description="注册1个账号" />
  <wd-step title="步骤2" description="登录账号并绑定手机" />
  <wd-step title="步骤3" description="完善个人信息" />
</wd-steps>
```

### 修改图标

可以通过 `icon` 属性设置步骤的图标，传入图标的名称，也可以通过 `icon` 的 slot 插槽自定义图标，使用插槽需要设置 `icon-slot` 为 `true`。

```html
<wd-steps active="{{ 1 }}" align-center>
  <wd-step icon="invite" />
  <wd-step icon="link" />
  <wd-step icon="clock" />
</wd-steps>
```

### 竖向步骤条

设置 `vertical` 属性。

```html
<wd-steps active="{{ 1 }}" vertical>
  <wd-step description="注册1个账号" />
  <wd-step description="登录账号并绑定手机" />
  <wd-step description="完善个人信息" />
</wd-steps>
```

### 点状步骤

设置 `dot` 属性。

```html
<wd-steps active="{{ 1 }}" vertical dot>
  <wd-step description="注册1个账号" />
  <wd-step description="登录账号并绑定手机" />
  <wd-step description="完善个人信息" />
</wd-steps>
```

### 修改状态

设置 `status`，支持 'finished'（完成）、'process'（进行中）、'error'（失败） 三种状态。

```html
<wd-steps active="{{ 1 }}" align-center>
  <wd-step title="绑定手机" status="error" />
  <wd-step title="重新绑定手机" />
  <wd-step title="步骤3" />
</wd-steps>
```

### Steps Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| active | 步骤进度 | number | - | 0 | - |
| vertical | 垂直方向 | boolean | - | false | - |
| dot | 点状步骤条 | dot | - | false | - |
| space | 步骤条间距，默认为自动计算 | string | - | - | - |
| align-center | 是否水平居中，只对横向步骤条有效 | boolean | - | false | - |

### Step Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| title | 标题，如果没有则为默认文案。当只有标题而没有描述时，标题的字号会小2号 | string | - | - | - |
| title-slot | 使用 title 插槽时需要设置该属性 | boolean | - | false | - |
| description | 描述 | string | - | - | - |
| description-slot | 使用 description 插槽时需要设置该属性 | boolean | - | false | - |
| icon | 图标 | string | - | - | - |
| icon-slot | 使用 icon 插槽时需要设置该属性 | boolean | - | false | - |
| status | 步骤状态 | string | finished / process / error | - | - |

### Step Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| icon | 图标 | - |
| title | 标题 | - |
| description | 描述 | - |

### Steps 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | 根结点样式 | - |

### Step 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
