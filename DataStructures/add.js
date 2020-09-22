let nums1 = [1, 2];
let nums2 = [ 4];

let array = [];
let i = 0,
  j = 0,
  k = 0;
while (i < nums1.length && j < nums2.length) {
  if (nums1[i] < nums2[j]) array[k++] = nums1[i++];
  if (nums2[j] < nums1[i]) array[k++] = nums2[j++];
}
while (i < nums1.length) array[k++] = nums1[i++];
while (j < nums2.length) array[k++] = nums2[j++];

if(array.length%2!==0)
console.log(array/2);
else
console.log((array[(array.length-1)/2] + array[array.length/2])/2)

