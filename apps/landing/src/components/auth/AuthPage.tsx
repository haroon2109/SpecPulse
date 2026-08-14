import { MarketingPanel } from './MarketingPanel'
import { AuthCard } from './AuthCard'
import { AuthFooter } from './AuthFooter'

export function AuthPage() {
  return (
    <div className="min-h-screen bg-spec-bg-subtle-1 flex flex-col font-sans text-spec-navy">
      
      {/* Main Container - Full viewport height minus footer */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        
        {/* Outer White Card Container */}
        <div className="w-full max-w-[1340px] bg-white rounded-[32px] shadow-sm border border-spec-border flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Subtle background element (if needed, kept simple) */}
          <div className="absolute inset-0 pointer-events-none rounded-[32px] overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-spec-bg-subtle-2/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          </div>

          {/* Left: Marketing Panel (~55%) */}
          <div className="w-full lg:w-[55%] p-8 md:p-12 xl:p-16 relative z-10 flex flex-col">
            <MarketingPanel />
          </div>

          {/* Right: Auth Card Panel (~45%) */}
          <div className="w-full lg:w-[45%] p-8 md:p-12 xl:p-16 bg-[#FAFCFF] relative z-10 flex items-center justify-center border-l border-spec-border/40">
            <AuthCard />
          </div>

        </div>
        
      </main>

      {/* Footer */}
      <AuthFooter />
      
    </div>
  )
}
