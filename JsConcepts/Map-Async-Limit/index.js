/**
 * Maps an iterable with an async callback while limiting concurrency.
 *
 * Operations:
 * 1. Validate the concurrency limit.
 * 2. Schedule each async task and track in-flight executions.
 * 3. Pause scheduling when the limit is reached.
 * 4. Resolve once all scheduled tasks complete.
 *
 * @template T, R
 * @param {Iterable<T>} iterable - Source values to process.
 * @param {(item: T) => Promise<R> | R} callbackFn - Async/sync mapper callback.
 * @param {number} limit - Maximum number of concurrent operations.
 * @returns {Promise<R[]>} Resolved mapped values in input order.
 */
async function mapAsyncLimit(iterable, callbackFn, limit) {
  if (limit <= 0) {
    throw new Error('Limit must be greater than 0');
  }

  const results = [];
  const executing = new Set();

  for (const item of iterable) {
    // Schedule the current operation.
    const p = Promise.resolve().then(() => callbackFn(item));
    results.push(p);

    // Remove from active set after completion.
    const e = p.finally(() => executing.delete(e));
    executing.add(e);

    // Wait for one active operation if concurrency limit is reached.
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  // Preserve original order by awaiting all recorded promises.
  return Promise.all(results);
}

/**
 * Simulates a fetch and transforms the input word to uppercase.
 *
 * Operations:
 * 1. Send a network request.
 * 2. Simulate latency.
 * 3. Return transformed response.
 *
 * @param {string} word - Input text value.
 * @returns {Promise<string>} Uppercase result.
 */
async function fetchUpperCase(word) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts?=${word}`);
    return new Promise((resolve) => {
      setTimeout(() => resolve(word.toUpperCase()), 500);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Only a maximum of 2 pending requests at any one time.
(async () => {
  try {
    const results = await mapAsyncLimit(
      ['consectetur', 'exercitationem', 'repudiandae', 'maiores'],
      fetchUpperCase,
      2
    );
    console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ']
  } catch (error) {
    console.error('Error in main execution:', error);
  }
})();
