# Canvas API in JavaScript

## Overview
The HTML5 Canvas API provides a powerful way to draw graphics, animations, and interactive content using JavaScript. The Canvas element creates a fixed-size drawing surface that you can manipulate with JavaScript to render 2D shapes, images, text, and animations.

## Basic Setup

```javascript
/** Canvas drawing using vanilla js */
window.addEventListener("load", (e) => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  let painting = false;

  function startPosition() {
    painting = true;
    draw(e);
  }
  
  function endPosition() {
    painting = false;
    ctx.beginPath();
  }
  
  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
});
```

## Getting Started

### HTML Setup
```html
<canvas id="canvas"></canvas>
```

### JavaScript Setup
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;
```

## Drawing Shapes

### Lines
```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 100);
ctx.stroke();
```

### Rectangles
```javascript
// Filled rectangle
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);

// Stroked rectangle
ctx.strokeStyle = "red";
ctx.lineWidth = 5;
ctx.strokeRect(150, 10, 100, 100);

// Clear rectangle
ctx.clearRect(50, 50, 50, 50);
```

### Circles and Arcs
```javascript
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "green";
ctx.fill();
ctx.stroke();
```

### Paths
```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100, 100);
ctx.lineTo(150, 50);
ctx.closePath();
ctx.stroke();
```

## Text

```javascript
// Fill text
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Hello Canvas", 10, 50);

// Stroke text
ctx.strokeText("Hello Canvas", 10, 100);

// Text alignment
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Centered", canvas.width / 2, canvas.height / 2);
```

## Images

```javascript
const img = new Image();
img.onload = function() {
  // Draw image
  ctx.drawImage(img, 0, 0);
  
  // Draw scaled image
  ctx.drawImage(img, 0, 0, 200, 200);
  
  // Draw cropped image
  ctx.drawImage(img, 50, 50, 100, 100, 0, 0, 200, 200);
};
img.src = "image.jpg";
```

## Transformations

```javascript
// Save context state
ctx.save();

// Translate
ctx.translate(100, 100);

// Rotate
ctx.rotate(Math.PI / 4);

// Scale
ctx.scale(2, 2);

// Draw something
ctx.fillRect(0, 0, 50, 50);

// Restore context state
ctx.restore();
```

## Gradients

### Linear Gradient
```javascript
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(1, "blue");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 100);
```

### Radial Gradient
```javascript
const radialGradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
radialGradient.addColorStop(0, "white");
radialGradient.addColorStop(1, "black");
ctx.fillStyle = radialGradient;
ctx.fillRect(0, 0, 200, 200);
```

## Patterns

```javascript
const pattern = ctx.createPattern(img, "repeat");
ctx.fillStyle = pattern;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

## Animation

```javascript
let x = 0;

function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw
  ctx.fillRect(x, 50, 50, 50);
  
  // Update
  x += 2;
  if (x > canvas.width) x = 0;
  
  // Next frame
  requestAnimationFrame(animate);
}

animate();
```

## Interactive Drawing

```javascript
class DrawingApp {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mouseup", () => this.stopDrawing());
    this.canvas.addEventListener("mouseout", () => this.stopDrawing());
  }
  
  startDrawing(e) {
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
  }
  
  draw(e) {
    if (!this.isDrawing) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    this.lastX = currentX;
    this.lastY = currentY;
  }
  
  stopDrawing() {
    this.isDrawing = false;
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
```

## Common Use Cases

### 1. Data Visualization
```javascript
function drawBarChart(data) {
  const barWidth = canvas.width / data.length;
  const maxValue = Math.max(...data);
  
  data.forEach((value, index) => {
    const barHeight = (value / maxValue) * canvas.height;
    ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
  });
}
```

### 2. Game Development
```javascript
class Game {
  constructor() {
    this.player = { x: 100, y: 100, width: 50, height: 50 };
    this.animate();
  }
  
  update() {
    // Update game state
  }
  
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
  }
  
  animate() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.animate());
  }
}
```

### 3. Image Manipulation
```javascript
function applyFilter(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    // Grayscale filter
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  return imageData;
}
```

## Best Practices

1. **Use requestAnimationFrame**: For smooth animations
2. **Clear Properly**: Always clear before redrawing
3. **Save/Restore Context**: Use save/restore for transformations
4. **Optimize Drawing**: Batch operations when possible
5. **Handle Resize**: Update canvas size on window resize
6. **Memory Management**: Clean up event listeners

## Performance Tips

1. **Offscreen Canvas**: Use for pre-rendering
2. **Image Caching**: Cache frequently used images
3. **Reduce Redraws**: Only redraw changed areas
4. **Use Layers**: Multiple canvases for different layers
5. **Optimize Paths**: Minimize path operations

## Browser Compatibility

Canvas API is supported in all modern browsers. For older browsers, consider using polyfills or fallbacks.
