import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from '../components/Icons';
import AssetCard from '../components/Card';
import { RECENT_ASSETS, NEW_ASSETS } from '../data';

const Home: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-absa-primary opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Welcome to the Marketplace</h1>
            <p className="text-lg text-gray-300 mb-8">
            Discover, evaluate, and access trusted data assets across the organization. 
            Connect with data owners and drive insights faster.
            </p>
            <div className="flex justify-center gap-4">
                <Link to="/catalog" className="px-6 py-2.5 bg-absa-primary hover:bg-absa-dark text-white font-medium rounded-lg transition-colors shadow-lg shadow-absa-primary/20">
                    Browse Catalog
                </Link>
                <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition-colors">
                    Learn More
                </button>
            </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recently Viewed</h2>
          <Link to="/catalog" className="text-sm font-medium text-absa-primary hover:text-absa-dark flex items-center">
            View all <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-1 divide-y divide-gray-100">
            {RECENT_ASSETS.map(asset => (
                <Link key={asset.id} to={`/asset/${asset.id}`} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:text-absa-primary group-hover:bg-absa-light transition-colors">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-absa-primary transition-colors">{asset.title}</h3>
                            <p className="text-sm text-gray-500">owned by <span className="text-gray-700 font-medium">{asset.owner}</span></p>
                        </div>
                    </div>
                    <span className="text-sm text-gray-400">Viewed 2 hours ago</span>
                </Link>
            ))}
        </div>
      </section>

      {/* New To You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">New To You</h2>
          <Link to="/catalog" className="text-sm font-medium text-absa-primary hover:text-absa-dark flex items-center">
            View all <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEW_ASSETS.map(asset => (
                <AssetCard key={asset.id} asset={asset} compact />
            ))}
        </div>
      </section>

       {/* Changed For You (Placeholder based on screenshot) */}
       <section className="opacity-60 grayscale filter hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Changed For You</h2>
          <button className="text-sm font-medium text-gray-400 cursor-not-allowed">
            View all
          </button>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 font-medium">No updates to your followed assets this week.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
