import React from 'react';
import { LayerCatalog } from './components/LayerCatalog';

// Import JSON data
import bronzeRawData from './data/bronze_prd_raw_metadata.json';
import bronzeCuratedData from './data/bronze_prd_curated_metadata.json';
import silverData from './data/silver_prd_metadata.json';

function App() {
  // Flatten the nested table structure
  const flattenTables = (data: any[]) => {
    return data.reduce((acc, curr) => {
      return [...acc, ...curr.tables.map((table: any) => ({
        ...table,
        schema_name: curr.schema_name
      }))];
    }, []);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Data Catalog</h1>
        <div className="space-y-4">
          <LayerCatalog name="Bronze Raw" data={{ tables: flattenTables(bronzeRawData) }} />
          <LayerCatalog name="Bronze Curated" data={{ tables: flattenTables(bronzeCuratedData) }} />
          <LayerCatalog name="Silver" data={{ tables: flattenTables(silverData) }} />
        </div>
      </div>
    </div>
  );
}

export default App;