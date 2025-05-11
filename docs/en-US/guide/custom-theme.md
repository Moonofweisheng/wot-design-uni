# Custom Theme

Every component in Wot UI basically has a custom class name custom-class, which can be added to your page's class name at the component's root node for style modification.

## Theme Introduction

### Main Variables Introduction

The following style variables are used in multiple components. By modifying these main variables, you can quickly define a custom theme.

**Theme Color**:

<div class="style-block" style="background: #4D80F0;">
  <p>Theme Color</p>
  <p>$-color-theme: #4D80F0</p>
</div>

**Theme Brand Color - Small Gradient (Button, weaker gradient)**:
<div class="color-wrapper">
  <span class="style-block liner-color" style="background: linear-gradient(315deg, rgba(79,124,248,1) 0%,rgba(102,141,248,1) 100%);">
    <span class="a-dot"></span>
    <span class="b-dot"></span>
  </span>

  <div class="demo-right">
    <i>Gradient angle 45 degrees, lighter in top left, darker in bottom right</i>
    <ul>
      <li>A: <span class="color-block" style="background: #668DF8">#668DF8</span></li>
      <li>B: <span class="color-block" style="background: #4F7CF8">#4F7CF8</span></li>
    </ul>
  </div>
</div>

**Brand Color - Large Gradient (Large background/plugin icon background, stronger gradient)**:

<div class="color-wrapper">
  <span class="style-block liner-color liner-color1" style="background: linear-gradient(315deg, rgba(81,124,240,1) 0%,rgba(118,158,245,1) 100%);">
    <span class="a-dot"></span>
    <span class="b-dot"></span>
  </span>

  <div class="demo-right">
    <i>Gradient angle 45 degrees, lighter in top right, darker in bottom left</i>
    <ul>
      <li>A: <span class="color-block" style="background: #769EF5">#769EF5</span></li>
      <li>B: <span class="color-block" style="background: #517CF0">#517CF0</span></li>
    </ul>
  </div>
</div>

**Function Colors**:

<div class="style-block" style="background: #4D80F0;">
  <p>Theme Color</p>
  <p>$-color-theme: #4D80F0</p>
</div>
<div class="style-block" style="background: #34d19d;">
  <p>Success Color</p>
  <p>$-color-success: #34d19d</p>
</div>
<div class="style-block" style="background: #f0883a;">
  <p>Warning Color</p>
  <p>$-color-warning: #f0883a</p>
</div>
<div class="style-block" style="background: #fa4350;">
  <p>Danger Color</p>
  <p>$-color-danger: #fa4350</p>
</div>

**Auxiliary Colors**:

<div class="style-block" style="background: #8268de;">
  <p>#8268de</p>
</div>
<div class="style-block" style="background: #fa4350;">
  <p>#fa4350</p>
</div>
<div class="style-block" style="background: #f0883a;">
  <p>#f0883a</p>
</div>
<div class="style-block" style="background: #f0cf1d;">
  <p>#f0cf1d</p>
</div>
<div class="style-block" style="background: #34d19d;">
  <p>#34d19d</p>
</div>
<div class="style-block" style="background: #2bb3ed;">
  <p>#2bb3ed</p>
</div>

### Neutral Colors

Neutral colors are used for text, background, and border colors. Different neutral colors are used to express hierarchical structure.

<ul class="color-group">
  <li class="color-group-line" style="background: rgba(0,0,0,1);color: #fff">100%<div>Important Text</div></li>
  <li class="color-group-line" style="background: rgba(0,0,0,0.85);color: #fff">85%<div>Normal Text</div></li>
  <li class="color-group-line" style="background: rgba(0,0,0,0.65);color: #fff">65%<div>Mask, Secondary Text<br/>Only used when hierarchy is complex</div></li>
  <li class="color-group-line" style="background: rgba(0,0,0,0.45);color: #fff">45%<div>Auxiliary Text, Secondary Button Border</div></li>
  <li class="color-group-line" style="background: rgba(0,0,0,0.25);color: rgba(0,0,0,0.65)">25%<div>Disabled, Default Prompt Text</div></li>
  <li class="color-group-line" style="background: rgba(0,0,0,0.15);color: rgba(0,0,0,0.65)">15%<div>Control Border</div></li>
  <li class="color-group-line" style="background: rgba(0,0,0,0.09);color: rgba(0,0,0,0.65)">9%<div>Use solid color #E8E8E8 if cross-used</div></li>
  <li class="color-group-line" style="background: rgba(0,0,0,0.04);color: rgba(0,0,0,0.65)">4%<div>Background Color, Disabled Fill Color</div></li>
  <li class="color-group-line" style="background: rgba(0,0,0,0.02);color: rgba(0,0,0,0.65)">2%<div>Table Header Fill Color</div></li>
</ul>

<ul class="color-group dark">
  <li class="color-group-line" style="background: rgba(255,255,255,1);color: rgba(0,0,0,0.65)">100%<div>Important Text</div></li>
  <li class="color-group-line" style="background: rgba(255,255,255,0.85);color: rgba(0,0,0,0.65)">85%<div>Normal Text</div></li>
  <li class="color-group-line" style="background: rgba(255,255,255,0.65);color: rgba(0,0,0,0.65)">65%<div>Mask, Secondary Text<br/>Only used when hierarchy is complex</div></li>
  <li class="color-group-line" style="background: rgba(255,255,255,0.45);color: rgba(255,255,255,0.65)">45%<div>Auxiliary Text, Secondary Button Border</div></li>
  <li class="color-group-line" style="background: rgba(255,255,255,0.25);color: rgba(255,255,255,0.65)">25%<div>Disabled, Default Prompt Text</div></li>
  <li class="color-group-line" style="background: rgba(255,255,255,0.15);color: rgba(255,255,255,0.65)">15%<div>Control Border</div></li>
  <li class="color-group-line" style="background: rgba(255,255,255,0.09);color: rgba(255,255,255,0.65)">9%<div>Use solid color #E8E8E8 if cross-used</div></li>
  <li class="color-group-line" style="background: rgba(255,255,255,0.04);color: rgba(255,255,255,0.65)">4%<div>Background Color, Disabled Fill Color</div></li>
  <li class="color-group-line" style="background: rgba(255,255,255,0.02);color: rgba(255,255,255,0.65)">2%<div>Table Header Fill Color</div></li>
</ul>

## Customize Theme

We provide CSS variables for each component. You can refer to the [config-provider](../component/config-provider) component's usage guide to customize the theme.