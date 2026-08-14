import { Target, Activity, LayoutTemplate, Layers, ArrowLeft, Check, ChevronDown } from 'lucide-react'

export function PreferencesFormCard({ state, updateState, onBack, onContinue }: { state: any, updateState: (s: any) => void, onBack: () => void, onContinue: () => void }) {
  
  const toggleSelection = (field: string, value: string) => {
    const current = state[field] as string[]
    if (current.includes(value)) {
      updateState({ [field]: current.filter(v => v !== value) })
    } else {
      updateState({ [field]: [...current, value] })
    }
  }

  const primaryGoals = [
    { id: 'extract', label: 'Extract product data at scale', icon: Layers },
    { id: 'quality', label: 'Improve data quality & accuracy', icon: Target },
    { id: 'catalogs', label: 'Build product catalogs', icon: LayoutTemplate },
    { id: 'monitor', label: 'Monitor competitor products', icon: Activity },
  ]

  const dataTypes = [
    { id: 'pdf', label: 'Spec Sheets / PDFs' },
    { id: 'img', label: 'Product Images' },
    { id: 'table', label: 'Tables / Spreadsheets' },
    { id: 'web', label: 'Web / URLs' },
  ]

  return (
    <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(15,39,79,0.04)] border border-spec-border/60 p-8 xl:p-12 h-full flex flex-col mt-4 lg:mt-0">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[22px] font-bold text-spec-navy mb-1">Set your preferences</h2>
        <p className="text-[13px] text-spec-muted">Help us tailor your workspace to your needs.</p>
      </div>

      <div className="h-px w-full bg-[#E2E8F0] mb-6"></div>

      <form className="flex-1 flex flex-col" onSubmit={e => { e.preventDefault(); onContinue(); }}>
        
        {/* Primary Goals Section */}
        <div className="mb-8">
          <label className="text-[13px] font-bold text-spec-navy block mb-1">
            What are your primary goals? <span className="text-red-500">*</span>
          </label>
          <p className="text-[12px] text-spec-muted mb-4">Select all that apply.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {primaryGoals.map(goal => (
              <div 
                key={goal.id} 
                onClick={() => toggleSelection('goals', goal.label)}
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${state.goals.includes(goal.label) ? 'border-spec-primary bg-spec-bg-subtle-1' : 'border-spec-border hover:border-spec-primary/40'}`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${state.goals.includes(goal.label) ? 'bg-spec-primary border-spec-primary text-white' : 'border-spec-border bg-white text-transparent'}`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-spec-navy">
                  <goal.icon className="w-4 h-4 text-spec-muted" />
                  {goal.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-[#E2E8F0] mb-6"></div>

        {/* Data Types & Details Section */}
        <div className="mb-8">
          <label className="text-[13px] font-bold text-spec-navy block mb-1">
            What data types will you process?
          </label>
          <p className="text-[12px] text-spec-muted mb-4">You can connect specific sources in the next step.</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {dataTypes.map(type => (
              <div 
                key={type.id}
                onClick={() => toggleSelection('dataTypes', type.label)}
                className={`px-4 py-2 rounded-full border text-[12px] font-medium cursor-pointer transition-all ${state.dataTypes.includes(type.label) ? 'border-spec-primary bg-spec-primary text-white' : 'border-spec-border bg-white text-spec-navy hover:border-spec-primary/40'}`}
              >
                {type.label}
              </div>
            ))}
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
