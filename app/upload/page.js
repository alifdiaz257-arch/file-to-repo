'use client'

import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { useState } from 'react'  // ← PASTI IMPORT!
import { FaCheckCircle } from 'react-icons/fa'
import { FileUpload } from '@/components/FileUpload'

export default function Upload() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)  // ← useState
  const [error, setError] = useState(null)  // ← useState
  const [success, setSuccess] = useState(false)  // ← useState

  const handleUpload = async (files, path) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    formData.append('path', path || '')

    try {
      const res = await fetch('/api/github/upload', {
        method: 'POST',
        body: formData,
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white">Please Sign In</h2>
          <p className="text-[#8b949e]">You need to sign in to upload files</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Upload Files</h2>
            <p className="text-[#8b949e]">Upload files and folders to your repository</p>
          </div>
          {success && (
            <div className="flex items-center gap-2 text-[#3fb950] bg-green-500/10 px-4 py-2 rounded-lg">
              <FaCheckCircle className="w-5 h-5" />
              <span>Upload successful!</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400">
            Error: {error}
          </div>
        )}

        <FileUpload
          onUpload={handleUpload}
          uploading={loading}
          disabled={loading}
        />

        <div className="mt-6 p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
          <p className="text-sm text-[#8b949e]">
            <span className="font-medium text-white">Tip:</span> You can upload files up to 100MB.
            Folders will maintain their structure when uploaded.
          </p>
        </div>
      </div>
    </Layout>
  )
}
