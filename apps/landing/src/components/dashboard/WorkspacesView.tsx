import { Building2, Search, Users, Database, FileText, MoreVertical, Plus, Info, X, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'

interface WorkspacesViewProps {
  onNavigate: (tab: 'studio') => void;
  currentWorkspace: string;
  onSelectWorkspace: (name: string) => void;
}

interface Workspace {
  id: string;
  name: string;
  role: string;
  members: number;
  dataSources: number;
  catalogs: number;
  lastActivity: string;
}

export function WorkspacesView({ onNavigate, currentWorkspace, onSelectWorkspace }: WorkspacesViewProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  
  // Forms
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [newWorkspaceDesc, setNewWorkspaceDesc] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('specPulseWorkspaces')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setWorkspaces(parsed)
        }
      } catch (e) {
        console.error("Failed to parse workspaces", e)
      }
    }
  }, [])

  const saveWorkspaces = (newWorkspaces: Workspace[]) => {
    setWorkspaces(newWorkspaces)
    localStorage.setItem('specPulseWorkspaces', JSON.stringify(newWorkspaces))
  }

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName.trim()) {
      setError('Workspace name is required')
      return
    }

    const newWs: Workspace = {
      id: Math.random().toString(36).substr(2, 9),
      name: newWorkspaceName,
      role: 'Owner',
      members: 1,
      dataSources: 0,
      catalogs: 0,
      lastActivity: 'Just now'
    }

    const updated = [...(workspaces || []), newWs]
    saveWorkspaces(updated)
    
    // Select it and go back to studio
    onSelectWorkspace(newWorkspaceName)
    
    // Reset and close
    setNewWorkspaceName('')
    setNewWorkspaceDesc('')
    setError('')
    setIsCreateModalOpen(false)
    onNavigate('studio')
  }

  const handleJoinWorkspace = () => {
    if (!joinCode.trim()) {
      setError('Invitation code is required')
      return
    }
    setError('Invalid invitation code')
  }

  const handleSelectWorkspace = (name: string) => {
    onSelectWorkspace(name)
    onNavigate('studio')
  }

  const filteredWorkspaces = (workspaces || []).filter(w => (w?.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()))

  // Stats
  const safeWorkspaces = workspaces || []
  const totalWorkspaces = safeWorkspaces.length
  const totalMembers = safeWorkspaces.reduce((sum, w) => sum + (w?.members || 0), 0)
  const totalDataSources = safeWorkspaces.reduce((sum, w) => sum + (w?.dataSources || 0), 0)
  const totalCatalogs = safeWorkspaces.reduce((sum, w) => sum + (w?.catalogs || 0), 0)

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
            <Building2 className="w-6 h-6 text-spec-primary stroke-[1.5]" />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-spec-navy mb-1">Workspaces</h1>
            <p className="text-[14px] text-spec-muted">
              Manage your workspaces and collaborate with your team.
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-spec-primary text-white text-[14px] font-semibold rounded-lg hover:bg-spec-navy transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Workspace
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-spec-border shadow-sm flex gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-spec-primary" />
          </div>
          <div>
            <div className="text-[11px] text-spec-muted font-medium mb-1">Total Workspaces</div>
            <div className="text-[24px] font-bold text-spec-navy leading-none mb-1.5">{totalWorkspaces}</div>
            <div className="text-[11px] text-spec-muted">Across all organizations</div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-spec-border shadow-sm flex gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-[11px] text-spec-muted font-medium mb-1">Active Members</div>
            <div className="text-[24px] font-bold text-spec-navy leading-none mb-1.5">{totalMembers}</div>
            <div className="text-[11px] text-spec-muted">Across all workspaces</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-spec-border shadow-sm flex gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-[11px] text-spec-muted font-medium mb-1">Total Data Sources</div>
            <div className="text-[24px] font-bold text-spec-navy leading-none mb-1.5">{totalDataSources}</div>
            <div className="text-[11px] text-spec-muted">Connected sources</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-spec-border shadow-sm flex gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="text-[11px] text-spec-muted font-medium mb-1">Total Catalogs</div>
            <div className="text-[24px] font-bold text-spec-navy leading-none mb-1.5">{totalCatalogs}</div>
            <div className="text-[11px] text-spec-muted">Across all workspaces</div>
          </div>
        </div>
      </div>

      {/* Your Workspaces Section */}
      <div className="w-full bg-white rounded-2xl border border-spec-border shadow-sm mb-6">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-spec-border/60">
          <div>
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Your Workspaces</h2>
            <p className="text-[13px] text-spec-muted">View and manage all workspaces you have access to.</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-spec-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-spec-border rounded-lg text-[13px] focus:outline-none focus:border-spec-primary focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        {(workspaces || []).length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-spec-border flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-spec-muted stroke-[1.5]" />
            </div>
            <h3 className="text-[16px] font-bold text-spec-navy mb-2">No workspaces yet</h3>
            <p className="text-[13px] text-spec-muted mb-6">Create or join a workspace to get started.</p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-2.5 bg-spec-primary text-white text-[13px] font-semibold rounded-lg hover:bg-spec-navy transition-colors"
              >
                Create Workspace
              </button>
              <button 
                onClick={() => setIsJoinModalOpen(true)}
                className="px-5 py-2.5 bg-white text-spec-navy border border-spec-border text-[13px] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Join Workspace
              </button>
            </div>
          </div>
        ) : filteredWorkspaces.length === 0 ? (
          <div className="p-16 text-center text-[14px] text-spec-muted">
            No workspaces match your search.
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-spec-border/60 text-spec-navy font-semibold bg-gray-50/50">
                    <th className="py-4 px-6 font-semibold">Workspace</th>
                    <th className="py-4 px-6 font-semibold">Role</th>
                    <th className="py-4 px-6 font-semibold">Members</th>
                    <th className="py-4 px-6 font-semibold">Data Sources</th>
                    <th className="py-4 px-6 font-semibold">Catalogs</th>
                    <th className="py-4 px-6 font-semibold">Last Activity</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkspaces.map((ws, i) => (
                    <tr key={ws?.id || i} className="border-b border-spec-border/40 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleSelectWorkspace(ws?.name || '')}>
                      <td className="py-4 px-6 font-bold text-spec-navy flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#EBF1FF] text-spec-primary flex items-center justify-center font-bold text-[11px] uppercase shrink-0">
                          {(ws?.name || 'WS').substring(0, 2)}
                        </div>
                        {ws?.name || 'Unnamed Workspace'}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          ws?.role === 'Owner' ? 'bg-blue-50 text-blue-600' :
                          ws?.role === 'Admin' ? 'bg-green-50 text-green-600' :
                          'bg-purple-50 text-purple-600'
                        }`}>
                          {ws?.role || 'Member'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden">
                            <Users className="w-3 h-3" />
                          </div>
                          {(ws?.members || 0) > 1 && (
                            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-spec-muted -ml-2">
                              +{(ws?.members || 0) - 1}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-spec-navy font-semibold">{ws?.dataSources || 0}</td>
                      <td className="py-4 px-6 text-spec-navy font-semibold">{ws?.catalogs || 0}</td>
                      <td className="py-4 px-6 text-spec-muted font-medium">{ws?.lastActivity || 'Unknown'}</td>
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1.5 text-spec-muted hover:bg-gray-200 rounded transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="p-4 flex items-center justify-between border-t border-spec-border/60">
              <div className="text-[13px] text-spec-muted">
                Showing 1 to {(filteredWorkspaces || []).length} of {(workspaces || []).length} workspaces
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-spec-border text-spec-muted hover:bg-gray-50" disabled><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-spec-primary bg-blue-50 text-spec-primary font-medium text-[13px]">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-spec-border text-spec-muted hover:bg-gray-50" disabled><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-spec-primary" />
            <div className="absolute ml-6 mb-6 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-spec-primary">
              <Plus className="w-3 h-3 text-spec-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-spec-navy mb-1">Create a new workspace</h3>
            <p className="text-[13px] text-spec-muted mb-4 leading-relaxed">Set up a new workspace to organize your data, team, and projects.</p>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 border border-spec-border rounded-lg text-[13px] font-semibold text-spec-primary hover:bg-blue-50 transition-colors"
            >
              Create Workspace
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-spec-navy mb-1">Join a workspace</h3>
            <p className="text-[13px] text-spec-muted mb-4 leading-relaxed">Get invited to an existing workspace to start collaborating.</p>
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="px-4 py-2 border border-spec-border rounded-lg text-[13px] font-semibold text-spec-primary hover:bg-blue-50 transition-colors"
            >
              Join Workspace
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-spec-primary shrink-0" />
          <span className="text-[13px] text-spec-navy font-medium">Workspaces help you organize your data and collaborate effectively with your team.</span>
        </div>
        <button onClick={() => toast.success('Opening Workspace Documentation...')} className="text-[13px] font-bold text-spec-primary flex items-center gap-1 shrink-0 hover:underline">
          Learn more <ArrowRight className="w-3 h-3 -rotate-45" />
        </button>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-spec-navy/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-spec-border shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-spec-border flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-spec-navy">Create Workspace</h3>
              <button onClick={() => { setIsCreateModalOpen(false); setError('') }} className="text-spec-muted hover:text-spec-navy">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-spec-navy mb-2">Workspace Name</label>
                <input 
                  type="text" 
                  value={newWorkspaceName}
                  onChange={(e) => {setNewWorkspaceName(e.target.value); setError('')}}
                  placeholder="Enter workspace name" 
                  className={`w-full px-3 py-2 bg-white border ${error && !newWorkspaceName.trim() ? 'border-red-300' : 'border-spec-border'} rounded-lg text-[13px] focus:outline-none focus:border-spec-primary`}
                />
                {error && !newWorkspaceName.trim() && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
              </div>
              <div className="mb-2">
                <label className="block text-[13px] font-semibold text-spec-navy mb-2">Workspace Description (Optional)</label>
                <textarea 
                  value={newWorkspaceDesc}
                  onChange={(e) => setNewWorkspaceDesc(e.target.value)}
                  placeholder="Add a short description" 
                  className="w-full px-3 py-2 bg-white border border-spec-border rounded-lg text-[13px] focus:outline-none focus:border-spec-primary min-h-[80px]"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-spec-border flex justify-end gap-3">
              <button onClick={() => { setIsCreateModalOpen(false); setError('') }} className="px-4 py-2 text-[13px] font-semibold text-spec-navy bg-white border border-spec-border rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleCreateWorkspace} className="px-4 py-2 text-[13px] font-semibold text-white bg-spec-primary rounded-lg hover:bg-spec-navy">Create Workspace</button>
            </div>
          </div>
        </div>
      )}

      {/* Join Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-spec-navy/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-spec-border shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-spec-border flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-spec-navy">Join Workspace</h3>
              <button onClick={() => { setIsJoinModalOpen(false); setError(''); setJoinCode('') }} className="text-spec-muted hover:text-spec-navy">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-2">
                <label className="block text-[13px] font-semibold text-spec-navy mb-2">Invitation Code</label>
                <input 
                  type="text" 
                  value={joinCode}
                  onChange={(e) => {setJoinCode(e.target.value); setError('')}}
                  placeholder="Enter invitation code" 
                  className={`w-full px-3 py-2 bg-white border ${error ? 'border-red-300' : 'border-spec-border'} rounded-lg text-[13px] focus:outline-none focus:border-spec-primary`}
                />
                {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-spec-border flex justify-end gap-3">
              <button onClick={() => { setIsJoinModalOpen(false); setError(''); setJoinCode('') }} className="px-4 py-2 text-[13px] font-semibold text-spec-navy bg-white border border-spec-border rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleJoinWorkspace} className="px-4 py-2 text-[13px] font-semibold text-white bg-spec-primary rounded-lg hover:bg-spec-navy">Join Workspace</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
