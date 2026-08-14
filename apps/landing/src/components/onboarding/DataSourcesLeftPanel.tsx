import { CloudUpload, FileText, ShieldCheck, Zap, Globe, Image as ImageIcon, Database } from 'lucide-react'

function DataSourcesIllustration() {
  return (
    <div className="relative w-[340px] h-[300px] mx-auto scale-90 sm:scale-100 origin-center my-6 flex items-center justify-center">
      
      {/* Background connector paths */}
      <svg className="absolute inset-0 w-full h-full text-spec-primary/20 z-0" viewBox="0 0 340 300" fill="none">
        {/* Lines connecting nodes to center */}
        <path d="M170 40 L170 70" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M50 150 L75 150" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M290 150 L265 150" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M100 240 L120 220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M240 240 L220 220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Subtle decorative sparkles */}
        <path d="M260 50 l1-4 l4-1 l-4-1 l-1-4 l-1 4 l-4 1 l4 1 z" fill="#DCE6F2" />
        <path d="M80 70 l1-4 l4-1 l-4-1 l-1-4 l-1 4 l-4 1 l4 1 z" fill="#DCE6F2" />
        <path d="M280 230 l1.5-6 l6-1.5 l-6-1.5 l-1.5-6 l-1.5 6 l-6 1.5 l6 1.5 z" fill="#DCE6F2" />
      </svg>

      {/* Node: PDF Top */}
      <div className="absolute top-[10px] left-[150px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-red-500 z-10">
        <FileText className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Spreadsheet Left */}
      <div className="absolute top-[130px] left-[10px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-green-600 z-10">
        <Database className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Image Right */}
      <div className="absolute top-[130px] right-[10px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-green-500 z-10">
        <ImageIcon className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: CAD Bottom Left */}
      <div className="absolute bottom-[20px] left-[60px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-blue-500 z-10">
        <FileText className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Globe Bottom Right */}
      <div className="absolute bottom-[20px] right-[60px] w-10 h-10 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-purple-500 z-10">
        <Globe className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* CENTRAL DATA SOURCES DASHBOARD */}
      <div className="absolute top-[70px] left-[75px] w-[190px] bg-white rounded-xl shadow-[0_8px_30px_rgba(15,39,79,0.06)] border border-spec-border overflow-hidden z-20 flex flex-col pb-3">
        
        {/* Header */}
        <div className="flex items-center gap-1 px-3 pt-3 pb-2 border-b border-spec-border/40">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
        
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded bg-spec-primary text-white flex items-center justify-center font-bold text-[8px]">S</div>
            <div className="text-[10px] font-bold text-spec-navy">Data Sources</div>
          </div>
          
          {/* Source Items */}
          <div className="space-y-2 mb-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3 text-red-500 stroke-[2]" />
                <span className="text-[8px] font-semibold text-spec-navy">Spec Sheets / PDFs</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-3 h-3 text-green-500 stroke-[2]" />
                <span className="text-[8px] font-semibold text-spec-navy">Product Images</span>
              </div>
              <div className="w-3 h-3 rounded-full border border-spec-border bg-white flex items-center justify-center">
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-3 h-3 text-green-600 stroke-[2]" />
                <span className="text-[8px] font-semibold text-spec-navy">Tables / Spreadsheets</span>
              </div>
              <div className="w-3 h-3 rounded-full border border-spec-border bg-white flex items-center justify-center">
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 text-purple-500 stroke-[2]" />
                <span className="text-[8px] font-semibold text-spec-navy">Web / URLs</span>
              </div>
              <div className="w-3 h-3 rounded-full border border-spec-border bg-white flex items-center justify-center">
              </div>
            </div>
            
          </div>

          {/* Processing Bar */}
          <div className="flex items-center gap-2">
            <span className="text-[7px] text-spec-muted">Processing...</span>
            <div className="flex-1 h-1.5 bg-spec-bg-subtle-1 rounded-full overflow-hidden">
              <div className="h-full bg-spec-primary w-[72%] rounded-full"></div>
            </div>
            <span className="text-[7px] font-bold text-spec-navy">72%</span>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export function DataSourcesLeftPanel() {
  return (
    <div className="bg-[#F2F7FF] rounded-3xl border border-spec-border/40 p-8 xl:p-10 flex flex-col h-full mt-4 lg:mt-0">
      
      {/* Welcome Message */}
      <div className="mb-4">
        <h3 className="text-spec-primary font-bold text-[14px] mb-2 flex items-center gap-1.5">
          One more step! <span className="text-[16px] origin-bottom-right hover:animate-wave inline-block">🚀</span>
        </h3>
        <h1 className="text-[26px] xl:text-[28px] font-bold text-spec-navy leading-[1.2] mb-3">
          Connect your<br />
          product data sources
        </h1>
        <p className="text-[14px] text-spec-muted leading-relaxed max-w-[90%]">
          Tell us where your product data lives so<br />
          SpecPulse can extract, normalize, and<br />
          enrich it for you.
        </p>
      </div>

      {/* Product Illustration */}
      <DataSourcesIllustration />

      {/* Feature Highlights */}
      <div className="grid grid-cols-4 gap-2 mb-10 mt-2">
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <CloudUpload className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Easy Ingestion</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Bring data in<br/>from any source</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <FileText className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Multiple Formats</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">PDFs, images,<br/>tables & more</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Secure</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Your data stays<br/>protected</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <Zap className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Fast Setup</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Start processing<br/>in minutes</div>
        </div>
      </div>

      {/* Security Card */}
      <div className="mt-auto bg-white rounded-xl p-4 border border-spec-border shadow-sm flex gap-3">
        <div className="w-8 h-8 rounded-full bg-spec-bg-subtle-1 flex items-center justify-center text-spec-primary shrink-0">
          <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
        </div>
        <div>
          <div className="text-[12px] font-bold text-spec-navy">Your data is secure</div>
          <div className="text-[11px] text-spec-muted mt-0.5 leading-relaxed">
            Your connected sources are encrypted and protected.<br />
            You control what SpecPulse can access.
          </div>
        </div>
      </div>
      
    </div>
  )
}
