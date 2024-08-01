/*
Write a retry "wrapperFn" which takes a function and retryCount.
It will try calling the function till it exhaust retryCount and return error at end if not completed else if successful returns the result
*/
function asyncFn() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej("Failed");
    }, 2000);
    setTimeout(() => {
      res("accepted");
    }, 3000);
  });
}

// Implement this function
async function wrapperFn(callback, retryCount) {
  let attempts = 0;
  while (attempts < retryCount) {
    try {
      return await callback();
    } catch (e) {
      attempts++;
      if (attempts >= retryCount) {
        throw new Error(e);
      }
    }
  }
}

wrapperFn(asyncFn, 3)
  .then((res) => console.log(res))
  .catch((error) => console.error("Final Error:", error));

/**
 *
 *
 */
