import { useEffect, useState } from "react";

/** create a batch of api calls and make parallel api calls to reduce the loading time */
const fetchUserIds = (): Promise<{ users: number[] }> => {
  return new Promise((resolve) => {
    /** mocking a delayed api call to get the ids of the users */
    setTimeout(() => {
      resolve({
        users: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ],
      });
    }, 1000);
  });
};

const fetchUserData = async (id: number): Promise<any> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch data for user id: ${id}`);
  }
  return response.json();
};

const MakeApiCallsInChunk = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const batchSize = 5;
    const fetchData = async () => {
      try {
        const res = await fetchUserIds();
        /** fetching the users data in batches and making parallel calls using Promise.all() */
        for (let i = 0; i < res.users.length; i += batchSize) {
          /** slicing through each batch ids and making concurrent api calls */
          const users = res.users.slice(i, i + batchSize);
          const userPromises = users.map(fetchUserData);
          const userData = await Promise.all(userPromises);
          setData((prev) => [...prev, ...userData]);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Print the loaded data */}
      {data.map((value) => (
        <div key={value.id}>{value.title}</div>
      ))}
    </div>
  );
};

export default MakeApiCallsInChunk;
