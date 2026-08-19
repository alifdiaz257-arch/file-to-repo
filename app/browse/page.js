'use client'

import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { FileList } from '@/components/FileList'
import { useGithub } from '@/hooks/useGithub'
import { FaFolderOpen, FaArrowLeft } from 'react-icons/fa'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Browse() {
  const { data: session } = useSession()
  const { loading, fetchFiles } = useGithub()
  const [files, setFiles] = useState([])
  const [currentPath, setCurrentPath] = useState('')
  const [pathHistory, setPathHistory] = useState([])

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
          <p className="text-github-secondary">You need to sign in to browse files</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-github-card border border-github-border rounded-lg">
        {/* Header */}
        <div className="p-4 border-b border-github-border">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-xl font-bold text-white">Browse Files</h2>
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1 text-sm text-github-secondary">
              {pathHistory.length > 0 && (
                <button
                  onClick={goBack}
                  className="hover:text-white transition p-1"
                >
                  <FaArrowLeft className="w-4 h-4" />
                </button>
              )}
              <span className="text-white">/</span>
              {breadcrumbs.map((part, index) => (
                <span key={index}>
                  <span className="text-white">{part}</span>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-github-secondary mx-1">/</span>
                  )}
                </span>
              ))}
              {breadcrumbs.length === 0 && (
                <span className="text-github-secondary">root</span>
              )}
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="p-4">
          <FileList
            files={files}
            loading={loading}
            onFileClick={handleFileClick}
          />
        </div>
      </div>
    </Layout>
  )
}