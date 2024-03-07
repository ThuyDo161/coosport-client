import { Button, NumberInput, Table } from "@mantine/core";
import React from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import "./style.scss";

type TableDataType = {
  columnInput: any[];
  dataInput: any[];
};

const TableData = ({ columnInput, dataInput }: TableDataType) => {
  const columns = React.useMemo(() => columnInput, [dataInput, columnInput]);
  const data = React.useMemo(() => dataInput, [dataInput]);

  const {
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );
  return (
    <>
      <Table highlightOnHover sx={{ fontSize: "1.5rem" }} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <td
                  align="center"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ width: column.width || "", cursor: "pointer" }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td align="center" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {pageOptions.length > 1 && (
        <div className="pagination">
          <Button
            size="sm"
            variant="outline"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>{" "}
          <Button
            size="sm"
            variant="outline"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>{" "}
          <Button
            variant="outline"
            onClick={() => nextPage()}
            size="sm"
            disabled={!canNextPage}
          >
            {">"}
          </Button>{" "}
          <Button
            variant="outline"
            onClick={() => gotoPage(pageCount - 1)}
            size="sm"
            disabled={!canNextPage}
          >
            {">>"}
          </Button>{" "}
          <span>
            Trang{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>Đi đến trang:</span>
          <span>
            <NumberInput
              min={1}
              max={pageCount}
              size="sm"
              type="number"
              hideControls
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e ? Number(e) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>
        </div>
      )}
    </>
  );
};

export default TableData;
