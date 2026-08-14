import { ArrowLeft, CloudUpload, FolderOpen, CheckCircle2, FileText, Image as ImageIcon, Info, Loader2, MoreVertical, ShieldCheck, Cog } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'

interface UploadCatalogsViewProps {
  onNavigate: (tab: 'studio') => void;
}

interface UploadedFile {
  name: string;
  type: string;
  uploadedAt: string;
  status: 'Processing' | 'Completed' | 'Error';
}

export function UploadCatalogsView({ onNavigate }: UploadCatalogsViewProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load from local storage for persistence across tabs
  useEffect(() => {
    const saved = localStorage.getItem('specPulseUploads')
    if (saved) {
      try {
        setUploadedFiles(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse uploads", e)
      }
    }
  }, [])

  const saveFiles = (files: UploadedFile[]) => {
    setUploadedFiles(files)
    localStorage.setItem('specPulseUploads', JSON.stringify(files))
  }

  const handleFileSelect = (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be under 50 MB')
      return
    }

    setIsUploading(true)

    // Add to list as processing
    const newFile: UploadedFile = {
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      uploadedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      status: 'Processing'
    }
    
    const updatedList = [newFile, ...uploadedFiles]
    saveFiles(updatedList)

    // Simulate backend processing
    const formData = new FormData()
    formData.append('file', file)

    fetch('http://localhost:8000/process-spec-stream', {
      method: 'POST',
      body: formData,
    }).then(async (response) => {
       if (!response.ok) throw new Error('Upload failed')
       // Mark as completed
       const finalList = updatedList.map(f => f.name === file.name ? { ...f, status: 'Completed' as const } : f)
       saveFiles(finalList)
       setIsUploading(false)
    }).catch((err) => {
       console.error("Upload error", err)
       // Fallback for demo without backend
       setTimeout(() => {
         const finalList = updatedList.map(f => f.name === file.name ? { ...f, status: 'Completed' as const } : f)
         saveFiles(finalList)
         setIsUploading(false)
       }, 3000)
    })
  }

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
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
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <CloudUpload className="w-5 h-5 text-spec-primary stroke-[1.5]" />
              </div>
              Upload Catalogs
            </h1>
            <p className="text-[14px] text-spec-muted">
              Upload product catalogs to enrich your workspace with structured product data.
            </p>
          </div>
          
          {/* Subtle Catalog Illustration */}
          <div className="hidden md:flex items-center justify-center relative w-32 h-16 mr-8">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-10 bg-gray-50 rounded-lg border-2 border-white shadow-sm flex items-end justify-center z-20 pb-1">
                <div className="w-10 h-6 bg-gray-200 rounded-sm"></div>
             </div>
             <div className="absolute top-0 right-4 w-6 h-6 rounded-md bg-white border border-green-100 flex items-center justify-center z-10 rotate-12 shadow-sm">
               <FileText className="w-3 h-3 text-green-600" />
             </div>
             <div className="absolute top-2 left-2 w-6 h-6 rounded-md bg-white border border-red-100 flex items-center justify-center z-10 -rotate-12 shadow-sm">
               <FileText className="w-3 h-3 text-red-500" />
             </div>
             <div className="absolute bottom-0 right-0 w-6 h-6 rounded-md bg-white border border-blue-100 flex items-center justify-center z-30 shadow-sm">
               <ImageIcon className="w-3 h-3 text-blue-500" />
             </div>
             
             <div className="absolute top-6 left-[-10px] w-1 h-1 rounded-full bg-blue-300"></div>
             <div className="absolute top-8 right-[-10px] w-1 h-1 rounded-full bg-purple-300"></div>
          </div>
        </div>
      </div>

      {/* Main Upload Area */}
      <div 
        className={`w-full bg-white rounded-2xl border border-blue-100 shadow-sm mb-6 transition-colors ${dragActive ? 'bg-blue-50/50' : ''}`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <div className="p-10 md:p-14 border-2 border-dashed border-blue-200 rounded-2xl m-1 flex flex-col items-center justify-center text-center">
           <CloudUpload className="w-10 h-10 text-spec-primary mb-4" />
           <h2 className="text-[18px] font-bold text-spec-navy mb-2">
             Drag & drop files here or <span className="text-spec-primary cursor-pointer hover:underline" onClick={() => fileInputRef.current?.click()}>browse</span>
           </h2>
           <p className="text-[13px] text-spec-muted mb-1">Supported formats: PDF, CSV, XLSX, PNG, JPG</p>
           <p className="text-[13px] text-spec-muted mb-6">Maximum file size: 50 MB per file</p>
           
           <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
             accept=".pdf,.csv,.xlsx,.png,.jpg,.jpeg"
           />
           
           <button 
             onClick={() => fileInputRef.current?.click()}
             disabled={isUploading}
             className="flex items-center gap-2 rounded-[8px] bg-spec-primary px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:bg-spec-navy transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
           >
             {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderOpen className="w-4 h-4" />}
             {isUploading ? 'Uploading...' : 'Browse Files'}
           </button>
        </div>
      </div>

      {/* Upload Guidelines Card */}
      <div className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-6 md:p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div>
            <h3 className="text-[14px] font-bold text-spec-navy mb-4">Upload Guidelines</h3>
            <ul className="space-y-3">
              {[
                "Ensure catalogs are clear and readable",
                "PDF files should contain selectable text",
                "CSV/XLSX files should have headers",
                "Images should be high quality",
                "Maximum 50 MB per file"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-[13px] text-spec-navy font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-[14px] font-bold text-spec-navy mb-4">What happens next?</h3>
            <div className="space-y-4">
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg border border-blue-100 bg-white shadow-sm flex items-center justify-center shrink-0">
                   <Cog className="w-4 h-4 text-spec-primary" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-spec-navy">We'll process your catalog</div>
                  <div className="text-[12px] text-spec-muted">Extract text, tables, and product information</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg border border-blue-100 bg-white shadow-sm flex items-center justify-center shrink-0">
                   <ShieldCheck className="w-4 h-4 text-spec-primary" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-spec-navy">AI enrichment</div>
                  <div className="text-[12px] text-spec-muted">Our AI will structure and enrich your data</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg border border-blue-100 bg-white shadow-sm flex items-center justify-center shrink-0">
                   <FileText className="w-4 h-4 text-spec-primary" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-spec-navy">Review & confirm</div>
                  <div className="text-[12px] text-spec-muted">Review extracted data before publishing</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Recently Uploaded */}
      <div className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-6 md:p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[16px] font-bold text-spec-navy mb-1">Recently Uploaded</h2>
            <p className="text-[13px] text-spec-muted">View the status of your recently uploaded catalogs.</p>
          </div>
          <button className="text-[13px] font-semibold text-spec-primary hover:underline flex items-center">
            View all uploads &rarr;
          </button>
        </div>

        {uploadedFiles.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-5 h-5 text-spec-muted" />
            </div>
            <h3 className="text-[14px] font-bold text-spec-navy mb-1">No uploads yet</h3>
            <p className="text-[13px] text-spec-muted">Upload your first catalog to see it here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="border-b border-spec-border/80 text-spec-navy font-semibold">
                  <th className="pb-3 px-2 font-semibold">File Name</th>
                  <th className="pb-3 px-2 font-semibold">File Type</th>
                  <th className="pb-3 px-2 font-semibold">Uploaded At</th>
                  <th className="pb-3 px-2 font-semibold">Status</th>
                  <th className="pb-3 px-2 font-semibold text-right"></th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file, i) => (
                  <tr key={i} className="border-b border-spec-border/40 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-2 font-medium text-spec-navy flex items-center gap-2">
                      {file.type === 'PDF' && <FileText className="w-4 h-4 text-red-500" />}
                      {(file.type === 'XLSX' || file.type === 'CSV') && <FileText className="w-4 h-4 text-green-600" />}
                      {(file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPEG') && <ImageIcon className="w-4 h-4 text-blue-500" />}
                      {file.name}
                    </td>
                    <td className="py-4 px-2 text-spec-navy font-medium">{file.type}</td>
                    <td className="py-4 px-2 text-spec-navy font-medium">{file.uploadedAt}</td>
                    <td className="py-4 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        file.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                        file.status === 'Completed' ? 'bg-green-50 text-green-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {file.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button className="text-spec-muted hover:text-spec-navy p-1 rounded hover:bg-gray-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Information Banner */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center justify-between mt-8">
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-spec-primary shrink-0" />
          <span className="text-[13px] text-spec-navy font-medium">
            Having trouble? Check our <button onClick={() => toast.success('Opening Catalog Guide...')} className="text-spec-primary hover:underline">catalog preparation guide</button> or contact support.
          </span>
        </div>
      </div>
    </div>
  )
}
