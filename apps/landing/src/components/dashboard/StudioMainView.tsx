import { useState, useRef, useEffect } from 'react'
import { ShieldCheck, FileText, Database, CloudUpload, MoreVertical, ChevronDown, LayoutGrid, User, Loader2, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import type { OnboardingState } from '../onboarding/WorkspaceSetupPage'

export function StudioMainView({ state, onNavigate }: { state: OnboardingState, onNavigate: (tab: any) => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [processedDocs, setProcessedDocs] = useState<any[]>([])
  const [stats, setStats] = useState({ docs: 0, attrs: 0, products: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be under 50 MB')
      return
    }

    setIsUploading(true)
    setUploadStatus('Initializing upload...')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/process-spec-stream', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let finalResult = null
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter(l => l.trim())

          for (const line of lines) {
            try {
              const data = JSON.parse(line)
              if (data.type === 'status') {
                setUploadStatus(data.message)
              } else if (data.type === 'result') {
                finalResult = data.data
              } else if (data.type === 'error') {
                toast.error(`Error: ${data.message}`)
              }
            } catch (err) {
              console.error('Error parsing stream line:', line)
            }
          }
        }

        if (finalResult) {
          // Update stats and documents list
          setProcessedDocs(prev => [{
            id: finalResult.id,
            name: finalResult.asset_name,
            type: 'Document',
            status: 'Completed',
            attrsExtracted: finalResult.attributes.length
          }, ...prev])
          
          setStats(prev => ({
            docs: prev.docs + 1,
            attrs: prev.attrs + finalResult.attributes.length,
            products: prev.products + (finalResult.standardized_title ? 1 : 0)
          }))
        }
      }
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`)
    } finally {
      setIsUploading(false)
      setUploadStatus('')
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }
  // Calculate dynamic data
  const numDocs = state.dataSources.connectedSources.length
  
  // Empty states vs actual data checks
  const totalDocs = state.dataSources.connectedSources.length + stats.docs
  const hasUploadedSources = totalDocs > 0
  const documentsProcessed = totalDocs.toString()
  const attributesExtracted = stats.attrs.toString()
  const dataQualityScore = stats.docs > 0 ? '98%' : '0%' // Mocked for now
  const productsEnriched = stats.products.toString()

  const firstName = state.workspace?.fullName ? state.workspace.fullName.split(' ')[0] : 'User'

  if (loading) {
    return (
      <div className="animate-in fade-in duration-500">
        {/* Skeleton Header */}
        <div className="mb-8 mt-2 animate-pulse">
          <div className="h-8 bg-spec-bg-subtle-1 rounded-lg w-1/3 mb-3"></div>
          <div className="h-4 bg-spec-bg-subtle-1 rounded md w-1/2"></div>
        </div>
        
        {/* Skeleton grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 bg-white rounded-2xl border border-spec-border shadow-sm p-8 h-[280px] flex flex-col justify-between relative overflow-hidden">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
            
            <div className="animate-pulse">
              <div className="h-5 bg-spec-bg-subtle-1 rounded-md w-1/4 mb-3"></div>
              <div className="h-3 bg-spec-bg-subtle-1 rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 animate-pulse">
              {[1,2,3,4].map(i => (
                <div key={i}>
                  <div className="w-8 h-8 rounded-lg bg-spec-bg-subtle-1 mb-4"></div>
                  <div className="h-6 bg-spec-bg-subtle-1 rounded-md w-1/2 mb-3"></div>
                  <div className="h-3 bg-spec-bg-subtle-1 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="xl:col-span-1 bg-white rounded-2xl border border-spec-border shadow-sm p-6 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
            <div className="animate-pulse">
              <div className="h-5 bg-spec-bg-subtle-1 rounded-md w-1/2 mb-8"></div>
              <div className="space-y-6">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-spec-bg-subtle-1 shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-spec-bg-subtle-1 rounded w-full"></div>
                      <div className="h-3 bg-spec-bg-subtle-1 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton Data sources */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
           <div className="xl:col-span-2 bg-white rounded-2xl border border-spec-border shadow-sm p-6 relative overflow-hidden">
             <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
             <div className="animate-pulse">
               <div className="h-5 bg-spec-bg-subtle-1 rounded-md w-1/4 mb-6"></div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1,2].map(i => (
                    <div key={i} className="h-24 rounded-xl bg-spec-bg-subtle-1"></div>
                  ))}
               </div>
             </div>
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="mb-8 mt-2">
        <h1 className="text-[26px] font-bold text-spec-navy flex items-center gap-2 mb-2">
          Welcome back, {firstName}! <span className="text-[22px] origin-bottom-right animate-wave inline-block">👋</span>
        </h1>
        <p className="text-[14px] text-spec-muted">
          Here's what's happening in your product intelligence workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Main Workspace Card */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-spec-border shadow-sm p-8 flex flex-col md:flex-row relative overflow-hidden">
          
          <div className="flex-1 z-10 flex flex-col justify-between">
            <div>
              <h2 className="text-[16px] font-bold text-spec-navy mb-1">Your Catalog Workspace</h2>
              <p className="text-[13px] text-spec-muted">All your product data, enriched and ready to drive impact.</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-spec-primary mb-3">
                  <FileText className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="text-[24px] font-bold text-spec-navy leading-none mb-1.5">{documentsProcessed}</div>
                <div className="text-[11px] font-medium text-spec-muted">Documents</div>
                <div className="text-[10px] text-spec-muted">Processed</div>
              </div>

              <div>
                <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600 mb-3">
                  <ShieldCheck className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="text-[24px] font-bold text-spec-navy leading-none mb-1.5">{attributesExtracted}</div>
                <div className="text-[11px] font-medium text-spec-muted">Attributes</div>
                <div className="text-[10px] text-spec-muted">Extracted</div>
              </div>

              <div>
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3">
                  <ShieldCheck className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="text-[24px] font-bold text-spec-navy leading-none mb-1.5">{dataQualityScore}</div>
                <div className="text-[11px] font-medium text-spec-muted">Data Quality</div>
                <div className="text-[10px] text-spec-muted">Score</div>
              </div>

              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-spec-primary mb-3">
                  <Database className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="text-[24px] font-bold text-spec-navy leading-none mb-1.5">{productsEnriched}</div>
                <div className="text-[11px] font-medium text-spec-muted">Products</div>
                <div className="text-[10px] text-spec-muted">Enriched</div>
              </div>

            </div>
          </div>

          {/* Illustration - decorative HTML/CSS built based on reference */}
          <div className="hidden lg:block w-[240px] h-[160px] relative ml-6 mt-4 z-0 shrink-0">
            
            <svg className="absolute inset-0 w-full h-full text-spec-primary/15" viewBox="0 0 240 160" fill="none">
              <path d="M120 10 C120 10, 180 10, 180 80 C180 150, 120 150, 120 150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M120 10 C120 10, 60 10, 60 80 C60 150, 120 150, 120 150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M20 80 L220 80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M120 20 L120 140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Central Window */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[100px] bg-white rounded-lg shadow-[0_8px_20px_rgba(15,39,79,0.1)] border border-spec-border flex overflow-hidden z-10">
              <div className="w-5 bg-spec-navy h-full flex flex-col items-center py-2 gap-1.5">
                <div className="w-3 h-3 rounded text-white flex items-center justify-center font-bold text-[7px]">S</div>
                <div className="w-2.5 h-px bg-white/20 my-0.5"></div>
                <div className="w-2 h-2 rounded-sm bg-white/20"></div>
                <div className="w-2 h-2 rounded-sm bg-white/10"></div>
              </div>
              <div className="flex-1 p-2 bg-[#FAFAFA]">
                <div className="w-12 h-1.5 rounded bg-spec-border mb-2"></div>
                <div className="space-y-1.5">
                  <div className="flex gap-1.5 items-center bg-white p-1 rounded border border-spec-border shadow-sm">
                    <div className="w-3 h-3 bg-blue-50 border border-blue-100 rounded"></div>
                    <div className="flex-1 space-y-0.5">
                      <div className="w-full h-1 bg-spec-border rounded"></div>
                      <div className="w-2/3 h-1 bg-spec-border rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 items-center bg-white p-1 rounded border border-spec-border shadow-sm">
                    <div className="w-3 h-3 bg-green-50 border border-green-100 rounded"></div>
                    <div className="flex-1 space-y-0.5">
                      <div className="w-full h-1 bg-spec-border rounded"></div>
                      <div className="w-3/4 h-1 bg-spec-border rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 items-center bg-white p-1 rounded border border-spec-border shadow-sm">
                    <div className="w-3 h-3 bg-purple-50 border border-purple-100 rounded"></div>
                    <div className="flex-1 space-y-0.5">
                      <div className="w-full h-1 bg-spec-border rounded"></div>
                      <div className="w-1/2 h-1 bg-spec-border rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nodes */}
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-green-600 z-20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-20">
              <Database className="w-4 h-4" />
            </div>
            <div className="absolute top-1/2 left-[10px] -translate-y-1/2 w-8 h-8 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-20">
              <User className="w-4 h-4" />
            </div>
            <div className="absolute top-1/2 right-[10px] -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-purple-600 z-20">
              <Database className="w-4 h-4" />
            </div>

          </div>
        </div>

        {/* Getting Started Card */}
        <div className="xl:col-span-1 bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8 flex flex-col">
          <h2 className="text-[15px] font-bold text-spec-navy mb-1">Getting Started</h2>
          <p className="text-[12px] text-spec-muted mb-6">Finish these steps to maximize SpecPulse.</p>

          <div className="space-y-4 flex-1 flex flex-col justify-center">
            
            <div className="flex items-center group cursor-pointer" onClick={() => onNavigate('add_data_sources')}>
              <div className="w-9 h-9 rounded-full border border-green-200 bg-green-50 flex items-center justify-center text-green-600 shrink-0 mr-4">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-spec-navy truncate">Add more data sources</div>
                <div className="text-[11px] font-medium text-green-600">Completed</div>
              </div>
              <ChevronDown className="w-4 h-4 text-spec-muted -rotate-90 group-hover:text-spec-navy transition-colors shrink-0 ml-2" />
            </div>

            <div className="w-full h-px bg-spec-border/60"></div>

            <div className="flex items-center group cursor-pointer" onClick={() => onNavigate('upload_catalogs')}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mr-4 border ${hasUploadedSources ? 'bg-green-50 border-green-200 text-green-600' : 'bg-blue-50 border-blue-100 text-spec-primary'}`}>
                {hasUploadedSources ? <ShieldCheck className="w-4 h-4" /> : <CloudUpload className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-spec-navy truncate">Upload catalogs</div>
                <div className={`text-[11px] font-medium ${hasUploadedSources ? 'text-green-600' : 'text-spec-primary'}`}>
                  {hasUploadedSources ? 'Completed' : 'In progress'}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-spec-muted -rotate-90 group-hover:text-spec-navy transition-colors shrink-0 ml-2" />
            </div>

            <div className="w-full h-px bg-spec-border/60"></div>

            <div className="flex items-center group cursor-pointer" onClick={() => onNavigate('invite_team')}>
              <div className="w-9 h-9 rounded-full border border-purple-100 bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mr-4">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-spec-navy truncate">Invite your team</div>
                <div className="text-[11px] font-medium text-purple-600">Pending</div>
              </div>
              <ChevronDown className="w-4 h-4 text-spec-muted -rotate-90 group-hover:text-spec-navy transition-colors shrink-0 ml-2" />
            </div>

          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recently Processed Documents Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[16px] font-bold text-spec-navy mb-1">Recently Processed Documents</h2>
                <p className="text-[13px] text-spec-muted">Your latest ingestions and their status.</p>
              </div>
              <button onClick={() => onNavigate('upload_catalogs')} className="text-[12px] font-bold text-spec-primary hover:underline flex items-center gap-1">
                View all <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
              </button>
            </div>

            <div className="p-4 bg-white border border-spec-border/60 rounded-xl flex items-center justify-between shadow-sm mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                  <span className="text-red-500 font-bold text-[12px]">3</span>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-spec-navy">Extraction errors</h4>
                  <p className="text-[11px] text-spec-muted">Need human review</p>
                </div>
              </div>
              <button onClick={() => onNavigate('hitl')} className="text-[12px] font-bold text-spec-primary hover:underline flex items-center gap-1">
                Review extraction errors <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {hasUploadedSources ? (
              <div className="overflow-x-auto">
                <table className="w-full text-[12px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-spec-border/80 text-spec-muted font-medium">
                      <th className="pb-3 pl-2 font-medium">File Name</th>
                      <th className="pb-3 px-2 font-medium">Source</th>
                      <th className="pb-3 px-2 font-medium">Status</th>
                      <th className="pb-3 px-2 font-medium">Processed At</th>
                      <th className="pb-3 pr-2 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dynamically uploaded documents */}
                    {processedDocs.map((doc, i) => (
                      <tr key={doc.id} className="border-b border-spec-border/50 hover:bg-[#FAFAFA] transition-colors group">
                        <td className="py-4 pl-2 font-semibold text-spec-navy flex items-center gap-2 max-w-[200px]">
                          <FileText className="w-4 h-4 shrink-0 text-red-500" />
                          <span className="truncate">{doc.name}</span>
                        </td>
                        <td className="py-4 px-2 text-spec-navy/80">Manual Upload</td>
                        <td className="py-4 px-2">
                          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold border border-green-200">Completed</span>
                        </td>
                        <td className="py-4 px-2 text-spec-muted">Just now</td>
                        <td className="py-4 pr-2 text-right">
                          <button className="text-spec-muted hover:text-spec-navy p-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Onboarding connected sources (mock) */}
                    {state.dataSources.connectedSources.map((source, i) => (
                      <tr key={source.id} className="border-b border-spec-border/50 hover:bg-[#FAFAFA] transition-colors group">
                        <td className="py-4 pl-2 font-semibold text-spec-navy flex items-center gap-2 max-w-[200px]">
                          <source.icon className={`w-4 h-4 shrink-0 ${source.color || 'text-gray-500'}`} />
                          <span className="truncate">{source.name}</span>
                        </td>
                        <td className="py-4 px-2 text-spec-navy/80">{source.type === 'Web URL' ? 'URL Import' : 'Manual Upload'}</td>
                        <td className="py-4 px-2">
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold border border-blue-200">Processing</span>
                        </td>
                        <td className="py-4 px-2 text-spec-muted">Just now</td>
                        <td className="py-4 pr-2 text-right">
                          <button className="text-spec-muted hover:text-spec-navy p-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center bg-[#FAFAFA] rounded-xl border border-spec-border border-dashed">
                <FileText className="w-10 h-10 text-spec-muted mb-3 stroke-[1]" />
                <h3 className="text-[14px] font-bold text-spec-navy mb-1">No documents processed yet</h3>
                <p className="text-[12px] text-spec-muted max-w-[250px]">Upload a catalog or specification sheet to get started.</p>
              </div>
            )}
          </div>

          {/* Upload Area */}
          <div 
            className="border border-spec-primary/30 border-dashed bg-[#F8FAFC] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F2F7FF] transition-colors group"
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 text-spec-primary mb-3 stroke-[1.5] animate-spin" />
                <div className="text-[14px] font-bold text-spec-primary mb-1">Processing File...</div>
                <div className="text-[12px] text-spec-primary animate-pulse">{uploadStatus}</div>
              </>
            ) : (
              <>
                <CloudUpload className="w-10 h-10 text-spec-primary mb-3 stroke-[1.5] group-hover:-translate-y-1 transition-transform" />
                <div className="text-[14px] font-bold text-spec-primary mb-1">Drag & drop files here or browse</div>
                <div className="text-[12px] text-spec-muted">PDF, CSV, XLSX, PNG, JPG up to 50 MB</div>
              </>
            )}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".pdf,.csv,.xlsx,.png,.jpg"
              disabled={isUploading}
            />
          </div>

        </div>

        {/* Recent Activity */}
        <div className="xl:col-span-1 bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8 flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-[15px] font-bold text-spec-navy">Recent Activity</h2>
            <button onClick={() => onNavigate('history')} className="text-[12px] font-bold text-spec-primary hover:underline flex items-center gap-1">
              View all <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </button>
          </div>

          <div className="flex-1">
            {hasUploadedSources ? (
              <div className="h-full flex flex-col items-center justify-center text-center mt-10">
                <div className="w-12 h-12 rounded-full bg-spec-bg-subtle-1 border border-spec-border flex items-center justify-center text-spec-muted mb-3">
                  <LayoutGrid className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="text-[13px] font-bold text-spec-navy mb-1">No recent activity</div>
                <div className="text-[11px] text-spec-muted max-w-[200px]">Activity from your workspace will appear here.</div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center mt-10">
                <div className="w-12 h-12 rounded-full bg-spec-bg-subtle-1 border border-spec-border flex items-center justify-center text-spec-muted mb-3">
                  <LayoutGrid className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="text-[13px] font-bold text-spec-navy mb-1">No recent activity</div>
                <div className="text-[11px] text-spec-muted max-w-[200px]">Activity from your workspace will appear here.</div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
