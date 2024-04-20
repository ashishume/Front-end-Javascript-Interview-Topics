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

  // Create a ref to hold the IntersectionObserver instance
  const observer: React.MutableRefObject<any> = useRef();

  // Define a callback function to be used as a ref for the last item in the list
  const lastItemRef = useCallback((node: any) => {
    // Disconnect the previous observer if it exists
    if (observer.current) observer.current.disconnect();
    // Create a new IntersectionObserver instance
    observer.current = new IntersectionObserver((entries) => {
      // Check if the observed element is intersecting with the viewport
      if (entries[0].isIntersecting) {
        // Increment the page number when the last item becomes visible
        setPageNumber((prev) => prev + 1);
      }
    });

    // Start observing the last item in the list
    if (node) observer.current.observe(node);
  }, []);

  // Fetch data when the page number changes
  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  // Function to fetch data from an API
  const fetchData = (pageNumber: number = 1, size: number = 30) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${pageNumber}`)
      .then((d) => d.json())
      .then((data: any) => {
        // Update the products state with the fetched data
        setProducts((prevData: any) => {
          // Concatenate the previous data with the new data
          return [...prevData, ...data];
        });
      });
  };

  return (
    <div>
      {/* Map over the products array to render each product */}
      {products.map((value: Product, index: number) => {
        return products?.length === index + 1 ? (
          // Attach the lastItemRef callback to the last item in the list
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
