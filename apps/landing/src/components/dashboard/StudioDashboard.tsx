import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LayoutGrid, ShieldCheck, Settings, User, Bell, HelpCircle, ChevronDown, Building2, Search, FileText, LogOut, Menu, X } from 'lucide-react'
import type { OnboardingState } from '../onboarding/WorkspaceSetupPage'
import { StudioMainView } from './StudioMainView'
import { HITLAuditView } from './HITLAuditView'
import { SettingsView } from './SettingsView'
import { WorkspaceSettingsView } from './WorkspaceSettingsView'
import { DataSourcesSettingsView } from './DataSourcesSettingsView'
import { AIExtractionSettingsView } from './AIExtractionSettingsView'
import { NotificationsSettingsView } from './NotificationsSettingsView'
import { SecuritySettingsView } from './SecuritySettingsView'
import { UserProfileView } from './UserProfileView'
import { InviteTeamView } from './InviteTeamView'
import { UploadCatalogsView } from './UploadCatalogsView'
import { AddDataSourcesView } from './AddDataSourcesView'
import { WorkspacesView } from './WorkspacesView'
import { HistorySettingsView } from './HistorySettingsView'
import { CommandPalette } from './CommandPalette'

// Fallback state if nothing is found in localStorage
const emptyState: OnboardingState = {
  workspace: {
    fullName: '',
    workEmail: '',
    jobTitle: '',
    phone: '',
    workspaceName: '',
    workspaceSlug: '',
    industry: '',
    teamSize: ''
  },
  preferences: {
    goals: [],
    dataTypes: [],
    workflow: '',
    priorities: [],
    notes: '',
    industry: '',
    teamSize: ''
  },
  dataSources: {
    selectedTypes: [],
    connectedSources: []
  }
}

