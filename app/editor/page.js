'use client'

import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useGithub } from '@/hooks/useGithub'
import { FileList } from '@/components/FileList'
import { FaSave, FaCopy, FaTrash, FaFile, FaCheckCircle } from 'react-icons/fa'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Editor() {
  const { data: session } = useSession()
  const { loading, fetchFiles, saveFile, deleteFile } = useGithub()
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    if (session) {
      loadFiles('')
    }
  }, [session])

  const loadFiles = async (path) => {
    const data = await fetchFiles(path)
    setFiles(data)
    setCurrentPath(path)
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
      await saveFile(selectedFile.path, content, `Update ${selectedFile.name}`)
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
      await deleteFile(selectedFile.path)
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
          <p className="text-github-secondary">You need to sign in to edit files</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ height: 'calc(100vh - 200px)' }}>
        {/* File Browser */}
        <div className="lg:col-span-1 bg-github-card border border-github-border rounded-lg p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-github-secondary mb-3">Files</h3>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <FileList
              files={files}
              loading={false}
              onFileClick={handleFileSelect}
            />
          )}
        </div>

        {/* Editor */}
        <div className="lg:col-span-3 bg-github-card border border-github-border rounded-lg flex flex-col">
          {selectedFile ? (
            <>
              {/* Toolbar */}
              <div className="p-4 border-b border-github-border flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <FaFile className="text-github-secondary flex-shrink-0" />
                  <span className="font-medium text-white truncate">{selectedFile.name}</span>
                  <span className="text-xs text-github-secondary truncate hidden sm:inline">
                    {selectedFile.path}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-3 py-1.5 bg-github-button hover:bg-github-buttonHover text-white rounded transition disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spin"></div>
                    ) : (
                      <FaSave className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-github-border hover:bg-github-hover text-white rounded transition"
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
                    <span className="flex items-center gap-1 text-github-success text-sm">
                      <FaCheckCircle />
                      Saved!
                    </span>
                  )}
                </div>
              </div>

              {/* Editor Area */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 p-4 bg-github-bg text-github-text font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
                placeholder="Edit file content..."
                style={{ minHeight: '300px' }}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-github-secondary">
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