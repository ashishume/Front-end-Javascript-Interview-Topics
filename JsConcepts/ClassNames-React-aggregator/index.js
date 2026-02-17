//create a classNames util/polyfill method
/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
  const classes = [];

  const process = (arg) => {
    if (!arg) return;
    if (typeof arg === "string" || typeof arg === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      arg.forEach(process); // recurse into arrays
    } else if (typeof arg === "object") {
      for (let key in arg) {
        if (Object.hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  };

  args.forEach(process);

  return classes.join(" ");
}
