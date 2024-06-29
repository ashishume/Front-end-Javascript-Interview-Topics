/**
 * create custom fetch request and response interceptor
 */

const originalFetch = window.fetch;

/** global var for interceptor requests */
window.requestInterceptor = (args) => {
    console.log(args);
    return args;
};

/** global var for interceptor responses */
window.responseInterceptor = (response) => {
  console.log(response);
  return response;
};

window.fetch = async (...args) => {
  args = requestInterceptor(args);
  let response = await originalFetch(...args);
  response = responseInterceptor(response);
  return response;
};

fetch("https://jsonplaceholder.typicode.com/todos/")
  .then((res) => res.json())
  .then((json) => console.log(json));
