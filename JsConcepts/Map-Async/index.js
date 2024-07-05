// 1st way
async function mapAsync1(iterable, callbackFn) {
  const results = [];
  for (let item of iterable) {
    const result = await callbackFn(item);
    results.push(result);
  }
  return results;
}

//2nd way
async function mapAsync2(iterable, callbackFn) {
  return Promise.all(iterable.map(callbackFn));
}

const asyncDouble = (x) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });

(async () => {
  const doubled = await mapAsync1([1, 2], asyncDouble);
  console.log(doubled); //2, 4
})();
(async () => {
  const doubled = await mapAsync2([3, 4], asyncDouble);
  console.log(doubled); // 6, 8
})();
