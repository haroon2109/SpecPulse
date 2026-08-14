import { ArrowLeft, Database, FileSpreadsheet, FileText, CloudUpload, Network, Webhook, ArrowRight, Info, CheckCircle2, Lock, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface AddDataSourcesViewProps {
  onNavigate: (tab: 'studio') => void;
}

interface ConnectedSource {
  id: string;
  type: string;
  name: string;
  status: 'Connected' | 'Syncing' | 'Error';
  connectedAt: string;
}

export function AddDataSourcesView({ onNavigate }: AddDataSourcesViewProps) {
  const [connectedSources, setConnectedSources] = useState<ConnectedSource[]>([])
  
  // Connection Modal State
  const [activeConnection, setActiveConnection] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  
  // Form States
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const sources = [
    {
      id: 'excel',
      icon: FileSpreadsheet,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Excel / CSV',
      description: 'Upload Excel or CSV files to import your data.',
      badge: '.xls, .xlsx, .csv'
    },
    {
      id: 'pdf',
      icon: FileText,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      title: 'PDF Documents',
      description: 'Extract tables and structured data from PDF files.',
      badge: '.pdf'
    },
    {
      id: 'database',
      icon: Database,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Database',
      description: 'Connect to your SQL database to import data.',
      badge: 'MySQL, PostgreSQL, SQL Server'
    },
    {
      id: 'cloud',
      icon: CloudUpload,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      title: 'Cloud Storage',
      description: 'Import files from cloud storage services.',
      badge: 'AWS S3, Google Drive, Azure Blob'
    },
    {
      id: 'api',
      icon: Network,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      title: 'API Connector',
      description: 'Connect to external APIs to fetch data automatically.',
      badge: 'REST API, GraphQL'
    },
    {
      id: 'webhook',
      icon: Webhook,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: 'Webhook',
      description: 'Receive real-time data updates via webhook.',
      badge: 'Real-time data sync'
    }
  ]

  const handleOpenConnection = (id: string) => {
    setActiveConnection(id)
    setFormData({})
    setFormErrors({})
  }

  const handleCloseConnection = () => {
    setActiveConnection(null)
    setFormData({})
    setFormErrors({})
    setIsConnecting(false)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (activeConnection === 'database') {
      if (!formData.host) errors.host = 'Host is required'
      if (!formData.username) errors.username = 'Username is required'
      if (!formData.password) errors.password = 'Password is required'
    } else if (activeConnection === 'api') {
      if (!formData.endpoint) errors.endpoint = 'API Endpoint is required'
      if (!formData.apiKey) errors.apiKey = 'API Key is required'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleConnect = () => {
    if (!validateForm()) return
    
    setIsConnecting(true)
    
    // Simulate API connection
    setTimeout(() => {
      const sourceInfo = sources.find(s => s.id === activeConnection)
      if (sourceInfo) {
        setConnectedSources(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          type: sourceInfo.id,
          name: formData.name || `${sourceInfo.title} Connection`,
          status: 'Connected',
          connectedAt: new Date().toLocaleDateString()
        }])
      }
      handleCloseConnection()
    }, 1500)
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      {/* Header Area */}
      <div className="mb-8 mt-2 relative">
        <button 
          onClick={() => onNavigate('studio')}
          className="flex items-center gap-2 text-[13px] font-semibold text-spec-primary hover:text-spec-navy transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-spec-navy flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Database className="w-5 h-5 text-spec-primary stroke-[1.5]" />
              </div>
              Add More Data Sources
            </h1>
            <p className="text-[14px] text-spec-muted">
              Connect external data sources to enrich your workspace with more structured data.
            </p>
          </div>
          
          {/* Subtle Database Illustration */}
          <div className="hidden md:flex items-center justify-center relative w-40 h-20 mr-8">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-blue-50 rounded-full border border-blue-100 flex items-center justify-center z-20">
                <Database className="w-6 h-6 text-spec-primary" />
             </div>
             
             {/* Dotted lines */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                <line x1="20" y1="20" x2="80" y2="40" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="20" y1="60" x2="80" y2="40" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="140" y1="20" x2="80" y2="40" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="140" y1="60" x2="80" y2="40" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />
             </svg>
             
             {/* Satellite icons */}
             <div className="absolute top-0 left-2 w-6 h-6 rounded-full bg-white border border-spec-border shadow-sm flex items-center justify-center z-20">
               <CloudUpload className="w-3 h-3 text-spec-navy" />
             </div>
             <div className="absolute bottom-2 left-4 w-6 h-6 rounded-full bg-white border border-spec-border shadow-sm flex items-center justify-center z-20">
               <Lock className="w-3 h-3 text-spec-navy" />
             </div>
             <div className="absolute top-0 right-2 w-6 h-6 rounded-full bg-white border border-spec-border shadow-sm flex items-center justify-center z-20">
               <FileSpreadsheet className="w-3 h-3 text-green-600" />
             </div>
             <div className="absolute bottom-4 right-0 w-6 h-6 rounded-full bg-white border border-spec-border shadow-sm flex items-center justify-center z-20">
               <Network className="w-3 h-3 text-emerald-600" />
             </div>
             
             {/* Sparkles */}
             <div className="absolute top-4 left-[-10px] w-1.5 h-1.5 rounded-full bg-blue-300"></div>
             <div className="absolute top-1/2 left-[-20px] w-1 h-1 rounded-full bg-blue-200"></div>
             <div className="absolute bottom-0 right-[20px] w-1.5 h-1.5 rounded-full bg-purple-300"></div>
          </div>
        </div>
      </div>

      {/* Connect a new data source section */}
      <div className="mb-10">
        <div className="mb-4">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Connect a new data source</h2>
          <p className="text-[13px] text-spec-muted">Choose a data source type to get started.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sources.map((source) => (
            <div 
              key={source.id}
              onClick={() => handleOpenConnection(source.id)}
              className="bg-white rounded-[14px] border border-spec-border p-5 flex flex-col hover:border-blue-200 hover:bg-[#F8FAFF] transition-all cursor-pointer shadow-sm group h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${source.bgColor} flex items-center justify-center shrink-0`}>
                  <source.icon className={`w-5 h-5 ${source.color} stroke-[1.5]`} />
                </div>
                <ArrowRight className="w-4 h-4 text-spec-muted opacity-0 group-hover:opacity-100 group-hover:text-spec-primary transition-all translate-x-[-5px] group-hover:translate-x-0" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-[14px] font-bold text-spec-navy mb-1">{source.title}</h3>
                <p className="text-[12px] text-spec-muted leading-relaxed mb-4">{source.description}</p>
              </div>
              
              <div className="inline-block mt-auto border border-spec-border rounded bg-gray-50 px-2 py-1 text-[10px] text-spec-muted font-medium w-fit">
                {source.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Data Sources */}
      <div className="mb-6">
        <div className="mb-4">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Connected Data Sources</h2>
          <p className="text-[13px] text-spec-muted">Manage your connected data sources.</p>
        </div>

        {connectedSources.length === 0 ? (
          <div className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-12 flex flex-col items-center justify-center text-center">
            <div className="relative w-16 h-16 mb-4">
               <div className="absolute inset-0 border border-spec-border rounded-full flex items-center justify-center bg-gray-50/50">
                 <Database className="w-6 h-6 text-spec-muted stroke-[1.5]" />
               </div>
               <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gray-200"></div>
               <div className="absolute bottom-2 left-1 w-1.5 h-1.5 rounded-full bg-gray-200"></div>
               <div className="absolute bottom-1 right-3 w-1 h-1 rounded-full bg-gray-300"></div>
             </div>
             <h3 className="text-[14px] font-bold text-spec-navy mb-1">No data sources connected</h3>
             <p className="text-[13px] text-spec-muted">Connect your first data source to get started.</p>
          </div>
        ) : (
          <div className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-6 overflow-x-auto">
             <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="border-b border-spec-border/80 text-spec-navy font-semibold">
                  <th className="pb-3 px-2 font-semibold">Connection Name</th>
                  <th className="pb-3 px-2 font-semibold">Type</th>
                  <th className="pb-3 px-2 font-semibold">Status</th>
                  <th className="pb-3 px-2 font-semibold">Connected On</th>
                </tr>
              </thead>
              <tbody>
                {connectedSources.map((source) => (
                  <tr key={source.id} className="border-b border-spec-border/40 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-2 font-bold text-spec-navy">{source.name}</td>
                    <td className="py-4 px-2 text-spec-muted font-medium capitalize">{source.type}</td>
                    <td className="py-4 px-2">
                       <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-green-600">
                          <CheckCircle2 className="w-3 h-3" /> {source.status}
                       </span>
                    </td>
                    <td className="py-4 px-2 text-spec-muted font-medium">{source.connectedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Help Banner */}
        <div className="bg-[#F2F7FF] rounded-xl border border-blue-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-spec-primary shrink-0" />
            <p className="text-[13px] text-spec-navy">
              Need help connecting a data source? View our <button onClick={() => toast.success('Opening Integration Guide...')} className="text-spec-primary hover:underline">integration guide</button> or <button onClick={() => toast.success('Opening Support Ticket...')} className="text-spec-primary hover:underline">contact support</button>.
            </p>
          </div>
        </div>

      {/* Connection Modal Overlay */}
      {activeConnection && (
        <div className="fixed inset-0 bg-spec-navy/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-spec-border shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-spec-border flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-spec-navy">
                Connect {sources.find(s => s.id === activeConnection)?.title}
              </h3>
              <button onClick={handleCloseConnection} className="text-spec-muted hover:text-spec-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              
              <div className="mb-5">
                <label className="block text-[13px] font-semibold text-spec-navy mb-2">Connection Name</label>
                <input 
                  type="text" 
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Production Database" 
                  className="w-full px-3 py-2 bg-white border border-spec-border rounded-lg text-[13px] focus:outline-none focus:border-spec-primary"
                />
              </div>

              {(activeConnection === 'database') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-spec-navy mb-2">Host</label>
                    <input 
                      type="text" 
                      value={formData.host || ''}
                      onChange={(e) => setFormData({...formData, host: e.target.value})}
                      placeholder="db.example.com" 
                      className={`w-full px-3 py-2 bg-white border ${formErrors.host ? 'border-red-300' : 'border-spec-border'} rounded-lg text-[13px] focus:outline-none focus:border-spec-primary`}
                    />
                    {formErrors.host && <p className="text-red-500 text-[11px] mt-1">{formErrors.host}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-spec-navy mb-2">Username</label>
                      <input 
                        type="text" 
                        value={formData.username || ''}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className={`w-full px-3 py-2 bg-white border ${formErrors.username ? 'border-red-300' : 'border-spec-border'} rounded-lg text-[13px] focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-spec-navy mb-2">Password</label>
                      <input 
                        type="password" 
                        value={formData.password || ''}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className={`w-full px-3 py-2 bg-white border ${formErrors.password ? 'border-red-300' : 'border-spec-border'} rounded-lg text-[13px] focus:outline-none`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {(activeConnection === 'api') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-spec-navy mb-2">API Endpoint</label>
                    <input 
                      type="text" 
                      value={formData.endpoint || ''}
                      onChange={(e) => setFormData({...formData, endpoint: e.target.value})}
                      placeholder="https://api.example.com/v1" 
                      className={`w-full px-3 py-2 bg-white border ${formErrors.endpoint ? 'border-red-300' : 'border-spec-border'} rounded-lg text-[13px] focus:outline-none focus:border-spec-primary`}
                    />
                    {formErrors.endpoint && <p className="text-red-500 text-[11px] mt-1">{formErrors.endpoint}</p>}
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-spec-navy mb-2">API Key / Bearer Token</label>
                    <input 
                      type="password" 
                      value={formData.apiKey || ''}
                      onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                      className={`w-full px-3 py-2 bg-white border ${formErrors.apiKey ? 'border-red-300' : 'border-spec-border'} rounded-lg text-[13px] focus:outline-none`}
                    />
                  </div>
                </div>
              )}

              {(activeConnection === 'excel' || activeConnection === 'pdf' || activeConnection === 'cloud' || activeConnection === 'webhook') && (
                <div className="border-2 border-dashed border-spec-border rounded-xl p-8 text-center flex flex-col items-center justify-center bg-gray-50">
                  <CloudUpload className="w-8 h-8 text-spec-muted mb-2" />
                  <p className="text-[13px] font-semibold text-spec-navy">Upload or Connect Source</p>
                  <p className="text-[11px] text-spec-muted mt-1">This flow will open the native file picker or OAuth window.</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-spec-border flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={handleCloseConnection}
                className="px-4 py-2 text-[13px] font-semibold text-spec-navy bg-white border border-spec-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-white bg-spec-primary rounded-lg hover:bg-spec-navy transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isConnecting ? 'Connecting...' : 'Connect Source'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
