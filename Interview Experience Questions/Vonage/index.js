/**
 1. why iframe should not be used for all websites, and why statistics are embeded inside iframe
 2. 1k users to 1million users changes in website
 3. how website loading works when user requests a url, (whole procedure)
 4. can we use div inside a span?
 5. state management for react and angular
 6. how does responsiveness for desktop screens, what things that needs to be takes care
 7. when a product is ready for deployment.
 * 
 */

function callMethod() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(2);
    }, 5000);
  });
}
(function () {
  console.log(1);
  callMethod().then((d) => console.log(d));
  setTimeout(() => console.log(4), 2000);
  setTimeout(() => console.log(5), 0);
  console.log(6);
})();
