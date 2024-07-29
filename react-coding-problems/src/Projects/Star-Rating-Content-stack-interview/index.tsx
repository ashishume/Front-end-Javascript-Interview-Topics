import emptyIcon from "./empty-star.png";
import filledIcon from "./full-star.png";
import halfFilledIcon from "./half-star.png";
import StarRating from "./star";

const StarRatingParent = () => {
  const handleRatingChange = (rating: number) => {
    console.log("New rating:", rating);
  };

  return (
    <div>
      <h1>Star Rating Component</h1>
      <StarRating
        onRatingChange={handleRatingChange}
        emptyIcon={emptyIcon}
        filledIcon={filledIcon}
        halfFilledIcon={halfFilledIcon}
        step={0.5}
        totalStars={5}
        value={3}
      />
    </div>
  );
};

export default StarRatingParent;
