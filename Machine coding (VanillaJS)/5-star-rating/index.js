const starContainer = document.querySelector(".star");
const starItems = document.querySelectorAll(".star-item");

const highlight = "#FFD700"; // Gold color for hover state
const defaultColor = "lightgray"; // Orange color for unselected stars
const selectedColor = "#FF8C00"; // Dark orange for selected stars
let selectedRating = 0;

starContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("star-item")) {
    const rating = parseInt(e.target.dataset.value);
    updateStars(rating, highlight);
  }
});

starContainer.addEventListener("mouseleave", () => {
  updateStars(
    selectedRating,
    selectedRating > 0 ? selectedColor : defaultColor
  );
});

starContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("star-item")) {
    selectedRating = parseInt(e.target.dataset.value);
    updateStars(selectedRating, selectedColor);
  }
});

function updateStars(rating, color) {
  starItems.forEach((star, index) => {
    star.style.background = index < rating ? color : defaultColor;
  });
}
