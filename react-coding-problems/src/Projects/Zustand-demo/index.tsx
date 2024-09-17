import { Product, useCartStore } from "./UseCartStore";

export const PRODUCTS = [
  { id: 1, name: "Laptop", price: 1500, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 800, category: "Electronics" },
  { id: 3, name: "T-shirt", price: 25, category: "Clothing" },
  { id: 4, name: "Running Shoes", price: 120, category: "Footwear" },
  { id: 5, name: "Coffee Maker", price: 100, category: "Appliances" },
];
const ZustandDemo = () => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  //   const clearCart = useCartStore((state) => state.clearCart);

  const addToCartHandler = (product: Product) => {
    addToCart(product);
  };
  return (
    <div>
      <div>Products</div>
      <div>
        {PRODUCTS.map((product: Product) => {
          return (
            <div
              key={product.id}
              className="border p-1 m-1 bg-slate-300 rounded inline-block"
            >
              <p>{product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <button
                className="border p-1 m-1 bg-green-400"
                onClick={() => addToCartHandler(product)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      <div>
        Cart
        <div>
          {cart.map((product: Product) => {
            return (
              <div
                key={product.id}
                className="border p-1 m-1 bg-slate-300 rounded inline-block"
              >
                <p>{product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <button
                  className="border p-1 m-1 bg-rose-400"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove from Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ZustandDemo;
