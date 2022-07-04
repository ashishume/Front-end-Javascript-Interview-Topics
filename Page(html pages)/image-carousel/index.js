const imageArrayList = [
  {
    imageLink: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageName: "image 1",
  },
  {
    imageLink: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600",
    imageName: "image 2",
  },
  {
    imageLink: "https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=600",
    imageName: "image 3",
  },
  {
    imageLink: "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=600",
    imageName: "image 4",
  },
];

const imageContainer = document.querySelector(".image-container");

/** add the images into the dom list */
imageArrayList.forEach((link, i) => {
  let imageEl = document.createElement("img");

  imageEl.src = link.imageLink;
  imageEl.className = "image-item";
  imageEl.id = i;

  imageContainer.appendChild(imageEl);
});

let index = 0;

/** get all the images list by class names */
const images = document.getElementsByClassName("image-item");

/** on load show the first image and others are hidden by default */
images[index].style.display = "block";

/** indexing method */
function moveImage(isRight) {
  /** on click hide the current image first */
  images[index].style.display = "none";
  if (isRight) {
    /** move to next image index */
    index++;
    if (index > imageArrayList.length - 1) index = 0;
  } else {
    /** move to previous image index */
    index--;
    if (index < 0) index = imageArrayList.length - 1;
  }
  /** after changing the index show the current index image */
  images[index].style.display = "block";
}
