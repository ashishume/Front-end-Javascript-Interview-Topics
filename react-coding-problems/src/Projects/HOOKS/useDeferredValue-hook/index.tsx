import { useState, useDeferredValue, useMemo } from "react";

const SearchComponent = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <SearchParent input={query} />
    </div>
  );
};

const SearchParent = ({ input }: any) => {
  /**  This is particularly useful for optimizing rendering during 
   * heavy computations or when dealing with large data sets. 
   * it delays the update until the browser has more idle time to process it
   * */
  const inputData = useDeferredValue(input);
  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i < 20000; i++) {
      l.push(<div>{inputData}</div>);
    }

    return l;
  }, [inputData]);

  return (
    <>
      {list.map((value, index) => {
        return <div key={index}>{value}</div>;
      })}
    </>
  );
};

export default SearchComponent;
