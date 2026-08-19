'use client'

import { useState, useRef } from 'react'
import { FaUpload, FaFile, FaFolder, FaTimes, FaCheckCircle } from 'react-icons/fa'

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
      {/* Upload Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="border-2 border-dashed border-github-border rounded-lg p-8 text-center cursor-pointer hover:border-github-button transition group"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaFile className="w-12 h-12 mx-auto mb-3 text-github-secondary group-hover:text-github-button transition" />
          <p className="font-medium text-white">Upload Files</p>
          <p className="text-sm text-github-secondary">Click or drag to select</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
        </div>

        <div
          className="border-2 border-dashed border-github-border rounded-lg p-8 text-center cursor-pointer hover:border-github-button transition group"
          onClick={() => folderInputRef.current?.click()}
        >
          <FaFolder className="w-12 h-12 mx-auto mb-3 text-github-secondary group-hover:text-github-button transition" />
          <p className="font-medium text-white">Upload Folder</p>
          <p className="text-sm text-github-secondary">Select entire folder</p>
          <input
            ref={folderInputRef}
            type="file"
            webkitdirectory
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
        </div>
      </div>

      {/* Path Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={uploadPath}
          onChange={(e) => setUploadPath(e.target.value)}
          placeholder="Upload path (optional, e.g., folder/subfolder)"
          className="flex-1 bg-github-bg border border-github-border rounded px-3 py-2 text-github-text focus:outline-none focus:border-github-button"
          disabled={disabled}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-github-bg rounded-lg border border-github-border">
          <div className="p-3 border-b border-github-border flex justify-between items-center">
            <span className="font-medium text-white">
              {files.length} file{files.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={clearAll}
              className="text-sm text-github-danger hover:text-red-400 transition"
              disabled={disabled}
            >
              Clear All
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto p-3 space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-github-card rounded p-2 border border-github-border">
                <div className="flex items-center gap-2 min-w-0">
                  <FaFile className="text-github-secondary flex-shrink-0" />
                  <span className="text-sm text-white truncate">
                    {file.webkitRelativePath || file.name}
                  </span>
                  <span className="text-xs text-github-secondary flex-shrink-0">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-github-secondary hover:text-red-400 transition flex-shrink-0 ml-2"
                  disabled={disabled}
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-3">
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || uploading || disabled}
          className="flex items-center gap-2 px-6 py-2.5 bg-github-button hover:bg-github-buttonHover text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spin"></div>
              Uploading...
            </>
          ) : (
            <>
              <FaUpload className="w-4 h-4" />
              Upload {files.length > 0 ? `(${files.length})` : ''}
            </>
          )}
        </button>
        {uploading && (
          <span className="text-sm text-github-secondary flex items-center">
            Please wait...
          </span>
        )}
      </div>
    </div>
  )
}