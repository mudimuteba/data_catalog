import React from 'react';
import { UNIT_KEYWORDS } from '../constants/businessUnits';

interface BusinessUnitFilterProps {
  selectedUnit: string | null;
  onUnitChange: (unit: string | null) => void;
  // Add counts for each business unit
  unitCounts?: Record<string, number>;
}

export const BusinessUnitFilter: React.FC<BusinessUnitFilterProps> = ({ 
  selectedUnit, 
  onUnitChange,
  unitCounts = {} 
}) => {
  const handleUnitClick = (unit: string) => {
    const newSelectedUnit = selectedUnit === unit ? null : unit;
    onUnitChange(newSelectedUnit);
  };

  return (
    <div className="border rounded-lg mb-4 sm:mb-6 bg-white shadow-sm p-3 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Business Units</h2>
      <div className="flex flex-wrap gap-2 sm:gap-3 overflow-x-auto pb-1">
        {Object.keys(UNIT_KEYWORDS).map((unit) => (
          <button
            key={unit}
            onClick={() => handleUnitClick(unit)}
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
              ${selectedUnit === unit
                ? 'bg-blue-600 text-white shadow-sm transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'}`}
          >
            <span>{unit}</span>
            {unitCounts[unit] !== undefined && (
              <span className={`ml-1 px-1 sm:px-1.5 py-0.5 text-xs rounded-full inline-flex items-center justify-center
                 ${selectedUnit === unit ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                 {unitCounts[unit]}
               </span>
             )}
          </button>
        ))}
      </div>
    </div>
  );
};