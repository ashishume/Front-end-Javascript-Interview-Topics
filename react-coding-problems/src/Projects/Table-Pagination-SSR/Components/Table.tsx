import React, { useCallback, useEffect, useState } from "react";
import { ITableConfig2, ITableData } from "..";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
      <Table>
        <TableHeader>
          <TableRow>
            {tableConfigData &&
              tableConfigData.map(({ key, value }) => {
                return value !== "USERID" ? (
                  <TableCell key={key}>{value}</TableCell>
                ) : null;
              })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            tableData &&
            tableData.map(({ body, id, title, userId }: ITableData) => {
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{body}</TableCell>
                </TableRow>
              );
            })}
          {isLoading ? <div>Loading...</div> : null}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePagination(pageNo - 1)} />
          </PaginationItem>
          {Array.from({ length: pageSize }, (_, index) => index + 1).map(
            (value) => {
              return (
                <PaginationItem
                  onClick={() => handlePagination(value)}
                  key={value}
                >
                  {value}
                </PaginationItem>
              );
            }
          )}
          <PaginationItem>
            <PaginationNext onClick={() => handlePagination(pageNo + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TableComp;
