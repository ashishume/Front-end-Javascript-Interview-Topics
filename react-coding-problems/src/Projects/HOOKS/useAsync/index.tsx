import useAsync from "./useAsync";

const fakeApiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random() * 10;
      //randomly succeeds or rejects for fake api calls
      rnd <= 5 ? resolve(1) : reject("Error occured");
    }, 1000);
  });
};

const UseAsyncApiCallSample = () => {
  const { status, value, error } = useAsync(fakeApiCall, true);

  return (
    <div>
      <div>Status: {status}</div>
      <div>Value: {value}</div>
      <div>error: {error}</div>
    </div>
  );
};

export default UseAsyncApiCallSample;
