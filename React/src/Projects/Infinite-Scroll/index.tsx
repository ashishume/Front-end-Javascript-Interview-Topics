import React, { useCallback, useEffect, useRef, useState } from "react";

export interface Product {
  name: number;
  _id: string;
  airline: [
    {
      name: string;
      head_quaters: string;
    }
  ];
}

const InfiniteScrolls = () => {
  const [products, setProducts] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const observer: React.MutableRefObject<any> = useRef();
  const lastItemRef = useCallback((node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const fetchData = (pageNumber: number = 1, size: number = 30) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${pageNumber}`)
      .then((d) => d.json())
      .then((data: any) => {
        setProducts((prevData: any) => {
          const first = [...prevData, ...data];
          return first;
        });
      });
  };
  return (
    <div>
      {products.map((value: Product, index: number) => {
        return products?.length === index + 1 ? (
          <div
            ref={lastItemRef}
            key={index}
            style={{
              fontSize: "20px",
              marginTop: "30px",
              marginLeft: "20px",
            }}
          >
            {value.name}
          </div>
        ) : (
          <div
            key={index}
            style={{
              fontSize: "20px",
              marginTop: "30px",
              marginLeft: "20px",
            }}
          >
            {value.name}
          </div>
        );
      })}
    </div>
  );
};

export default InfiniteScrolls;
