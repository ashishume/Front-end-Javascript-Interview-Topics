import React, { useEffect, useState } from "react";
import TableComp from "./Components/Table";
import axios from "axios";
export interface ITableData {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface ITableConfig2 {
  key: number;
  value: string;
}
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const SSRPagination = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [tableConfigData, setTableConfigData] = useState<ITableConfig2[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetchTableRow();
  }, [pageNo]);

  useEffect(() => {
    fetchTableConfig();
  }, []);

  function fetchTableConfig() {
    setTimeout(() => {
      setTableConfigData([
        { key: 1, value: "id" },
        { key: 2, value: "title" },
        { key: 3, value: "body" },
        { key: 4, value: "userId" },
      ]);
    });
  }

  function fetchTableRow() {
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
  }

  function handlePagination(page: number) {
    if (page >= 0) setPageNo(page);
  }
  return (
    <div>
      <TableComp
        pageNo={pageNo}
        pageSize={pageSize}
        isLoading={isLoading}
        tableData={tableData}
        tableConfigData={tableConfigData}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default SSRPagination;
