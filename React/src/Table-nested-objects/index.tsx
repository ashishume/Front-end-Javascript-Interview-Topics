import React, { useEffect, useState } from "react";
import { data } from "./data";
const TableWithNestedObjects = () => {
  const [flattenedData, setFlattenedData] = useState([]);
  const [tableHeader, setTableHeader] = useState([] as any);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  function helper(obj: any, merger = "", result: any = {}) {
    for (let key in obj) {
      const newKey = merger ? `${merger}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key]) {
        helper(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
    return result;
  }
  useEffect(() => {
    const flattenObject = (data: any): any => {
      let response = [];
      for (let i = 0; i < data?.length; i++) {
        response.push(helper(data[i], "", {}));
      }
      return response;
    };
    const res = flattenObject(data);

    setFlattenedData(res);
    setTableHeader(Object.keys(res[0] as any));
  }, []);

  const requestSort = async (key: any) => {
    let direction = "ascending";
    if (key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    await setSortConfig({ key, direction });

    const res = flattenedData.slice().sort((a, b) => {
      if (key && a[key] && b[key]) {
        if (a[key] < b[key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });

    await setFlattenedData(res);
  };
  return (
    <div className="App">
      <table style={{ border: "solid 1px black" }}>
        <thead>
          <tr style={{ border: "solid 1px black" }}>
            {tableHeader.map((header: any, index: any) => {
              return (
                <td
                  style={{ border: "solid 1px black", cursor: "pointer" }}
                  onClick={() => requestSort(header)}
                  key={index}
                >
                  {header}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((tableValue: any, index: any) => {
            return (
              <tr key={index} style={{ border: "solid 1px black" }}>
                {tableHeader.map((header: any, index2: any) => {
                  return (
                    <td key={index2} style={{ border: "solid 1px black" }}>
                      {tableValue[header] || null}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithNestedObjects;
