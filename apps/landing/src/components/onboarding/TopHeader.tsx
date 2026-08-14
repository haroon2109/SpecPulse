import { Link } from 'react-router-dom'
import { ShieldCheck, Check } from 'lucide-react'

export function TopHeader({ currentStep }: { currentStep: number }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-[#F7FAFF]">
      
      {/* Brand Logo */}
      <Link 
        to="/" 
        className="text-[15px] font-black tracking-tighter text-spec-navy hover:text-spec-primary transition-colors flex items-center gap-1.5"
      >
        <img src="/logo.png" alt="SpecPulse" className="h-6 w-auto" />
        SpecPulse
      </Link>

      {/* Stepper */}
      <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-3">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold z-10 relative ${currentStep > 1 ? 'bg-spec-primary text-white' : 'bg-spec-primary text-white'}`}>
            {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
          </div>
          <span className={`text-[11px] mt-1.5 absolute top-7 whitespace-nowrap ${currentStep >= 1 ? 'font-bold text-spec-navy' : 'font-medium text-spec-muted'}`}>User & Workspace</span>
        </div>
        
        <div className={`w-16 h-px ${currentStep > 1 ? 'bg-spec-primary' : 'bg-spec-border/80'}`}></div>
        
        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] z-10 relative ${currentStep > 2 ? 'bg-spec-primary text-white font-bold' : currentStep === 2 ? 'bg-spec-primary text-white font-bold' : 'bg-white border border-spec-border text-spec-muted font-medium'}`}>
             {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
          </div>
          <span className={`text-[11px] mt-1.5 absolute top-7 whitespace-nowrap ${currentStep >= 2 ? 'font-bold text-spec-navy' : 'font-medium text-spec-muted'}`}>Preferences</span>
        </div>

        <div className={`w-16 h-px ${currentStep > 2 ? 'bg-spec-primary' : 'bg-spec-border/80 border-dashed border-b bg-transparent h-0'}`}></div>
        
        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] z-10 relative ${currentStep > 3 ? 'bg-spec-primary text-white font-bold' : currentStep === 3 ? 'bg-spec-primary text-white font-bold' : 'bg-white border border-spec-border text-spec-muted font-medium'}`}>
            {currentStep > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
          </div>
          <span className={`text-[11px] mt-1.5 absolute top-7 whitespace-nowrap ${currentStep >= 3 ? 'font-bold text-spec-navy' : 'font-medium text-spec-muted'}`}>Data Sources</span>
        </div>

        <div className={`w-16 h-px ${currentStep > 3 ? 'bg-spec-primary' : 'bg-spec-border/80 border-dashed border-b bg-transparent h-0'}`}></div>
        
        {/* Step 4 */}
        <div className="flex flex-col items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] z-10 relative ${currentStep === 4 ? 'bg-spec-primary text-white font-bold' : 'bg-white border border-spec-border text-spec-muted font-medium'}`}>
            4
          </div>
          <span className={`text-[11px] mt-1.5 absolute top-7 whitespace-nowrap ${currentStep >= 4 ? 'font-bold text-spec-navy' : 'font-medium text-spec-muted'}`}>Review & Finish</span>
        </div>
        
      </div>

      {/* Secure Setup */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-spec-primary/5 flex items-center justify-center text-spec-primary">
          <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
        </div>
        <div className="hidden sm:block">
          <div className="text-[12px] font-bold text-spec-navy leading-tight">Secure Setup</div>
          <div className="text-[11px] text-spec-muted leading-tight">Your data is protected</div>
        </div>
      </div>
      
    </header>
  )
}
