import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import "./Pagination.scss";
const Pagination = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pageOptions = [5, 10, 20, 50];
  //   const [pageOption, setPageOption] = useState(pageOptions[0]);
  const [pageNos, setPageNos] = useState([] as number[]);
  //   const [total, setTotal] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [limit, setLimit] = useState(10);
  const limit = 10;
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    fetchProduts();
  }, [skip]);

  const fetchProduts = () => {
    const params = {
      limit,
      skip,
    };
    axios.get("https://dummyjson.com/products", { params }).then((data) => {
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: data?.data?.products || [],
      });
      //   setTotal(data?.data?.total);
      calculatePageNumber();
    });
  };

  const onPageOptionSelect = (event: any) => {
    // const newPageOption = event.target.value;
    // setPageOption(newPageOption);
    // calculatePageNumber(total); //FIXME: UPDATE WITH NEW LIMIT
  };

  const calculatePageNumber = () => {
    // const newTotal = total / pageOption;
    const pageNumbers = Array.from({ length: limit }, (_, i) => i + 1);
    setPageNos(pageNumbers);
  };

  const changePageContent = (value: number) => {
    // setCurrentPage(value);
    setSkip(value * limit - limit); //skip the last e.g. 80 - 10 (limit) so show content of 80 to 90
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="product-container">
          <div className="product-container__content">
            {state.products.map((value: ProductObject) => {
              return (
                <div
                  className="product-container__content__item"
                  key={value.id}
                >
                  <strong>ID: </strong> {value.id}, <strong>Brand: </strong>
                  {value.brand}, <strong>Title: </strong>
                  {value.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="pagination-container">
          <select onChange={onPageOptionSelect}>
            {pageOptions.map((value: number) => (
              <option key={value}>{value}</option>
            ))}
          </select>

          <div className="page-number">
            <div className="page-number__content">
              {pageNos.map((value) => {
                return (
                  <div
                    className="page-number__content__item"
                    key={value}
                    onClick={() => changePageContent(value)}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const initialState = {
  products: [] as ProductObject[],
  total: 0,
};

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { ...state, products: action.payload };
    // case "TOTAL":
    //   return { ...state, total: action.payload };
  }
};

export interface ProductObject {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default Pagination;
