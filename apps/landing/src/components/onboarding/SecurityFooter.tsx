import { Lock } from 'lucide-react'

export function SecurityFooter() {
  return (
    <footer className="w-full py-6 flex items-center justify-center gap-2 text-[12px] text-spec-muted font-medium">
      <Lock className="w-3.5 h-3.5" />
      <span>Your information is secure and encrypted</span>
    </footer>
  )
}
