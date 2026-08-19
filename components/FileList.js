'use client'

import { useState } from 'react'
import { FileIcon } from './FileIcon'
import { FaChevronRight, FaFolderOpen } from 'react-icons/fa'

export function FileList({ files, loading, onFileClick }) {
  const [currentPath, setCurrentPath] = useState('')

  const handleFileClick = (file) => {
    if (file.type === 'dir') {
      setCurrentPath(file.path)
    }
    if (onFileClick) {
      onFileClick(file)
    }
  }

  if (loading) {
    return (
      <div className="text-center text-github-secondary py-10">
        <div className="w-8 h-8 border-4 border-github-border border-t-github-button rounded-full spin mx-auto mb-4"></div>
        <p>Loading files...</p>
      </div>
    )
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center text-github-secondary py-16">
        <FaFolderOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium">Empty folder</p>
        <p className="text-sm">Upload files to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {files.map((file) => (
        <div
          key={file.sha}
          onClick={() => handleFileClick(file)}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-github-hover transition cursor-pointer group"
        >
          <FileIcon file={file} />
          <span className="flex-1 text-white group-hover:text-white transition">
            {file.name}
          </span>
          <span className="text-xs text-github-secondary">
            {file.type === 'dir' ? (
              <span className="flex items-center gap-1">
                folder <FaChevronRight className="w-3 h-3" />
              </span>
            ) : (
              `${(file.size / 1024).toFixed(1)} KB`
            )}
          </span>
        </div>
      ))}
    </div>
  )
}