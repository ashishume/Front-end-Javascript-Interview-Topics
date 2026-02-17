# Angular Lifecycle Methods

## Overview
Angular components go through a lifecycle, and Angular provides lifecycle hooks that allow you to tap into key moments in that lifecycle. Understanding the order of execution is crucial for proper component initialization and cleanup.

## Lifecycle Methods (Order of Execution)

### 1. ngOnInit()
Executed first - called once after the first ngOnChanges().

```typescript
ngOnInit(): void {
  console.log('ngOnInit'); // Executed 1
}
```

### 2. ngDoCheck()
Called during every change detection run, immediately after ngOnChanges() and ngOnInit().

```typescript
ngDoCheck() {
  console.log('do check parent'); // Executed 2
}
```

### 3. ngAfterContentInit()
Called once after the first ngDoCheck(), when Angular has finished initializing all content projected into the component.

```typescript
ngAfterContentInit() {
  console.log('after content init'); // Executed 3
}
```

### 4. ngAfterContentChecked()
Called after ngAfterContentInit() and every subsequent ngDoCheck(), when Angular has finished checking the content projected into the component.

```typescript
ngAfterContentChecked() {
  console.log('after content checked'); // Executed 4
}
```

### 5. Custom Methods / Event Handlers
```typescript
public someDataChange(e: any) {
  console.log(e); // Executed 5
}
```

### 6. ngAfterViewInit()
Called once after the first ngAfterContentChecked(), when Angular has finished initializing the component's views and child views.

```typescript
ngAfterViewInit() {
  console.log('after view init'); // Executed 6
}
```

### 7. ngAfterViewChecked()
Called after ngAfterViewInit() and every subsequent ngAfterContentChecked(), when Angular has finished checking the component's views and child views.

```typescript
ngAfterViewChecked() {
  console.log('after view checked'); // Executed 7
}
```

### ngOnChanges()
Called before ngOnInit() and whenever one or more data-bound input properties change.

```typescript
ngOnChanges() {
  console.log('on changes'); // Executed (on @Input changes)
}
```

### ngOnDestroy()
Called just before Angular destroys the component. This is the cleanup phase.

```typescript
ngOnDestroy() {
  // Executed (last) - cleanup logic
}
```

## Complete Lifecycle Sequence

1. **ngOnChanges()** - When @Input properties change
2. **ngOnInit()** - Component initialization
3. **ngDoCheck()** - Change detection
4. **ngAfterContentInit()** - After content projection
5. **ngAfterContentChecked()** - After content check
6. **ngAfterViewInit()** - After view initialization
7. **ngAfterViewChecked()** - After view check
8. **ngOnDestroy()** - Component destruction

## Use Cases

### ngOnInit
- Initialize component data
- Fetch data from services
- Set up subscriptions

### ngOnDestroy
- Unsubscribe from observables
- Clear timers
- Clean up resources

### ngAfterViewInit
- Access ViewChild/ViewChildren
- Initialize third-party libraries
- DOM manipulation

## Best Practices

1. **Use Appropriate Hooks**: Choose the right hook for your needs
2. **Clean Up**: Always clean up in ngOnDestroy
3. **Avoid Heavy Logic**: Keep hooks lightweight
4. **Understand Order**: Know when each hook runs
5. **Performance**: Be mindful of change detection
