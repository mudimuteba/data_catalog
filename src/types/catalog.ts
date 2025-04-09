export interface Table {
  schema_name: string;
  table_name: string;
}

export interface CatalogData {
  tables: Table[];
} 