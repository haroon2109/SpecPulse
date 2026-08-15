import { useState, useRef } from 'react'
import { FileText, Image as ImageIcon, Database, Globe, MoreHorizontal, CloudUpload, Folder, Info, ArrowLeft, Check, X, Loader2 } from 'lucide-react'
import type { ConnectedSource } from './WorkspaceSetupPage'

export function DataSourcesFormCard({ state, updateState, onBack, onContinue }: { state: any, updateState: (s: any) => void, onBack: () => void, onContinue: () => void }) {
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleSourceType = (type: string) => {
    setError('')
    const current = state.selectedTypes as string[]
    if (current.includes(type)) {
      updateState({ selectedTypes: current.filter(t => t !== type) })
    } else {
      updateState({ selectedTypes: [...current, type] })
    }
  }

  const handleAddUrl = () => {
    if (!urlInput.trim()) return
    try {
      new URL(urlInput) // validate url
      const newSource: ConnectedSource = {
        id: Math.random().toString(36).substring(7),
        name: urlInput,
        type: 'Web URL',
        icon: Globe,
        color: 'text-purple-500'
      }
      updateState({ connectedSources: [...state.connectedSources, newSource] })
      setUrlInput('')
      setError('')
    } catch (e) {
      setError('Please enter a valid URL (e.g., https://example.com)')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be under 50 MB')
      return
    }

    setIsUploading(true)
    setUploadStatus('Initializing upload...')
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/process-spec-stream`, {
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
                setError(data.message)
              }
            } catch (err) {
              console.error('Error parsing stream line:', line)
            }
          }
        }

        if (finalResult) {
          let icon = FileText
          let color = 'text-red-500'
          let type = 'Document'

          if (file.type.includes('image')) { icon = ImageIcon; color = 'text-green-500'; type = 'Image' }
          else if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) { icon = Database; color = 'text-green-600'; type = 'Spreadsheet' }

          const newSource: ConnectedSource = {
            id: finalResult.id || Math.random().toString(36).substring(7),
            name: finalResult.asset_name || file.name,
            type,
            icon,
            color
          }
          updateState({ connectedSources: [...state.connectedSources, newSource] })
        }
      }
    } catch (err: any) {
      setError(`Upload failed: ${err.message}`)
    } finally {
      setIsUploading(false)
      setUploadStatus('')
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removeSource = (id: string) => {
    updateState({ connectedSources: (state.connectedSources as ConnectedSource[]).filter(s => s.id !== id) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (state.selectedTypes.length === 0 && state.connectedSources.length === 0) {
      setError('Please select at least one source type or connect a source.')
      return
    }
    onContinue()
  }

  const sourceCards = [
    { id: 'Spec Sheets / PDFs', title: 'Spec Sheets / PDFs', desc: 'Technical specifications and datasheets', icon: FileText, color: 'text-red-500' },
    { id: 'Product Images', title: 'Product Images', desc: 'Product photos and visual assets', icon: ImageIcon, color: 'text-green-500' },
    { id: 'Technical Drawings', title: 'Technical Drawings', desc: 'CAD exports and engineering drawings', icon: FileText, color: 'text-blue-500' },
    { id: 'Tables / Spreadsheets', title: 'Tables / Spreadsheets', desc: 'Excel, CSV and structured tables', icon: Database, color: 'text-green-600' },
    { id: 'Web / URLs', title: 'Web / URLs', desc: 'Product pages and online catalogs', icon: Globe, color: 'text-purple-500' },
    { id: 'Other', title: 'Other', desc: 'Other product data sources', icon: MoreHorizontal, color: 'text-gray-500' },
  ]

  return (
    <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(15,39,79,0.04)] border border-spec-border/60 p-8 xl:p-12 h-full flex flex-col mt-4 lg:mt-0">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[22px] font-bold text-spec-navy mb-1">Connect Your Data Sources</h2>
        <p className="text-[13px] text-spec-muted">Choose where your product data comes from. You can add more sources later.</p>
      </div>

      <div className="h-px w-full bg-[#E2E8F0] mb-6"></div>

      <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
        
        {/* Source Selection Grid */}
        <div className="mb-8">
          <label className="text-[13px] font-bold text-spec-navy block mb-1">
            Where does your product data come from? <span className="text-red-500">*</span>
          </label>
          <p className="text-[12px] text-spec-muted mb-4">Select all the sources you currently use.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sourceCards.map(card => (
              <div 
                key={card.id}
                onClick={() => toggleSourceType(card.id)}
                className={`relative flex items-start cursor-pointer border rounded-xl p-4 transition-all ${state.selectedTypes.includes(card.id) ? 'border-spec-primary bg-spec-bg-subtle-1' : 'border-spec-border hover:border-spec-primary/40'}`}
              >
                <div className={`w-4 h-4 border rounded absolute top-4 right-4 flex items-center justify-center ${state.selectedTypes.includes(card.id) ? 'bg-spec-primary border-spec-primary text-white' : 'border-spec-border bg-white'}`}>
                  {state.selectedTypes.includes(card.id) && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                
                <div className={`w-8 h-8 rounded bg-white border border-spec-border/60 flex items-center justify-center shrink-0 mr-3 ${card.color}`}>
                  <card.icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                
                <div className="pr-6">
                  <div className="text-[12px] font-bold text-spec-navy mb-0.5">{card.title}</div>
                  <div className="text-[10px] text-spec-muted leading-snug">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-[#E2E8F0] mb-6"></div>

        {/* Add a Data Source */}
        <div className="mb-8">
          <h3 className="text-[14px] font-bold text-spec-navy mb-1">Add a data source</h3>
          <p className="text-[12px] text-spec-muted mb-4">Upload files directly or connect a source to get started.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Upload Box */}
            <div className="border border-dashed border-spec-primary/50 bg-[#F8FAFC] rounded-xl p-8 flex flex-col items-center justify-center text-center">
              {isUploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-spec-primary mb-3 stroke-[1.5] animate-spin" />
                  <div className="text-[14px] font-bold text-spec-primary mb-1">Processing File...</div>
                  <div className="text-[12px] text-spec-primary animate-pulse text-center">{uploadStatus}</div>
                </>
              ) : (
                <>
                  <CloudUpload className="w-10 h-10 text-spec-primary mb-3 stroke-[1.5]" />
                  <div className="text-[14px] font-bold text-spec-navy mb-1">Drag & drop files here</div>
                  <div className="text-[12px] text-spec-muted mb-3">or</div>
                  <button 
                    type="button" 
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-1.5 border border-spec-primary text-spec-primary font-bold text-[12px] rounded-md hover:bg-spec-bg-subtle-1 transition-colors mb-4 disabled:opacity-50"
                  >
                    Browse Files
                  </button>
                  <div className="text-[11px] text-spec-muted">PDF, CSV, XLSX, PNG, JPG up to 50 MB</div>
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

            {/* URL & Connected Sources */}
            <div className="flex flex-col">
              
              <div className="mb-5">
                <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Product Catalog URL (Optional)</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-spec-muted">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      value={urlInput}
                      onChange={e => setUrlInput(e.target.value)}
                      placeholder="https://example.com/products" 
                      className="w-full pl-9 pr-3 py-2 border border-spec-border rounded-lg text-[13px] placeholder:text-spec-muted/60 focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary outline-none" 
                    />
                  </div>
                  <button type="button" onClick={handleAddUrl} className="px-4 py-2 border border-spec-border rounded-lg text-[13px] font-bold text-spec-navy hover:bg-spec-bg-subtle-1 transition-colors whitespace-nowrap">
                    Add URL
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Connected Sources</label>
                
                {state.connectedSources.length === 0 ? (
                  /* Empty State */
                  <div className="flex-1 border border-spec-border rounded-xl bg-[#FAFAFA] flex flex-col items-center justify-center py-6 text-center">
                    <div className="relative mb-3">
                      <Folder className="w-12 h-12 text-spec-border fill-spec-bg-subtle-1 stroke-[1]" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="text-[13px] font-bold text-spec-navy mb-1">No sources connected yet</div>
                    <div className="text-[11px] text-spec-muted">Add at least one source to continue.</div>
                  </div>
                ) : (
                  /* Connected List */
                  <div className="flex-1 border border-spec-border rounded-xl bg-white flex flex-col overflow-hidden">
                    <div className="max-h-[160px] overflow-y-auto p-2 space-y-2">
                      {state.connectedSources.map((source: ConnectedSource) => (
                        <div key={source.id} className="flex items-center justify-between p-2.5 rounded-lg border border-spec-border/50 bg-[#FAFAFA]">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <source.icon className={`w-4 h-4 shrink-0 ${source.color}`} />
                            <div className="truncate">
                              <div className="text-[12px] font-semibold text-spec-navy truncate">{source.name}</div>
                              <div className="text-[10px] text-spec-muted">{source.type}</div>
                            </div>
                          </div>
                          <button type="button" onClick={() => removeSource(source.id)} className="text-spec-muted hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors ml-2 shrink-0">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
              
            </div>

          </div>
        </div>

        {/* Error Validation */}
        {error && (
          <div className="mb-4 text-[12px] text-red-500 font-medium bg-red-50 p-2 rounded border border-red-100 flex items-center gap-2">
            <Info className="w-4 h-4" /> {error}
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-[#F2F7FF] border border-spec-primary/10 rounded-lg p-3 flex items-start gap-2.5 mb-6">
          <Info className="w-4 h-4 text-spec-primary mt-0.5 shrink-0" />
          <div className="text-[12px] text-spec-navy leading-tight">
            You can connect additional sources later from your SpecPulse workspace.
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-spec-border/60">
          <button type="button" onClick={onBack} className="mt-4 px-6 py-2.5 text-[14px] font-bold text-spec-navy bg-white border border-spec-border rounded-lg hover:bg-spec-bg-subtle-1 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button type="submit" className="mt-4 px-8 py-2.5 text-[14px] font-bold text-white bg-spec-primary rounded-lg hover:bg-spec-navy transition-colors flex items-center gap-2 shadow-sm">
            Continue <span>→</span>
          </button>
        </div>

      </form>
    </div>
  )
}
