import React from 'react';
import { Table } from '../types/catalog';

interface BusinessUnitFilterProps {
  tables: Table[];
  onFilterChange: (filteredTables: Table[]) => void;
}

const unit_keywords = {
  "Water Infrastructure & Asset Management": ["asset", "location", "classcode", "purposecode"],
  "Customer Water Services": ["service", "account", "customer", "crm"],
  "Wastewater Treatment Operations": ["waste", "environment", "treatment", "sewage"],
  "Network Distribution Systems": ["network", "distribution", "delivery", "pressure"],
  "Capital Projects & Engineering": ["project", "technical", "approval", "lead time"],
  "Regulatory Compliance & Risk": ["risk", "compliance", "regulation", "score"],
  "Commercial & Industrial Solutions": ["commercial", "industrial", "systemid", "orgunit"],
  "Strategic Finance & Funding": ["capex", "opex", "funding", "financial", "cost"]
};

export const BusinessUnitFilter: React.FC<BusinessUnitFilterProps> = ({ tables, onFilterChange }) => {
  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);

  const handleUnitClick = (unit: string) => {
    const newSelectedUnit = selectedUnit === unit ? null : unit;
    setSelectedUnit(newSelectedUnit);

    if (!newSelectedUnit) {
      onFilterChange(tables);
      return;
    }

    const keywords = unit_keywords[unit as keyof typeof unit_keywords];
    const filteredTables = tables.filter(table => {
      // Check if any keyword matches in table name or column names
      const hasKeywordInName = keywords.some(keyword =>
        table.table_name.toLowerCase().includes(keyword)
      );

      const hasKeywordInColumns = table.columns.some(column =>
        keywords.some(keyword =>
          column.column_name.toLowerCase().includes(keyword) ||
          (column.comment && column.comment.toLowerCase().includes(keyword))
        )
      );

      return hasKeywordInName || hasKeywordInColumns;
    });

    onFilterChange(filteredTables);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Business Units</h2>
      <div className="flex flex-wrap gap-2">
        {Object.keys(unit_keywords).map((unit) => (
          <button
            key={unit}
            onClick={() => handleUnitClick(unit)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedUnit === unit
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {unit}
          </button>
        ))}
      </div>
    </div>
  );
};