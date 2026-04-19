import React, { useState, useMemo } from 'react';
import { Search, Database, Folder, Table, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';
import { TECH_CATALOG_DATA } from '../data';
import { TechDatabase, TechSchema, TechTable } from '../types';

const TechnicalCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['db-1']));
  const [selectedTable, setSelectedTable] = useState<TechTable | null>(null);

  const toggleNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleTableClick = (table: TechTable) => {
    setSelectedTable(table);
  };

  // Quick recursive search filter over the tree structure
  const filteredData = useMemo(() => {
    if (!searchQuery) return TECH_CATALOG_DATA;
    
    const query = searchQuery.toLowerCase();
    
    return TECH_CATALOG_DATA.map(db => {
      const dbMatch = db.name.toLowerCase().includes(query);
      
      const filteredSchemas = db.schemas.map(schema => {
        const schemaMatch = schema.name.toLowerCase().includes(query);
        const filteredTables = schema.tables.filter(tbl => tbl.name.toLowerCase().includes(query));
        
        if (schemaMatch || filteredTables.length > 0) {
           return { ...schema, tables: schemaMatch ? schema.tables : filteredTables };
        }
        return null;
      }).filter(Boolean) as TechSchema[];

      if (dbMatch || filteredSchemas.length > 0) {
        return { ...db, schemas: dbMatch ? db.schemas : filteredSchemas };
      }
      return null;
    }).filter(Boolean) as TechDatabase[];
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Technical Catalog</h1>
        <p className="text-gray-500">Browse databases, schemas, and table definitions without leaving this page.</p>
      </div>

      <div className="flex flex-1 h-[calc(100vh-12rem)] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        
        {/* Left Sidebar: Tree Explorer */}
        <div className="w-80 flex-shrink-0 flex flex-col border-r border-gray-200 bg-gray-50/50">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search size={14} className="absolute inset-y-0 left-3 top-2.5 text-gray-400" />
              <input 
                 type="text" 
                 placeholder="Filter objects..." 
                 className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-absa-primary/20 focus:border-absa-primary"
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {filteredData.length === 0 ? (
               <div className="text-center p-4 text-sm text-gray-500">No matching objects found.</div>
            ) : (
               filteredData.map(db => {
                 const hasSchemas = db.schemas.length > 0;
                 return (
                 <div key={db.id} className="mb-1">
                   {/* Database Node */}
                   <div 
                     className={`flex items-center px-2 py-1.5 rounded text-sm select-none group ${hasSchemas ? 'cursor-pointer hover:bg-gray-200/50 text-gray-800 font-medium' : 'text-gray-500'}`}
                     onClick={(e) => hasSchemas && toggleNode(db.id, e)}
                   >
                     <span className="w-4 mr-1 flex items-center justify-center text-gray-400">
                       {hasSchemas ? (expandedNodes.has(db.id) ? <ChevronDown size={14}/> : <ChevronRight size={14}/>) : null}
                     </span>
                     <Database size={14} className={`mr-2 ${hasSchemas ? 'text-absa-primary' : 'text-gray-400'}`} />
                     <span className="truncate flex-1">{db.name}</span>
                     <span className={`text-[10px] font-normal px-1 transition-colors ${hasSchemas ? 'text-gray-400 group-hover:text-gray-600' : 'text-gray-300'}`}>{db.type}</span>
                     {!hasSchemas && <span className="text-[10px] uppercase tracking-widest text-gray-400">Empty</span>}
                   </div>

                   {/* Schemas */}
                   {expandedNodes.has(db.id) && hasSchemas && (
                     <div className="ml-5 mt-1 border-l border-gray-200">
                       {db.schemas.map(schema => {
                         const hasTables = schema.tables.length > 0;
                         return (
                         <div key={schema.id}>
                           {/* Schema Node */}
                           <div 
                             className={`flex items-center pl-3 pr-2 py-1.5 text-sm select-none ${hasTables ? 'cursor-pointer hover:bg-gray-200/50 text-gray-700' : 'text-gray-400'}`}
                             onClick={(e) => hasTables && toggleNode(schema.id, e)}
                           >
                             <span className="w-4 mr-1 flex items-center justify-center text-gray-400">
                               {hasTables ? (expandedNodes.has(schema.id) ? <ChevronDown size={14}/> : <ChevronRight size={14}/>) : null}
                             </span>
                             <Folder size={14} className={`mr-2 ${hasTables ? 'text-blue-500 fill-blue-500/20' : 'text-gray-300'}`} />
                             <span className="truncate">{schema.name}</span>
                             {!hasTables && <span className="ml-2 text-[10px] uppercase tracking-wider text-gray-400">Empty</span>}
                           </div>

                           {/* Tables */}
                           {expandedNodes.has(schema.id) && hasTables && (
                             <div className="ml-5 border-l border-gray-200">
                               {schema.tables.map(table => {
                                 const isSelected = selectedTable?.id === table.id;
                                 return (
                                   <div 
                                     key={table.id}
                                     className={`flex items-center pl-6 pr-2 py-1.5 cursor-pointer text-sm select-none transition-colors border-l-2 ${isSelected ? 'bg-absa-light/50 border-absa-primary text-absa-dark font-medium' : 'border-transparent text-gray-600 hover:bg-gray-200/50'}`}
                                     onClick={() => handleTableClick(table)}
                                   >
                                     <Table size={14} className={`mr-2 ${isSelected ? 'text-absa-primary' : 'text-gray-400'}`} />
                                     <span className="truncate">{table.name}</span>
                                   </div>
                                 );
                               })}
                             </div>
                           )}
                         </div>
                       )})}
                     </div>
                   )}
                 </div>
               )})
            )}
          </div>
        </div>

        {/* Right Pane: Detail View */}
        <div className="flex-1 bg-white overflow-y-auto hidden-scrollbar relative flex flex-col">
          {!selectedTable ? (
             <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Database size={24} className="text-gray-300" />
               </div>
               <p className="font-medium text-gray-900">No object selected</p>
               <p className="text-sm mt-1">Select a table from the explorer on the left to view its details.</p>
             </div>
          ) : (
             <div className="p-8 animate-fade-in-up flex-1">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                         <Table className="text-absa-primary" /> {selectedTable.name}
                       </h2>
                       <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-blue-50 text-blue-700 border border-blue-200">
                         {selectedTable.type}
                       </span>
                    </div>
                    <p className="text-gray-500 text-sm">{selectedTable.description}</p>
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                    <ExternalLink size={14} /> Open in Console
                  </button>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Service</div>
                      <div className="text-sm font-semibold text-gray-900">{selectedTable.service}</div>
                   </div>
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Format</div>
                      <div className="text-sm font-semibold text-gray-900">{selectedTable.format}</div>
                   </div>
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Updated By</div>
                      <div className="text-sm font-semibold text-gray-900">{selectedTable.updatedBy}</div>
                   </div>
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Updated</div>
                      <div className="text-sm font-semibold text-gray-900">{selectedTable.updatedAt}</div>
                   </div>
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 md:col-span-4">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Physical Location</div>
                      <code className="text-xs text-gray-800 bg-white px-2 py-1 border border-gray-200 rounded break-all">{selectedTable.location}</code>
                   </div>
                </div>

                {/* Schema Table */}
                <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                     Schema <span className="text-sm font-normal text-gray-500">({selectedTable.columns.length} columns)</span>
                   </h3>
                   <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="w-12 px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">#</th>
                            <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Column Name</th>
                            <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Data Type</th>
                            <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedTable.columns.map((col, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-4 text-xs font-medium text-gray-400">{idx + 1}</td>
                              <td className="px-6 py-4 text-sm font-bold text-gray-900 font-mono text-pink-600">{col.name}</td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 text-xs font-mono bg-blue-50 text-blue-700 rounded border border-blue-100">
                                  {col.type}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {col.description || <span className="text-gray-400 italic">No description</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                     </table>
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalCatalog;
