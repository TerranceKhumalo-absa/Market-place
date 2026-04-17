import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Download, Upload, Shield, CheckCircle, ChevronRight, User, MoreHorizontal, Database, Table, GitMerge, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { DEMO_SCHEMA, DEMO_OWNERSHIP, CATALOG_ASSETS } from '../data';
import { Asset } from '../types';

// Helper to simulate fetching
const getAssetById = (id: string): Asset | undefined => CATALOG_ASSETS.find(a => a.id === id) || CATALOG_ASSETS[3];

const AssetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const asset = getAssetById(id || '100');
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'preview' | 'lineage'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({ justification: '', environment: 'Development', duration: '3 months' });
  const [isFollowing, setIsFollowing] = useState(false);

  if (!asset) return <div>Asset not found</div>;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'schema', label: 'Schema' },
    { id: 'preview', label: 'Sample Data' },
    { id: 'lineage', label: 'Lineage & Quality' },
  ] as const;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      toast.success(`You are now following ${asset.title}`);
    } else {
      toast.info(`You unfollowed ${asset.title}`);
    }
  };

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    toast.success('Access request submitted successfully!', {
      description: 'You can track the status in the My Data dashboard.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-4">
        <Link to="/catalog" className="hover:text-absa-primary transition-colors flex items-center">
          Catalog
        </Link>
        <ChevronRight size={14} className="mx-2 opacity-50" />
        <span className="text-gray-900 font-medium truncate">{asset.title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{asset.title}</h1>
            {asset.classification === 'Confidential' && (
                <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-bold border border-red-100 flex items-center uppercase tracking-wide">
                    <Shield size={10} className="mr-1" /> Confidential
                </span>
            )}
          </div>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">{asset.description}</p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleFollow}
            className={`group flex items-center px-4 py-2 border rounded-lg font-medium transition-all active:scale-95 ${isFollowing ? 'bg-absa-light text-absa-primary border-absa-primary/30' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-absa-primary hover:border-absa-primary/30'}`}
          >
            <Star size={18} className={`mr-2 transition-transform group-hover:scale-110 group-hover:rotate-12 ${isFollowing ? 'fill-absa-primary' : ''}`} />
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-6 py-2 bg-absa-primary text-white rounded-lg font-medium hover:bg-absa-dark shadow-sm hover:shadow-lg hover:shadow-absa-primary/20 transition-all active:scale-95"
          >
            Request Access
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors active:rotate-90">
              <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content (Tabs) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 relative">
            <div className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-absa-primary'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-absa-primary rounded-t-full transition-all duration-300 animate-pop" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
             {activeTab === 'overview' && (
              <div className="animate-fade-in-up space-y-6">
                
                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     {[
                       { label: 'Total Rows', value: '14.2M', sub: '+1.2% this week', color: 'text-gray-900' },
                       { label: 'Data Size', value: '4.8 GB', sub: 'Parquet Format', color: 'text-gray-900' },
                       { label: 'Completeness', value: '99.8%', sub: '0.2% Nulls', color: 'text-green-600' },
                       { label: 'Usage', value: '452', sub: 'Last 30 days', color: 'text-gray-900' }
                     ].map((stat, i) => (
                       <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-absa-primary/20 transition-colors group">
                          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 group-hover:text-absa-primary transition-colors">{stat.label}</div>
                          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                          <div className="text-[10px] text-gray-400 font-medium mt-1">{stat.sub}</div>
                       </div>
                     ))}
                </div>

                {/* Documentation / Readme */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Documentation</h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Updated Sept 1, 2025</span>
                    </div>
                    <div className="p-6 prose prose-sm max-w-none text-gray-600 leading-relaxed">
                        <p>
                            This dataset serves as the <strong>primary source of truth</strong> for customer demographic information within the organization. 
                            Aggregated from the MDM system and enriched with behavioral signals.
                        </p>
                        
                        <h4 className="text-gray-900 font-semibold mt-6 mb-2">Business Context</h4>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-absa-primary shrink-0" />
                                <span>Marketing segmentation and campaign targeting.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-absa-primary shrink-0" />
                                <span>Risk profiling and KYC refresh cycles.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Access Snippet */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden group">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900 group-hover:text-absa-primary transition-colors">Access Data</h3>
                         <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                            <button className="px-3 py-1 bg-white shadow-sm rounded-md text-[10px] font-bold text-gray-900 uppercase">SQL</button>
                            <button className="px-3 py-1 text-[10px] font-bold text-gray-500 hover:text-gray-900 uppercase transition-colors">Python</button>
                        </div>
                    </div>
                    <div className="p-0 bg-gray-900">
                        <pre className="p-6 text-xs font-mono text-gray-300 overflow-x-auto selection:bg-absa-primary/30">
{`-- Select high-value customers in EMEA
SELECT 
    customer_id, segment, wealth_qfy 
FROM 
    analytics_prod.customer_demographics_q3
WHERE 
    region = 'EMEA' 
    AND wealth_qfy > 8;`}
                        </pre>
                    </div>
                     <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-[10px] text-gray-500 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                        Cluster status: <span className="font-bold text-gray-700 mx-1">Online</span>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'schema' && (
              <div className="animate-fade-in-up">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fields</th>
                        <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type</th>
                        <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {DEMO_SCHEMA.map((field, idx) => (
                        <tr key={field.name} className="hover:bg-gray-50/80 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 group-hover:text-absa-primary transition-colors">{field.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">{field.type}</td>
                          <td className="px-6 py-4 text-xs text-gray-500">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'preview' && (
              <div className="animate-fade-in-up">
                {asset.sampleData ? (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(asset.sampleData[0]).map((key) => (
                            <th key={key} className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {asset.sampleData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                            {Object.values(row).map((val: any, i) => (
                              <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
                      <span>Showing 5 sample rows</span>
                      <span className="flex items-center gap-1 text-absa-primary font-medium"><Shield size={14}/> Data is masked for preview</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Table size={24} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">No sample data available for this asset.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'lineage' && (
                <div className="animate-fade-in-up space-y-6">
                  {/* Quality Score */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/> Data Quality</h3>
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-green-500" strokeWidth="3" strokeDasharray={`${asset.qualityScore || 95}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute text-xl font-bold text-gray-900">{asset.qualityScore || 95}%</div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Completeness</span><span className="font-medium">99.8%</span></div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: '99.8%'}}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Validity</span><span className="font-medium">94.2%</span></div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '94.2%'}}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Uniqueness</span><span className="font-medium">100%</span></div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: '100%'}}></div></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lineage Graph (Simplified) */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><GitMerge size={18} className="text-absa-primary"/> Data Lineage</h3>
                    
                    {asset.lineage ? (
                      <div className="flex items-center justify-between relative">
                        {/* Upstream */}
                        <div className="space-y-3 w-1/3">
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Upstream Sources</div>
                          {asset.lineage.upstream.map(source => (
                            <div key={source} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 truncate">
                              {source}
                            </div>
                          ))}
                        </div>
                        
                        {/* Current */}
                        <div className="w-1/3 flex justify-center relative z-10">
                          <div className="p-4 bg-absa-light border-2 border-absa-primary rounded-xl text-center shadow-lg">
                            <Database size={24} className="text-absa-primary mx-auto mb-2" />
                            <div className="text-sm font-bold text-absa-primary">{asset.title}</div>
                          </div>
                        </div>

                        {/* Downstream */}
                        <div className="space-y-3 w-1/3">
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Downstream Uses</div>
                          {asset.lineage.downstream.map(dest => (
                            <div key={dest} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 truncate">
                              {dest}
                            </div>
                          ))}
                        </div>
                        
                        {/* Connecting Lines (Visual Hack) */}
                        <div className="absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">Lineage information not available.</div>
                    )}
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Technical Stats</h3>
                <dl className="space-y-4 text-sm">
                    {[
                        { label: 'Owner', value: asset.owner },
                        { label: 'Updated', value: asset.updatedAt },
                        { label: 'Quality', value: `${asset.qualityScore || '95'}%`, color: 'text-green-600' },
                        { label: 'Freshness', value: 'Updated Daily' }
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center group/row cursor-default">
                            <dt className="text-gray-500 group-hover/row:text-gray-800 transition-colors">{row.label}</dt>
                            <dd className={`font-semibold ${row.color || 'text-gray-900'}`}>{row.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Collaborators</h3>
                 <div className="flex -space-x-3 items-center">
                     {[
                         { initial: 'JD', color: 'bg-blue-100 text-blue-700' },
                         { initial: 'AS', color: 'bg-green-100 text-green-700' },
                         { initial: 'MK', color: 'bg-yellow-100 text-yellow-700' }
                     ].map((user, i) => (
                        <div key={i} className={`h-10 w-10 rounded-full ${user.color} border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer hover:-translate-y-1 transition-transform relative z-[${10-i}]`}>
                            {user.initial}
                        </div>
                     ))}
                     <div className="h-10 w-10 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-400 relative z-0">
                         +2
                     </div>
                 </div>
            </div>
        </div>
      </div>
      {/* Access Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Request Data Access</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleRequestAccess} className="p-6 space-y-5">
              <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm flex items-start gap-3">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p>You are requesting access to <strong>{asset.title}</strong>. This requires approval from {asset.owner}.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-absa-primary/20 focus:border-absa-primary outline-none transition-all"
                  value={requestForm.environment}
                  onChange={e => setRequestForm({...requestForm, environment: e.target.value})}
                >
                  <option>Development</option>
                  <option>UAT / Staging</option>
                  <option>Production</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requested Duration</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-absa-primary/20 focus:border-absa-primary outline-none transition-all"
                  value={requestForm.duration}
                  onChange={e => setRequestForm({...requestForm, duration: e.target.value})}
                >
                  <option>1 month</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>Permanent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Justification</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Explain why you need this data and how it will be used..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-absa-primary/20 focus:border-absa-primary outline-none transition-all resize-none"
                  value={requestForm.justification}
                  onChange={e => setRequestForm({...requestForm, justification: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-absa-primary text-white font-medium rounded-lg hover:bg-absa-dark transition-colors shadow-sm"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetDetail;