import { useState } from "react";
import { Star, StarHalf, Heart } from "lucide-react";

const ProductCard = ({ product }: any) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const renderStars = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
      {/* Product Image Section */}
      <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 p-6">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isWishlisted
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {product.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{product.discountPercentage}%
            </span>
          </div>
        )}

        <div className="relative h-64 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-6 space-y-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {product.brand}
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight">
          {product.title}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews.length} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-purple-600">
            ${product?.price}
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-600 font-medium">
            {product.availabilityStatus} • {product.stock} available
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed truncate">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
