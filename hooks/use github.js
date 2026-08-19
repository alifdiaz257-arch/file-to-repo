'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'

export function useGithub() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchFiles = useCallback(async (path = '') => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/github/files?path=${encodeURIComponent(path)}`)
      if (!res.ok) throw new Error('Failed to fetch files')
      const data = await res.json()
      return data
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const uploadFiles = useCallback(async (files, path = '') => {
    setLoading(true)
    setError(null)
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    formData.append('path', path)

    try {
      const res = await fetch('/api/github/upload', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) throw new Error('Upload failed')
      return await res.json()
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const saveFile = useCallback(async (path, content, message) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/save-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content, message })
      })
      if (!res.ok) throw new Error('Save failed')
      return await res.json()
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteFile = useCallback(async (path) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/delete-file', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path })
      })
      if (!res.ok) throw new Error('Delete failed')
      return await res.json()
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    fetchFiles,
    uploadFiles,
    saveFile,
    deleteFile,
  }
}