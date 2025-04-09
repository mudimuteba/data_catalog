import React from 'react';
import { ChevronDown, ChevronRight, Database, Table as TableIcon, Columns } from 'lucide-react';
import { Table, Column } from '../types/catalog';

interface TableDetailsProps {
  table: Table;
}

export const TableDetails: React.FC<TableDetailsProps> = ({ table }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="border rounded-lg mb-2 bg-white hover:shadow-sm transition-all">
      <button
        className="w-full px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <TableIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">{table.table_name}</span>
          <span className="text-xs sm:text-sm text-gray-500">({table.schema_name})</span>
          <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full">
            {table.table_type}
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-t">
          {table.comment && (
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 p-1.5 sm:p-2 bg-gray-50 rounded">{table.comment}</p>
          )}
          <div className="space-y-1.5 sm:space-y-2">
            {table.columns.map((column) => (
              <div
                key={column.column_name}
                className="flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <Columns className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="w-full">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-medium text-xs sm:text-sm">{column.column_name}</span>
                    <span className="text-xs px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                      {column.data_type}
                    </span>
                    {column.is_nullable === "NO" && (
                      <span className="text-xs px-1.5 sm:px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  {column.comment && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 ml-0.5 sm:ml-1">{column.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}