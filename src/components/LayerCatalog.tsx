import React from 'react';
import { ChevronDown, ChevronRight, Database } from 'lucide-react';
import { CatalogData } from '../types/catalog';
import { TableDetails } from './TableDetails';

interface LayerCatalogProps {
  name: string;
  data: CatalogData;
}

export const LayerCatalog: React.FC<LayerCatalogProps> = ({ name, data }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="border rounded-lg mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <span className="text-base sm:text-lg font-medium capitalize">{name}</span>
          <span className="text-xs sm:text-sm px-2 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full">
            {data.tables.length} tables
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-t">
          {data.tables.length === 0 ? (
            <div className="text-center py-4 sm:py-8 text-gray-500 text-sm sm:text-base">
              No tables found for the selected filter
            </div>
          ) : (
            <div className="space-y-2">
              {data.tables.map((table) => (
                <TableDetails key={`${table.schema_name}.${table.table_name}`} table={table} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}