# CSS Selector Priorities (Specificity)

## Overview
CSS selector priority (specificity) determines which CSS rule is applied when multiple rules target the same element. Understanding specificity is crucial for writing maintainable CSS and debugging style conflicts.

## Specificity Order

1. **!important** - Highest priority (overrides everything)
2. **Inline styles** - style attribute
3. **IDs** - #myId
4. **Classes, attributes, pseudo-classes** - .class, [attr], :hover
5. **Elements and pseudo-elements** - div, ::before

## Example

```html
<style>
  .box {
    color: orange !important; /* PRIORITY 1 - Highest */
  }
  #myDiv {
    color: red; /* PRIORITY 2 - ID selector */
  }
  .box {
    color: blue; /* PRIORITY 3 - Class selector (duplicate, last one wins if same specificity) */
  }
  div > div {
    color: black; /* PRIORITY 4 - Descendant selector */
  }
  div {
    color: yellow; /* PRIORITY 5 - Element selector */
  }
</style>

<div>
  <div id="myDiv" class="box">This is a paragraph inside the div.</div>
</div>
```

## Specificity Calculation

### Point System
- Inline style: 1000 points
- ID: 100 points
- Class/Attribute/Pseudo-class: 10 points
- Element/Pseudo-element: 1 point

### Examples
```css
/* Specificity: 0,0,0,1 = 1 point */
div { }

/* Specificity: 0,0,1,0 = 10 points */
.class { }

/* Specificity: 0,1,0,0 = 100 points */
#id { }

/* Specificity: 0,0,1,1 = 11 points */
div.class { }

/* Specificity: 0,1,1,1 = 111 points */
#id div.class { }

/* Specificity: 1,0,0,0 = 1000 points (inline) */
<div style="color: red;">
```

## Best Practices

1. **Avoid !important**: Use sparingly, only when necessary
2. **Prefer Classes**: Use classes over IDs for styling
3. **Keep Specificity Low**: Easier to override and maintain
4. **Use BEM**: Block Element Modifier methodology
5. **Avoid Over-nesting**: Keep selectors shallow
6. **Document Complex Rules**: Comment why high specificity is needed
