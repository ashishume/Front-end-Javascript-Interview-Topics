/** Follow url: https://learnersbucket.com/examples/interview/create-custom-cookie-in-javascript/
 * for more details
 */

function createCustomCookie() {
  let store = new Map();
  Object.defineProperty(document, "myCookie", {
    configurable: true,
    set: (strPath) => {
      const [nameValue, ...rest] = parseStr(strPath);
      const [key, value] = splitOptions(nameValue);
      let options = {};
      for (let obj of rest) {
        const [key, value] = splitOptions(obj);
        options[key] = value;
      }
      let expiry = Infinity;
      if (options["max-age"]) {
        expiry = Date.now() + Number(options["max-age"]) * 1000;
      }
      store.set(key, { value, expiry });
    },
    get: () => {
      let cookies = [];
      const time = Date.now();
      for (let [key, { value, expiry }] of store) {
        if (expiry <= time) {
          store.delete(key);
        } else {
          cookies.push(`${key}=${value}`);
        }
      }
      return cookies.join("; ");
    },
  });

  function parseStr(strPath) {
    return strPath.split(";").map((val) => val.trim());
  }
  function splitOptions(obj) {
    return obj.split("=").map((v) => v.trim());
  }
}

createCustomCookie();

document.myCookie = "name=Ashish;max-age=1";
document.myCookie = "blog=Akash";
console.log(document.myCookie);
setTimeout(() => {
  console.log(document.myCookie);
}, 1500);

// document.cookie = "name=Ashish;max-age=1";
// document.cookie = "blog=Akash";
// console.log(document.cookie);
// setTimeout(() => {
//   console.log(document.cookie);
// }, 1500)
