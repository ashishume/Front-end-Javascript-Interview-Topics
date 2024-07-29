import React, { useState, useEffect } from "react";
import "./style.scss";
interface StarProps {
  filled: boolean;
  halfFilled: boolean;
  onMouseEnter: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  onClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLImageElement>) => void;
  emptyIcon: string;
  filledIcon: string;
  halfFilledIcon: string;
  index: number;
}

const Star: React.FC<StarProps> = ({
  filled,
  halfFilled,
  onMouseEnter,
  onClick,
  onKeyDown,
  emptyIcon,
  filledIcon,
  halfFilledIcon,
  index,
}) => {
  let src = emptyIcon;
  if (filled) {
    src = filledIcon;
  } else if (halfFilled) {
    src = halfFilledIcon;
  }

  return (
    <img
      src={src}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      data-index={index}
      style={{ cursor: "pointer", width: "24px", height: "24px" }}
      alt="star"
      role="button"
    />
  );
};

const isMouseLessThanHalf = (
  event: React.MouseEvent<HTMLImageElement, MouseEvent>
) => {
  const target = event.target as HTMLImageElement;
  const { left, width } = target.getBoundingClientRect();
  const mouseX = event.clientX - left;
  return mouseX < width / 2;
};

interface StarRatingProps {
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
  emptyIcon: string;
  filledIcon: string;
  halfFilledIcon: string;
  step?: number;
  value?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  onRatingChange,
  emptyIcon,
  filledIcon,
  halfFilledIcon,
  step = 1,
  value = 0,
}) => {
  const [rating, setRating] = useState(value);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleMouseEnter =
    (index: number) =>
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      if (step === 0.5) {
        const half = isMouseLessThanHalf(event);
        setHoverRating(half ? index - 0.5 : index);
      } else {
        setHoverRating(index);
      }
    };

  const handleClick =
    (index: number) =>
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      let newRating;
      if (step === 0.5) {
        const half = isMouseLessThanHalf(event);
        newRating = half ? index - 0.5 : index;
      } else {
        newRating = index;
      }
      setRating(newRating);
      onRatingChange?.(newRating);
    };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLImageElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const newRating = step === 0.5 ? index - 0.5 : index;
        setRating(newRating);
        onRatingChange?.(newRating);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const newRating = rating + step <= totalStars ? rating + step : rating;
        setRating(newRating);
        onRatingChange?.(newRating);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const newRating = rating - step >= 0 ? rating - step : 0;
        setRating(newRating);
        onRatingChange?.(newRating);
      }
    };

  return (
    <div onMouseLeave={handleMouseLeave} className="star-container">
      {Array.from({ length: totalStars }, (_, i) => (
        <Star
          key={i}
          index={i + 1}
          filled={hoverRating ? i + 1 <= hoverRating : i + 1 <= rating}
          halfFilled={
            step === 0.5 &&
            (hoverRating ? hoverRating === i + 0.5 : rating === i + 0.5)
          }
          onMouseEnter={handleMouseEnter(i + 1)}
          onClick={handleClick(i + 1)}
          onKeyDown={handleKeyDown(i + 1)}
          emptyIcon={emptyIcon}
          filledIcon={filledIcon}
          halfFilledIcon={halfFilledIcon}
        />
      ))}
    </div>
  );
};

export default StarRating;
