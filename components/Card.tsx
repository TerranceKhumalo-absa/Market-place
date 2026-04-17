import React from 'react';
import { Link } from 'react-router-dom';
import { Database, FileText, BarChart2, Grid, Clock } from './Icons';
import { Asset } from '../types';

interface AssetCardProps {
  asset: Asset;
  compact?: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, compact = false }) => {
  const getIcon = () => {
    switch(asset.type) {
      case 'Dataset': return <Database size={compact ? 18 : 20} />;
      case 'Report': return <FileText size={compact ? 18 : 20} />;
      case 'Model': return <BarChart2 size={compact ? 18 : 20} />;
      default: return <Grid size={compact ? 18 : 20} />;
    }
  };

  const getIconColor = () => {
    switch(asset.type) {
        case 'Dataset': return 'bg-blue-50 text-blue-600 group-hover:bg-blue-100';
        case 'Report': return 'bg-purple-50 text-purple-600 group-hover:bg-purple-100';
        case 'Model': return 'bg-orange-50 text-orange-600 group-hover:bg-orange-100';
        default: return 'bg-gray-50 text-gray-600 group-hover:bg-gray-100';
    }
  };

  return (
    <Link to={`/asset/${asset.id}`} className="block group h-full focus:outline-none focus:ring-2 focus:ring-absa-primary/40 rounded-xl">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all duration-300 ease-out h-full flex flex-col group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-gray-200/50 group-hover:border-absa-primary/20 group-active:scale-[0.98]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
             <div className={`p-2.5 rounded-lg transition-all duration-300 ${getIconColor()}`}>
                 {getIcon()}
             </div>
             <div className="transition-transform duration-300 group-hover:translate-x-0.5">
                 <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-0.5">{asset.type}</span>
                 {compact && <h3 className="font-semibold text-gray-900 line-clamp-1">{asset.title}</h3>}
             </div>
          </div>
          <div className="flex items-center gap-2">
            {asset.certification && (
               <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded border transition-colors ${
                 asset.certification === 'Gold' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 group-hover:bg-yellow-100' :
                 asset.certification === 'Silver' ? 'bg-gray-100 text-gray-700 border-gray-300 group-hover:bg-gray-200' :
                 'bg-orange-50 text-orange-800 border-orange-200 group-hover:bg-orange-100'
               }`}>
                   {asset.certification}
               </span>
            )}
            {asset.classification === 'Confidential' && (
               <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wide rounded border border-red-100 transition-colors group-hover:bg-red-100">
                   Confidential
               </span>
            )}
          </div>
        </div>

        {!compact && <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-absa-primary transition-colors duration-300">{asset.title}</h3>}
        
        <p className={`text-gray-600 text-sm mb-4 line-clamp-2 transition-colors duration-300 group-hover:text-gray-700 ${compact ? 'flex-1' : ''}`}>{asset.description}</p>
        
        {!compact && (
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {asset.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium transition-colors group-hover:bg-gray-200">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={`flex items-center justify-between pt-4 border-t border-gray-50 mt-auto transition-colors duration-300 group-hover:border-gray-100 ${compact ? 'text-xs' : 'text-sm'}`}>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Owner</span>
            <span className="font-medium text-gray-700 group-hover:text-gray-900">{asset.owner}</span>
          </div>
          <div className="flex items-center text-gray-400 group-hover:text-gray-500">
             <span className="text-xs mr-1">{asset.updatedAt}</span>
             { !compact && <Clock size={14} className="group-hover:rotate-12 transition-transform" /> }
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AssetCard;