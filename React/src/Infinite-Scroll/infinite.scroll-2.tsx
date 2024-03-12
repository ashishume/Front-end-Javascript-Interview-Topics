import { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPageNumber] = useState<number>(1);

  useEffect(() => {
    /** add event listener for scroll */
    window.addEventListener("scroll", handleScroll);

    /** call the method immediately (IIFEs)*/
    (async function () {
      const response = await fetch(
        `https://5e217fb26867a0001416f3e8.mockapi.io/employee?page=${page}&limit=10`
      );
      const newData = await response.json();
      await setProducts((prevData) => [...prevData, ...newData]);
    })();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      // User has scrolled to the bottom, make API call
      setPageNumber((prev) => prev + 1);
    }
  }

  return (
    <div>
      {products &&
        products.map((product) => {
          return (
            <div
              key={product.id}
              style={{
                margin: "50px 0",
                backgroundColor: "skyblue",
                padding: "10px 0",
                overflow: "auto",
              }}
            >
              {product.firstName} {product.lastName}
            </div>
          );
        })}
    </div>
  );
};

export default InfiniteScroll;
