import React, { useEffect, useState } from "react";
import TableComp from "./Components/Table";
import axios from "axios";
export interface ITableData {
  body: string;
  id: number;
  title: string;
  userId: number;
}
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const SSRPagination = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}?_start=${pageNo}&_limit=${pageSize}`)
      .then((res) => {
        if (res.data) {
          setTableData(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageNo]);

  function handlePagination(page: number) {
    if (page >= 0) setPageNo(page);
  }
  return (
    <div>
      {!isLoading ? (
        <TableComp
          pageNo={pageNo}
          pageSize={pageSize}
          tableData={tableData}
          handlePagination={handlePagination}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SSRPagination;
