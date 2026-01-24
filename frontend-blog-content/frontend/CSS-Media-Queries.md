# CSS Media Queries

## Overview
CSS Media Queries allow you to apply styles conditionally based on device characteristics such as screen size, resolution, orientation, and more. They are essential for creating responsive web designs that work across different devices and screen sizes.

## Basic Syntax

```css
@media (max-width: 600px) {
  .content1,
  .content2 {
    background-color: lightblue;
  }
}

@media (min-width: 600px) and (max-width: 1200px) {
  body {
    background-color: lightgreen;
  }
}
```

## Media Types

### screen
This media type targets all screen devices.

```css
@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

### only screen
This media type prevents older browsers that do not support media queries from applying the styles. It ensures that the styles are applied only if the media query is fully supported.

## Width Queries

### max-width
Styles are applied if the viewport width is less than or equal to the specified value.

```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

### min-width
Styles are applied if the viewport width is greater than or equal to the specified value.

```css
@media (min-width: 769px) {
  /* Desktop styles */
}
```

### Range Queries
```css
@media (min-width: 600px) and (max-width: 1200px) {
  /* Tablet styles */
}
```

## Common Breakpoints

```css
/* Mobile First Approach */
/* Base styles for mobile */

/* Small devices (tablets, 768px and up) */
@media (min-width: 768px) { }

/* Medium devices (desktops, 992px and up) */
@media (min-width: 992px) { }

/* Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { }
```

## Box Sizing

### border-box
The width and height properties include the content, padding, and border. This means the total width and height will be exactly as specified.

```css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 10px;
  border: 5px solid black;
  /* Total width = 200px */
}
```

### content-box
This is the default value. The width and height properties include only the content, and the padding and border are added outside of this width and height.

```css
.box {
  box-sizing: content-box;
  width: 200px;
  padding: 10px;
  border: 5px solid black;
  /* Total width = 200px + 20px padding + 10px border = 230px */
}
```

## Advanced Media Queries

### Orientation
```css
@media (orientation: portrait) {
  /* Portrait mode */
}

@media (orientation: landscape) {
  /* Landscape mode */
}
```

### Resolution
```css
@media (min-resolution: 2dppx) {
  /* High DPI displays */
}

@media (-webkit-min-device-pixel-ratio: 2) {
  /* Retina displays */
}
```

### Multiple Conditions
```css
@media screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  /* Tablet landscape */
}
```

## Best Practices

1. **Mobile First**: Start with mobile styles, add desktop styles
2. **Use Relative Units**: Prefer rem, em, % over px
3. **Test on Real Devices**: Don't rely only on browser dev tools
4. **Keep It Simple**: Avoid overly complex media queries
5. **Use Container Queries**: When available, use container queries
6. **Performance**: Minimize number of media queries
