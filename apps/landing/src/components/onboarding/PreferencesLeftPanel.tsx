import { SlidersHorizontal, Target, Layers, Zap, Headset, User, BarChart2, ShieldCheck, Settings } from 'lucide-react'

function PreferencesIllustration() {
  return (
    <div className="relative w-[340px] h-[280px] mx-auto scale-90 sm:scale-100 origin-center my-6 flex items-center justify-center">
      
      {/* Background connector paths */}
      <svg className="absolute inset-0 w-full h-full text-spec-primary/20 z-0" viewBox="0 0 340 280" fill="none">
        {/* Lines connecting nodes to center */}
        <path d="M170 50 L170 80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M50 140 L80 140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M290 140 L260 140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M170 230 L170 200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Subtle decorative sparkles */}
        <path d="M250 50 l1-4 l4-1 l-4-1 l-1-4 l-1 4 l-4 1 l4 1 z" fill="#DCE6F2" />
        <path d="M90 210 l1-4 l4-1 l-4-1 l-1-4 l-1 4 l-4 1 l4 1 z" fill="#DCE6F2" />
        <path d="M280 200 l1.5-6 l6-1.5 l-6-1.5 l-1.5-6 l-1.5 6 l-6 1.5 l6 1.5 z" fill="#DCE6F2" />
      </svg>

      {/* Node: Settings Top */}
      <div className="absolute top-[20px] left-[150px] w-10 h-10 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <Settings className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: User Left */}
      <div className="absolute top-[120px] left-[10px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <User className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Chart Right */}
      <div className="absolute top-[120px] right-[10px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-[#16A34A] z-10">
        <BarChart2 className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Shield Bottom */}
      <div className="absolute bottom-[20px] left-[150px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* CENTRAL PREFERENCES DASHBOARD */}
      <div className="absolute top-[60px] left-[55px] w-[230px] h-[160px] bg-white rounded-xl shadow-[0_8px_30px_rgba(15,39,79,0.06)] border border-spec-border overflow-hidden z-20 flex flex-col p-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-spec-primary text-white flex items-center justify-center font-bold text-[10px]">S</div>
            <div className="space-y-1">
              <div className="h-1.5 w-16 bg-spec-navy rounded-full"></div>
            </div>
          </div>
          <div className="w-4 h-4 bg-spec-bg-subtle-1 rounded-full"></div>
        </div>
        
        {/* Preference Items */}
        <div className="space-y-3">
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-spec-primary/20 flex items-center justify-center shrink-0">
               <svg className="w-2 h-2 text-spec-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div className="h-1.5 w-full bg-spec-muted/20 rounded-full"></div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-spec-primary/20 flex items-center justify-center shrink-0">
               <svg className="w-2 h-2 text-spec-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div className="h-1.5 w-4/5 bg-spec-muted/20 rounded-full"></div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-spec-border bg-white flex items-center justify-center shrink-0">
            </div>
            <div className="h-1.5 w-2/3 bg-spec-muted/20 rounded-full"></div>
          </div>
          
        </div>
        
      </div>
      
    </div>
  )
}

export function PreferencesLeftPanel() {
  return (
    <div className="bg-[#F2F7FF] rounded-3xl border border-spec-border/40 p-8 xl:p-10 flex flex-col h-full mt-4 lg:mt-0">
      
      {/* Welcome Message */}
      <div className="mb-4">
        <h3 className="text-spec-primary font-bold text-[14px] mb-2 flex items-center gap-1.5">
          Personalize your SpecPulse experience <span className="text-[16px] origin-bottom-right hover:animate-wave inline-block">🎉</span>
        </h3>
        <h1 className="text-[26px] xl:text-[28px] font-bold text-spec-navy leading-[1.2] mb-3">
          Tell us what you want<br />
          to accomplish with SpecPulse
        </h1>
        <p className="text-[14px] text-spec-muted leading-relaxed max-w-[90%]">
          Choose your preferences so we can tailor your product<br />
          intelligence workspace to the way your team works.
        </p>
      </div>

      {/* Product Illustration */}
      <PreferencesIllustration />

      {/* Feature Highlights */}
      <div className="grid grid-cols-4 gap-2 mb-10 mt-2">
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#F97316] shadow-sm border border-spec-border/40 mb-2">
            <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Personalized</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Relevant insights<br/>for your workflow</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#16A34A] shadow-sm border border-spec-border/40 mb-2">
            <Target className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Efficient</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Focus on the data<br/>that matters</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <Layers className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Consistent</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Standardized product<br/>intelligence</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#8B5CF6] shadow-sm border border-spec-border/40 mb-2">
            <Zap className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Actionable</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Turn data into<br/>better decisions</div>
        </div>
      </div>

      {/* Support Card */}
      <div className="mt-auto bg-white rounded-xl p-4 border border-spec-border shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-spec-bg-subtle-1 flex items-center justify-center text-spec-primary">
            <Headset className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-spec-navy">Your preferences are secure</div>
            <div className="text-[11px] text-spec-muted">We use this information only to enhance your experience.</div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
