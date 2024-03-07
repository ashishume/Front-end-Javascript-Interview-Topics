import React, { Fragment, useEffect, useState } from "react";
/** create a batch of api calls and make parallel api calls to reduce the loading time */
const fetchUserIds = () => {
  return new Promise((resolve, reject) => {
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
  const [data, setData] = useState([] as any);
  const fetchUserData = (id: number): any => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setData((prev: any) => [...prev, data]);
      });
  };

  const batchSize = 10;
  useEffect(() => {
    fetchUserIds().then(async (res: any) => {
      for (let i = 0; i < res.users.length; i += batchSize) {
        const users = res.users.slice(i, i + batchSize);
        await Promise.all(users.map((val: number) => fetchUserData(val)));
      }
    });
  }, []);
  console.log(data);

  return (
    <div>
      {data?.map((value: any) => {
        return <div key={value.id}>{value.title}</div>;
      })}
    </div>
  );
};

export default OptimiseMakingApiCalls;
