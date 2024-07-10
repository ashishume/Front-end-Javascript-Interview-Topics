import { Button } from "@mui/material";
import { useEffect, useState } from "react";
export interface IProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}
const fetchData = () => {
  const [data, setData] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return {
    data,
  };
};

const SearchBar = ({ onSearch }: any) => {
  return (
    <div>
      <input
        type="text"
        className="w-full p-1"
        onChange={onSearch}
        placeholder="Enter product name..."
      />
    </div>
  );
};

const ProductCard = ({
  product,
  onSelect,
  highlight,
}: {
  product: IProduct;
  onSelect?: (product: IProduct) => void;
  highlight?: IProduct[];
}) => {
  return (
    <div
      key={product.id}
      onClick={() => (onSelect ? onSelect(product) : null)}
      className={`border border-solid rounded-md shadow-md 
  border-slate-300 m-2 p-2 flex flex-col
  items-center h-72 w-48 overflow-hidden ${
    highlight
      ? highlight.some((v) => v.id === product.id)
        ? "border border-2 border-solid border-blue-500"
        : null
      : null
  }`}
    >
      <div>
        <img
          draggable="false"
          src={product.image}
          className="object-cover h-48 w-48"
        />
      </div>
      <div className="text-sm pt-2">{product.title}</div>
    </div>
  );
};

const Products = ({
  data,
  setCount,
  isDetails,
  goBack,
}: {
  data: IProduct[];
  setCount: React.Dispatch<React.SetStateAction<number>>;
  isDetails: boolean;
  goBack: () => void;
}) => {
  const [highlight, setHighlight] = useState<IProduct[]>([]);

  useEffect(() => {
    setCount(highlight.length);
  }, [highlight]);

  const onSelect = (product: IProduct) => {
    if (!highlight.length) {
      setHighlight([product]);
      return;
    }

    const index = highlight.findIndex((val) => val.id === product.id);

    if (index === -1) {
      setHighlight((prev) => [...prev, product]);
    } else {
      const newArr = highlight.filter((v) => v.id !== product.id);
      setHighlight(newArr);
    }
  };

  return (
    <>
      {!isDetails ? (
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {data.map((product: IProduct) => {
            return (
              <ProductCard
                product={product}
                highlight={highlight}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      ) : (
        <>
          <Button onClick={goBack}>Go back</Button>
          <div className="flex flex-row flex-wrap justify-center gap-5">
            {highlight.map((product) => {
              return (
                <ProductCard
                  product={product}
                  highlight={highlight}
                  onSelect={onSelect}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

const ProductListing = () => {
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const { data } = fetchData();
  const [count, setCount] = useState(0);
  const [isDetails, setDetails] = useState(false);
  useEffect(() => {
    setFiltered(data);
  }, [data]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArr = data.filter((value) =>
      value.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltered(newArr);
  };
  return (
    <div className="container">
      <h1 className="text-2xl">Products Listing</h1>
      <div className="h-6">
        {count !== 0 ? (
          <div>
            You have selected {count} items(s){" "}
            <span
              onClick={() => setDetails(true)}
              className="text-blue-700 cursor-pointer"
            >
              See selected items
            </span>
          </div>
        ) : null}
      </div>
      <SearchBar onSearch={onSearch} />
      <Products
        data={filtered}
        setCount={setCount}
        isDetails={isDetails}
        goBack={() => setDetails(false)}
      />
    </div>
  );
};

export default ProductListing;
