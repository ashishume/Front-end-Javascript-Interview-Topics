import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [id, setId] = useState(0);
  const [item, setItem] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    let isMounted = true; // Flag to track component unmounting

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const userId = response?.data[0]?.id;
        if (userId && isMounted) {
          setId(userId);
          setIsUpdated(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isUpdated) {
      // when is updated is true then only update the other id
      setItem((prev: any) => ({ ...prev, [id]: "Ashish" }));
    }
  }, [isUpdated, id]);
  return <>{/* <div>{console.log(item)}</div> */}</>;
};

export default App;
