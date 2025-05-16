async function mapAsyncLimit(iterable, callbackFn, limit) {
  const results = [];
  const executing = new Set();

  for (const item of iterable) {
    const promise = Promise.resolve().then(() => callbackFn(item));
    results.push(promise);

    if (limit <= iterable.length) {
      const execution = promise.finally(() => executing.delete(execution));
      executing.add(execution);

      if (executing.size >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

async function fetchUpperCase(word) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts");
    return new Promise((resolve) => {
      setTimeout(() => resolve(word.toUpperCase()), 500);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Only a maximum of 2 pending requests at any one time.
(async () => {
  try {
    const results = await mapAsyncLimit(
      ["foo", "bar", "qux", "quz"],
      fetchUpperCase,
      2
    );
    console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ']
  } catch (error) {
    console.error("Error in main execution:", error);
  }
})();
