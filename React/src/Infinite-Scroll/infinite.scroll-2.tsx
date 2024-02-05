import React, { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPageNumber] = useState<number>(1);

  const fetchNewData = async () => {
    await setPageNumber((prev) => prev + 1); // TODO: this page number is not updating
    const response = await fetch(
      `https://5e217fb26867a0001416f3e8.mockapi.io/employee?page=${page}&limit=10`
    );
    const newData = await response.json();
    await setProducts((prevData) => [...prevData, ...newData]);
  };
  useEffect(() => {
    fetchNewData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const distanceFromBottom = Math.floor(
      document.documentElement.offsetHeight -
        (window.innerHeight + window.scrollY)
    );
    if (distanceFromBottom < 100) {
      fetchNewData();
    }
  }

  return (
    <div>
      {console.log(products) as any}
      {products &&
        products.map((product) => {
          return (
            <div
              //   key={product.id}
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
