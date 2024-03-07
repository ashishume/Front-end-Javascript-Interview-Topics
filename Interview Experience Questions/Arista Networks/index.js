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


// Q2. if i have api getUsers() which returns ids of all the users => [1,2,3,4,5,...n]
// and we fetch another api getUserData(id) to get each users response then how would we optimise this thing, we anyway have to make each api call one by one can we do something related to parallel api calls
// solved in react optimiseAPicalls page