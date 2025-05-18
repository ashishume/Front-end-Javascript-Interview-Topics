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
   * useDeferredValue is a React Hook that lets you defer updating a part of the UI.
   * It's useful for:
   * - Optimizing performance during expensive computations
   * - Handling large data sets without blocking the main thread
   * - Deferring updates until the browser is idle
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
