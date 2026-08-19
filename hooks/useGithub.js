'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'

/**
 * Custom hook untuk interaksi dengan GitHub API
 * Mengelola state loading, error, dan data
 */
export function useGithub() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setData(null)
  }, [])

  /**
   * Get authenticated user
   */
  const getUser = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/user')
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to get user')
      }
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Get repository stats
   */
  const getRepoStats = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/repo-stats')
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to get repo stats')
      }
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Get files in a directory
   */
  const getFiles = useCallback(async (path = '') => {
    setLoading(true)
    setError(null)
    try {
      const url = `/api/github/files?path=${encodeURIComponent(path)}`
      const res = await fetch(url)
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to get files')
      }
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Get file content
   */
  const getFileContent = useCallback(async (path) => {
    setLoading(true)
    setError(null)
    try {
      const url = `/api/github/file-content?path=${encodeURIComponent(path)}`
      const res = await fetch(url)
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to get file content')
      }
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Upload files
   */
  const uploadFiles = useCallback(async (files, path = '') => {
    setLoading(true)
    setError(null)
    
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    formData.append('path', path)

    try {
      const res = await fetch('/api/github/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Upload failed')
      }
      
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Save file (create or update)
   */
  const saveFile = useCallback(async (path, content, message) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/save-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path,
          content,
          message: message || `Update ${path}`,
        }),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Save failed')
      }
      
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Create folder
   */
  const createFolder = useCallback(async (path) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/create-folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to create folder')
      }
      
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Delete file or folder
   */
  const deleteFile = useCallback(async (path) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/delete-file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Delete failed')
      }
      
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Move/Rename file
   */
  const moveFile = useCallback(async (sourcePath, destinationPath, message) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/move-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourcePath,
          destinationPath,
          message: message || `Move ${sourcePath} to ${destinationPath}`,
        }),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Move failed')
      }
      
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Search files
   */
  const searchFiles = useCallback(async (query) => {
    setLoading(true)
    setError(null)
    try {
      const url = `/api/github/search?q=${encodeURIComponent(query)}`
      const res = await fetch(url)
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Search failed')
      }
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Get branches
   */
  const getBranches = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/github/branches')
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to get branches')
      }
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Get commits
   */
  const getCommits = useCallback(async (path = '') => {
    setLoading(true)
    setError(null)
    try {
      const url = `/api/github/commits?path=${encodeURIComponent(path)}`
      const res = await fetch(url)
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to get commits')
      }
      const data = await res.json()
      setData(data)
      return data
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    // State
    loading,
    error,
    data,
    isAuthenticated: !!session,

    // Methods
    reset,
    getUser,
    getRepoStats,
    getFiles,
    getFileContent,
    uploadFiles,
    saveFile,
    createFolder,
    deleteFile,
    moveFile,
    searchFiles,
    getBranches,
    getCommits,
  }
}
