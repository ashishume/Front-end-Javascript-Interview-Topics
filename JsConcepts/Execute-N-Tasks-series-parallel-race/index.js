// 1. Execute N tasks in series
async function executeTasksInSeries(tasks) {
  const results = [];
  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }
  return results;
}

//Another way

function executeTasksInSeries(tasks) {
  return tasks.reduce((prevPromise, task) => {
    return prevPromise.then((results) => {
      return task().then((result) => {
        results.push(result);
        return results;
      });
    });
  }, Promise.resolve([]));
}



//API call in series (same as above using async await)
const apiCalls = [apiCall1, apiCall2, apiCall3, apiCall4, apiCall5];

async function makeSequentialAPICalls() {
    try {
        await apiCalls.reduce(async (previousPromise, apiCall) => {
            await previousPromise;
            const result = await apiCall();
            console.log('API call result:', result);
        }, Promise.resolve());
        console.log('All API calls completed successfully');
    } catch (error) {
        console.error('Error making API calls:', error);
    }
}

// makeSequentialAPICalls();


// -------------------------------------------------------------------
// 2. Execute N tasks in parallel
// @param: tasks: [task1,task2,task3]
async function executeTasksInParallel(tasks) {
  // Execute all tasks in parallel
  const results = await Promise.all(tasks.map((task) => task()));
  return results;
}

executeTasksInParallel([task1, task2, task3]).then((results) => {
  console.log(results); // Output: ['Result 1', 'Result 2', 'Result 3']
});

// -------------------------------------------------------------------
// 3. Execute N tasks in race
async function executeTasksInRace(tasks) {
  // Execute tasks in a race
  const result = await Promise.race(tasks.map((task) => task()));
  return result;
}
// Execute tasks in a race
executeTasksInRace([task1, task2, task3]).then((result) => {
  console.log(result); // Output: 'Result 1' (or whichever task finishes first)
});
