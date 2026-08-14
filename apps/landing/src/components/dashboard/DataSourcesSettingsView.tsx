import { useState } from 'react'
import { ChevronRight, Plus, Database, Plug, Languages, Box, Copy, Zap, ChevronDown, FileText, FileSpreadsheet, Image as ImageIcon, PenTool, Lock } from 'lucide-react'

interface DataSourcesSettingsViewProps {
  onNavigate: (tab: 'settings') => void;
}

export function DataSourcesSettingsView({ onNavigate }: DataSourcesSettingsViewProps) {
  // Form State for preferences
  const [defaultLanguage, setDefaultLanguage] = useState('English')
  const [defaultDataType, setDefaultDataType] = useState('Auto Detect')
  const [duplicateHandling, setDuplicateHandling] = useState('Skip Duplicates')
  const [autoProcessing, setAutoProcessing] = useState(true)

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] mb-6 mt-2">
        <button 
          onClick={() => onNavigate('settings')}
          className="text-spec-muted hover:text-spec-navy transition-colors"
        >
          Settings
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-spec-muted" />
        <span className="font-bold text-spec-navy">Data & Sources</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-spec-navy mb-2">Data & Sources</h1>
          <p className="text-[14px] text-spec-muted">
            Manage your connected data sources and upload preferences.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-spec-primary text-white rounded-lg text-[13px] font-bold hover:bg-spec-primary/90 transition-colors shadow-sm shrink-0">
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Data Source
        </button>
      </div>

      {/* Connected Data Sources Card */}
      <div className="bg-white rounded-2xl border border-spec-border shadow-sm mb-6">
        <div className="p-6 lg:p-8 border-b border-spec-border/50">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Connected Data Sources</h2>
          <p className="text-[13px] text-spec-muted">View and manage all your connected data sources.</p>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 px-6 lg:px-8 py-3 border-b border-spec-border/50 text-[11px] font-bold text-spec-navy">
          <div>Source Name</div>
          <div>Source Type</div>
          <div>Status</div>
          <div>Last Sync</div>
          <div>Files</div>
          <div>Actions</div>
        </div>

        {/* Empty State */}
        <div className="py-20 flex flex-col items-center justify-center text-center px-6">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full bg-[#F2F7FF] flex items-center justify-center text-spec-primary">
              <div className="flex items-center">
                <Database className="w-7 h-7 stroke-[1.5]" />
                <Plug className="w-5 h-5 stroke-[1.5] -ml-2 mb-2 bg-[#F2F7FF]" />
              </div>
            </div>
          </div>
          
          <h3 className="text-[16px] font-bold text-spec-navy mb-2">No data sources connected</h3>
          <p className="text-[13px] text-spec-muted mb-6">
            Connect your first data source to start ingesting and managing data.
          </p>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-spec-primary text-spec-primary font-bold text-[13px] hover:bg-[#F2F7FF] transition-colors">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Data Source
          </button>
        </div>
      </div>

      {/* Lower Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Upload Preferences Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8 flex flex-col">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Upload Preferences</h2>
          <p className="text-[13px] text-spec-muted mb-8">Configure default settings for file uploads and processing.</p>

          <div className="flex flex-col gap-6 flex-1">
            
            {/* ROW 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-spec-primary shrink-0">
                  <Languages className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-spec-navy mb-0.5">Default File Language</div>
                  <div className="text-[12px] text-spec-muted">Preferred language for document processing</div>
                </div>
              </div>
              <div className="relative shrink-0 w-[140px]">
                <select 
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                  className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[13px] font-medium text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
              </div>
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* ROW 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-spec-primary shrink-0">
                  <Box className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-spec-navy mb-0.5">Default Data Type</div>
                  <div className="text-[12px] text-spec-muted">Default data type for uploaded files</div>
                </div>
              </div>
              <div className="relative shrink-0 w-[140px]">
                <select 
                  value={defaultDataType}
                  onChange={(e) => setDefaultDataType(e.target.value)}
                  className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[13px] font-medium text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20"
                >
                  <option value="Auto Detect">Auto Detect</option>
                  <option value="Catalog">Catalog</option>
                  <option value="Spec Sheet">Spec Sheet</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
              </div>
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* ROW 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-spec-primary shrink-0">
                  <Copy className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-spec-navy mb-0.5">Duplicate Handling</div>
                  <div className="text-[12px] text-spec-muted">How to handle duplicate files during upload</div>
                </div>
              </div>
              <div className="relative shrink-0 w-[140px]">
                <select 
                  value={duplicateHandling}
                  onChange={(e) => setDuplicateHandling(e.target.value)}
                  className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[13px] font-medium text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20"
                >
                  <option value="Skip Duplicates">Skip Duplicates</option>
                  <option value="Overwrite">Overwrite</option>
                  <option value="Keep Both">Keep Both</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
              </div>
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* ROW 4 */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-spec-primary shrink-0">
                  <Zap className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-spec-navy mb-0.5">Auto Processing</div>
                  <div className="text-[12px] text-spec-muted">Automatically process files after upload</div>
                </div>
              </div>
              <button 
                onClick={() => setAutoProcessing(!autoProcessing)}
                className={`relative w-[42px] h-6 rounded-full transition-colors shrink-0 ${autoProcessing ? 'bg-spec-primary' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${autoProcessing ? 'translate-x-[18px]' : 'translate-x-0'}`}></div>
              </button>
            </div>

          </div>
        </div>

        {/* Supported File Types Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8 flex flex-col">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Supported File Types</h2>
          <p className="text-[13px] text-spec-muted mb-8">File types you can upload to SpecPulse.</p>

          <div className="flex flex-col gap-4 flex-1">
            
            {/* ROW 1: PDF */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <FileText className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-spec-navy">PDF</div>
                  <div className="text-[11px] text-spec-muted font-medium">.pdf</div>
                </div>
              </div>
              <div className="text-[12px] text-spec-muted flex-1 pl-4 hidden sm:block">Document files</div>
              <div className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold shrink-0">
                Supported
              </div>
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* ROW 2: Excel */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-600 shrink-0">
                  <FileSpreadsheet className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-spec-navy">Excel</div>
                  <div className="text-[11px] text-spec-muted font-medium">.xlsx, .xls</div>
                </div>
              </div>
              <div className="text-[12px] text-spec-muted flex-1 pl-4 hidden sm:block">Spreadsheet files</div>
              <div className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold shrink-0">
                Supported
              </div>
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* ROW 3: CSV */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <FileText className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-spec-navy">CSV</div>
                  <div className="text-[11px] text-spec-muted font-medium">.csv</div>
                </div>
              </div>
              <div className="text-[12px] text-spec-muted flex-1 pl-4 hidden sm:block">Comma separated values</div>
              <div className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold shrink-0">
                Supported
              </div>
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* ROW 4: Images */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 shrink-0">
                  <ImageIcon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-spec-navy">Images</div>
                  <div className="text-[11px] text-spec-muted font-medium">.png, .jpg, .jpeg</div>
                </div>
              </div>
              <div className="text-[12px] text-spec-muted flex-1 pl-4 hidden sm:block">Image files</div>
              <div className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold shrink-0">
                Supported
              </div>
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* ROW 5: CAD */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-500 shrink-0">
                  <PenTool className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-spec-navy">CAD</div>
                  <div className="text-[11px] text-spec-muted font-medium">.dwg, .dxf</div>
                </div>
              </div>
              <div className="text-[12px] text-spec-muted flex-1 pl-4 hidden sm:block">CAD drawing files</div>
              <div className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold shrink-0">
                Supported
              </div>
            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-spec-border/50 text-[12px] text-spec-navy font-medium">
            Max file size: 50 MB per file
          </div>
        </div>

      </div>

      {/* Security Footer Notice */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-3">
        <Lock className="w-4 h-4 text-spec-primary shrink-0" />
        <span className="text-[13px] text-spec-navy font-medium">Your data is secure and encrypted.</span>
      </div>

    </div>
  )
}
