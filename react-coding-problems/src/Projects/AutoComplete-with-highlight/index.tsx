import React, { useEffect, useState } from "react";
import { Fruits } from "./data";
import "./style.scss";
const useSearchDebounce = (value: string, delay: number) => {
  const [data, setData] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => {
      setData(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return data;
};

const AutoComplete = () => {
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState<
    {
      value: string;
      index: number;
    }[]
  >([]);
  const debouncedValue = useSearchDebounce(value, 400);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    const searchTerm = debouncedValue;
    if (searchTerm) {
      const filteredValue = Fruits.filter((val) =>
        val.value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFiltered(filteredValue);
    } else {
      setFiltered([]);
    }
  }, [debouncedValue]);

  function highlightSearchTerm(word: string, highlightTerm: string) {
    if (!highlightTerm.trim()) {
      return word;
    }

    // highlightTerm: "me",  parts: ephemeral ==>  ['ephe','ral']
    const parts = word.toLowerCase().split(highlightTerm.toLowerCase());
    let highlightedText = parts[0]; // "ephe"

    console.log(highlightedText.length);
    for (let i = 1; i < parts.length; i++) {
      //started from 1 so, only "ral" is looped

      const originalPart = word.substring(
        highlightedText.length, // 4
        highlightedText.length + highlightTerm.length // 4 + 2 = 6 (excludes the last index char for substring)
      );

      // ephe + "me" + ral is highlighted
      highlightedText += `<span class="highlight">${originalPart}</span>${parts[i]}`;
    }
    return highlightedText;
  }

  return (
    <div className="container m-4 overflow-auto">
      <input
        type="text"
        className="p-1 w-full"
        onChange={handleChange}
        placeholder="Enter search text..."
      />

      {filtered?.length ? (
        <div className="w-full bg-slate-300 text-black p-3">
          {filtered.map(({ index, value }) => {
            return (
              <div key={index} className="p-1 border-slate-700 border-b">
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(value, debouncedValue),
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default AutoComplete;
