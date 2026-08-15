import { Command } from 'cmdk'
import { LayoutGrid, ShieldCheck, Settings, Building2, Database, SlidersHorizontal, Clock, FileText, Plus, Users } from 'lucide-react'
import { useEffect } from 'react'
import { Search } from 'lucide-react'

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onNavigate: (tab: any) => void;
}

export function CommandPalette({ open, setOpen, onNavigate }: CommandPaletteProps) {
  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, setOpen])

  if (!open) return null;

  const handleSelect = (tab: string) => {
    onNavigate(tab)
    setOpen(false)
  }

  const CommandItem = ({ children, onSelect, icon: Icon }: any) => (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-spec-navy rounded-xl cursor-pointer hover:bg-[#F2F7FF] hover:text-spec-primary data-[selected='true']:bg-[#F2F7FF] data-[selected='true']:text-spec-primary transition-colors mb-1"
    >
      <div className="w-6 h-6 rounded-md bg-white border border-spec-border flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 opacity-70" />
      </div>
      <span className="font-medium">{children}</span>
    </Command.Item>
  )

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-spec-navy/30 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
      />
      
      {/* Palette */}
      <Command 
        className="relative w-full max-w-[600px] bg-white rounded-2xl shadow-2xl border border-spec-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200"
      >
        <div className="flex items-center px-5 border-b border-spec-border bg-[#FAFAFA]/50">
          <Search className="w-5 h-5 text-spec-muted shrink-0" />
          <Command.Input 
            placeholder="Type a command or search pages..." 
            className="flex-1 px-4 py-5 text-[15px] font-medium text-spec-navy placeholder-spec-muted/70 bg-transparent focus:outline-none"
            autoFocus
          />
          <div className="text-[10px] font-bold text-spec-muted border border-spec-border bg-white px-2 py-1 rounded">ESC</div>
        </div>

        <Command.List className="max-h-[350px] overflow-y-auto p-3">
          <Command.Empty className="py-14 text-center">
            <div className="w-12 h-12 rounded-full bg-spec-bg-subtle-1 border border-spec-border flex items-center justify-center text-spec-muted mx-auto mb-3">
              <Search className="w-5 h-5" />
            </div>
            <p className="text-[14px] font-bold text-spec-navy">No results found.</p>
            <p className="text-[13px] text-spec-muted">Try searching for something else.</p>
          </Command.Empty>

          <Command.Group heading="Overview" className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-spec-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider mb-2">
            <CommandItem icon={LayoutGrid} onSelect={() => handleSelect('studio')}>Studio Dashboard</CommandItem>
            <CommandItem icon={ShieldCheck} onSelect={() => handleSelect('hitl')}>HITL Audit</CommandItem>
            <CommandItem icon={Building2} onSelect={() => handleSelect('workspaces')}>Workspaces</CommandItem>
          </Command.Group>

          <Command.Group heading="Data & Sources" className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-spec-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider mb-2">
            <CommandItem icon={Database} onSelect={() => handleSelect('data_sources')}>Connected Sources</CommandItem>
            <CommandItem icon={Plus} onSelect={() => handleSelect('add_data_sources')}>Add Data Source</CommandItem>
            <CommandItem icon={FileText} onSelect={() => handleSelect('upload_catalogs')}>Upload Catalogs</CommandItem>
          </Command.Group>

          <Command.Group heading="Settings" className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-spec-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider mb-2">
            <CommandItem icon={Settings} onSelect={() => handleSelect('settings')}>All Settings</CommandItem>
            <CommandItem icon={SlidersHorizontal} onSelect={() => handleSelect('ai_extraction')}>AI Extraction Config</CommandItem>
            <CommandItem icon={Users} onSelect={() => handleSelect('invite_team')}>Invite Team</CommandItem>
            <CommandItem icon={Clock} onSelect={() => handleSelect('history')}>Activity History</CommandItem>
          </Command.Group>

        </Command.List>
      </Command>
    </div>
  )
}
