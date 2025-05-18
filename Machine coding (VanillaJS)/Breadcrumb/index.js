class Breadcrumb {
  constructor(container, items) {
    this.container = document.querySelector(container);
    this.items = items;
    this.links = [];
    this.init();
  }

  init() {
    this.generateLinks();
    this.render();
    this.addEventListeners();
  }

  generateLinks() {
    this.items.forEach((item, index) => {
      const link = document.createElement("a");
      link.textContent = item;
      link.dataset.index = index;
      link.classList.add("breadcrumb-link");
      this.links.push(link);
    });
  }

  generateSeparator() {
    const separator = document.createElement("span");
    separator.innerHTML = "&nbsp;>&nbsp;";
    separator.classList.add("breadcrumb-separator");
    return separator;
  }

  render() {
    this.links.forEach((link, index) => {
      this.container.appendChild(link);
      if (index !== this.links.length - 1) {
        this.container.appendChild(this.generateSeparator());
      }
    });
  }

  addEventListeners() {
    this.container.addEventListener("click", (e) => {
      if (e.target.classList.contains("breadcrumb-link")) {
        this.handleClick(e.target);
      }
    });
  }

  handleClick(target) {
    const index = parseInt(target.dataset.index);
    const value = target.textContent;
    console.log(`Clicked item at index ${index}: ${value}`);
    // Add your custom click handling logic here
  }
}

// Usage
const breadcrumb = new Breadcrumb(".breadcrumb", [
  "ABC",
  "fshkj",
  "tuoertiu",
  "nmxcnvn",
]);
