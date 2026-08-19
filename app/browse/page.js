'use client'  // ← WAJIB ADA!

import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'  // ← PASTI IMPORT!
import { FaArrowLeft, FaFolderOpen } from 'react-icons/fa'

export default function Browse() {
  const { data: session } = useSession()
  const [files, setFiles] = useState([])  // ← useState
  const [loading, setLoading] = useState(false)  // ← useState
  const [currentPath, setCurrentPath] = useState('')  // ← useState
  const [pathHistory, setPathHistory] = useState([])  // ← useState

  useEffect(() => {  // ← useEffect
    if (session) {
      loadFiles('')
    }
  }, [session])  // ← useEffect dependency

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

  const handleFileClick = (file) => {
    if (file.type === 'dir') {
      setPathHistory(prev => [...prev, currentPath])
      loadFiles(file.path)
    }
  }

  const goBack = () => {
    const prevPath = pathHistory.pop()
    if (prevPath !== undefined) {
      setPathHistory([...pathHistory])
      loadFiles(prevPath)
    }
  }

  const breadcrumbs = currentPath.split('/').filter(Boolean)

  if (!session) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white">Please Sign In</h2>
          <p className="text-[#8b949e]">You need to sign in to browse files</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg">
        <div className="p-4 border-b border-[#30363d]">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-xl font-bold text-white">Browse Files</h2>
            <div className="flex items-center gap-1 text-sm text-[#8b949e]">
              {pathHistory.length > 0 && (
                <button onClick={goBack} className="hover:text-white transition p-1">
                  <FaArrowLeft className="w-4 h-4" />
                </button>
              )}
              <span className="text-white">/</span>
              {breadcrumbs.map((part, index) => (
                <span key={index}>
                  <span className="text-white">{part}</span>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-[#8b949e] mx-1">/</span>
                  )}
                </span>
              ))}
              {breadcrumbs.length === 0 && (
                <span className="text-[#8b949e]">root</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="text-center text-[#8b949e] py-10">Loading...</div>
          ) : files.length === 0 ? (
            <div className="text-center text-[#8b949e] py-16">
              <FaFolderOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium text-white">Empty folder</p>
              <p className="text-sm">Upload files to get started</p>
            </div>
          ) : (
            <div className="space-y-1">
              {files.map((file) => (
                <div
                  key={file.sha}
                  onClick={() => handleFileClick(file)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1f2937] transition cursor-pointer"
                >
                  {file.type === 'dir' ? (
                    <span className="text-blue-400">📁</span>
                  ) : (
                    <span className="text-[#8b949e]">📄</span>
                  )}
                  <span className="flex-1 text-white">{file.name}</span>
                  <span className="text-xs text-[#8b949e]">
                    {file.type === 'dir' ? 'folder' : `${(file.size / 1024).toFixed(1)} KB`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
