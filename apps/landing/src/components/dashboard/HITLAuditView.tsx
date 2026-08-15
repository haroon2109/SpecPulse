import { ShieldCheck, Filter, AlertCircle, CheckCircle2, ChevronRight, MessageSquare, Clock, ArrowRight, User, MoreHorizontal, FileText, ChevronDown, ChevronUp, ClipboardList, XCircle, Target, Info, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

export function HITLAuditView() {
  const [showFaqs, setShowFaqs] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeQueueTab, setActiveQueueTab] = useState<'review' | 'reviewed' | 'all'>('review')
  const [generalFilterOpen, setGeneralFilterOpen] = useState(false)
  const [timeFilterOpen, setTimeFilterOpen] = useState(false)
  const [timeFilter, setTimeFilter] = useState('This Week')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const faqs = [
    { question: "What is HITL Audit?", answer: "HITL (Human-in-the-Loop) Audit is a process that combines AI automation with human expertise to review and validate extracted data for the highest accuracy." },
    { question: "How does the AI confidence score work?", answer: "The AI assigns a confidence score to each extraction. Lower scores are flagged for human review to ensure quality." },
    { question: "Can I customize the review thresholds?", answer: "Yes, you can adjust the confidence thresholds in your Workspace Settings to determine which items require human review." },
    { question: "Who can perform a HITL Audit?", answer: "Any workspace member with 'Admin' or 'Auditor' roles can participate in the review process." },
    { question: "What happens when I approve an extraction?", answer: "Approved extractions are marked as verified and the data becomes available for downstream integrations or exports." },
    { question: "What if the AI extracted the wrong data?", answer: "You can click 'Edit' on the field to manually correct the value before approving it." },
    { question: "Does my feedback improve the AI?", answer: "Yes, your corrections are logged and used to fine-tune the extraction models over time for your specific data formats." },
    { question: "How long do pending items stay in the queue?", answer: "Pending items remain in the queue until they are reviewed. You can set up notifications for items older than 24 hours." },
    { question: "Can I export the audit logs?", answer: "Audit logs containing who reviewed what and when can be exported from the Settings > Security section." },
    { question: "Is there a limit to how many items I can review?", answer: "There is no hard limit on reviews, but processing large batches might be subject to your current subscription plan." }
  ]

  if (loading) {
    return (
      <div className="animate-in fade-in duration-500">
        {/* Skeleton Header */}
        <div className="flex items-start justify-between mb-8 mt-2 animate-pulse">
          <div>
            <div className="h-8 bg-spec-bg-subtle-1 rounded-lg w-48 mb-3"></div>
            <div className="h-4 bg-spec-bg-subtle-1 rounded w-72"></div>
          </div>
          <div className="h-10 w-24 bg-spec-bg-subtle-1 rounded-lg"></div>
        </div>

        {/* Top Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-white p-5 rounded-xl border border-spec-border shadow-sm flex items-start gap-4 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
              <div className="animate-pulse flex items-start gap-4 w-full">
                <div className="w-10 h-10 rounded-lg bg-spec-bg-subtle-1 shrink-0"></div>
                <div className="flex-1 w-full">
                  <div className="h-4 bg-spec-bg-subtle-1 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-spec-bg-subtle-1 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm overflow-hidden h-[400px] relative">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
          <div className="px-6 py-4 border-b border-spec-border flex gap-6 animate-pulse">
            <div className="h-6 bg-spec-bg-subtle-1 rounded w-32"></div>
            <div className="h-6 bg-spec-bg-subtle-1 rounded w-24"></div>
            <div className="h-6 bg-spec-bg-subtle-1 rounded w-24"></div>
          </div>
          <div className="p-6">
            <div className="h-40 bg-spec-bg-subtle-1 rounded-xl mb-4 animate-pulse"></div>
            <div className="h-40 bg-spec-bg-subtle-1 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 mt-2">
        <div>
          <h1 className="text-[26px] font-bold text-spec-navy flex items-center gap-2 mb-2">
            HITL Audit <ShieldCheck className="w-6 h-6 text-spec-primary" />
          </h1>
          <p className="text-[14px] text-spec-muted">
            Review and validate AI-extracted data to ensure accuracy and quality.
          </p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setGeneralFilterOpen(!generalFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-spec-border rounded-lg text-spec-navy font-bold text-[13px] hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Filter className="w-4 h-4 text-spec-muted" />
            Filter
            <ChevronDown className={`w-3.5 h-3.5 text-spec-muted ml-1 transition-transform ${generalFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {generalFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-spec-border py-1 z-20">
              <button onClick={() => setGeneralFilterOpen(false)} className="w-full text-left px-4 py-2 text-[13px] text-spec-navy hover:bg-gray-50">By Status</button>
              <button onClick={() => setGeneralFilterOpen(false)} className="w-full text-left px-4 py-2 text-[13px] text-spec-navy hover:bg-gray-50">By Confidence</button>
              <button onClick={() => setGeneralFilterOpen(false)} className="w-full text-left px-4 py-2 text-[13px] text-spec-navy hover:bg-gray-50">By Date</button>
            </div>
          )}
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        
        <div className="bg-white p-5 rounded-xl border border-spec-border shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5 text-purple-600 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-spec-navy mb-1">Pending Reviews</div>
            <div className="text-[28px] font-black text-spec-navy leading-none mb-2">0</div>
            <div className="text-[11px] text-spec-muted">Items awaiting review</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-spec-border shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-spec-primary stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-spec-navy mb-1">In Review</div>
            <div className="text-[28px] font-black text-spec-navy leading-none mb-2">0</div>
            <div className="text-[11px] text-spec-muted">Items being reviewed</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-spec-border shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-green-600 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-spec-navy mb-1">Approved</div>
            <div className="text-[28px] font-black text-spec-navy leading-none mb-2">0</div>
            <div className="text-[11px] text-spec-muted">Items approved</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-spec-border shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5 text-red-500 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-spec-navy mb-1">Changes Requested</div>
            <div className="text-[28px] font-black text-spec-navy leading-none mb-2">0</div>
            <div className="text-[11px] text-spec-muted">Items need changes</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-spec-border shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-spec-primary stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-spec-navy mb-1">Accuracy Rate</div>
            <div className="text-[28px] font-black text-spec-navy leading-none mb-2">—</div>
            <div className="text-[11px] text-spec-muted">No data yet</div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Content (Tabs and Table) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-spec-border shadow-sm flex flex-col">
            
            {/* Tabs */}
            <div className="flex items-center gap-8 px-6 pt-4 border-b border-spec-border">
              <button 
                onClick={() => setActiveQueueTab('review')}
                className={`pb-3 text-[13px] transition-colors border-b-2 ${activeQueueTab === 'review' ? 'font-bold text-spec-primary border-spec-primary' : 'font-medium text-spec-muted hover:text-spec-navy border-transparent'}`}
              >
                Review Queue
              </button>
              <button 
                onClick={() => setActiveQueueTab('reviewed')}
                className={`pb-3 text-[13px] transition-colors border-b-2 ${activeQueueTab === 'reviewed' ? 'font-bold text-spec-primary border-spec-primary' : 'font-medium text-spec-muted hover:text-spec-navy border-transparent'}`}
              >
                Reviewed
              </button>
              <button 
                onClick={() => setActiveQueueTab('all')}
                className={`pb-3 text-[13px] transition-colors border-b-2 ${activeQueueTab === 'all' ? 'font-bold text-spec-primary border-spec-primary' : 'font-medium text-spec-muted hover:text-spec-navy border-transparent'}`}
              >
                All Items
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 px-6 py-3 border-b border-spec-border/50 bg-[#FAFAFA]/50 text-[11px] font-bold text-spec-navy">
              <div>Item</div>
              <div>Source</div>
              <div>Type</div>
              <div>Confidence</div>
              <div>Status</div>
              <div>Added</div>
            </div>

            {/* Empty State Illustration */}
            <div className="py-16 flex flex-col items-center justify-center text-center px-6 border-b border-spec-border/50">
              <div className="relative mb-6">
                {/* Decorative background stars */}
                <div className="absolute -top-4 -left-4 text-blue-100">✦</div>
                <div className="absolute top-8 -right-8 text-blue-100 text-sm">✦</div>
                <div className="absolute -bottom-2 -left-8 text-blue-100 text-xs">✦</div>
                
                {/* File/Folder illustration */}
                <div className="w-[80px] h-[70px] relative">
                  <div className="absolute inset-x-2 bottom-0 h-12 bg-spec-navy rounded-lg shadow-lg z-10"></div>
                  <div className="absolute inset-x-6 bottom-4 h-14 bg-blue-100 rounded-md -rotate-6 z-0 border border-blue-200"></div>
                  <div className="absolute inset-x-4 bottom-2 h-16 bg-white rounded-md z-10 shadow-sm border border-spec-border flex flex-col items-center pt-3 gap-2">
                    <div className="w-8 h-1.5 bg-blue-100 rounded-full"></div>
                    <div className="w-12 h-1.5 bg-spec-border rounded-full"></div>
                    <div className="w-10 h-1.5 bg-spec-border rounded-full"></div>
                  </div>
                  {/* Small blue badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-spec-primary rounded-full shadow-sm border-2 border-white flex items-center justify-center z-20 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-spec-navy mb-2">
                {activeQueueTab === 'review' ? 'No items in review queue' : activeQueueTab === 'reviewed' ? 'No reviewed items' : 'No items found'}
              </h3>
              <p className="text-[13px] text-spec-muted mb-6 max-w-[320px]">
                {activeQueueTab === 'review' 
                  ? "You're all caught up! There are no items that need your review right now." 
                  : "Items you've reviewed will appear here."}
              </p>
              
              {activeQueueTab === 'review' && (
                <button 
                  onClick={() => setActiveQueueTab('reviewed')}
                  className="px-5 py-2 rounded-lg border border-spec-border text-spec-primary font-bold text-[13px] hover:bg-[#F2F7FF] transition-colors"
                >
                  View Reviewed Items
                </button>
              )}
            </div>

            {/* Pagination footer */}
            <div className="px-6 py-4 flex items-center justify-between text-[12px] text-spec-muted">
              <div>Showing 0 of 0 items</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded border border-spec-border bg-white text-spec-muted opacity-50 cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-1.5 rounded border border-spec-border bg-white text-spec-muted opacity-50 cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>

          </div>

          {/* Info Banner */}
          <div className="bg-[#F2F7FF] rounded-xl border border-blue-100 p-4 flex flex-col gap-4 transition-all">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-spec-primary shrink-0 mt-0.5" />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-[13px] text-spec-navy">
                  HITL Audit helps ensure the highest data quality by combining AI speed with human expertise.
                </p>
                <button 
                  onClick={() => setShowFaqs(!showFaqs)} 
                  className="text-[13px] font-bold text-spec-primary hover:underline whitespace-nowrap flex items-center gap-1"
                >
                  Learn more <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* FAQs Section */}
            {showFaqs && (
              <div className="mt-2 pt-4 border-t border-blue-100/50 animate-in slide-in-from-top-2 duration-300">
                <h3 className="text-[14px] font-bold text-spec-navy mb-3">Frequently Asked Questions</h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg border border-blue-100 overflow-hidden">
                      <button 
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-[13px] font-semibold text-spec-navy">{faq.question}</span>
                        {openFaq === index ? (
                          <ChevronUp className="w-4 h-4 text-spec-muted shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-spec-muted shrink-0" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="p-3 pt-0 text-[12px] text-spec-muted leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          
          {/* Review Insights */}
          <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[15px] font-bold text-spec-navy">Review Insights</h2>
              <div className="relative">
                <button 
                  onClick={() => setTimeFilterOpen(!timeFilterOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded border border-spec-border text-[12px] text-spec-navy font-medium hover:bg-gray-50"
                >
                  <Filter className="w-3.5 h-3.5 text-spec-muted" />
                  {timeFilter} <ChevronDown className={`w-3.5 h-3.5 text-spec-muted transition-transform ${timeFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                {timeFilterOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-spec-border py-1 z-20">
                    {['Today', 'This Week', 'This Month', 'All Time'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setTimeFilter(opt); setTimeFilterOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-[12px] hover:bg-gray-50 ${timeFilter === opt ? 'text-spec-primary font-bold' : 'text-spec-navy'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-spec-border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-green-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-[13px] font-medium text-spec-navy">Approved</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-spec-navy">0</span>
                  <span className="text-[11px] font-medium text-spec-muted w-8 text-right">0%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-spec-border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center shrink-0">
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <span className="text-[13px] font-medium text-spec-navy">Changes Requested</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-spec-navy">0</span>
                  <span className="text-[11px] font-medium text-spec-muted w-8 text-right">0%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-spec-border shadow-sm bg-[#FAFAFA]/50">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-purple-50 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="text-[13px] font-medium text-spec-navy">Avg. Review Time</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-spec-navy">—</span>
                  <span className="text-[11px] font-medium text-spec-muted w-12 text-right">No data</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-spec-border shadow-sm bg-[#FAFAFA]/50">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center shrink-0">
                    <Target className="w-3.5 h-3.5 text-spec-primary" />
                  </div>
                  <span className="text-[13px] font-medium text-spec-navy">Accuracy Rate</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-spec-navy">—</span>
                  <span className="text-[11px] font-medium text-spec-muted w-12 text-right">No data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 flex flex-col flex-1">
            <h2 className="text-[15px] font-bold text-spec-navy mb-8">Recent Activity</h2>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-spec-border flex items-center justify-center text-spec-primary mb-4">
                <FileText className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-[14px] font-bold text-spec-navy mb-1.5">No recent activity</h3>
              <p className="text-[12px] text-spec-muted">Audit activities will appear here.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

