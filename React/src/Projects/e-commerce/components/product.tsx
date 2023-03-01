import "./product.scss";
const Product = ({
  title,
  description,
  price,
  image,
  addToCart,
  removeFromCart,
  isAdded,
  quantity,
  onQuantityChange,
}: any) => {
  return (
    <div className="product-container">
      <div className="title">{title}</div>
      <div className="price">₹ {price}</div>
      <img className="image" src={image} />
      <div className="description">{description}</div>
      {!isAdded ? (
        <button className="add-to-cart-button" onClick={addToCart}>
          Add to Cart
        </button>
      ) : (
        <button className="add-to-cart-button" onClick={removeFromCart}>
          Remove from Cart
        </button>
      )}
      {isAdded ? (
        <div>
          <span className="dec" onClick={() => onQuantityChange(false)}>
            -
          </span>
          <input
            type="text"
            value={quantity}
            readOnly
            style={{
              margin: "10px 10px",
              textAlign: "center",
              height: "25px",
              fontSize: "20px",
              width: "50px",
            }}
          />
          <span className="add" onClick={() => onQuantityChange(true)}>
            +
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Product;
