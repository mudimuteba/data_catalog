import React from 'react';
import { ChevronDown, ChevronRight, Database } from 'lucide-react';
import { CatalogData } from '../types/catalog';
import { TableDetails } from './TableDetails';
import { BusinessUnitFilter } from './BusinessUnitFilter';

interface LayerCatalogProps {
  name: string;
  data: CatalogData;
}

export const LayerCatalog: React.FC<LayerCatalogProps> = ({ name, data }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [filteredTables, setFilteredTables] = React.useState(data.tables);

  return (
    <div className="border rounded-lg mb-4 bg-white shadow-sm">


      <button
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-medium capitalize">{name} Layer</span>
          <span className="text-sm text-gray-500">
            ({data.tables.length} tables)
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-6 py-4 border-t">
          <BusinessUnitFilter tables={data.tables} onFilterChange={setFilteredTables} />
          <div className="space-y-2">
            {filteredTables.map((table) => (
              <TableDetails key={`${table.schema_name}.${table.table_name}`} table={table} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}