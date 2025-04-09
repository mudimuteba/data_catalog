import { Table } from '../types/catalog';
import { UNIT_KEYWORDS } from '../constants/businessUnits';

/**
 * Custom hook for filtering tables based on business unit
 * 
 * @param tables - Array of tables to filter
 * @param unit - Selected business unit or null
 * @returns Filtered array of tables
 */
export const useTableFiltering = (tables: Table[], unit: string | null): Table[] => {
  // If no unit is selected, return all tables
  if (!unit) return tables;
  
  // Get keywords for the selected business unit
  const keywords = UNIT_KEYWORDS[unit as keyof typeof UNIT_KEYWORDS];
  
  // Filter tables based on keywords
  return tables.filter(table => {
    // Check if any keyword matches in table name
    const hasKeywordInName = keywords.some(keyword =>
      table.table_name.toLowerCase().includes(keyword)
    );

    // Check if any keyword matches in column names or comments
    const hasKeywordInColumns = table.columns.some(column =>
      keywords.some(keyword =>
        column.column_name.toLowerCase().includes(keyword) ||
        (column.comment && column.comment.toLowerCase().includes(keyword))
      )
    );

    // Return true if keyword is found in either table name or columns
    return hasKeywordInName || hasKeywordInColumns;
  });
};