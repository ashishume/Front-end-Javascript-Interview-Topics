const arr = [1, 65, 34, 78, 32, 54, 34];
let k = 3;

function rotateByK(arr) {
  if (k < arr.length) {
    k = k % arr.length;
  }
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  return arr;
}

function reverse(arr, left, right) {
  while (left < right) {
    let temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }
}

console.log(rotateByK(arr));