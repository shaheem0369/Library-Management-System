import React from 'react';
interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}
interface TableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
}
const Table: React.FC<TableProps> = ({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data available'
}) => {
  if (isLoading) {
    return <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 text-center text-gray-500">Loading...</div>
      </div>;
  }
  if (data.length === 0) {
    return <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 text-center text-gray-500">{emptyMessage}</div>
      </div>;
  }
  return <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {column.header}
              </th>)}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => <tr key={rowIndex}>
              {columns.map((column, colIndex) => <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>;
};
export default Table;