import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ITableData } from "..";
import { Pagination } from "react-bootstrap";

export interface ITableConfig {
  tableData: any;
  pageSize: number;
  pageNo: number;
  handlePagination: (page: number) => void;
}
const TableComp = ({
  tableData,
  pageSize,
  pageNo,
  handlePagination,
}: ITableConfig) => {
  const [tableConfig, setTableConfig] = useState<
    {
      key: number;
      value: string;
    }[]
  >();

  useEffect(() => {
    if (tableData?.length) {
      let temp: {
        key: number;
        value: string;
      }[] = [];
      Object.keys(tableData[0]).forEach((value, i) => {
        temp.push({
          key: i,
          value: value.toLocaleUpperCase(),
        });
      });
      setTableConfig(temp);
    }
  }, []);

  return (
    <div className="table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            {tableConfig &&
              tableConfig.map(({ key, value }) => {
                return value !== "ID" ? <td key={key}>{value}</td> : null;
              })}
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map(({ body, id, title, userId }: ITableData) => {
              return (
                <tr key={id}>
                  <td>{userId}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => handlePagination(0)} />
        <Pagination.Prev onClick={() => handlePagination(pageNo - 1)} />
        {Array.from({ length: pageSize }, (_, index) => index + 1).map(
          (value) => {
            return (
              <Pagination.Item
                onClick={() => handlePagination(value)}
                key={value}
              >
                {value}
              </Pagination.Item>
            );
          }
        )}
        <Pagination.Next onClick={() => handlePagination(pageNo + 1)} />
        <Pagination.Last onClick={() => handlePagination(pageSize - 1)} />
      </Pagination>
    </div>
  );
};

export default TableComp;
