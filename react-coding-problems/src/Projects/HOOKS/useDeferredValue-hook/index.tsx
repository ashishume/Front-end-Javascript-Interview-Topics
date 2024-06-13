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
