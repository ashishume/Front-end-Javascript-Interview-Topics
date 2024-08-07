/** caching api call */

let cache = {};

function cacheMethod(url) {
  //cache the url and check if expiry date is passed or not
  if (cache[url] && cache[url].expiresAt > Date.now()) {
    return Promise.resolve(cache[url].data);
  }

  //if cache is not present then make a new api call
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      //cache duration
      const cacheDuration = 60 * 1000;
      const expiresAt = Date.now() + cacheDuration;
      const data = res.products;
      //pass the data to the cache
      cache[url] = { data, expiresAt };

      return data;
    });
}

cacheMethod("https://dummyjson.com/products?limit=10").then((d) => {
  console.log("d==>", d);

  //second call is not made in network tab, only promise is being return
  cacheMethod("https://dummyjson.com/products?limit=10").then((a) => {
    console.log("a==>", a);
  });
});
