import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Book, Search, Bell, Menu, User, Database, Server } from 'lucide-react';
import { CATALOG_ASSETS } from '../data';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col z-20 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-100 overflow-hidden shrink-0">
            <div className={`font-bold text-xl text-absa-primary tracking-tight transition-opacity duration-300 ${!sidebarOpen ? 'opacity-0' : 'opacity-100'}`}>
             Absa <span className="text-gray-900 font-medium whitespace-nowrap">Marketplace</span>
            </div>
            <div className={`absolute font-bold text-xl text-absa-primary transition-opacity duration-300 pointer-events-none ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}>
             A
            </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto hide-scrollbar">
          {[
            { to: '/', icon: Home, label: 'Home' },
            { to: '/catalog', icon: Book, label: 'Catalog' },
            { to: '/technical-catalog', icon: Server, label: 'Technical Catalog' },
            { to: '/my-data', icon: Database, label: 'My Data' }
          ].map((item) => {
            const active = isActive(item.to);
            return (
              <Link 
                key={item.to}
                to={item.to} 
                className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative active:scale-95 ${
                  active 
                    ? 'bg-absa-light text-absa-primary font-medium' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} className={`transition-colors duration-200 ${active ? 'text-absa-primary' : 'text-gray-500 group-hover:text-gray-700'}`} />
                {sidebarOpen && <span className="ml-3 transition-opacity duration-300">{item.label}</span>}
                
                {/* Active Dot Indicator */}
                <div className={`absolute right-3 w-1.5 h-1.5 rounded-full bg-absa-primary transition-all duration-300 transform ${active && sidebarOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
           <button 
             onClick={() => setSidebarOpen(!sidebarOpen)}
             className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 w-full flex justify-center transition-colors active:scale-90"
           >
             <Menu size={20} />
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400 group-focus-within:text-absa-primary transition-colors" />
              </span>
              <input 
                type="text" 
                placeholder="Search for data assets, reports, or pipelines..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:bg-white focus:ring-4 focus:ring-absa-primary/5 focus:border-absa-primary sm:text-sm transition-all duration-300"
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
                          <div className="bg-gray-100 p-2 rounded-lg text-gray-500">
                            <Database size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{asset.title}</div>
                            <div className="text-xs text-gray-500">{asset.type} • {asset.owner}</div>
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

          <div className="flex items-center space-x-4 ml-4">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all relative active:scale-90">
              <Bell size={20} className="hover:rotate-12 transition-transform" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-absa-primary rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-medium text-sm cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-800 transition-all active:scale-95">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;