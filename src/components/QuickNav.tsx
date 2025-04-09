import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, Table as TableIcon } from 'lucide-react';
import { CatalogData } from '../types/catalog';
import './navigation.css';

interface QuickNavProps {
  layers: {
    name: string;
    data: CatalogData;
  }[];
}

export const QuickNav: React.FC<QuickNavProps> = ({ layers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({});

  const toggleLayer = (layerName: string, expandedLayers: Record<string, boolean>, setExpandedLayers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) => {
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
    <div className="quick-nav bg-white p-3 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-sm">Quick Navigation</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="space-y-2">
          {layers.map(layer => (
            <div key={layer.name} className="text-sm">
              <div 
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 rounded"
                onClick={() => toggleLayer(layer.name, expandedLayers, setExpandedLayers)}
              >
                <ChevronRight 
                  className={`w-3 h-3 text-gray-500 transition-transform ${expandedLayers[layer.name] ? 'rotate-90' : ''}`} 
                />
                <Database className="w-3 h-3 text-blue-600" />
                <span 
                  className="hover:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToElement(`layer-${layer.name.toLowerCase().replace(' ', '-')}`);
                  }}
                >
                  {layer.name}
                </span>
                <span className="text-xs text-gray-500 ml-1">({layer.data.tables.length})</span>
              </div>
              
              {expandedLayers[layer.name] && layer.data.tables.length > 0 && (
                <div className="pl-5 space-y-1 mt-1">
                  {layer.data.tables.map(table => (
                    <div 
                      key={`${table.schema_name}.${table.table_name}`}
                      className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      onClick={() => scrollToElement(`table-${table.schema_name}-${table.table_name}`)}
                    >
                      <TableIcon className="w-3 h-3 text-blue-600" />
                      <span className="hover:text-blue-600 text-xs">{table.table_name}</span>
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