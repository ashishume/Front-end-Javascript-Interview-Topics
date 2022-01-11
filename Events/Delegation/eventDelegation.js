/** Event delegation is adding event listener into the parent class intead of child class
 * to avoid multiple event listeners */
document.querySelector("#category").addEventListener("click", (e) => {
  console.log(e.target.id);
});
