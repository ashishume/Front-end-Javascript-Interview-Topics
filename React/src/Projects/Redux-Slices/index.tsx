import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./cartSlices";

const ReduxSliceIndex = () => {
  const dispatch = useDispatch<any>();
  const { cartData, isLoading } = useSelector((state: any) => state?.cart);
  useEffect(() => {
    dispatch(fetchCart());
  }, []);


  return (
    <div>
      <h1>Redux cart</h1>
      {!isLoading && cartData?.title}
    </div>
  );
};

export default ReduxSliceIndex;
