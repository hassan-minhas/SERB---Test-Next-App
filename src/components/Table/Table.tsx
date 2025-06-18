"use client";

import { twMerge } from "tailwind-merge";
import { TableProps, TableHeaderProps, TableRowProps } from "./types";
import { Loader } from "../Loader";

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={twMerge(
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            )}
          >
            <div className="flex items-center">{column.header}</div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableRow = <T,>({ row, columns, onClick }: TableRowProps<T>) => {
  return (
    <tr
      className={twMerge(
        "bg-white border-b border-gray-200 hover:bg-gray-50",
        onClick && "cursor-pointer"
      )}
      onClick={() => onClick?.(row)}
    >
      {columns.map((column) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (row as any)[column.key];
        const displayValue = column.render ? column.render(value, row) : value;

        return (
          <td
            key={column.key}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {displayValue}
          </td>
        );
      })}
    </tr>
  );
};

const Table = <T,>({
  data,
  columns,
  className = "",
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
}: TableProps<T>) => {
  if (loading) {
    return (
      <div
        className={twMerge(
          "bg-white rounded-lg border border-gray-200",
          className
        )}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "bg-white rounded-lg border border-gray-200 overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader columns={columns} />
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={index}
                  row={row}
                  columns={columns}
                  onClick={onRowClick}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
