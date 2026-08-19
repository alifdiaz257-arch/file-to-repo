'use client'

import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { FaSave, FaCopy, FaTrash, FaFile, FaCheckCircle } from 'react-icons/fa'

export default function Editor() {
  const { data: session } = useSession()
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    if (session) {
      loadFiles('')
    }
  }, [session])

  const loadFiles = async (path) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/github/files?path=${encodeURIComponent(path)}`)
      const data = await res.json()
      setFiles(data)
      setCurrentPath(path)
    } catch (error) {
      console.error('Error loading files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = async (file) => {
    if (file.type === 'dir') {
      loadFiles(file.path)
      return
    }

    try {
      const res = await fetch(`/api/github/file-content?path=${encodeURIComponent(file.path)}`)
      const data = await res.json()
      setSelectedFile(file)
      setContent(data.content || '')
    } catch (error) {
      console.error('Error loading file:', error)
    }
  }

  const handleSave = async () => {
    if (!selectedFile) return
    setSaving(true)
    try {
      const res = await fetch('/api/github/save-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: selectedFile.path,
          content: content,
          message: `Update ${selectedFile.name}`
        })
      })
      if (!res.ok) throw new Error('Save failed')
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedFile) return
    if (!confirm(`Are you sure you want to delete ${selectedFile.name}?`)) return
    
    try {
      const res = await fetch('/api/github/delete-file', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: selectedFile.path })
      })
      if (!res.ok) throw new Error('Delete failed')
      setSelectedFile(null)
      setContent('')
      loadFiles(currentPath)
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    alert('Content copied to clipboard!')
  }

  if (!session) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white">Please Sign In</h2>
          <p className="text-[#8b949e]">You need to sign in to edit files</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-lg p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-[#8b949e] mb-3">Files</h3>
          {loading ? (
            <div className="text-center text-[#8b949e] py-4">Loading...</div>
          ) : (
            <div className="space-y-1">
              {files.map((file) => (
                <div
                  key={file.sha}
                  onClick={() => handleFileSelect(file)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                    selectedFile?.path === file.path
                      ? 'bg-[#238636] text-white'
                      : 'hover:bg-[#1f2937] text-[#8b949e] hover:text-white'
                  }`}
                >
                  {file.type === 'dir' ? '📁' : '📄'}
                  <span className="flex-1 text-sm">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-3 bg-[#161b22] border border-[#30363d] rounded-lg flex flex-col">
          {selectedFile ? (
            <>
              <div className="p-4 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <FaFile className="text-[#8b949e] flex-shrink-0" />
                  <span className="font-medium text-white truncate">{selectedFile.name}</span>
                  <span className="text-xs text-[#8b949e] truncate hidden sm:inline">{selectedFile.path}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white rounded transition disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FaSave className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-white rounded transition"
                  >
                    <FaCopy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition"
                  >
                    <FaTrash className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                  {saveSuccess && (
                    <span className="flex items-center gap-1 text-[#3fb950] text-sm">
                      <FaCheckCircle />
                      Saved!
                    </span>
                  )}
                </div>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 p-4 bg-[#0d1117] text-[#c9d1d9] font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
                placeholder="Edit file content..."
                style={{ minHeight: '300px' }}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#8b949e]">
              <div className="text-center p-8">
                <FaFile className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium text-white">Select a file to edit</p>
                <p className="text-sm">Choose a file from the left sidebar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
