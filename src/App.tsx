import React from 'react';
import { LayerCatalog } from './components/LayerCatalog';
import { BusinessUnitFilter } from './components/BusinessUnitFilter';
import { ScrollToTop } from './components/ScrollToTop';
import { UNIT_KEYWORDS } from './constants/businessUnits';

// Import JSON data
import bronzeRawData from './data/bronze_prd_raw_metadata.json';
import bronzeCuratedData from './data/bronze_prd_curated_metadata.json';
import silverData from './data/silver_prd_metadata.json';

// Import utilities and hooks
import { flattenTables } from './utils/dataTransformers';
import { useTableFiltering } from './hooks/useTableFiltering';

function App() {
  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Prepare data for each layer
  const bronzeRawTables = flattenTables(bronzeRawData);
  const bronzeCuratedTables = flattenTables(bronzeCuratedData);
  const silverTables = flattenTables(silverData);
  
  // Filter tables based on selected business unit using custom hook
  const filteredBronzeRawTables = useTableFiltering(bronzeRawTables, selectedUnit);
  const filteredBronzeCuratedTables = useTableFiltering(bronzeCuratedTables, selectedUnit);
  const filteredSilverTables = useTableFiltering(silverTables, selectedUnit);

  // Calculate counts for each business unit
  const calculateUnitCounts = React.useMemo(() => {
    const allTables = [...bronzeRawTables, ...bronzeCuratedTables, ...silverTables];
    const counts: Record<string, number> = {};
    
    Object.keys(UNIT_KEYWORDS).forEach(unit => {
      counts[unit] = useTableFiltering(allTables, unit).length;
    });
    
    return counts;
  }, [bronzeRawTables, bronzeCuratedTables, silverTables]);

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <ScrollToTop />
      <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 border-b pb-3 sm:pb-4">Data Catalog</h1>
        
        {/* Centralized Business Unit Filter */}
        <div className="mb-4 sm:mb-8">
          <BusinessUnitFilter 
            selectedUnit={selectedUnit} 
            onUnitChange={setSelectedUnit}
            unitCounts={calculateUnitCounts}
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10 sm:py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-200 rounded-full mb-3 sm:mb-4"></div>
              <div className="h-3 sm:h-4 w-32 sm:w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-2 sm:h-3 w-24 sm:w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <LayerCatalog 
              name="Bronze Raw" 
              data={{ tables: filteredBronzeRawTables, catalog_name: "bronze_raw" }}
            />
            <LayerCatalog 
              name="Bronze Curated" 
              data={{ tables: filteredBronzeCuratedTables, catalog_name: "bronze_curated" }}
            />
            <LayerCatalog 
              name="Silver" 
              data={{ tables: filteredSilverTables, catalog_name: "silver" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;