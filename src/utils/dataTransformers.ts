/**
 * Utility functions for transforming data structures
 */

/**
 * Flattens the nested table structure from the raw data format
 * 
 * @param data - Array of schema objects containing tables
 * @returns Flattened array of tables with schema_name added to each table
 */
export const flattenTables = (data: any[]) => {
  return data.reduce((acc, curr) => {
    return [...acc, ...curr.tables.map((table: any) => ({
      ...table,
      schema_name: curr.schema_name
    }))];
  }, []);
};