import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FILTERS, CATALOG_ASSETS } from '../data';
import AssetCard from '../components/Card';

const CatalogSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 h-56 flex flex-col animate-pulse">
        <div className="flex justify-between mb-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div className="space-y-2">
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-2 mb-4 mt-auto">
          <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
          <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-50 mt-auto">
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
    ))}
  </div>
);

const Catalog: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleFilter = (category: string, option: string) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400); // Simulate network request for filtering
    
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      
      if (updated.length === 0) {
        const { [category]: unused, ...rest } = prev;
        return rest;
      }
      return { ...prev, [category]: updated };
    });
  };

  const clearAllFilters = () => setActiveFilters({});

  const filteredAssets = CATALOG_ASSETS.filter(asset => {
    // Search match
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter match
    // Simplified logic: If a category has active filters, the asset must match at least one (OR logic within category)
    // AND logic between categories
    const matchesFilters = Object.entries(activeFilters).every(([category, selectedOptions]) => {
      const options = selectedOptions as string[];
      if (category === 'Domain') {
          return asset.domain ? options.includes(asset.domain) : true; 
      }
      if (category === 'Certification') {
          return asset.certification ? options.includes(asset.certification) : false;
      }
      if (category === 'Format') return options.includes(asset.type);
      return true;
    });

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Asset Catalog</h1>
        <p className="text-gray-500">Browse and search across {CATALOG_ASSETS.length} data assets available in the organization.</p>
      </div>

      <div className="flex gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="w-64 flex-shrink-0 space-y-8">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 <Filter size={18} /> Filters
             </h3>
             {Object.keys(activeFilters).length > 0 && (
                 <button onClick={clearAllFilters} className="text-xs font-semibold text-absa-primary hover:text-absa-dark">
                     Clear All
                 </button>
             )}
          </div>

          {FILTERS.map(category => (
            <div key={category.name} className="border-t border-gray-100 pt-4 first:border-0 first:pt-0">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{category.name}</h4>
              <div className="space-y-2">
                {category.options.map(option => {
                  const isChecked = activeFilters[category.name]?.includes(option);
                  return (
                    <label key={option} className="flex items-center cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${isChecked ? 'bg-absa-primary border-absa-primary' : 'border-gray-300 bg-white group-hover:border-absa-primary'}`}>
                        {isChecked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={isChecked || false}
                        onChange={() => toggleFilter(category.name, option)}
                      />
                      <span className={`text-sm ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="flex-1">
          {/* Search Bar Area */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex items-center gap-4">
             <Search size={20} className="text-gray-400" />
             <input 
                type="text" 
                placeholder="Search assets by name, tag, or description..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 300);
                }}
             />
             <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-gray-100 rounded border border-gray-200">
                 {isLoading ? '...' : filteredAssets.length} Results
             </span>
          </div>

          {isLoading ? (
            <CatalogSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAssets.map(asset => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
              
              {filteredAssets.length === 0 && (
                  <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500 font-medium">No assets found matching your criteria.</p>
                      <button onClick={clearAllFilters} className="mt-2 text-absa-primary hover:underline font-medium">Clear filters</button>
                  </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;