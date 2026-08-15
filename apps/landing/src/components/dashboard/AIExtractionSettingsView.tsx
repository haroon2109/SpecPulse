import { useState } from 'react'
import { ChevronRight, SlidersHorizontal, Lock } from 'lucide-react'

interface AIExtractionSettingsViewProps {
  onNavigate: (tab: 'settings') => void;
}

export function AIExtractionSettingsView({ onNavigate }: AIExtractionSettingsViewProps) {
  // Form State
  const [aiModel, setAiModel] = useState('')
  const [extractionMode, setExtractionMode] = useState('')
  const [confidenceThreshold, setConfidenceThreshold] = useState(70)
  const [sourceGrounding, setSourceGrounding] = useState(false)
  const [automaticValidation, setAutomaticValidation] = useState(false)

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] mb-6 mt-2">
        <button 
          onClick={() => onNavigate('settings')}
          className="text-spec-muted hover:text-spec-navy transition-colors"
        >
          Settings
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-spec-muted" />
        <span className="font-bold text-spec-navy">AI & Extraction</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-spec-primary shrink-0">
            <SlidersHorizontal className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h1 className="text-[26px] font-bold text-spec-navy">AI & Extraction</h1>
        </div>
        <p className="text-[14px] text-spec-muted">
          Configure AI models, extraction rules and automation preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        
        {/* AI Model Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">AI Model</h2>
          <p className="text-[13px] text-spec-muted mb-6">Choose the AI model used for product data extraction and enrichment.</p>

          <div>
            <label className="block text-[13px] font-bold text-spec-navy mb-2">AI Model</label>
            <div className="relative">
              <select 
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className={`w-full h-10 pl-3 pr-10 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[14px] ${aiModel ? 'text-spec-navy' : 'text-[#8899AE]'} focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
              >
                <option value="" disabled>Select an AI model</option>
                <option value="gpt-4o">GPT-4o (OpenAI)</option>
                <option value="gpt-4-turbo">GPT-4 Turbo (OpenAI)</option>
                <option value="claude-3-opus">Claude 3 Opus (Anthropic)</option>
                <option value="claude-3-sonnet">Claude 3.5 Sonnet (Anthropic)</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none rotate-90" />
            </div>
          </div>
        </div>

        {/* Extraction Settings Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Extraction Settings</h2>
          <p className="text-[13px] text-spec-muted mb-6">Control how SpecPulse extracts structured product information.</p>

          <div className="flex flex-col gap-6">
            
            {/* Extraction Mode */}
            <div>
              <label className="block text-[13px] font-bold text-spec-navy mb-2">Extraction Mode</label>
              <div className="relative">
                <select 
                  value={extractionMode}
                  onChange={(e) => setExtractionMode(e.target.value)}
                  className={`w-full h-10 pl-3 pr-10 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[14px] ${extractionMode ? 'text-spec-navy' : 'text-[#8899AE]'} focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
                >
                  <option value="" disabled>Select extraction mode</option>
                  <option value="strict">Strict (High Confidence Only)</option>
                  <option value="balanced">Balanced (Default)</option>
                  <option value="aggressive">Aggressive (Maximum Recall)</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none rotate-90" />
              </div>
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* Confidence Threshold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[13px] font-bold text-spec-navy">Confidence Threshold</label>
                <span className="text-[13px] font-bold text-spec-primary">{confidenceThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                className="w-full accent-spec-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="w-full h-px bg-spec-border/40"></div>

            {/* Source Grounding */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-bold text-spec-navy mb-0.5">Source Grounding</div>
                <div className="text-[12px] text-spec-muted">Keep extracted attributes grounded in the source document.</div>
              </div>
              <button 
                onClick={() => setSourceGrounding(!sourceGrounding)}
                className={`relative w-[42px] h-6 rounded-full transition-colors shrink-0 ${sourceGrounding ? 'bg-spec-primary' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${sourceGrounding ? 'translate-x-[18px]' : 'translate-x-0'}`}></div>
              </button>
            </div>

          </div>
        </div>

        {/* Automation Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Automation</h2>
          <p className="text-[13px] text-spec-muted mb-6">Control how extraction and validation workflows are handled.</p>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold text-spec-navy mb-0.5">Automatic Validation</div>
              <div className="text-[12px] text-spec-muted">Automatically validate extracted product attributes against configured rules.</div>
            </div>
            <button 
              onClick={() => setAutomaticValidation(!automaticValidation)}
              className={`relative w-[42px] h-6 rounded-full transition-colors shrink-0 ${automaticValidation ? 'bg-spec-primary' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${automaticValidation ? 'translate-x-[18px]' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Area */}
      <div className="flex items-center gap-3 justify-end mb-8">
        <button className="px-5 py-2.5 bg-white text-spec-navy border border-spec-border rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-5 py-2.5 bg-spec-primary text-white rounded-lg text-[13px] font-bold hover:bg-spec-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          Save Changes
        </button>
      </div>

      {/* Security Footer Notice */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-3 mb-6">
        <Lock className="w-4 h-4 text-spec-primary shrink-0" />
        <span className="text-[13px] text-spec-navy font-medium">Your data is secure and encrypted.</span>
      </div>

    </div>
  )
}
