'use client'

import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { useGithub } from '@/hooks/useGithub'
import { FileUpload } from '@/components/FileUpload'
import { FaCheckCircle } from 'react-icons/fa'

export default function Upload() {
  const { data: session } = useSession()
  const { loading, uploadFiles, error } = useGithub()
  const [success, setSuccess] = useState(false)

  const handleUpload = async (files, path) => {
    setSuccess(false)
    try {
      await uploadFiles(files, path)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error('Upload error:', err)
    }
  }

  if (!session) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white">Please Sign In</h2>
          <p className="text-github-secondary">You need to sign in to upload files</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-github-card border border-github-border rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Upload Files</h2>
            <p className="text-github-secondary">Upload files and folders to your repository</p>
          </div>
          {success && (
            <div className="flex items-center gap-2 text-github-success bg-green-500/10 px-4 py-2 rounded-lg">
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

        <div className="mt-6 p-4 bg-github-bg border border-github-border rounded-lg">
          <p className="text-sm text-github-secondary">
            <span className="font-medium text-white">Tip:</span> You can upload files up to 100MB.
            Folders will maintain their structure when uploaded.
          </p>
        </div>
      </div>
    </Layout>
  )
}