import React, { useEffect, useState } from "react";
import debounceMethod from "./debounce";
import axios from "axios";

const Search = () => {
  const [value, setValue] = useState("");
  const debouncedVal = debounceMethod(value, 400);
  function handleSearch(e: any) {
    setValue(e.target.value);
  }
  useEffect(() => {
    if (debouncedVal) {
      console.log(debouncedVal);

      axios
        .get(`https://api.punkapi.com/v2/beers?name=${debouncedVal}`)
        .then((data) => {
          console.log(data); // doesnt give as per the search results but for practice
          // the api call is made after the delay
        });
    }
  }, [debouncedVal]);
  return (
    <>
      <input type="text" onChange={handleSearch} />
    </>
  );
};

export default Search;
