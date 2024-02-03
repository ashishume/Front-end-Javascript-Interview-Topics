import React, { Suspense, useDeferredValue } from 'react';

// A fake asynchronous function that resolves after a given time
const fetchData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Data fetched!');
    }, 2000);
  });
};

// A component that fetches and displays data
const DataFetcher = () => {
  // Using useDeferredValue to delay rendering until data is ready
  const deferredData = useDeferredValue(fetchData());

  return (
    <div>
      {/* Suspense is used to wait for the data */}
      <Suspense fallback={<div>Loading...</div>}>
        <DataDisplay data={deferredData} />
      </Suspense>
    </div>
  );
};

// Another component to display the fetched data
const DataDisplay = ({ data }:any) => {
  return <div>{data}</div>;
};

export default DataFetcher;