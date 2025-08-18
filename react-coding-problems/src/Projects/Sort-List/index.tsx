import { useEffect, useState } from "react";
import ProductCard from "./Product-Card";
import { Button } from "@mui/material";

const SortList = () => {
  const [products, setProducts] = useState([]);
  const [direction, setDirection] = useState("asc");
  const [sort, setSort] = useState("");
  useEffect(() => {
    (async () => {
      const res = await (
        await fetch("https://dummyjson.com/products?limit=20")
      ).json();
      setProducts(res.products);
    })();
  }, []);
  const changeSortDirection = () => {
    if (direction === "asc") {
      setDirection("desc");
    } else {
      setDirection("asc");
    }
  };
  const sortedProducts = sort
    ? [...products].sort((a: any, b: any) => {
        if (!sort) return 0;
        let compare = 0;
        switch (sort) {
          case "title":
            compare = a.title
              .toLowerCase()
              .localeCompare(b.title.toLowerCase());
            break;
          case "price":
            compare = Number(a.price) - Number(b.price);
            break;
          case "rating":
            compare = Number(a.rating) - Number(b.rating);
            break;
        }

        return direction === "asc" ? compare : -compare;
      })
    : products;

  return (
    <div className="m-2 p-2">
      <div className="flex">
        <select
          className="mb-4 p-3 text-base"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {["select sort", "title", "price", "rating"].map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        <div>
          <Button className="outline" onClick={changeSortDirection}>
            {direction === "asc" ? "Descending" : "Ascending"}
          </Button>
        </div>
      </div>
      <div className="flex  flex-wrap gap-4 justify-center items-center">
        {sortedProducts.map((product: any) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
export default SortList;
