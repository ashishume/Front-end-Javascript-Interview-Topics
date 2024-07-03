## Accessibility means creating websites and applications that everyone can use, regardless of their abilities or disabilities.

## Why do we need it?

- Ensures that people with disabilities can access and use web content.
- Improves the overall user experience for everyone,
- Many accessibility practices also benefit search engine optimization.

## Areas of Accessibility

- Using semantic html tags (header, main, nav, footer)
- Alt text for images

```
<img src="image.jpg" alt="A beautiful scenery of mountains and a lake">
```

- Keyboard navigation (Ensure all interactive elements are accessible via keyboard.)

```
<a href="https://example.com" role="button">Link Styled as Button</a>
```

- Forms has associated labels

```
 <label for="name">Name:</label>
 <input type="text" id="name" name="name">
```

- Contrast and Color (Ensure sufficient contrast between text and background colors.)

Examples: 
this button is Accessible
Accessible Button: Adding an aria-label provides additional context to screen readers.

```
<button aria-label="Submit Form">Click Me</button>
```

## Some technologies

- Screen readers
- Screen maginifiers
- speech recoginitions
- alternate input devices
