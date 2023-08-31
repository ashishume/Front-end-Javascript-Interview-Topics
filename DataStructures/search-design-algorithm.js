class InMemorySearch {
  constructor() {
    this.result = {};
  }
  addDocuments = (namespace, ...args) => {
    if (!this.result[namespace]) {
      this.result[namespace] = [...args];
    } else {
      this.result[namespace].push(...args);
    }
    return this.result;
  };

  search = (namespace, callback, orderBy) => {
    if (this.result[namespace]) {
      const filtered = this.result[namespace].filter(callback);
      if (orderBy) {
        if (orderBy.asc) {
          return filtered.sort((a, b) => a[orderBy.key] - b[orderBy.key]);
        } else {
          return filtered.sort((a, b) => {
            return b[orderBy.key] - a[orderBy.key];
          });
        }
      }
      return filtered;
    }
    return [];
  };
}
const searchEngine = new InMemorySearch();
const res = searchEngine.addDocuments(
  "Movies",
  { name: "Harry Potter", rating: 7.9, year: 2020 },
  { name: "Avengers 1", rating: 9.5, year: 2014 },
  { name: "Superman", rating: 8.5, year: 2018 },
  { name: "Batman", rating: 5.5, year: 2017 },
  { name: "Hulk", rating: 3.5, year: 2001 }
);
const result = searchEngine.search("Movies", (e) => e.rating > 7.0, {
  key: "year",
  asc: false,
});

console.log(result);
