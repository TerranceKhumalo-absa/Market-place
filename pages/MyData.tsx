import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, ChevronRight, FileText } from 'lucide-react';
import { MOCK_REQUESTS } from '../data';
import { UserRequest } from '../types';

const MyData: React.FC = () => {
  const [requests] = useState<UserRequest[]>(MOCK_REQUESTS);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'Rejected':
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">Approved</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-100">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold border border-yellow-100">Pending</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Data</h1>
        <p className="text-gray-500">Track your data access requests and saved assets.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <FileText size={18} /> Access Requests
          </h3>
        </div>
        
        {requests.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">You have no active access requests.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Asset</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Environment</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Requested On</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-500 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/asset/${req.assetId}`} className="text-sm font-semibold text-gray-900 hover:text-absa-primary transition-colors">
                      {req.assetTitle}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">ID: {req.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {req.environment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {req.requestedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(req.status)}
                      {getStatusBadge(req.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/asset/${req.assetId}`} className="text-absa-primary hover:text-absa-dark flex items-center justify-end gap-1">
                      View <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyData;
