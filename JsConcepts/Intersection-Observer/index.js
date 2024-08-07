/** intersection observer */

const cardContainer = document.querySelector(".container");
const cards = document.querySelectorAll(".card");


const callbackMethod = (entries) => {
  /** looping through all the objects which has been called with .observe() */
  entries.forEach((value) => {
    value.target.classList.toggle("show", value.isIntersecting);
    if (value.isIntersecting) {
      /** unobserving which have already been observed */
      observer.unobserve(value.target);
    }
  });
};


/** all the contents shown dom (default is root)
 * creating an intersection object where all the divs will be
 * looped and passed to this object.
 */
let observer = new IntersectionObserver(callbackMethod, {
  threshold: 1, //if 100% of the element is visible to the viewport then only call intersection true
  rootMargin: "100px", //defines the viewport area where intersecion is detected (like margin in html)
});


const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0]; //when only last child is passed to this, so only 1 element is required to check
  if (!lastCard.isIntersecting) return; //if last element not reached, then dnt trigger this observer
  loadNewCards(); //when last child reached load new cards
  lastCardObserver.unobserve(lastCard.target); // unobserve the last child
  observeLastCard(); // after loading new cards now the last card is changed, so again find the last card and obeserve
});


function loadNewCards() {
  for (let i = 1; i <= 10; i++) {
    const card = document.createElement("div");
    card.textContent = "This is a new card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}

function observeLastCard() {
  lastCardObserver.observe(document.querySelector(".card:last-child"));
}

observeLastCard();

/** looping through all the divs to check whether it intersects with the viewport or not */
cards.forEach((card) => {
  console.log(card);
  observer.observe(card);
});