export function StudioDashboard() {
  const [state, setState] = useState<OnboardingState>(emptyState)
  const [activeTab, setActiveTab] = useState<'studio' | 'hitl' | 'settings' | 'profile' | 'workspace_settings' | 'data_sources' | 'ai_extraction' | 'notifications' | 'security' | 'history' | 'invite_team' | 'upload_catalogs' | 'add_data_sources' | 'workspaces'>('studio')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('specPulseOnboarding')
    if (saved) {
      try {
        setState(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse onboarding state', e)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter',system-ui,sans-serif] relative overflow-hidden lg:overflow-visible">
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-spec-navy/30 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto flex flex-col w-[260px] bg-white border-r border-spec-border h-screen ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo & Mobile Close */}
        <div className="px-6 py-6 lg:py-8 flex items-center justify-between shrink-0">
            <button onClick={() => { setActiveTab('studio'); setMobileMenuOpen(false); }} className="text-[16px] font-black tracking-tighter text-spec-navy hover:text-spec-primary transition-colors flex items-center gap-1.5">
              <img src="/logo.png" alt="SpecPulse" className="h-6 w-auto mix-blend-multiply" />
              SpecPulse
            </button>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-1.5 text-spec-muted hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 lg:py-8 flex flex-col gap-2 overflow-y-auto">
            <button 
              onClick={() => { setActiveTab('studio'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors ${
              activeTab === 'studio' ? 'bg-[#F2F7FF] text-spec-primary' : 'text-spec-navy hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4 stroke-[2]" />
            Studio View
          </button>
            <button 
              onClick={() => { setActiveTab('hitl'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors ${
                activeTab === 'hitl' ? 'bg-[#F2F7FF] text-spec-primary' : 'text-spec-navy hover:bg-gray-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 stroke-[2]" />
              HITL Audit
            </button>
            <button 
              onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors ${
                activeTab === 'settings' || activeTab === 'workspace_settings' || activeTab === 'data_sources' || activeTab === 'ai_extraction' || activeTab === 'notifications' || activeTab === 'security' || activeTab === 'history' ? 'bg-[#F2F7FF] text-spec-primary' : 'text-spec-navy hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4 stroke-[2]" />
              Settings
            </button>
            <button 
              onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors ${
              activeTab === 'profile' ? 'bg-[#F2F7FF] text-spec-primary' : 'text-spec-navy hover:bg-gray-50'
            }`}
          >
            <User className="w-4 h-4 stroke-[2]" />
            User Profile
          </button>
        </nav>

        {/* Bottom Workspace/User section */}
        <div className="p-4 flex flex-col gap-2 shrink-0">
          
          <button onClick={() => setActiveTab('workspaces')} className="flex items-center justify-between w-full p-2.5 rounded-xl border border-spec-border bg-white hover:bg-gray-50 transition-colors text-left group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-gray-100 border border-spec-border flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-spec-muted" />
              </div>
              <div className="truncate">
                <div className="text-[10px] text-spec-muted font-medium mb-0.5 uppercase tracking-wider">Workspace</div>
                <div className="text-[12px] font-bold text-spec-navy truncate">
                  {state?.workspace?.workspaceName || 'No workspace selected'}
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-spec-muted group-hover:text-spec-navy shrink-0" />
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group border border-transparent"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-spec-primary flex items-center justify-center shrink-0 text-white font-bold text-[12px]">
                  {state?.workspace?.fullName ? state.workspace.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                </div>
                <div className="truncate">
                  <div className="text-[12px] font-bold text-spec-navy truncate">
                    {state?.workspace?.fullName || 'Anonymous User'}
                  </div>
                  <div className="text-[11px] text-spec-muted truncate">
                    {state?.workspace?.jobTitle || '-'}
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-spec-muted group-hover:text-spec-navy shrink-0 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isProfileOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-lg border border-spec-border p-2 z-50">
                <button onClick={() => window.location.href = '/'} className="w-full text-left px-3 py-2 text-[13px] text-red-600 font-bold hover:bg-red-50 rounded-lg">Sign Out</button>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-[100dvh] overflow-y-auto overflow-x-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-spec-border flex flex-col sm:flex-row items-center justify-between px-4 lg:px-8 py-4 lg:py-8 shrink-0 sticky top-0 z-30 gap-4 sm:gap-8">
          
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-spec-navy hover:bg-gray-100 rounded-lg shrink-0">
              <Menu className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-spec-muted" style={{ paddingLeft: '16px' }}>
              <Search className="w-4 h-4" />
            </div>
            <button 
              onClick={() => setCmdOpen(true)}
              className="w-full flex items-center justify-between pr-3 py-2 bg-white border border-spec-border rounded-lg shadow-sm hover:border-spec-primary/30 transition-all text-left"
              style={{ paddingLeft: '44px' }}
            >
              <span className="text-[13px] text-spec-muted">Search catalogs, documents, attributes...</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-spec-muted border border-spec-border bg-[#FAFAFA] px-1.5 py-0.5 rounded">⌘</span>
                <span className="text-[10px] font-bold text-spec-muted border border-spec-border bg-[#FAFAFA] px-1.5 py-0.5 rounded">K</span>
              </div>
            </button>
          </div>
        </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 shrink-0 relative w-full sm:w-auto justify-end">
            
            <button 
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-spec-border flex items-center justify-center text-spec-navy hover:bg-white transition-colors relative"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-spec-border flex items-center justify-center text-spec-navy hover:bg-white transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></div>
            </button>
            {isNotifOpen && (
              <div className="absolute top-12 right-12 w-64 bg-white border border-spec-border rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-spec-border font-bold text-[13px] text-spec-navy">Notifications</div>
                <div className="p-4 text-center text-[12px] text-spec-muted">No new notifications</div>
              </div>
            )}

            <button 
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              onBlur={() => setTimeout(() => setIsHelpOpen(false), 200)}
              className="w-8 h-8 rounded-full border border-spec-border flex items-center justify-center text-spec-navy hover:bg-gray-50 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            {isHelpOpen && (
              <div className="absolute top-12 right-24 w-48 bg-white border border-spec-border rounded-lg shadow-lg z-50 overflow-hidden py-1">
                <button 
                  onMouseDown={(e) => { e.preventDefault(); setIsHelpOpen(false); }}
                  className="w-full text-left px-4 py-2 text-[13px] text-spec-navy hover:bg-spec-bg-subtle-1 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Documentation
                </button>
                <button 
                  onMouseDown={(e) => { e.preventDefault(); setIsHelpOpen(false); }}
                  className="w-full text-left px-4 py-2 text-[13px] text-spec-navy hover:bg-spec-bg-subtle-1 flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" /> Help Center
                </button>
              </div>
            )}

            <div className="w-px h-6 bg-spec-border mx-2"></div>
            
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-spec-primary flex items-center justify-center shrink-0 text-white font-bold text-[12px]">
                {state.workspace.fullName ? state.workspace.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
              </div>
              <ChevronDown className="w-4 h-4 text-spec-muted" />
            </button>
            
            {isProfileOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white border border-spec-border rounded-lg shadow-lg z-50 overflow-hidden py-1">
                <div className="px-4 py-2 border-b border-spec-border mb-1">
                  <div className="text-[13px] font-bold text-spec-navy truncate">{state.workspace.fullName || 'User'}</div>
                  <div className="text-[11px] text-spec-muted truncate">{state.workspace.workEmail || 'user@example.com'}</div>
                </div>
                <button 
                  onMouseDown={(e) => { e.preventDefault(); setActiveTab('profile'); setIsProfileOpen(false); }}
                  className="w-full text-left px-4 py-2 text-[13px] text-spec-navy hover:bg-spec-bg-subtle-1 flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> Profile
                </button>
                <button 
                  onMouseDown={(e) => { e.preventDefault(); setActiveTab('settings'); setIsProfileOpen(false); }}
                  className="w-full text-left px-4 py-2 text-[13px] text-spec-navy hover:bg-spec-bg-subtle-1 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <div className="h-px bg-spec-border my-1"></div>
                <Link 
                  to="/" 
                  onMouseDown={() => { setIsProfileOpen(false); }}
                  className="w-full text-left px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </Link>
              </div>
            )}
          </div>

        </header>

        {/* Dashboard Content */}
        <div className="p-8 pb-20 w-full flex-1">
          {activeTab === 'studio' && <StudioMainView state={state} onNavigate={setActiveTab} />}
          {activeTab === 'hitl' && <HITLAuditView />}
          {activeTab === 'settings' && <SettingsView onNavigate={setActiveTab} />}
          {activeTab === 'workspace_settings' && <WorkspaceSettingsView state={state} onNavigate={setActiveTab} />}
          {activeTab === 'data_sources' && <DataSourcesSettingsView onNavigate={setActiveTab} />}
          {activeTab === 'ai_extraction' && <AIExtractionSettingsView onNavigate={setActiveTab} />}
          {activeTab === 'notifications' && <NotificationsSettingsView onNavigate={setActiveTab} />}
          {activeTab === 'security' && <SecuritySettingsView onNavigate={setActiveTab} />}
          {activeTab === 'history' && <HistorySettingsView onNavigate={setActiveTab} />}
          {activeTab === 'profile' && <UserProfileView state={state} />}
          {activeTab === 'invite_team' && <InviteTeamView onNavigate={setActiveTab} workspaceName={state?.workspace?.workspaceName} />}
          {activeTab === 'upload_catalogs' && <UploadCatalogsView onNavigate={setActiveTab} />}
          {activeTab === 'add_data_sources' && <AddDataSourcesView onNavigate={setActiveTab} />}
          {activeTab === 'workspaces' && <WorkspacesView onNavigate={setActiveTab} currentWorkspace={state?.workspace?.workspaceName || ''} onSelectWorkspace={(name) => {
             const newState = { ...state, workspace: { ...(state?.workspace || {}), workspaceName: name } }
             setState(newState as any)
             localStorage.setItem('specPulseOnboarding', JSON.stringify(newState))
          }} />}
        </div>
      </main>

      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} onNavigate={setActiveTab} />
    </div>
  )
}
