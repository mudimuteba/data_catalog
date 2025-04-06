export interface Column {
  column_name: string;
  data_type: string;
  is_nullable: string;
  comment: string | null;
}

export interface Table {
  schema_name: string;
  table_name: string;
  table_type: string;
  comment: string | null;
  columns: Column[];
}

export interface CatalogData {
  catalog_name: string;
  tables: Table[];
}