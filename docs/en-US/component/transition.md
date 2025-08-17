# Transition

Used to apply transition effects when elements enter or leave.

## Basic Usage

Wrap elements in the `wd-transition` tag, set `show` to toggle visibility, and set `name` to choose the animation.

```html
<wd-transition :show="show" name="fade">Content</wd-transition>
```

## Animation Types

`wd-transition` has built-in common animations such as `fade`, `slide`, `zoom-in`, etc.

```html
<wd-transition :show="show" name="slide">Content</wd-transition>
```

## Animation Duration

You can set the animation execution time through `duration`. The animation is split into `enter` animation and `leave` animation. `duration` can set the execution time for both enter and leave animations separately: `{ enter: 300, leave: 500 }`.

## Custom Animation

You can set custom animation class names through `enter-class`, `enter-active-class`, `enter-to-class`, `leave-class`, `leave-active-class`, `leave-to-class`.

When the animation enters, the tag will be set with `enter-class` and `enter-active-class` styles, and in the next frame, it will switch to `enter-to-class` and `enter-active-class` styles. Therefore, the enter animation transitions from the `enter-class` style to the `enter-to-class` style state, with `enter-active-class` setting the `transition` related properties.

When the animation leaves, the tag will be set with `leave-class` and `leave-active-class` styles, and in the next frame, it will switch to `leave-to-class` and `leave-active-class` styles. Therefore, the leave animation transitions from the `leave-class` style to the `leave-to-class` style state, with `leave-active-class` setting the `transition` related properties.

```html
<wd-transition
  :show="customShow"
  :duration="{ enter: 700, leave: 1000 }"
  enter-class="custom-enter"
  enter-active-class="custom-enter-active"
  enter-to-class="custom-enter-to"
  leave-class="custom-leave"
  leave-active-class="custom-leave-active"
  leave-to-class="custom-leave-to"
  custom-class="block"
/>
```

```scss
:deep(button) {
  margin: 0 10px 10px 0;
}
:deep(.block) {
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
  width: 100px;
  height: 100px;
  background: #0083ff;
}

:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition-property: background, transform;
}
:deep(.custom-enter) {
  transform: translate3d(-100px, -100px, 0) rotate(-180deg);
  background: #ff0000;
}
:deep(.custom-leave-to) {
  transform: translate3d(100px, 100px, 0) rotate(180deg);
  background: #ff0000;
}
```

## Attributes  

| Parameter          | Description                        | Type             | Optional Values  | Default Value | Minimum Version  |
|--------------------|------------------------------------|------------------|------------------|---------------|------------------|
| show               | Whether to display the component   | boolean          | -                | -             | -                |
| name               | Animation type                     | string / array   | `TransitionName` | -             | -                |
| duration           | Animation duration                 | number / object / boolean | -                | 300(ms)       | -                |
| custom-style       | Custom styles                      | string           | -                | -             | -                |
| custom-class       | Custom root node style class       | string           | -                | -             | -                |
| lazy-render        | Lazy render content                | boolean          | -                | false         | -                |
| destroy            | Whether to destroy child nodes after animation ends | boolean | -                | true          | -                |
| enter-class        | Starting state of enter transition | string           | -                | -             | -                |
| enter-active-class | Active state of enter transition   | string           | -                | -             | -                |
| enter-to-class     | Ending state of enter transition   | string           | -                | -             | -                |
| leave-class        | Starting state of leave transition | string           | -                | -             | -                |
| leave-active-class | Active state of leave transition   | string           | -                | -             | -                |
| leave-to-class     | Ending state of leave transition   | string           | -                | -             | -                |
| disable-touch-move | Whether to prevent touch scrolling | boolean          | -                | false         | 1.11.0 |

### TransitionName Animation Types  

| Name        | Description     | Minimum Version |
|-------------|-----------------|-----------------|
| fade        | Fade in and out | -               |
| fade-down   | Fade down       | -               |
| fade-left   | Fade left       | -               |
| fade-right  | Fade right      | -               |
| fade-up     | Fade up         | -               |
| slide-down  | Slide down      | -               |
| slide-left  | Slide left      | -               |
| slide-right | Slide right     | -               |
| slide-up    | Slide up        | -               |
| zoom-in     | Zoom in         | -               |
| zoom-out    | Zoom out        | -               |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| before-enter | Triggered before enter | - | - |
| enter | Triggered during enter | - | - |
| after-enter | Triggered after enter | - | - |
| before-leave | Triggered before leave | - | - |
| leave | Triggered during leave | - | - |
| after-leave | Triggered after leave | - | - |
| click | Triggered when clicked | - | - |

## Slots

| Slot Name | Description | Version |
|-----------|-------------|---------|
| default | Content to apply animation effects | - |

## External Style Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |
| enter-class | Defines the starting state of the enter transition, takes effect before the element is inserted, removed in the next frame | - |
| enter-active-class | Defines the state during animation execution, applied throughout the enter animation; takes effect before the element is inserted, removed after the animation ends; can define transition-related properties | - |
| enter-to-class | Defines the ending state of the enter transition, takes effect in the next frame after the element is inserted, removed after the animation ends | - |
| leave-class | Defines the starting state of the leave transition, takes effect immediately when the leave animation is triggered, removed in the next frame | - |
| leave-active-class | Defines the state during animation execution, applied throughout the leave animation; takes effect immediately when the leave animation is triggered, removed after the animation ends; can define transition-related properties | - |
| leave-to-class | Defines the ending state of the leave transition, takes effect in the next frame when the leave animation is triggered, removed after the animation ends | - |