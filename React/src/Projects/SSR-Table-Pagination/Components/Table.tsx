import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ITableConfig2, ITableData } from "..";
import { Pagination } from "react-bootstrap";

export interface ITableConfig {
  tableData: ITableData[];
  pageSize: number;
  pageNo: number;
  isLoading: boolean;
  tableConfigData: ITableConfig2[];
  handlePagination: (page: number) => void;
}
const TableComp = ({
  tableData,
  pageSize,
  pageNo,
  handlePagination,
  isLoading,
  tableConfigData,
}: ITableConfig) => {
  const [tableConfig, setTableConfig] = useState<
    {
      key: number;
      value: string;
    }[]
  >();

  return (
    <div className="table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            {tableConfigData &&
              tableConfigData.map(({ key, value }) => {
                return value !== "USERID" ? <td key={key}>{value}</td> : null;
              })}
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            tableData &&
            tableData.map(({ body, id, title, userId }: ITableData) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                </tr>
              );
            })}
          {isLoading ? <div>Loading...</div> : null}
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
