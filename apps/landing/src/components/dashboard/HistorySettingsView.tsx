import { ArrowLeft, Clock, LayoutGrid } from 'lucide-react'

interface HistorySettingsViewProps {
  onNavigate: (tab: 'settings') => void;
}

export function HistorySettingsView({ onNavigate }: HistorySettingsViewProps) {
  // Empty history data until backend is connected
  const historyEvents: any[] = []

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 mt-2">
        <button 
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-1.5 text-[13px] font-bold text-spec-muted hover:text-spec-navy mb-4 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Settings
        </button>
        <h1 className="text-[26px] font-bold text-spec-navy flex items-center gap-2 mb-2">
          Activity History <Clock className="w-6 h-6 text-spec-primary" />
        </h1>
        <p className="text-[14px] text-spec-muted">
          A complete log of all actions and changes within your workspace.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-spec-border shadow-sm overflow-hidden">
        <div className="border-b border-spec-border bg-[#FAFAFA]/50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-spec-navy">Recent Events</h2>
          <button className="text-[12px] font-bold text-spec-primary hover:underline" disabled={historyEvents.length === 0} style={{ opacity: historyEvents.length === 0 ? 0.5 : 1 }}>
            Download CSV
          </button>
        </div>
        
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-spec-bg-subtle-1 border border-spec-border flex items-center justify-center text-spec-muted mb-4">
            <LayoutGrid className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="text-[15px] font-bold text-spec-navy mb-1.5">No activity yet</h3>
          <p className="text-[13px] text-spec-muted max-w-[250px]">
            Activity events and changes made in your workspace will appear here.
          </p>
        </div>
      </div>
    </div>
  )
}
