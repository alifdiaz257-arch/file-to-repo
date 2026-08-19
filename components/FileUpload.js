'use client'

import { useState, useRef } from 'react'
import { FaUpload, FaFile, FaFolder, FaTimes } from 'react-icons/fa'

export function FileUpload({ onUpload, uploading, disabled }) {
  const [files, setFiles] = useState([])
  const [uploadPath, setUploadPath] = useState('')
  const fileInputRef = useRef(null)
  const folderInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selected])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    await onUpload(files, uploadPath)
    setFiles([])
    setUploadPath('')
  }

  const clearAll = () => {
    setFiles([])
    setUploadPath('')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="border-2 border-dashed border-[#30363d] rounded-lg p-8 text-center cursor-pointer hover:border-[#238636] transition group"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaFile className="w-12 h-12 mx-auto mb-3 text-[#8b949e] group-hover:text-[#238636] transition" />
          <p className="font-medium text-white">Upload Files</p>
          <p className="text-sm text-[#8b949e]">Click or drag to select</p>
          <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" disabled={disabled} />
        </div>

        <div
          className="border-2 border-dashed border-[#30363d] rounded-lg p-8 text-center cursor-pointer hover:border-[#238636] transition group"
          onClick={() => folderInputRef.current?.click()}
        >
          <FaFolder className="w-12 h-12 mx-auto mb-3 text-[#8b949e] group-hover:text-[#238636] transition" />
          <p className="font-medium text-white">Upload Folder</p>
          <p className="text-sm text-[#8b949e]">Select entire folder</p>
          <input ref={folderInputRef} type="file" webkitdirectory multiple onChange={handleFileSelect} className="hidden" disabled={disabled} />
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={uploadPath}
          onChange={(e) => setUploadPath(e.target.value)}
          placeholder="Upload path (optional, e.g., folder/subfolder)"
          className="flex-1 bg-[#0d1117] border border-[#30363d] rounded px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#238636]"
          disabled={disabled}
        />
      </div>

      {files.length > 0 && (
        <div className="bg-[#0d1117] rounded-lg border border-[#30363d]">
          <div className="p-3 border-b border-[#30363d] flex justify-between items-center">
            <span className="font-medium text-white">{files.length} file{files.length > 1 ? 's' : ''} selected</span>
            <button onClick={clearAll} className="text-sm text-red-400 hover:text-red-300 transition" disabled={disabled}>
              Clear All
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto p-3 space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-[#161b22] rounded p-2 border border-[#30363d]">
                <div className="flex items-center gap-2 min-w-0">
                  <FaFile className="text-[#8b949e] flex-shrink-0" />
                  <span className="text-sm text-white truncate">{file.webkitRelativePath || file.name}</span>
                  <span className="text-xs text-[#8b949e] flex-shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button onClick={() => removeFile(index)} className="text-[#8b949e] hover:text-red-400 transition flex-shrink-0 ml-2" disabled={disabled}>
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || uploading || disabled}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            <>
              <FaUpload className="w-4 h-4" />
              Upload {files.length > 0 ? `(${files.length})` : ''}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
