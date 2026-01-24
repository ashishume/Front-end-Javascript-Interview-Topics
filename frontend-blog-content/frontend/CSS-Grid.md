# CSS Grid

## Overview
CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns. Unlike Flexbox (one-dimensional), Grid can handle both rows and columns simultaneously, making it perfect for page layouts and complex component designs.

## Basic Setup

```css
.container {
  display: grid;
  background-color: bisque;
  grid-template-columns: 1fr 1fr 1fr; /* fr means fraction, defines 3 columns with equal distribution */
  /* Same approach: */
  /* grid-template-columns: repeat(3, 1fr); */
  
  grid-auto-columns: 200px; /* Default size of column */
  grid-template-rows: 100px 100px 100px 100px; /* Defines 4 rows */
  grid-auto-rows: 100px; /* Default size of row */
}
```

## Grid Properties

### Container Properties

#### grid-template-columns
```css
.container {
  grid-template-columns: 1fr 1fr 1fr; /* 3 equal columns */
  grid-template-columns: repeat(3, 1fr); /* Same as above */
  grid-template-columns: 200px 1fr 2fr; /* Fixed, flexible, flexible */
  grid-template-columns: minmax(200px, 1fr); /* Minimum 200px, max 1fr */
}
```

#### grid-template-rows
```css
.container {
  grid-template-rows: 100px 200px 100px;
  grid-template-rows: repeat(4, 100px);
}
```

#### gap
```css
.container {
  gap: 20px; /* Both row and column gap */
  row-gap: 10px;
  column-gap: 15px;
}
```

#### grid-template-areas
```css
.container {
  grid-template-areas:
    "header header header"
    "content content sidebar"
    "content content sidebar"
    "footer footer footer";
}

.header { grid-area: header; }
.content { grid-area: content; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }
```

### Item Properties

#### grid-column / grid-row
```css
.item {
  grid-column-start: 1; /* Starting point */
  grid-column-end: 3; /* End point */
  /* Shorthand: */
  grid-column: 1 / 3;
  grid-column: span 2; /* Span 2 columns */
}

.item {
  grid-row: 1 / 3;
  grid-row: span 2;
}
```

#### grid-area
```css
.item {
  grid-area: header; /* Named area */
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}
```

## Common Patterns

### Holy Grail Layout
```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

### Card Grid
```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
```

### Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile */
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Best Practices

1. **Use for Layouts**: Grid for page layouts, Flexbox for components
2. **fr Units**: Use fractional units for flexible sizing
3. **Named Areas**: Use grid-template-areas for readability
4. **Gap Instead of Margins**: Use gap for spacing
5. **Auto-fit/auto-fill**: For responsive grids
6. **Minmax**: For flexible but constrained sizing
