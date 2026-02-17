# CSS Flexbox

## Overview
CSS Flexbox (Flexible Box Layout) is a one-dimensional layout method that allows you to arrange items in rows or columns. Items flex (grow/shrink) to fill available space and can be aligned and distributed in various ways. Flexbox makes it easier to design flexible and responsive layouts.

## Basic Setup

```html
<style>
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .container > div {
    /* Fill the remaining spaces left on either sides */
    flex-grow: 1;
    width: 600px;
    height: 200px;
    /* To center the elements when shifts to new line */
    margin: auto;
    border: solid 1px black;
  }
  .child1 {
    order: 1;
  }
  .child2 {
    order: 0;
  }
  .child3 {
    order: 2;
  }
</style>
<div class="container">
  <div class="child1">1</div>
  <div class="child2">2</div>
  <div class="child3">3</div>
</div>
```

## Container Properties (Parent)

### display
```css
.container {
  display: flex; /* or inline-flex */
}
```

### flex-direction
```css
.container {
  flex-direction: row;        /* default: left to right */
  flex-direction: row-reverse; /* right to left */
  flex-direction: column;     /* top to bottom */
  flex-direction: column-reverse; /* bottom to top */
}
```

### flex-wrap
```css
.container {
  flex-wrap: nowrap;  /* default: single line */
  flex-wrap: wrap;    /* multiple lines */
  flex-wrap: wrap-reverse; /* reverse wrap */
}
```

### flex-flow (shorthand)
```css
.container {
  flex-flow: row wrap; /* direction and wrap */
}
```

### justify-content (main axis)
```css
.container {
  justify-content: flex-start;    /* default */
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between;
  justify-content: space-around;
  justify-content: space-evenly;
}
```

### align-items (cross axis)
```css
.container {
  align-items: stretch;     /* default */
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
  align-items: baseline;
}
```

### align-content (multiple lines)
```css
.container {
  align-content: stretch;
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
}
```

### gap
```css
.container {
  gap: 10px;           /* row and column */
  row-gap: 10px;        /* row only */
  column-gap: 20px;     /* column only */
}
```

## Item Properties (Children)

### flex-grow
```css
.item {
  flex-grow: 0;  /* default: don't grow */
  flex-grow: 1;  /* grow to fill space */
  flex-grow: 2;  /* grow twice as much */
}
```

### flex-shrink
```css
.item {
  flex-shrink: 1;  /* default: can shrink */
  flex-shrink: 0;  /* don't shrink */
  flex-shrink: 2;  /* shrink twice as much */
}
```

### flex-basis
```css
.item {
  flex-basis: auto;  /* default */
  flex-basis: 200px; /* initial size */
  flex-basis: 20%;   /* percentage */
}
```

### flex (shorthand)
```css
.item {
  flex: 1;              /* flex-grow: 1, shrink: 1, basis: 0 */
  flex: 0 1 auto;       /* default */
  flex: 1 1 200px;      /* grow: 1, shrink: 1, basis: 200px */
  flex: none;           /* 0 0 auto */
}
```

### align-self
```css
.item {
  align-self: auto;      /* default */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: stretch;
  align-self: baseline;
}
```

### order
```css
.item {
  order: 0;  /* default */
  order: 1;  /* appears after items with order 0 */
  order: -1; /* appears before items with order 0 */
}
```

## Common Patterns

### Centering
```css
.container {
  display: flex;
  justify-content: center;  /* horizontal */
  align-items: center;       /* vertical */
  height: 100vh;
}
```

### Equal Height Columns
```css
.container {
  display: flex;
}

.item {
  flex: 1; /* equal width and height */
}
```

### Sticky Footer
```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1; /* takes remaining space */
}
```

### Navigation Bar
```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
}
```

### Card Layout
```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* grow, shrink, min-width */
}
```

## Responsive Design

```css
.container {
  display: flex;
  flex-direction: column; /* mobile first */
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

## Advanced Examples

### Holy Grail Layout
```css
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header, .footer {
  flex: 0 0 auto;
}

.main {
  display: flex;
  flex: 1;
}

.sidebar {
  flex: 0 0 200px;
}

.content {
  flex: 1;
}
```

### Masonry-like Layout
```css
.masonry {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.item {
  flex: 1 1 300px;
  margin: 10px;
}
```

## Best Practices

1. **Use flex for one-dimensional layouts**: Row or column, not both
2. **Prefer flex shorthand**: `flex: 1` instead of separate properties
3. **Use gap instead of margins**: Cleaner spacing
4. **Mobile first**: Start with column, switch to row on larger screens
5. **Avoid fixed widths**: Let flex handle sizing
6. **Use min-width/max-width**: When you need constraints

## Common Mistakes

### Mistake 1: Forgetting flex-wrap
```css
/* ❌ Items overflow */
.container {
  display: flex;
}

/* ✅ Items wrap */
.container {
  display: flex;
  flex-wrap: wrap;
}
```

### Mistake 2: Using width with flex-grow
```css
/* ❌ Conflicting properties */
.item {
  flex-grow: 1;
  width: 100%;
}

/* ✅ Use flex-basis */
.item {
  flex: 1 1 0;
}
```

### Mistake 3: Not using align-items
```css
/* ❌ Items stretch to different heights */
.container {
  display: flex;
}

/* ✅ Consistent heights */
.container {
  display: flex;
  align-items: stretch; /* default */
}
```

## Browser Support

Flexbox is supported in all modern browsers. For older browsers (IE10-11), use vendor prefixes or consider alternative layouts.

## Comparison with Grid

- **Flexbox**: One-dimensional (row OR column)
- **Grid**: Two-dimensional (rows AND columns)

Use Flexbox for components, Grid for page layouts.
