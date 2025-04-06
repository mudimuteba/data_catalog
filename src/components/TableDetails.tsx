import React from 'react';
import { ChevronDown, ChevronRight, Database, Table as TableIcon, Columns } from 'lucide-react';
import { Table, Column } from '../types/catalog';

interface TableDetailsProps {
  table: Table;
}

export const TableDetails: React.FC<TableDetailsProps> = ({ table }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="border rounded-lg mb-2 bg-white">
      <button
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <TableIcon className="w-4 h-4 text-blue-600" />
          <span className="font-medium">{table.table_name}</span>
          <span className="text-sm text-gray-500">({table.schema_name})</span>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
            {table.table_type}
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 py-3 border-t">
          {table.comment && (
            <p className="text-sm text-gray-600 mb-3">{table.comment}</p>
          )}
          <div className="space-y-2">
            {table.columns.map((column) => (
              <div
                key={column.column_name}
                className="flex items-start gap-2 p-2 rounded hover:bg-gray-50"
              >
                <Columns className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{column.column_name}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {column.data_type}
                    </span>
                    {column.is_nullable === "NO" && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  {column.comment && (
                    <p className="text-sm text-gray-600 mt-1">{column.comment}</p>
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