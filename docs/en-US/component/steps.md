# Steps

Used to guide users to complete tasks according to a process or show current status to users.

:::tip Breaking Change Notice
In version `1.2.10`, the `step` component deprecated the `title-slot`, `icon-slot`, and `description-slot` fields that controlled slot usage, and added direct support for `title`, `icon`, and `description` slots. The `default` slot was also deprecated.
:::

## Basic Usage

`active` represents the step progress, it's a number type indicating the step index.

```html
<wd-steps :active="active">
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

```ts
const active = ref<number>(0)

function nextStep() {
  active.value = active.value + 1
}
```

## Horizontal Center

Set `align-center` for horizontal centering, only effective for horizontal step bars.

```html
<wd-steps :active="0" align-center>
  <wd-step />
  <wd-step />
  <wd-step />
</wd-steps>
```

## Set Title and Description

You can set the title and description of steps through `title` and `description`. If no title is set, default text will be used.

```html
<wd-steps :active="active" align-center>
  <wd-step title="Step 1" description="Register an account" />
  <wd-step title="Step 2" description="Login and bind phone number" />
  <wd-step title="Step 3" description="Complete personal information" />
</wd-steps>
<wd-button size="small" @click="nextStep">Next Step</wd-button>
```
```ts
const active = ref<number>(0)

function nextStep() {
  active.value = active.value + 1
}
```

## Modify Icon

You can set the step icon through the `icon` property by passing the icon name, or customize the icon through the `icon` slot. When using slots, you need to set `icon-slot` to `true`.

```html
<wd-steps :active="1" align-center>
  <wd-step icon="invite" />
  <wd-step icon="link" />
  <wd-step icon="clock" />
</wd-steps>
```

## Vertical Steps

Set the `vertical` property.

```html
<wd-steps :active="1" vertical>
  <wd-step description="Register an account" />
  <wd-step description="Login and bind phone number" />
  <wd-step description="Complete personal information" />
</wd-steps>
```

## Dot Steps

Set the `dot` property.

```html
<wd-steps :active="1" vertical dot>
  <wd-step description="Register an account" />
  <wd-step description="Login and bind phone number" />
  <wd-step description="Complete personal information" />
</wd-steps>
```

## Modify Status

Set `status`, supports three states: 'finished', 'process', and 'error'.

```html
<wd-steps :active="1" align-center>
  <wd-step title="Bind Phone" status="error" />
  <wd-step title="Rebind Phone" />
  <wd-step title="Step 3" />
</wd-steps>
```

## Steps Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| active | Step progress | number | - | 0 | - |
| vertical | Vertical direction | boolean | - | false | - |
| dot | Dot step bar | dot | - | false | - |
| space | Step bar spacing, automatically calculated by default | string | - | - | - |
| align-center | Whether to center horizontally, only effective for horizontal step bars | boolean | - | false | - |

## Step Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| title | Title, uses default text if not set. When there's only title without description, title font size will be 2 sizes smaller | string | - | - | - |
| <s>title-slot</s> | <s>Need to set this property when using title slot</s>, deprecated, use title slot directly | boolean | - | false | - |
| description | Description | string | - | - | - |
| <s>description-slot</s> | <s>Need to set this property when using description slot</s>, deprecated, use description slot directly | boolean | - | false | - |
| icon | Icon | string | - | - | - |
| <s>icon-slot</s> | <s>Need to set this property when using icon slot</s>, deprecated, use icon slot directly | boolean | - | false | - |
| status | Step status | string | finished / process / error | - | - |

## Step Slot

| Name | Description | Version |
|------|-------------|----------|
| icon | Icon | 1.2.10 |
| title | Title | 1.2.10 |
| description | Description | 1.2.10 |

## Steps External Style Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |

## Step External Style Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |