function permutations(input) {
  const result = [];

  function permute(arr, current = []) {
    if (arr.length === 0) {
      result.push(current);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      permute(remaining, [...current, arr[i]]);
    }
  }

  permute(input);
  return result;
}

console.log(permutations(["a", "b", "c", "d"]));
