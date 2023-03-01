import axios from "axios";
import { useEffect, useState } from "react";
const AxiosContainer = () => {
  const [id, setId] = useState(1);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios("https://jsonplaceholder.typicode.com/todos/" + id, {
      cancelToken: source.token,
    })
      .catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.log("request cancelled", thrown.message);
        }
      })
      .then((json: any) => {
        console.log(json.data);
      });
  }, [id]);

  return (
    <>
      <button onClick={() => setId((prev) => prev + 1)}>Change Id 1</button>
      <button onClick={() => setId((prev) => prev + 2)}>Change Id 2</button>
      <button onClick={() => setId((prev) => prev + 3)}>Change Id 3</button>
    </>
  );
};

export default AxiosContainer;
