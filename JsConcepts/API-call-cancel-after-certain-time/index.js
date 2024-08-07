/** cancel api call after timeout */
async function fetchDataWithTimeout(url, timeout) {
  const controller = new AbortController();
  const { signal } = controller;

  // Setup a timeout to abort the request after the specified time
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId); // Clear the timeout if the request succeeds
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request timed out"); // Handle timeout error
    } else {
      console.error("Error fetching data:", error); // Handle other errors
    }
  }
}

// Example usage:
const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const timeoutInSeconds = 1; // Timeout in seconds

fetchDataWithTimeout(apiUrl, timeoutInSeconds * 1000).then((res) => {
  //convert to milliseconds
  console.log(res);
});
