import { Settings, Building2, Database, SlidersHorizontal, Bell, ShieldCheck, ChevronRight, Lock, Clock } from 'lucide-react'

interface SettingsViewProps {
  onNavigate: (tab: 'workspace_settings' | 'data_sources' | 'ai_extraction' | 'notifications' | 'security' | 'history') => void;
}

export function SettingsView({ onNavigate }: SettingsViewProps) {
  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      {/* Header */}
      <div className="mb-8 mt-2">
        <h1 className="text-[26px] font-bold text-spec-navy flex items-center gap-2 mb-2">
          Settings <Settings className="w-6 h-6 text-spec-primary" />
        </h1>
        <p className="text-[14px] text-spec-muted">
          Manage your workspace and application settings.
        </p>
      </div>

      {/* Settings Cards */}
      <div className="flex flex-col gap-4 mb-8">
        
        {/* Workspace Settings */}
        <button 
          onClick={() => onNavigate('workspace_settings')}
          className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-spec-primary stroke-[1.5]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Workspace Settings</h2>
            <p className="text-[13px] text-spec-muted">Manage your workspace details, industry, team size and preferences.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-spec-muted group-hover:text-spec-navy transition-colors shrink-0" />
        </button>

        {/* Data & Sources */}
        <button 
          onClick={() => onNavigate('data_sources')}
          className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6 text-spec-primary stroke-[1.5]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Data & Sources</h2>
            <p className="text-[13px] text-spec-muted">Manage your connected data sources and upload preferences.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-spec-muted group-hover:text-spec-navy transition-colors shrink-0" />
        </button>

        {/* AI & Extraction */}
        <button 
          onClick={() => onNavigate('ai_extraction')}
          className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-6 h-6 text-spec-primary stroke-[1.5]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">AI & Extraction</h2>
            <p className="text-[13px] text-spec-muted">Configure AI models, extraction rules and automation preferences.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-spec-muted group-hover:text-spec-navy transition-colors shrink-0" />
        </button>

        {/* Notifications */}
        <button 
          onClick={() => onNavigate('notifications')}
          className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Bell className="w-6 h-6 text-spec-primary stroke-[1.5]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Notifications</h2>
            <p className="text-[13px] text-spec-muted">Manage email notifications and in-app alerts.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-spec-muted group-hover:text-spec-navy transition-colors shrink-0" />
        </button>

        {/* Security */}
        <button 
          onClick={() => onNavigate('security')}
          className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-spec-primary stroke-[1.5]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Security</h2>
            <p className="text-[13px] text-spec-muted">Manage password, two-factor authentication and session settings.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-spec-muted group-hover:text-spec-navy transition-colors shrink-0" />
        </button>

        {/* Activity History */}
        <button 
          onClick={() => onNavigate('history')}
          className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-spec-primary stroke-[1.5]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Activity History</h2>
            <p className="text-[13px] text-spec-muted">View a complete log of all actions and changes within your workspace.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-spec-muted group-hover:text-spec-navy transition-colors shrink-0" />
        </button>

      </div>

      {/* Security Footer Notice */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-3">
        <Lock className="w-4 h-4 text-spec-primary shrink-0" />
        <span className="text-[13px] text-spec-navy font-medium">Your data is secure and encrypted.</span>
      </div>

    </div>
  )
}
