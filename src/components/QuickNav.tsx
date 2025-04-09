import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, Table as TableIcon } from 'lucide-react';
import { CatalogData } from '../types/catalog';
import styles from './QuickNav.module.css';

interface QuickNavProps {
  layers: {
    name: string;
    data: CatalogData;
  }[];
}

export const QuickNav: React.FC<QuickNavProps> = ({ layers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({});

  const toggleLayer = (layerName: string) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Quick Navigation</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.toggleButton}
        >
          {isExpanded ? <ChevronDown /> : <ChevronRight />}
        </button>
      </div>
      
      {isExpanded && (
        <div>
          {layers.map(layer => (
            <div key={layer.name}>
              <div 
                className={styles.layerItem}
                onClick={() => toggleLayer(layer.name)}
              >
                <ChevronRight 
                  className={`${styles.chevron} ${expandedLayers[layer.name] ? styles.chevronExpanded : ''}`} 
                />
                <Database className={styles.databaseIcon} />
                <span 
                  className={styles.layerName}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToElement(`layer-${layer.name.toLowerCase().replace(' ', '-')}`);
                  }}
                >
                  {layer.name}
                </span>
                <span className={styles.tableCount}>({layer.data.tables.length})</span>
              </div>
              
              {expandedLayers[layer.name] && layer.data.tables.length > 0 && (
                <div className={styles.tableList}>
                  {layer.data.tables.map(table => (
                    <div 
                      key={`${table.schema_name}.${table.table_name}`}
                      className={styles.tableItem}
                      onClick={() => scrollToElement(`table-${table.schema_name}-${table.table_name}`)}
                    >
                      <TableIcon className={styles.tableIcon} />
                      <span className={styles.tableName}>{table.table_name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};