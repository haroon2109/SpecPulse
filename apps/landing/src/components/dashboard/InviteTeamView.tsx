import { ArrowLeft, Users, Mail, Plus, Send, Settings, Info } from 'lucide-react'
import { useState } from 'react'

interface InviteTeamViewProps {
  onNavigate: (tab: 'studio') => void;
  workspaceName?: string;
}

export function InviteTeamView({ onNavigate, workspaceName }: InviteTeamViewProps) {
  const [emails, setEmails] = useState('')
  const [role, setRole] = useState('Member')
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Real workspace link logic - empty if no workspace
  const inviteLink = workspaceName ? `https://app.specpulse.ai/invite/${workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : ''

  const handleCopy = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleSendInvites = () => {
    // Implement actual backend send logic here
    console.log("Sending invites to:", emails)
    // Clear inputs after interaction simulation
    setEmails('')
    setMessage('')
    setShowMessage(false)
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      {/* Header Area */}
      <div className="mb-8 mt-2 relative">
        <button 
          onClick={() => onNavigate('studio')}
          className="flex items-center gap-2 text-[13px] font-semibold text-spec-primary hover:text-spec-navy transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-spec-navy flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600 stroke-[1.5]" />
              </div>
              Invite Your Team
            </h1>
            <p className="text-[14px] text-spec-muted">
              Collaborate with your team to maximize SpecPulse AI.
            </p>
          </div>
          
          {/* Subtle Collaboration Illustration */}
          <div className="hidden md:flex items-center justify-center relative w-32 h-16 mr-8">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-white rounded-xl border border-spec-border shadow-sm flex items-center justify-center z-10">
               <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                 <UserAvatarIcon className="w-4 h-4 text-purple-600" />
               </div>
             </div>
             <div className="absolute top-0 right-4 w-5 h-5 rounded-full bg-green-100 border-2 border-white flex items-center justify-center z-20">
               <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
             </div>
             <div className="absolute top-2 left-0 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
             <div className="absolute bottom-2 right-0 w-2 h-2 rounded-full bg-purple-400"></div>
             <div className="absolute top-8 right-[-10px] w-1.5 h-1.5 rounded-full bg-blue-300"></div>
          </div>
        </div>
      </div>

      {/* Invite by Email Card */}
      <div className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-6 md:p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Invite by Email</h2>
          <p className="text-[13px] text-spec-muted">Enter email addresses to send invitations.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-[13px] font-semibold text-spec-navy mb-2">Email Addresses</label>
            <input 
              type="text" 
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="Enter email addresses separated by commas"
              className="w-full px-3 py-2.5 bg-white border border-spec-border rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary transition-all placeholder:text-spec-muted"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-[13px] font-semibold text-spec-navy mb-2">Role</label>
            <div className="relative">
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-spec-border rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary transition-all appearance-none"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
              <ChevronDownIcon className="w-4 h-4 text-spec-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {showMessage && (
          <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
             <textarea 
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Write a personal message..."
               className="w-full px-3 py-2.5 bg-white border border-spec-border rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary transition-all placeholder:text-spec-muted min-h-[80px]"
             />
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          {!showMessage ? (
            <button 
              onClick={() => setShowMessage(true)}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-spec-primary hover:text-spec-navy transition-colors"
            >
              <Plus className="w-4 h-4" /> Add a personal message (optional)
            </button>
          ) : <div></div>}
          
          <button 
            onClick={handleSendInvites}
            disabled={!emails.trim()}
            className="flex items-center gap-2 rounded-lg bg-spec-primary px-4 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-spec-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" /> Send Invites
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Invite with Link Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 md:p-8 flex flex-col h-full">
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Invite with Link</h2>
            <p className="text-[13px] text-spec-muted">Share a link to allow anyone to join your workspace.</p>
          </div>

          <div className="flex-1">
            <label className="block text-[12px] font-semibold text-spec-navy mb-2">Workspace Invite Link</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly
                value={inviteLink}
                placeholder="No workspace selected"
                className="flex-1 px-3 py-2.5 bg-gray-50 border border-spec-border rounded-lg text-[13px] text-spec-navy focus:outline-none"
              />
              <button 
                onClick={handleCopy}
                disabled={!inviteLink}
                className="px-4 py-2.5 bg-blue-50 text-spec-primary border border-blue-100 rounded-lg text-[13px] font-bold hover:bg-blue-100 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 pt-4 border-t border-spec-border/60">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-spec-border shrink-0">
              <Settings className="w-4 h-4 text-spec-navy" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-spec-navy">Link Settings</div>
              <div className="text-[12px] text-spec-muted mt-0.5">Role: Member &nbsp;•&nbsp; Expires: Never</div>
            </div>
          </div>
        </div>

        {/* Pending Invitations Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 md:p-8 flex flex-col h-full">
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Pending Invitations</h2>
            <p className="text-[13px] text-spec-muted">View and manage your pending invitations.</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center mt-4 mb-4">
             <div className="relative w-16 h-16 mb-4">
               <div className="absolute inset-0 border border-spec-border rounded-full flex items-center justify-center bg-gray-50/50">
                 <Mail className="w-6 h-6 text-spec-muted stroke-[1.5]" />
               </div>
               <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gray-200"></div>
               <div className="absolute bottom-2 left-1 w-1.5 h-1.5 rounded-full bg-gray-200"></div>
               <div className="absolute bottom-1 right-3 w-1 h-1 rounded-full bg-gray-300"></div>
             </div>
             <h3 className="text-[14px] font-bold text-spec-navy mb-1">No pending invitations</h3>
             <p className="text-[13px] text-spec-muted">Invitations you send will appear here.</p>
          </div>
        </div>
      </div>

      {/* Security Footer Notice */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-3">
        <Info className="w-4 h-4 text-spec-primary shrink-0" />
        <span className="text-[13px] text-spec-navy font-medium">Invited members will receive an email with instructions to join your workspace.</span>
      </div>
    </div>
  )
}

function UserAvatarIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
}

function ChevronDownIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}
