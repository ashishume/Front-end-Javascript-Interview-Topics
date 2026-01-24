# Event Delegation in JavaScript

## Overview
Event Delegation is a technique in JavaScript where instead of adding event listeners to individual child elements, you add a single event listener to a parent element. This listener then handles events that bubble up from child elements. This pattern is more efficient and is particularly useful when dealing with dynamically added elements.

## Basic Concept

Instead of:
```javascript
// Adding listeners to each child - inefficient
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});
```

Use:
```javascript
// Adding one listener to parent - efficient
document.querySelector('#category').addEventListener('click', (e) => {
  console.log(e.target.id);
});
```

## How It Works

Event Delegation leverages **event bubbling** - when an event occurs on a child element, it bubbles up through the DOM tree to parent elements. By listening on the parent, you can handle events from any child.

```javascript
// HTML structure
<div id="category">
  <button id="item1">Item 1</button>
  <button id="item2">Item 2</button>
  <button id="item3">Item 3</button>
</div>

// Event delegation
document.querySelector('#category').addEventListener('click', (e) => {
  console.log(e.target.id); // Logs the clicked button's id
});
```

## Benefits

1. **Performance**: Fewer event listeners = better performance
2. **Memory Efficiency**: Less memory usage
3. **Dynamic Elements**: Works with elements added after page load
4. **Simpler Code**: One listener instead of many
5. **Easier Maintenance**: Centralized event handling

## Example: Dynamic List

```javascript
// HTML
<ul id="todo-list">
  <!-- Items will be added dynamically -->
</ul>

// JavaScript with event delegation
const todoList = document.querySelector('#todo-list');

// Add items dynamically
function addTodoItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.className = 'todo-item';
  todoList.appendChild(li);
}

// Single event listener handles all items (even future ones)
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('todo-item')) {
    console.log('Todo clicked:', e.target.textContent);
    e.target.classList.toggle('completed');
  }
});

// Add items - they automatically work with the listener
addTodoItem('Buy groceries');
addTodoItem('Walk the dog');
addTodoItem('Finish project');
```

## Event Target vs Current Target

```javascript
document.querySelector('#parent').addEventListener('click', (e) => {
  console.log('target:', e.target);        // The element that was clicked
  console.log('currentTarget:', e.currentTarget); // The element with the listener
});
```

- **e.target**: The actual element that triggered the event
- **e.currentTarget**: The element that has the event listener (always the parent in delegation)

## Filtering Events

```javascript
document.querySelector('#button-group').addEventListener('click', (e) => {
  // Only handle clicks on buttons, not other elements
  if (e.target.tagName === 'BUTTON') {
    console.log('Button clicked:', e.target.textContent);
  }
});
```

## Example: Table with Delete Buttons

```javascript
// HTML
<table id="data-table">
  <tbody>
    <tr>
      <td>John</td>
      <td><button class="delete-btn" data-id="1">Delete</button></td>
    </tr>
    <tr>
      <td>Jane</td>
      <td><button class="delete-btn" data-id="2">Delete</button></td>
    </tr>
  </tbody>
</table>

// Event delegation
document.querySelector('#data-table').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    deleteRow(id);
  }
});

function deleteRow(id) {
  console.log('Deleting row:', id);
  // Delete logic here
}
```

## Example: Form with Multiple Inputs

```javascript
// HTML
<form id="user-form">
  <input type="text" name="firstName" placeholder="First Name">
  <input type="text" name="lastName" placeholder="Last Name">
  <input type="email" name="email" placeholder="Email">
  <button type="submit">Submit</button>
</form>

// Event delegation for input changes
document.querySelector('#user-form').addEventListener('input', (e) => {
  if (e.target.tagName === 'INPUT') {
    console.log(`${e.target.name}: ${e.target.value}`);
    validateField(e.target);
  }
});

function validateField(field) {
  // Validation logic
  if (field.value.length < 3) {
    field.classList.add('error');
  } else {
    field.classList.remove('error');
  }
}
```

## When to Use Event Delegation

### Use When:
- You have many similar elements
- Elements are added/removed dynamically
- You want to reduce memory usage
- You need better performance

### Don't Use When:
- You need to stop event propagation immediately
- Events don't bubble (like focus, blur)
- You need very specific event handling per element
- The parent is too far from the target

## Handling Non-Bubbling Events

Some events don't bubble (focus, blur, load, unload). For these, you can use the capture phase:

```javascript
// Using capture phase for focus events
document.querySelector('#form-container').addEventListener('focus', (e) => {
  if (e.target.tagName === 'INPUT') {
    e.target.classList.add('focused');
  }
}, true); // true = use capture phase
```

## Advanced Example: Nested Elements

```javascript
// HTML with nested elements
<div id="card-container">
  <div class="card">
    <h3>Card Title</h3>
    <p>Card content</p>
    <button class="card-button">Action</button>
  </div>
</div>

// Event delegation handling nested clicks
document.querySelector('#card-container').addEventListener('click', (e) => {
  // Find the closest card
  const card = e.target.closest('.card');
  
  if (e.target.classList.contains('card-button')) {
    console.log('Button in card clicked');
  } else if (card) {
    console.log('Card clicked');
  }
});
```

## Performance Comparison

```javascript
// Without delegation: 1000 listeners
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', handleClick);
}); // 1000 event listeners in memory

// With delegation: 1 listener
document.querySelector('#container').addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handleClick(e);
  }
}); // 1 event listener in memory
```

## Best Practices

1. **Use closest() for nested elements**: Find the relevant parent element
2. **Check target element**: Verify the clicked element is what you expect
3. **Use data attributes**: Store data in data-* attributes for easy access
4. **Stop propagation when needed**: Use e.stopPropagation() if necessary
5. **Consider event delegation depth**: Don't delegate from document level if possible
6. **Handle edge cases**: Check for null/undefined targets

## Common Patterns

### Pattern 1: Button Groups
```javascript
document.querySelector('.button-group').addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    handleButtonClick(e.target);
  }
});
```

### Pattern 2: Lists
```javascript
document.querySelector('.list').addEventListener('click', (e) => {
  const listItem = e.target.closest('.list-item');
  if (listItem) {
    handleListItemClick(listItem);
  }
});
```

### Pattern 3: Modals
```javascript
document.querySelector('.modal').addEventListener('click', (e) => {
  if (e.target.classList.contains('close-btn')) {
    closeModal();
  } else if (e.target.classList.contains('modal')) {
    // Clicked on backdrop
    closeModal();
  }
});
```
