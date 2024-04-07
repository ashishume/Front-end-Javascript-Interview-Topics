import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
const AxiosContainer = () => {
  const [id, setId] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    // const source = axios.CancelToken.source();
    // axios("https://jsonplaceholder.typicode.com/todos/" + id, {
    //   cancelToken: source.token,
    // })
    //   .catch(function (thrown) {
    //     if (axios.isCancel(thrown)) {
    //       console.log("request cancelled", thrown.message);
    //     }
    //   })
    //   .then((json: any) => {
    //     console.log(json.data);
    //   });

    axios
      .get("https://jsonplaceholder.typicode.com/todos", { signal })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <>
      <Button onClick={() => setId((prev) => prev + 1)}>Change Id 1</Button>
      <Button onClick={() => setId((prev) => prev + 2)}>Change Id 2</Button>
      <Button onClick={() => setId((prev) => prev + 3)}>Change Id 3</Button>
    </>
  );
};

export default AxiosContainer;
