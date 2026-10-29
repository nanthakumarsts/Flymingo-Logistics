import React, { useState, useRef } from 'react';
import { UploadCloud, Film, Image as ImageIcon, X, CheckCircle2, AlertCircle, Loader2, Link as LinkIcon } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

export const DragDropUploader = ({
  label = 'Upload File',
  value = '',
  onChange,
  accept = 'video/*,image/*',
  isVideo = false,
  helpText = 'Drag & drop your file here, or click to browse',
  required = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    setUploadError('');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Attempt upload to server
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.fileUrl) {
          // If server is on localhost:5000, prefix with full URL or relative
          const fullPath = json.fullUrl || `${API_BASE}${json.fileUrl}`;
          onChange(fullPath);
          setIsUploading(false);
          return;
        }
      }
      throw new Error('Upload to backend failed');
    } catch (err) {
      console.warn('Backend upload unreached, using client data URL fallback:', err);
      // Fallback: read file as Base64 Data URL so user can preview & save even offline
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setUploadError('Failed to read file.');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isVideoFile = isVideo || (typeof value === 'string' && (
    value.endsWith('.mp4') || value.endsWith('.mov') || value.endsWith('.webm') || value.startsWith('data:video/')
  ));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-red-500 font-black text-sm">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setManualMode(!manualMode)}
          className="text-[11px] font-semibold text-[#005687] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{manualMode ? 'Switch to Drag & Drop' : 'Enter URL manually'}</span>
        </button>
      </div>

      {manualMode ? (
        <div className="relative">
          <input
            type="text"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/assets/fliqmarine-hero.mov or https://..."
            className={`w-full px-3 py-2 text-xs font-mono bg-slate-50 border rounded-xl focus:ring-2 focus:ring-[#005687] outline-none ${
              required && !value ? 'border-red-300' : 'border-slate-200'
            }`}
          />
        </div>
      ) : (
        <div>
          {value ? (
            /* Preview Container */
            <div className="relative group border border-slate-200 bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
              {isVideoFile ? (
                <div className="relative aspect-video max-h-48 w-full flex items-center justify-center bg-black">
                  <video
                    src={value}
                    controls
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-white flex items-center gap-1">
                    <Film className="w-3 h-3 text-red-400" />
                    <span>Video Active</span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video max-h-48 w-full flex items-center justify-center bg-slate-100">
                  <img
                    src={value}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-white flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-emerald-400" />
                    <span>Image Active</span>
                  </div>
                </div>
              )}

              {/* Overlay controls */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="truncate text-xs font-mono text-slate-500 max-w-[70%]">
                  {value.startsWith('data:') ? 'Local file attached (cached in memory)' : value}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                    title="Remove File"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Drag & Drop Dropzone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-[#005687] bg-sky-50/50 scale-[1.01]'
                  : required && !value
                  ? 'border-red-300 hover:border-red-400 bg-red-50/20'
                  : 'border-slate-300 hover:border-[#005687] bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
              />

              {isUploading ? (
                <div className="flex flex-col items-center gap-2 py-4">
                  <Loader2 className="w-8 h-8 text-[#005687] animate-spin" />
                  <span className="text-xs font-bold text-slate-600">Uploading file to server...</span>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#005687]">
                    {isVideo ? <Film className="w-6 h-6 text-[#ed2926]" /> : <UploadCloud className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800">
                      Drop {isVideo ? 'video' : 'file'} here, or{' '}
                      <span className="text-[#005687] underline">browse files</span>
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{helpText}</p>
                  </div>
                </>
              )}
            </div>
          )}

          {uploadError && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
