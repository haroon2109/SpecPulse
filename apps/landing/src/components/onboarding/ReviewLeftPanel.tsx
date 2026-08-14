import { Settings, ShieldCheck, Zap, Headset, Check } from 'lucide-react'

function ReviewIllustration() {
  return (
    <div className="relative w-[340px] h-[300px] mx-auto scale-90 sm:scale-100 origin-center my-6 flex items-center justify-center">
      
      {/* Background connector paths */}
      <svg className="absolute inset-0 w-full h-full text-spec-primary/20 z-0" viewBox="0 0 340 300" fill="none">
        {/* Connectors */}
        <path d="M170 60 L170 80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M60 160 L80 160" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M280 160 L260 160" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M170 240 L170 220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Sparkles */}
        <path d="M260 60 l1-4 l4-1 l-4-1 l-1-4 l-1 4 l-4 1 l4 1 z" fill="#DCE6F2" />
        <path d="M70 80 l1-4 l4-1 l-4-1 l-1-4 l-1 4 l-4 1 l4 1 z" fill="#DCE6F2" />
      </svg>

      {/* Top Node */}
      <div className="absolute top-[20px] left-[150px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <svg className="w-5 h-5 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      </div>

      {/* Left Node */}
      <div className="absolute top-[140px] left-[20px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <svg className="w-5 h-5 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
      </div>

      {/* Right Node */}
      <div className="absolute top-[140px] right-[20px] w-10 h-10 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <svg className="w-5 h-5 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
      </div>

      {/* Bottom Node */}
      <div className="absolute bottom-[20px] left-[150px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* CENTRAL DASHBOARD */}
      <div className="absolute top-[80px] left-[80px] w-[180px] bg-white rounded-xl shadow-[0_8px_30px_rgba(15,39,79,0.06)] border border-spec-border overflow-hidden z-20 flex pb-4">
        
        {/* Left Sidebar */}
        <div className="w-6 bg-spec-navy h-full flex flex-col items-center py-3 gap-2">
          <div className="w-3 h-3 rounded text-white flex items-center justify-center font-bold text-[8px]">S</div>
          <div className="w-3 h-px bg-white/20 my-1"></div>
          <div className="w-2.5 h-2.5 rounded-sm bg-white/20"></div>
          <div className="w-2.5 h-2.5 rounded-sm bg-white/10"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-3 pt-3">
          <div className="w-16 h-2 rounded bg-spec-bg-subtle-1 mb-4"></div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border border-blue-200 bg-blue-50"></div>
              <div className="flex-1">
                <div className="w-full h-1.5 rounded bg-spec-bg-subtle-1 mb-1"></div>
                <div className="w-2/3 h-1.5 rounded bg-spec-bg-subtle-1"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border border-green-200 bg-green-50"></div>
              <div className="flex-1">
                <div className="w-full h-1.5 rounded bg-spec-bg-subtle-1 mb-1"></div>
                <div className="w-3/4 h-1.5 rounded bg-spec-bg-subtle-1"></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border border-purple-200 bg-purple-50"></div>
              <div className="flex-1">
                <div className="w-full h-1.5 rounded bg-spec-bg-subtle-1 mb-1"></div>
                <div className="w-1/2 h-1.5 rounded bg-spec-bg-subtle-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Completion Checkmark Badge */}
      <div className="absolute top-[160px] left-[220px] w-12 h-12 bg-spec-primary rounded-full shadow-[0_4px_14px_rgba(18,104,232,0.4)] border-4 border-white flex items-center justify-center text-white z-30 transform translate-x-2 translate-y-2">
        <Check className="w-6 h-6 stroke-[3]" />
      </div>

    </div>
  )
}

export function ReviewLeftPanel() {
  return (
    <div className="bg-[#F2F7FF] rounded-3xl border border-spec-border/40 p-8 xl:p-10 flex flex-col h-full mt-4 lg:mt-0">
      
      {/* Welcome Message */}
      <div className="mb-4">
        <h3 className="text-spec-primary font-bold text-[14px] mb-2 flex items-center gap-1.5">
          Almost done! <span className="text-[16px] origin-bottom-right hover:animate-wave inline-block">🎉</span>
        </h3>
        <h1 className="text-[26px] xl:text-[28px] font-bold text-spec-navy leading-[1.2] mb-3">
          Review your setup<br />
          and you're all set
        </h1>
        <p className="text-[14px] text-spec-muted leading-relaxed max-w-[90%]">
          Here's a summary of your workspace<br />
          configuration. You can go back to make<br />
          changes if needed.
        </p>
      </div>

      {/* Review Illustration */}
      <ReviewIllustration />

      {/* Feature Highlights */}
      <div className="grid grid-cols-4 gap-2 mb-10 mt-2">
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Ready to Go</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Your workspace<br/>is configured</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <Settings className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Optimized</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Tailored to your<br/>goals</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Secure</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Enterprise-grade<br/>protection</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <Zap className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Powerful</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">AI-ready product<br/>intelligence</div>
        </div>
      </div>

      {/* Support Card */}
      <div className="mt-auto bg-white rounded-xl p-4 border border-spec-border shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-spec-bg-subtle-1 flex items-center justify-center text-spec-primary shrink-0">
            <Headset className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-spec-navy">Need help getting started?</div>
            <div className="text-[11px] text-spec-muted mt-0.5">Our team is here to help you succeed.</div>
          </div>
        </div>
        <button className="text-[11px] font-bold text-spec-primary flex items-center gap-1 hover:underline">
          Contact Support <span>→</span>
        </button>
      </div>
      
    </div>
  )
}
