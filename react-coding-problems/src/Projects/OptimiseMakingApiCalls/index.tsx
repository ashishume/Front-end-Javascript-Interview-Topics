import React, { Fragment, useEffect, useState } from "react";
/** create a batch of api calls and make parallel api calls to reduce the loading time */
const fetchUserIds = () => {
  return new Promise((resolve, reject) => {
    /**mocking a delayed api call to get the ids of the users */
    setTimeout(() => {
      resolve({
        users: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ],
      });
    }, 1000);
  });
};

const OptimiseMakingApiCalls = () => {
  /** state to store the fetched data */
  const [data, setData] = useState([] as any);

  useEffect(() => {
    const batchSize = 10;
    fetchUserIds().then(async (res: any) => {
      /** fetching the users data in batches and making parallel calls using Promise.all() */
      for (let i = 0; i < res.users.length; i += batchSize) {
        /** slicing through each batch ids and making concurrent api calls */
        const users = res.users.slice(i, i + batchSize);

        /** promise.all ensures parallel api calls */
        await Promise.all(users.map((val: number) => fetchUserData(val)));
      }
    });
  }, []);

  /** fetch each user data based on id */
  const fetchUserData = (id: number): any => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((data) => data.json())
      .then((data) => {
        /** concatinating each users data into a state */
        setData((prev: any) => [...prev, data]);
      });
  };
  return (
    <div>
      {/* Print the loaded data */}
      {data?.map((value: any) => {
        return <div key={value.id}>{value.title}</div>;
      })}
    </div>
  );
};

export default OptimiseMakingApiCalls;
