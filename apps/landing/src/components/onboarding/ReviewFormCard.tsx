import { Building2, Link as LinkIcon, Briefcase, Users, Mail, Phone, User, Edit2, Target, CheckCircle2, FileText, Image as ImageIcon, Database, Globe, MoreHorizontal, Download, Rocket, Folder, Trash2, Check, ArrowLeft } from 'lucide-react'
import type { OnboardingState } from './WorkspaceSetupPage'
import { useNavigate } from 'react-router-dom'

export function ReviewFormCard({ state, onEdit, onBack }: { state: OnboardingState, onEdit: (step: number) => void, onBack: () => void }) {
  
  const handleExport = () => {
    // Generate JSON summary of actual state
    const summary = JSON.stringify(state, null, 2)
    const blob = new Blob([summary], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'specpulse_setup_summary.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const navigate = useNavigate()

  const handleCompleteSetup = () => {
    // Save onboarding state to simulate backend
    localStorage.setItem('specPulseOnboarding', JSON.stringify(state))
    navigate('/dashboard')
  }

  // Helper to render source icons based on type string
  const renderSourceIcon = (type: string) => {
    switch (type) {
      case 'Spec Sheets / PDFs': return <FileText className="w-4 h-4 text-red-500" />
      case 'Product Images': return <ImageIcon className="w-4 h-4 text-green-500" />
      case 'Technical Drawings': return <FileText className="w-4 h-4 text-blue-500" />
      case 'Tables / Spreadsheets': return <Database className="w-4 h-4 text-green-600" />
      case 'Web / URLs': return <Globe className="w-4 h-4 text-purple-500" />
      default: return <MoreHorizontal className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(15,39,79,0.04)] border border-spec-border/60 p-8 xl:p-12 h-full flex flex-col mt-4 lg:mt-0">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-spec-navy mb-1">Review Your Setup</h2>
          <p className="text-[13px] text-spec-muted">Please review your information before completing setup.</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 border border-spec-border rounded-lg text-[12px] font-bold text-spec-navy hover:bg-spec-bg-subtle-1 transition-colors">
          <Download className="w-4 h-4" /> Export Summary
        </button>
      </div>

      <div className="h-px w-full bg-[#E2E8F0] mb-6"></div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
        
        {/* Workspace & Account Card */}
        <div className="border border-spec-border rounded-xl p-6 relative">
          <button onClick={() => onEdit(1)} className="absolute top-6 right-6 flex items-center gap-1.5 text-[12px] font-bold text-spec-primary hover:underline">
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          
          <h3 className="text-[14px] font-bold text-spec-navy mb-5">Workspace & Account</h3>
          
          <div className="grid grid-cols-[200px_1fr] gap-y-4 text-[13px]">
            {state.workspace.workspaceName && (
              <>
                <div className="flex items-center gap-2 text-spec-muted">
                  <Building2 className="w-4 h-4" /> Workspace / Company
                </div>
                <div className="font-medium text-spec-navy">{state.workspace.workspaceName}</div>
              </>
            )}
            {state.workspace.workspaceSlug !== 'your-workspace' && state.workspace.workspaceSlug && (
              <>
                <div className="flex items-center gap-2 text-spec-muted">
                  <LinkIcon className="w-4 h-4" /> Workspace Slug
                </div>
                <div className="font-medium text-spec-navy flex items-center gap-2">
                  {state.workspace.workspaceSlug} <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">Available</span>
                </div>
              </>
            )}
            {state.workspace.industry && (
              <>
                <div className="flex items-center gap-2 text-spec-muted">
                  <Building2 className="w-4 h-4" /> Industry
                </div>
                <div className="font-medium text-spec-navy">{state.workspace.industry}</div>
              </>
            )}
            {state.workspace.teamSize && (
              <>
                <div className="flex items-center gap-2 text-spec-muted">
                  <Users className="w-4 h-4" /> Team Size
                </div>
                <div className="font-medium text-spec-navy">{state.workspace.teamSize}</div>
              </>
            )}
            {state.workspace.workEmail && (
              <>
                <div className="flex items-center gap-2 text-spec-muted">
                  <Mail className="w-4 h-4" /> Work Email
                </div>
                <div className="font-medium text-spec-navy">{state.workspace.workEmail}</div>
              </>
            )}
            {state.workspace.phone && (
              <>
                <div className="flex items-center gap-2 text-spec-muted">
                  <Phone className="w-4 h-4" /> Phone Number
                </div>
                <div className="font-medium text-spec-navy">{state.workspace.phone}</div>
              </>
            )}
            {state.workspace.jobTitle && (
              <>
                <div className="flex items-center gap-2 text-spec-muted">
                  <Briefcase className="w-4 h-4" /> Job Title
                </div>
                <div className="font-medium text-spec-navy">{state.workspace.jobTitle}</div>
              </>
            )}
            {state.workspace.fullName && (
              <>
                <div className="flex items-center gap-2 text-spec-muted">
                  <User className="w-4 h-4" /> Full Name
                </div>
                <div className="font-medium text-spec-navy">{state.workspace.fullName}</div>
              </>
            )}
            
            {/* Empty state if nothing filled */}
            {!state.workspace.workspaceName && !state.workspace.fullName && !state.workspace.workEmail && (
              <div className="col-span-2 text-spec-muted italic">No workspace details provided.</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Your Preferences Card */}
          <div className="border border-spec-border rounded-xl p-6 relative flex flex-col">
            <button onClick={() => onEdit(2)} className="absolute top-6 right-6 flex items-center gap-1.5 text-[12px] font-bold text-spec-primary hover:underline">
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
            
            <h3 className="text-[14px] font-bold text-spec-navy mb-5">Your Preferences</h3>
            
            <div className="grid grid-cols-[140px_1fr] gap-y-4 text-[13px]">
              
              {state.preferences.goals.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-spec-muted">
                    <Target className="w-4 h-4" /> Primary Goals
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {state.preferences.goals.map((goal, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#F2F7FF] text-spec-primary rounded-full text-[11px] font-semibold">{goal}</span>
                    ))}
                  </div>
                </>
              )}
              
              {state.preferences.dataTypes.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-spec-muted">
                    <Database className="w-4 h-4" /> Data Types
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {state.preferences.dataTypes.map((type, i) => (
                      <div key={i} title={type} className="w-6 h-6 rounded bg-spec-bg-subtle-1 border border-spec-border flex items-center justify-center">
                        {renderSourceIcon(type)}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {state.preferences.industry && (
                <>
                  <div className="flex items-center gap-2 text-spec-muted">
                    <Globe className="w-4 h-4" /> Industry Focus
                  </div>
                  <div className="font-medium text-spec-navy">{state.preferences.industry}</div>
                </>
              )}

              {state.preferences.goals.length === 0 && state.preferences.dataTypes.length === 0 && !state.preferences.industry && (
                <div className="col-span-2 text-spec-muted italic">No preferences selected.</div>
              )}
            </div>
          </div>

          {/* What Happens Next Card */}
          <div className="border border-spec-border rounded-xl p-6 flex flex-col">
            <h3 className="text-[14px] font-bold text-spec-navy mb-5">What Happens Next?</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border border-spec-border flex items-center justify-center text-spec-primary shrink-0">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-spec-navy">We'll set up your workspace</div>
                  <div className="text-[11px] text-spec-muted">Configure your environment and prepare everything.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border border-spec-border flex items-center justify-center text-spec-primary shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-spec-navy">Start processing data</div>
                  <div className="text-[11px] text-spec-muted">Begin extracting and enriching your product data.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border border-spec-border flex items-center justify-center text-spec-primary shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-spec-navy">Unlock insights</div>
                  <div className="text-[11px] text-spec-muted">Get actionable product intelligence and analytics.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border border-spec-border flex items-center justify-center text-spec-primary shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-spec-navy">Invite your team</div>
                  <div className="text-[11px] text-spec-muted">Collaborate and scale your product data workflows.</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Data Sources Card */}
        <div className="border border-spec-border rounded-xl p-6 relative">
          <button onClick={() => onEdit(3)} className="absolute top-6 right-6 flex items-center gap-1.5 text-[12px] font-bold text-spec-primary hover:underline">
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          
          <h3 className="text-[14px] font-bold text-spec-navy mb-5">Data Sources</h3>
          
          <div className="mb-4">
            <div className="text-[12px] font-bold text-spec-navy mb-3">Selected Sources</div>
            
            {state.dataSources.selectedTypes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {state.dataSources.selectedTypes.map((type, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 border border-spec-border rounded-lg">
                    {renderSourceIcon(type)}
                    <span className="text-[12px] font-semibold text-spec-navy">{type}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[12px] text-spec-muted italic">No source types selected.</div>
            )}
          </div>

          <div>
            <div className="text-[12px] font-bold text-spec-navy mb-3">Connected Sources</div>
            
            {state.dataSources.connectedSources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {state.dataSources.connectedSources.map((source, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-spec-border rounded-lg bg-[#FAFAFA]">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <source.icon className={`w-5 h-5 shrink-0 ${source.color}`} />
                      <div className="truncate">
                        <div className="text-[12px] font-bold text-spec-navy truncate">{source.name}</div>
                        <div className="text-[11px] text-spec-muted uppercase">{source.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <div className="w-5 h-5 rounded-full border border-green-200 text-green-500 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <Trash2 className="w-4 h-4 text-spec-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 border border-spec-border rounded-lg bg-[#FAFAFA]">
                <Folder className="w-5 h-5 text-spec-muted" />
                <div>
                  <div className="text-[12px] font-bold text-spec-navy">No connected sources</div>
                  <div className="text-[11px] text-spec-muted">Add files or a product catalog URL in Data Sources.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Success Banner */}
        <div className="bg-[#F0FDF4] border border-green-200 rounded-xl p-4 flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <CheckCircle2 className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <div className="text-[14px] font-bold text-green-800">You're all set!</div>
            <div className="text-[12px] text-green-700 mt-0.5">Click "Complete Setup" to create your workspace and get started.</div>
          </div>
        </div>
        
      </div>

      {/* Form Actions */}
      <div className="pt-6 mt-6 flex items-center justify-between border-t border-spec-border/60">
        <button type="button" onClick={onBack} className="px-6 py-2.5 text-[14px] font-bold text-spec-navy bg-white border border-spec-border rounded-lg hover:bg-spec-bg-subtle-1 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={handleCompleteSetup} className="px-8 py-2.5 text-[14px] font-bold text-white bg-spec-primary rounded-lg hover:bg-spec-navy transition-colors flex items-center gap-2 shadow-sm">
          Complete Setup <span>→</span>
        </button>
      </div>

    </div>
  )
}
