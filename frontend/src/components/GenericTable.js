import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";

export default function GenericTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // For pagination
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
      initialState: { pageIndex: 0 }, // Start on the first page
    },
    useSortBy,
    usePagination // Add pagination hook
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border border-gray-200"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-600"
                  >
                    <div className="flex items-center justify-between">
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <svg
                              className="w-4 h-4 inline"
                              fill="none"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 13.5L12 21m0 0L4.5 13.5M12 21V3"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              fill="none"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                              ></path>
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-2 py-1 mr-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-md disabled:opacity-50"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-2 py-1 mr-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-md disabled:opacity-50"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-2 py-1 mr-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-md disabled:opacity-50"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-2 py-1 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-md disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>
        <span className="text-sm text-gray-600">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="ml-2 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
