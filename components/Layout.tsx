import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Book, Search, Bell, Menu, User, Database, Server, ChevronDown } from 'lucide-react';
import { CATALOG_ASSETS } from '../data';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = CATALOG_ASSETS.filter(asset => 
    searchQuery && (asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || asset.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  ).slice(0, 5);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* Top Header / Navigation Bar */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shrink-0 z-20">
        
        {/* Logo area */}
        <div className="flex items-center min-w-max mr-8">
          <div className="font-bold text-xl text-absa-primary tracking-tight">
            Absa <span className="text-gray-900 font-medium">Marketplace</span>
          </div>
        </div>

        {/* Global Horizontal Nav */}
        <nav className="hidden md:flex items-center space-x-1 mr-8">
          {[
            { to: '/', icon: Home, label: 'Storefront' },
            { to: '/catalog', icon: Book, label: 'Catalog', hasMegaMenu: true },
            { to: '/my-data', icon: Database, label: 'My Data' }
          ].map((item) => {
            const active = isActive(item.to);
            // Quick check to keep parent active if viewing technical catalog
            const isRelatedActive = active || (item.label === 'Catalog' && location.pathname.includes('/technical-catalog'));

            return (
              <div key={item.to} className="relative group">
                <Link 
                  to={item.to} 
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isRelatedActive 
                      ? 'bg-absa-light text-absa-primary' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 group-hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={16} className={`mr-2 transition-colors ${isRelatedActive ? 'text-absa-primary' : 'text-gray-500'}`} />
                  {item.label}
                  {item.hasMegaMenu && (
                    <ChevronDown size={14} className={`ml-1 transition-transform duration-300 group-hover:-rotate-180 ${isRelatedActive ? 'text-absa-primary' : 'text-gray-400'}`} />
                  )}
                </Link>

                {/* Dropdown Mega Menu */}
                {item.hasMegaMenu && (
                  <div className="absolute top-full left-0 mt-3 w-[800px] bg-white border border-gray-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                    <div className="p-6 grid grid-cols-4 gap-8">
                      
                      {/* Section 1: Business Catalog (Takes up 2 columns) */}
                      <div className="col-span-2 border-r border-gray-100 pr-6">
                        <div className="mb-5">
                          <Link to="/catalog" className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-absa-primary transition-colors group/link">
                            <Book size={16} className="mr-2 text-absa-primary" /> 
                            Business Data Catalog 
                            <span className="ml-1 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0">&rarr;</span>
                          </Link>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">Curated datasets, official reports, and sanctioned ML models ready for business consumption.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 focus:outline-none">
                          <div>
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">By Domain</h3>
                            <ul className="space-y-2.5">
                              {['Finance & Wealth', 'Sales & Marketing', 'Risk & Compliance', 'Human Resources'].map(link => (
                                <li key={link}>
                                  <Link to="/catalog" className="text-sm font-medium text-gray-600 hover:text-absa-primary transition-colors block">{link}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">By Format</h3>
                            <ul className="space-y-2.5">
                              {['Raw Datasets', 'Machine Learning', 'BI Dashboards', 'Reference Data'].map(link => (
                                <li key={link}>
                                  <Link to="/catalog" className="text-sm font-medium text-gray-600 hover:text-absa-primary transition-colors block">{link}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 2: Technical Catalog */}
                      <div>
                        <div className="mb-5">
                          <Link to="/technical-catalog" className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-absa-primary transition-colors group/link">
                            <Server size={16} className="mr-2 text-absa-primary" /> 
                            Technical Hub
                            <span className="ml-1 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0">&rarr;</span>
                          </Link>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">Explore raw tables, schemas, and infrastructure directly from metastores.</p>
                        </div>
                        
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Metastores</h3>
                        <ul className="space-y-2.5 mb-6">
                          <li><Link to="/technical-catalog" className="text-sm font-medium text-gray-600 hover:text-absa-primary transition-colors block">AWS Glue Catalogs</Link></li>
                          <li><Link to="/technical-catalog" className="text-sm font-medium text-gray-600 hover:text-absa-primary transition-colors block">Hive / Hadoop</Link></li>
                          <li><Link to="/technical-catalog" className="text-sm font-medium text-gray-600 hover:text-absa-primary transition-colors block">Snowflake Warehouses</Link></li>
                        </ul>
                      </div>

                      {/* Section 3: Featured Highlights */}
                      <div className="bg-gray-50 -my-6 -mr-6 p-6 border-l border-gray-100">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Trending</h3>
                        <div className="space-y-5">
                          <Link to="/asset/100" className="block group/card">
                            <div className="text-sm font-bold text-gray-900 group-hover/card:text-absa-primary transition-colors flex items-center gap-1">
                              Customer 360 View <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[8px] uppercase rounded border border-yellow-200">Gold</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 leading-relaxed">Highly rated master dataset for customer intelligence.</div>
                          </Link>
                          
                          <Link to="/asset/8" className="block group/card">
                            <div className="text-sm font-bold text-gray-900 group-hover/card:text-absa-primary transition-colors">
                              Q3 Financials
                            </div>
                            <div className="text-xs text-gray-500 mt-1 leading-relaxed">Latest official reporting dashboards for Q3.</div>
                          </Link>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Search & Actions Area */}
        <div className="flex-1 flex justify-end items-center gap-4 border-l border-gray-100 pl-6 ml-auto">
          
          <div className="max-w-md w-full relative hidden lg:block" ref={searchRef}>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400 group-focus-within:text-absa-primary transition-colors" />
              </span>
              <input 
                type="text" 
                placeholder="Search across the marketplace..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent text-gray-900 placeholder-gray-500 rounded-full focus:outline-none focus:bg-white focus:ring-4 focus:ring-absa-primary/10 focus:border-absa-primary/40 sm:text-sm transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
            </div>
            
            {/* Search Auto-suggest Dropdown */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in-up">
                {searchResults.length > 0 ? (
                  <ul className="py-2">
                    {searchResults.map(asset => (
                      <li key={asset.id}>
                        <button 
                          onClick={() => {
                            navigate(`/asset/${asset.id}`);
                            setSearchQuery('');
                            setIsSearchFocused(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        >
                          <div className="bg-gray-100 p-2 rounded-lg text-gray-500 shrink-0">
                            <Database size={16} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{asset.title}</div>
                            <div className="text-xs text-gray-500 truncate">{asset.type} • {asset.owner}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-sm text-gray-500 text-center">No results found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          {/* Profile & Notifications */}
          <div className="flex items-center space-x-3 shrink-0">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all relative active:scale-90">
              <Bell size={20} className="hover:rotate-12 transition-transform" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-absa-primary rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-medium text-xs cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-800 transition-all active:scale-95 shadow-sm">
              JD
            </div>
          </div>
        </div>

      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth relative">
        <div className="max-w-[1600px] mx-auto w-full h-full">
          {children}
        </div>
      </main>
      
    </div>
  );
};

export default Layout;