async function mapAsyncLimit(iterable, callbackFn, limit) {
  const results = [];
  const executing = [];

  for (const item of iterable) {
    const p = Promise.resolve().then(() => callbackFn(item));
    results.push(p);

    if (limit <= iterable.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

async function fetchUpperCase(word) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");  //demo to api call made with some delay
    setTimeout(() => {
      resolve(word.toUpperCase());
    }, 500);
  });
}

// Only a maximum of 2 pending requests at any one time.
(async () => {
  const results = await mapAsyncLimit(
    ["foo", "bar", "qux", "quz"],
    fetchUpperCase,
    2
  );
  console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
})();
