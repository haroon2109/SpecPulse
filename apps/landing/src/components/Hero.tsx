import { Sparkles, FileUp, Play, ShieldCheck, CheckCircle, Server, Check, CloudUpload, FileSearch, Cpu, Share2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section id="product" className="relative overflow-hidden bg-white pt-16 pb-20">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.3]"></div>
      
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="max-w-2xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-spec-surface-light border border-spec-bright/20 px-4 py-1.5 text-sm font-semibold text-spec-primary mb-8">
              <Sparkles className="h-4 w-4" />
              AI-Powered Product Intelligence for Industrial Commerce
            </div>
            
            {/* Headline */}
            <h1 className="text-[44px] md:text-[56px] font-bold leading-[1.1] tracking-tight text-spec-navy mb-6">
              Transform Unstructured<br/>
              Data into Commerce-Ready<br/>
              <span className="text-spec-primary">Product Intelligence</span>
            </h1>
            
            {/* Description */}
            <p className="text-[17px] leading-relaxed text-spec-muted mb-10 max-w-xl">
              SpecPulse extracts, normalizes, validates and enriches product information from any spec sheet or catalog—delivering accurate, structured, and explainable data at scale.
            </p>
            
            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link to="/auth" className="inline-flex items-center gap-2 rounded-lg bg-spec-primary px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-spec-navy transition-colors">
                <FileUp className="h-5 w-5" />
                Upload Your Document
              </Link>
              <Link to="/auth" className="inline-flex items-center gap-2 rounded-lg border border-spec-border bg-white px-6 py-3.5 text-[15px] font-semibold text-spec-primary hover:bg-spec-bg-subtle-1 transition-colors">
                <Play className="h-5 w-5" />
                See It In Action
              </Link>
            </div>
            
            {/* Value Props Row */}
            <div className="flex flex-wrap items-start gap-x-8 gap-y-6 pt-6 border-t border-spec-border/60">
              <div className="flex gap-3 items-start">
                <ShieldCheck className="h-6 w-6 text-spec-primary shrink-0" />
                <div>
                  <div className="text-sm font-bold text-spec-navy">Explainable AI</div>
                  <div className="text-xs text-spec-muted mt-0.5">Source-grounded extractions</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="h-6 w-6 text-spec-primary shrink-0" />
                <div>
                  <div className="text-sm font-bold text-spec-navy">High Accuracy</div>
                  <div className="text-xs text-spec-muted mt-0.5">Validated & normalized outputs</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Server className="h-6 w-6 text-spec-primary shrink-0" />
                <div>
                  <div className="text-sm font-bold text-spec-navy">Built for Scale</div>
                  <div className="text-xs text-spec-muted mt-0.5">Enterprise-grade & production-ready</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Interactive Preview */}
          <div className="relative">
            {/* Main Floating Card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-spec-card border border-spec-border p-6 ml-auto w-[110%] -mr-[10%] hidden md:block">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-semibold text-spec-navy">Extraction Preview</div>
                <div className="w-2 h-2 rounded-full bg-spec-border flex items-center justify-center">
                  <div className="w-[1px] h-2.5 bg-spec-border rotate-45 absolute" />
                  <div className="w-[1px] h-2.5 bg-spec-border -rotate-45 absolute" />
                </div>
              </div>
              
              <div className="grid grid-cols-[1.2fr_2fr] gap-6">
                {/* Doc Preview Placeholder */}
                <div className="border border-spec-border rounded-lg bg-spec-bg-subtle-1 p-2 flex flex-col gap-2 relative h-[320px]">
                  {/* Fake document layout */}
                  <div className="h-3 w-16 bg-red-500 rounded-sm mb-2" />
                  <div className="h-2 w-32 bg-spec-border rounded-sm" />
                  <div className="h-2 w-24 bg-spec-border rounded-sm mb-4" />
                  
                  {/* Image placeholder */}
                  <div className="absolute top-8 right-2 w-12 h-16 bg-yellow-600/20 border border-yellow-600/30 rounded-sm"></div>
                  
                  {/* Table rows */}
                  <div className="space-y-1.5 mt-2">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="h-1.5 w-1/3 bg-gray-200 rounded-full" />
                        <div className="h-1.5 w-2/3 bg-gray-300 rounded-full" />
                      </div>
                    ))}
                  </div>
                  {/* Highlight box */}
                  <div className="absolute top-24 left-1 right-1 h-6 border-2 border-spec-primary/50 bg-spec-primary/10 rounded-sm" />
                </div>
                
                {/* Extracted Data Table */}
                <div>
                  <div className="grid grid-cols-3 gap-4 pb-2 border-b border-spec-border text-[11px] font-semibold text-spec-muted mb-3">
                    <div>Attribute</div>
                    <div>Extracted Value</div>
                    <div className="text-right">Confidence</div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { attr: 'Brand', val: 'Dixon', conf: '98%' },
                      { attr: 'MPN', val: 'BV2-100', conf: '97%' },
                      { attr: 'Material', val: 'Brass', conf: '95%' },
                      { attr: 'Thread Size', val: '1/2 in', conf: '96%' },
                      { attr: 'Pressure Rating', val: '600 PSI', conf: '93%' },
                      { attr: 'Temperature Range', val: '-20°C to 120°C', conf: '94%' },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-3 gap-4 items-center text-[13px]">
                        <div className="font-medium text-spec-navy">{row.attr}</div>
                        <div className="text-spec-navy">{row.val}</div>
                        <div className="flex items-center justify-end gap-2 text-spec-muted font-medium">
                          {row.conf}
                          <div className="w-8 h-1.5 bg-spec-bg-subtle-1 rounded-full overflow-hidden">
                            <div className="h-full bg-spec-green rounded-full" style={{ width: row.conf }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-right">
                    <a href="#" className="text-xs font-semibold text-spec-primary hover:underline">
                      View all 24 attributes →
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Confidence Score */}
            <div className="absolute -top-12 -right-4 z-20 bg-white rounded-xl shadow-spec-card border border-spec-border p-4 flex flex-col items-center justify-center hidden md:flex">
              <div className="text-[10px] font-bold text-spec-navy uppercase tracking-wider mb-2">Confidence Score</div>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                  <path
                    className="text-spec-bg-subtle-1"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-spec-primary"
                    strokeWidth="3"
                    strokeDasharray="94, 100"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-sm font-bold text-spec-navy">94%</div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Pipeline Bar */}
        <div className="mt-20 pt-10">
          <div className="bg-white rounded-2xl shadow-spec-card border border-spec-border p-6 hidden md:flex justify-between items-center max-w-[1000px] mx-auto">
            {[
              { label: 'Ingestion', icon: CloudUpload, color: 'bg-blue-100 text-blue-600' },
              { label: 'Parsing', icon: FileSearch, color: 'bg-green-100 text-green-600' },
              { label: 'Extraction', icon: Cpu, color: 'bg-blue-100 text-blue-600' },
              { label: 'Validation', icon: ShieldCheck, color: 'bg-purple-100 text-purple-600' },
              { label: 'Enrichment', icon: Share2, color: 'bg-orange-100 text-orange-600' },
              { label: 'Ready', icon: Check, color: 'bg-green-500 text-white' },
            ].map((step, idx, arr) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${step.color}`}>
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div className="text-xs font-semibold text-spec-navy">{step.label}</div>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="text-slate-400 px-2 h-12 flex items-center">
                      <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  )
}
