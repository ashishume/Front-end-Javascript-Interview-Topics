//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef

/**
 * WeakRef is an object that holds a weak reference to another object, which allows the referenced object to be garbage collected even if there are no strong references to it. This is useful for scenarios where you want to hold onto an object as long as it's needed, but you don't want to prevent it from being garbage collected once it's no longer in use.
 */

let obj = { foo: "bar" };
const weakRef = new WeakRef(obj);

// Access the target object through the WeakRef
console.log(weakRef.deref()); // Output: { foo: 'bar' }

// Once the strong reference to the original object is removed,
// the WeakRef might return undefined when you try to access it
obj = null;
console.log(weakRef.deref()); // Output: undefined
