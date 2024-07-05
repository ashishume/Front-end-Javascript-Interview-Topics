
async function fetchUpperCase(word) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(word.toUpperCase());
    }, 1000);
  });
}

// Only a maximum of 2 pending requests at any one time.
(async () => {
  const results = await mapAsyncLimit(
    ["foo", "bar", "qux", "quz"],
    fetchUpperCase,
    2
  );
  console.log(results);
})();
console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
