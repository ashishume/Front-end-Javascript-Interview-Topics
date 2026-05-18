// Kahn's algorithm

async function runAsyncGraph(tasks, dependencies) {
  const dependents = new Map();
  const inDegree = new Map();

  for (let task of Object.keys(tasks)) {
    dependents.set(task, []);
    inDegree.set(task, 0);
  }

  for (const [before, after] of dependencies) {
    if (!tasks[before] || !tasks[after]) {
      throw new Error(`Unknown task in dependency: ${before} -> ${after}`);
    }

    inDegree.set(after, inDegree.get(after) + 1);
    dependents.get(before).push(after);
  }

  const results = {};
  const queue = Array.from(inDegree.keys()).filter((k) => inDegree.get(k) === 0);
  let processedCount = 0;

  async function run(task) {
    results[task] = await tasks[task]();
    processedCount += 1;

    const unblocked = dependents
      .get(task)
      .filter((dep) => {
        const nextDegree = inDegree.get(dep) - 1;
        inDegree.set(dep, nextDegree);
        return nextDegree === 0;
      });
    await Promise.all(unblocked.map(run));
  }

  await Promise.all(queue.map(run));

  if (processedCount !== Object.keys(tasks).length) {
    throw new Error('Cycle detected (or unresolved dependencies) in task graph');
  }

  return results;
}

const tasks = {
  A: async () => {
    console.log('A done');
    return 'A result';
  },
  B: async () => {
    console.log('B done');
    return 'B result';
  },
  C: async () => {
    console.log('C done');
    return 'C result';
  },
  D: async () => {
    console.log('D done');
    return 'D result';
  }
};

const dependencies = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['C', 'D']
];

runAsyncGraph(tasks, dependencies)
  .then((result) => {
    console.log('Final results:', result);
  })
  .catch((error) => {
    console.error(error.message);
  });
