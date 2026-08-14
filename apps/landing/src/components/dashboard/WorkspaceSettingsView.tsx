import { useState, FormEvent } from 'react'
import { ChevronRight, Info, CloudUpload, Users, Trash2, Lock, ChevronDown } from 'lucide-react'
import type { OnboardingState } from '../onboarding/WorkspaceSetupPage'

interface WorkspaceSettingsViewProps {
  state: OnboardingState;
  onNavigate: (tab: 'settings') => void;
}

export function WorkspaceSettingsView({ state, onNavigate }: WorkspaceSettingsViewProps) {
  // Form State
  const [workspaceName, setWorkspaceName] = useState(() => {
    return state?.workspace?.workspaceName || ''
  })
  const [workspaceSlug, setWorkspaceSlug] = useState('')
  const [industry, setIndustry] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [description, setDescription] = useState('')
  const [defaultLanguage, setDefaultLanguage] = useState('English')
  const [defaultTimezone, setDefaultTimezone] = useState('')
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showToast, setShowToast] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    const newErrors: Record<string, string> = {}
    if (!workspaceName.trim()) newErrors.workspaceName = 'Required'
    if (!workspaceSlug.trim()) {
      newErrors.workspaceSlug = 'Required'
    } else if (/\s/.test(workspaceSlug)) {
      newErrors.workspaceSlug = 'Must not contain spaces'
    }
    if (!industry) newErrors.industry = 'Required'
    if (!teamSize) newErrors.teamSize = 'Required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Simulate save
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const handleCancel = () => {
    // Revert to initial state
    setWorkspaceName(state.workspace.workspaceName || '')
    setWorkspaceSlug('')
    setIndustry('')
    setTeamSize('')
    setDescription('')
    setDefaultLanguage('English')
    setDefaultTimezone('')
    setErrors({})
  }

  const handleDeleteWorkspace = () => {
    // Execute deletion logic
    setShowDeleteModal(false)
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl relative">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-0 right-0 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-[13px] font-bold shadow-sm z-50 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Workspace settings saved.
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg border border-spec-border p-6 max-w-sm w-full mx-4">
            <h3 className="text-[18px] font-bold text-spec-navy mb-2">Delete Workspace?</h3>
            <p className="text-[14px] text-spec-muted mb-6">This action cannot be undone. All data will be permanently removed.</p>
            <div className="flex items-center gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-[13px] font-bold text-spec-navy border border-spec-border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteWorkspace}
                className="px-4 py-2 text-[13px] font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] mb-6">
        <button 
          onClick={() => onNavigate('settings')}
          className="text-spec-muted hover:text-spec-navy transition-colors"
        >
          Settings
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-spec-muted" />
        <span className="font-semibold text-spec-navy">Workspace Settings</span>
      </div>

      <form onSubmit={handleSave}>
        {/* Header section with buttons */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[26px] font-bold text-spec-navy mb-2">Workspace Settings</h1>
            <p className="text-[14px] text-spec-muted">
              Manage your workspace details, industry, team size and preferences.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0 w-full md:w-[140px]">
            <button type="submit" className="w-full py-2 bg-spec-primary text-white rounded-lg text-[13px] font-bold hover:bg-spec-primary/90 transition-colors">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="w-full py-2 bg-white text-spec-navy border border-spec-border rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Workspace Information Card */}
            <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8">
              <h2 className="text-[16px] font-bold text-spec-navy mb-1">Workspace Information</h2>
              <p className="text-[13px] text-spec-muted mb-8">Update your workspace details.</p>

              <div className="space-y-6">
                
                {/* Workspace Name */}
                <div>
                  <label className="block text-[13px] font-bold text-spec-navy mb-2">Workspace Name</label>
                  <input 
                    type="text" 
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="Enter workspace or company name"
                    className={`w-full h-10 px-3 bg-white border ${errors.workspaceName ? 'border-red-500' : 'border-[#DCE6F2]'} rounded-lg text-[14px] text-spec-navy placeholder:text-[#8899AE] focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
                  />
                  {errors.workspaceName && <p className="text-[11px] text-red-500 mt-1">{errors.workspaceName}</p>}
                </div>

                {/* Workspace Slug */}
                <div>
                  <label className="flex items-center gap-1.5 text-[13px] font-bold text-spec-navy mb-2">
                    Workspace Slug <Info className="w-3.5 h-3.5 text-spec-muted" />
                  </label>
                  <input 
                    type="text" 
                    value={workspaceSlug}
                    onChange={(e) => setWorkspaceSlug(e.target.value)}
                    placeholder="Enter unique slug"
                    className={`w-full h-10 px-3 bg-white border ${errors.workspaceSlug ? 'border-red-500' : 'border-[#DCE6F2]'} rounded-lg text-[14px] text-spec-navy placeholder:text-[#8899AE] focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
                  />
                  <p className="text-[12px] text-spec-muted mt-1.5">This will be used in your workspace URL.</p>
                  {errors.workspaceSlug && <p className="text-[11px] text-red-500 mt-1">{errors.workspaceSlug}</p>}
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-[13px] font-bold text-spec-navy mb-2">Industry</label>
                  <div className="relative">
                    <select 
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className={`w-full h-10 pl-3 pr-10 appearance-none bg-white border ${errors.industry ? 'border-red-500' : 'border-[#DCE6F2]'} rounded-lg text-[14px] ${industry ? 'text-spec-navy' : 'text-[#8899AE]'} focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
                    >
                      <option value="" disabled>Select industry</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Industrial Equipment">Industrial Equipment</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Aerospace">Aerospace</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Energy">Energy</option>
                      <option value="Chemicals">Chemicals</option>
                      <option value="Construction">Construction</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
                  </div>
                  {errors.industry && <p className="text-[11px] text-red-500 mt-1">{errors.industry}</p>}
                </div>

                {/* Team Size */}
                <div>
                  <label className="block text-[13px] font-bold text-spec-navy mb-2">Team Size</label>
                  <div className="relative">
                    <select 
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className={`w-full h-10 pl-3 pr-10 appearance-none bg-white border ${errors.teamSize ? 'border-red-500' : 'border-[#DCE6F2]'} rounded-lg text-[14px] ${teamSize ? 'text-spec-navy' : 'text-[#8899AE]'} focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
                    >
                      <option value="" disabled>Select team size</option>
                      <option value="1 - 10">1 - 10</option>
                      <option value="11 - 50">11 - 50</option>
                      <option value="51 - 200">51 - 200</option>
                      <option value="201 - 500">201 - 500</option>
                      <option value="501 - 1000">501 - 1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
                  </div>
                  {errors.teamSize && <p className="text-[11px] text-red-500 mt-1">{errors.teamSize}</p>}
                </div>

                {/* Workspace Description */}
                <div>
                  <label className="block text-[13px] font-bold text-spec-navy mb-2">Workspace Description (Optional)</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a brief description of your workspace..."
                    className="w-full h-24 p-3 bg-white border border-[#DCE6F2] rounded-lg text-[14px] text-spec-navy placeholder:text-[#8899AE] focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20 resize-none"
                  />
                  <p className="text-[12px] text-spec-muted mt-1.5">Briefly describe your workspace and its goals.</p>
                </div>

              </div>
              
              {/* Preferences Section */}
              <div className="mt-10 pt-8 border-t border-spec-border">
                <h2 className="text-[16px] font-bold text-spec-navy mb-1">Preferences</h2>
                <p className="text-[13px] text-spec-muted mb-6">Set your default workspace preferences.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Default Language */}
                  <div>
                    <label className="block text-[13px] font-bold text-spec-navy mb-2">Default Language</label>
                    <div className="relative">
                      <select 
                        value={defaultLanguage}
                        onChange={(e) => setDefaultLanguage(e.target.value)}
                        className="w-full h-10 pl-3 pr-10 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
                    </div>
                  </div>

                  {/* Default Timezone */}
                  <div>
                    <label className="block text-[13px] font-bold text-spec-navy mb-2">Default Timezone</label>
                    <div className="relative">
                      <select 
                        value={defaultTimezone}
                        onChange={(e) => setDefaultTimezone(e.target.value)}
                        className={`w-full h-10 pl-3 pr-10 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[14px] ${defaultTimezone ? 'text-spec-navy' : 'text-[#8899AE]'} focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
                      >
                        <option value="" disabled>Select timezone</option>
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Workspace Logo Card */}
            <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6">
              <h2 className="text-[15px] font-bold text-spec-navy mb-1">Workspace Logo (Optional)</h2>
              <p className="text-[12px] text-spec-muted mb-6">Upload a logo to personalize your workspace.</p>

              <div className="border border-[#DCE6F2] border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F2F7FF] transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-spec-primary mb-4">
                  <CloudUpload className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="text-[13px] font-bold text-spec-navy mb-1">
                  Drag & drop an image here or <span className="text-spec-primary font-bold">browse</span>
                </div>
                <div className="text-[11px] text-spec-muted">PNG, JPG or SVG. Max size 2MB.</div>
              </div>
            </div>

            {/* Workspace Members Card */}
            <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6">
              <h2 className="text-[15px] font-bold text-spec-navy mb-1">Workspace Members</h2>
              <p className="text-[12px] text-spec-muted mb-4">Manage members and their access.</p>

              <button type="button" className="w-full flex items-center justify-between p-4 rounded-xl border border-spec-border hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-spec-muted" />
                  <span className="text-[14px] font-bold text-spec-navy">Manage Members</span>
                </div>
                <ChevronRight className="w-4 h-4 text-spec-muted group-hover:text-spec-navy transition-colors" />
              </button>
            </div>

            {/* Danger Zone Card */}
            <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6">
              <h2 className="text-[15px] font-bold text-spec-navy mb-1">Danger Zone</h2>
              <p className="text-[12px] text-spec-muted mb-4">Irreversible and destructive actions.</p>

              <button 
                type="button" 
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[13px] font-bold text-red-600">Delete Workspace</div>
                    <div className="text-[11px] text-spec-muted">This action cannot be undone.</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors" />
              </button>
            </div>

          </div>

        </div>
      </form>

      {/* Security Footer Notice */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-3 mt-6">
        <Lock className="w-4 h-4 text-spec-primary shrink-0" />
        <span className="text-[13px] text-spec-navy font-medium">Your workspace data is secure and encrypted.</span>
      </div>

    </div>
  )
}
