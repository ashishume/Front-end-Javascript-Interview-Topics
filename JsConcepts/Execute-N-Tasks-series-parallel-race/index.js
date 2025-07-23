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
// const apiCalls = [task1, task2, task3];

async function makeSequentialAPICalls(tasks) {
  try {
    await tasks.reduce(async (previousPromise, apiCall) => {
      await previousPromise;
      const result = await apiCall();
      console.log("API call result:", result);
    }, Promise.resolve());
    console.log("All API calls completed successfully");
  } catch (error) {
    console.error("Error making API calls:", error);
  }
}

makeSequentialAPICalls([task1, task2, task3]);

// Function to execute tasks in parallel
async function executeTasksInParallel(tasks) {
  const results = await Promise.all(tasks.map((task) => task()));
  return results;
}

// Run the tasks
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

// Sample asynchronous task functions
function task1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Result 1");
    }, 1000); // 1 second delay
  });
}

function task2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Result 2");
    }, 500); // 0.5 second delay
  });
}

function task3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Result 3");
    }, 1500); // 1.5 second delay
  });
}
