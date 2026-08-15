import { User, Mail, Briefcase, Phone, Building2, Link as LinkIcon, Check, ChevronDown } from 'lucide-react'

export function WorkspaceFormCard({ state, updateState, onContinue }: { state: any, updateState: (s: any) => void, onContinue: () => void }) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updateState({ [name]: value })
  }

  return (
    <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(15,39,79,0.04)] border border-spec-border/60 p-8 xl:p-12 h-full flex flex-col mt-4 lg:mt-0">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[22px] font-bold text-spec-navy mb-1">Welcome to SpecPulse</h2>
        <p className="text-[13px] text-spec-muted">Create your account and workspace</p>
      </div>

      <form className="flex-1 flex flex-col" onSubmit={e => { e.preventDefault(); onContinue(); }}>
        
        {/* User Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
          
          <div className="col-span-1 md:col-span-2 flex items-center justify-between border-b border-spec-border/50 pb-2 mb-2">
            <h3 className="text-[14px] font-bold text-spec-navy">Your Details</h3>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-spec-muted">
                <User className="w-4 h-4" />
              </div>
              <input name="fullName" value={state.fullName} onChange={handleInputChange} type="text" placeholder="Alex Johnson" className="w-full pl-9 pr-3 py-2.5 border border-spec-border rounded-lg text-[13px] placeholder:text-spec-muted/60 focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all outline-none" />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Work Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-spec-muted">
                <Mail className="w-4 h-4" />
              </div>
              <input name="workEmail" value={state.workEmail} onChange={handleInputChange} type="email" placeholder="alex@company.com" className="w-full pl-9 pr-3 py-2.5 border border-spec-border rounded-lg text-[13px] placeholder:text-spec-muted/60 focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all outline-none" />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Job Title</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-spec-muted">
                <Briefcase className="w-4 h-4" />
              </div>
              <input name="jobTitle" value={state.jobTitle} onChange={handleInputChange} type="text" placeholder="Product Manager" className="w-full pl-9 pr-3 py-2.5 border border-spec-border rounded-lg text-[13px] placeholder:text-spec-muted/60 focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all outline-none" />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Phone Number (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-spec-muted">
                <Phone className="w-4 h-4" />
              </div>
              <input name="phone" value={state.phone} onChange={handleInputChange} type="tel" placeholder="+1 (555) 000-0000" className="w-full pl-9 pr-3 py-2.5 border border-spec-border rounded-lg text-[13px] placeholder:text-spec-muted/60 focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all outline-none" />
            </div>
          </div>

        </div>

        {/* Workspace Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
          
          <div className="col-span-1 md:col-span-2 flex items-center justify-between border-b border-spec-border/50 pb-2 mb-2">
            <h3 className="text-[14px] font-bold text-spec-navy">Workspace</h3>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Workspace / Company Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-spec-muted">
                <Building2 className="w-4 h-4" />
              </div>
              <input name="workspaceName" value={state.workspaceName} onChange={handleInputChange} type="text" placeholder="Enter your company or workspace name" className="w-full pl-9 pr-3 py-2.5 border border-spec-border rounded-lg text-[13px] placeholder:text-spec-muted/60 focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all outline-none" />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Workspace URL Slug</label>
            <div className="flex items-center">
              <div className="flex items-center px-3 py-2.5 bg-spec-bg-subtle-1 border border-r-0 border-spec-border rounded-l-lg text-[13px] text-spec-muted">
                <LinkIcon className="w-4 h-4 mr-1.5" />
                specpulse.com/
              </div>
              <input name="workspaceSlug" value={state.workspaceSlug} onChange={handleInputChange} type="text" placeholder="your-workspace" className="flex-1 px-3 py-2.5 border border-spec-border rounded-r-lg text-[13px] focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all outline-none" />
            </div>
            <div className="text-[11px] text-spec-muted mt-1.5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-green-500" /> URL is available
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Industry</label>
            <div className="relative">
              <select name="industry" value={state.industry} onChange={handleInputChange} className="w-full pl-3 pr-8 py-2.5 border border-spec-border rounded-lg text-[13px] text-spec-navy focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all outline-none appearance-none bg-white">
                <option value="" disabled>Select industry</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-spec-muted">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-spec-navy block mb-1.5">Team Size</label>
            <div className="relative">
              <select name="teamSize" value={state.teamSize} onChange={handleInputChange} className="w-full pl-3 pr-8 py-2.5 border border-spec-border rounded-lg text-[13px] text-spec-navy focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all outline-none appearance-none bg-white">
                <option value="" disabled>Select team size</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="200+">200+</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-spec-muted">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>



        {/* Action */}
        <div className="pt-2 flex justify-end">
          <button type="submit" className="px-8 py-2.5 text-[14px] font-bold text-white bg-spec-primary rounded-lg hover:bg-spec-navy transition-colors flex items-center gap-2 shadow-sm">
            Continue <span>→</span>
          </button>
        </div>

      </form>
    </div>
  )
}
