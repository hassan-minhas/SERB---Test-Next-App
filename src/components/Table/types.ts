/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TableColumn<T = any> {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export interface TableHeaderProps {
  columns: TableColumn[];
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
}

export interface TableRowProps<T = any> {
  row: T;
  columns: TableColumn<T>[];
  onClick?: (row: T) => void;
}
