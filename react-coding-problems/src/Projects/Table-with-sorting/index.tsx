import React, { useEffect, useState } from "react";
import styled from "styled-components";

const responseData = {
  data: [
    {
      id: 403,
      title: "D Task 403",
      priority: "High",
      type: "Improvement",
      complete: 100,
    },
    {
      id: 532,
      title: "A Task 532",
      priority: "Medium",
      type: "Improvement",
      complete: 30,
    },
    {
      id: 240,
      title: "E Task 240",
      priority: "High",
      type: "Story",
      complete: 66,
    },
    {
      id: 241,
      title: "C Task 240",
      priority: "High",
      type: "Story",
      complete: 76,
    },
  ],
  status: "SUCCESS",
};

const StyledTable = styled.table`
  border: 1px solid black;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 8px;
    cursor: pointer;
  }
`;

const TableSorting = () => {
  const [tableData, setTableData] = useState(null as any);
  const [ascending, setAscending] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(responseData);
        }, 500);
      });
    };

    fetchData().then((result) => {
      setTableData(result || null);
    });
  }, []);

  const handleSorting = (e: any) => {
    tableData?.data?.sort((a: any, b: any) => {
      const order = ascending ? 1 : -1;
      if (e === "complete") {
        return (a.complete - b.complete) * order;
      }
      if (e === "title") {
        if (a.title < b.title) return -1 * order;
        if (a.title > b.title) return 1 * order;
      }
    });
    setAscending(!ascending);
  };

  return (
    <>
      {(tableData as any)?.data && (
        <TableComponent
          tableData={(tableData as any)?.data}
          handleSorting={handleSorting}
        />
      )}
    </>
  );
};

const TableComponent = ({ tableData, handleSorting }: any) => {
  const headers = Object.keys(tableData[0]);
  return (
    <StyledTable>
      <thead>
        <tr
          onClick={(e: React.MouseEvent<HTMLTableRowElement>) =>
            handleSorting((e.target as any)?.innerText)
          }
        >
          {headers.map((header) => {
            return (
              <td
                style={{
                  background:
                    header === "complete" || header === "title" ? "cyan" : "",
                }}
                key={header}
              >
                {header}
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map(({ id, title, priority, type, complete }: any) => {
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{priority}</td>
              <td>{type}</td>
              <td>{complete}</td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default TableSorting;
