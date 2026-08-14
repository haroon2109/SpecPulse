import { ShieldCheck, Lock, Users, Zap, Headset, Building2, Database } from 'lucide-react'

function WorkspaceIllustration() {
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

      {/* Node: Organization Top */}
      <div className="absolute top-[20px] left-[150px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <Building2 className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Team Left */}
      <div className="absolute top-[120px] left-[10px] w-10 h-10 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <Users className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Database Right */}
      <div className="absolute top-[120px] right-[10px] w-10 h-10 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <Database className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Security Bottom */}
      <div className="absolute bottom-[20px] left-[150px] w-10 h-10 bg-white rounded-lg shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-10">
        <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* CENTRAL DASHBOARD CARD */}
      <div className="absolute top-[60px] left-[60px] w-[220px] h-[160px] bg-white rounded-xl shadow-[0_8px_30px_rgba(15,39,79,0.06)] border border-spec-border overflow-hidden z-20 flex">
        
        {/* Sidebar */}
        <div className="w-[30px] bg-spec-navy h-full flex flex-col items-center py-3 gap-3">
          <div className="w-4 h-4 bg-spec-primary rounded-sm mb-2 text-[8px] text-white flex items-center justify-center font-bold">S</div>
          <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
          <div className="w-3 h-3 bg-white/10 rounded-sm"></div>
          <div className="w-3 h-3 bg-white/10 rounded-sm"></div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-3 bg-white flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-spec-bg-subtle-1 text-spec-primary flex items-center justify-center">
                <Users className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-12 bg-spec-muted/30 rounded-full"></div>
                <div className="h-1 w-8 bg-spec-muted/20 rounded-full"></div>
              </div>
            </div>
            <div className="w-2 h-2 text-spec-muted/50 font-bold text-[8px] flex items-center justify-center leading-none">x</div>
          </div>
          
          {/* Top Cards Row */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 h-[26px] border border-spec-border/60 rounded flex items-center px-2">
               <div className="h-1 w-8 bg-spec-primary/40 rounded-full"></div>
            </div>
            <div className="flex-1 h-[26px] border border-spec-border/60 rounded flex items-center px-2">
               <div className="h-1 w-10 bg-spec-muted/20 rounded-full"></div>
            </div>
          </div>
          
          {/* Bottom Visualizations Row */}
          <div className="flex gap-2 flex-1">
            {/* Bar Chart */}
            <div className="flex-[1.2] border border-spec-border/60 rounded p-1.5 flex items-end justify-around pb-2">
              <div className="w-2.5 h-[60%] bg-spec-primary/80 rounded-t-sm"></div>
              <div className="w-2.5 h-[40%] bg-spec-primary/60 rounded-t-sm"></div>
              <div className="w-2.5 h-[80%] bg-spec-primary rounded-t-sm"></div>
              <div className="w-2.5 h-[30%] bg-spec-primary/40 rounded-t-sm"></div>
            </div>
            
            {/* Circular Chart */}
            <div className="flex-1 border border-spec-border/60 rounded p-1.5 flex items-center justify-center flex-col gap-1.5">
               <div className="h-1 w-12 bg-spec-muted/20 rounded-full"></div>
               <div className="h-1 w-8 bg-spec-muted/20 rounded-full mb-1"></div>
               <div className="relative w-7 h-7">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                  <path className="text-spec-bg-subtle-1" strokeWidth="6" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-spec-primary" strokeWidth="6" strokeDasharray="75, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export function MarketingPanel() {
  return (
    <div className="bg-[#F2F7FF] rounded-3xl border border-spec-border/40 p-8 xl:p-10 flex flex-col h-full mt-4 lg:mt-0">
      
      {/* Welcome Message */}
      <div className="mb-4">
        <h3 className="text-spec-primary font-bold text-[14px] mb-2 flex items-center gap-1.5">
          Welcome to SpecPulse <span className="text-[16px] origin-bottom-right hover:animate-wave inline-block">👋</span>
        </h3>
        <h1 className="text-[26px] xl:text-[28px] font-bold text-spec-navy leading-[1.2] mb-3">
          Let’s set up your workspace<br />
          to power product intelligence
        </h1>
        <p className="text-[14px] text-spec-muted leading-relaxed max-w-[90%]">
          Tell us a bit about yourself and your organization<br />
          so we can personalize your experience.
        </p>
      </div>

      {/* Product Illustration */}
      <WorkspaceIllustration />

      {/* Feature Highlights */}
      <div className="grid grid-cols-4 gap-2 mb-10 mt-2">
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Enterprise Secure</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Industry-standard<br/>encryption</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <Lock className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Private & Safe</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Your data stays<br/>private</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <Users className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Team Ready</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Built for data<br/>teams</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-spec-primary shadow-sm border border-spec-border/40 mb-2">
            <Zap className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-[11px] font-bold text-spec-navy">Quick Setup</div>
          <div className="text-[10px] text-spec-muted leading-tight mt-0.5">Get started in<br/>minutes</div>
        </div>
      </div>

      {/* Support Card */}
      <div className="mt-auto bg-white rounded-xl p-4 border border-spec-border shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-spec-bg-subtle-1 flex items-center justify-center text-spec-primary">
            <Headset className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-spec-navy">Need help getting started?</div>
            <div className="text-[11px] text-spec-muted">Our team is here to help you succeed.</div>
          </div>
        </div>
        <button className="text-[12px] font-bold text-spec-primary hover:text-spec-navy transition-colors px-3 py-1.5 border border-spec-border rounded-md hover:bg-spec-bg-subtle-1">
          Contact Support →
        </button>
      </div>
      
    </div>
  )
}
