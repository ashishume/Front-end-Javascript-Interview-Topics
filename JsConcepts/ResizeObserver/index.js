const container = document.querySelector(".container");
const side = document.querySelector(".container-side");

const resizeObserver = new ResizeObserver((entries) => {
  console.log(entries);  //if the any div resizes then resize observer shows the change
});

resizeObserver.observe(container);
resizeObserver.observe(side);
