export function AuthFooter() {
  return (
    <footer className="w-full py-8 text-center text-[13px] text-spec-muted font-medium pb-8 pt-4">
      <div className="flex items-center justify-center gap-6">
        <span>© 2024 SpecPulse. All rights reserved.</span>
        <a href="#" className="hover:text-spec-navy transition-colors">Privacy</a>
        <span className="w-1 h-1 bg-spec-muted rounded-full opacity-50"></span>
        <a href="#" className="hover:text-spec-navy transition-colors">Terms</a>
      </div>
    </footer>
  )
}
