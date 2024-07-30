import React, { useState, useTransition } from "react";

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
//useTransition is a React Hook that lets you update the state without blocking the UI.
const FilterableList: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  //this is a inbuilt method
  /**
   * isPending flag that tells you whether there is a pending Transition.
   * startTransition function that lets you mark a state update as a Transition.
   */
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);

    startTransition(() => {
      const newFilteredItems = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(newFilteredItems);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Filter items"
      />
      {isPending && <p>Loading...</p>}
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterableList;
