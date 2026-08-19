'use client'

import { Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'

function SignInContent() {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams?.get('error')
  const callbackUrl = searchParams?.get('callbackUrl') || '/'

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signIn('github', { callbackUrl, redirect: true })
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="text-[#8b949e]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-[#238636] rounded-full flex items-center justify-center">
            <FaGithub className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Sign in</h1>
          <p className="text-[#8b949e] mt-2">Manage your GitHub repositories</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error === 'OAuthAccountNotLinked' 
              ? 'This GitHub account is already linked to another user.'
              : error === 'AccessDenied'
              ? 'Access denied. Please check your permissions.'
              : 'An error occurred during authentication. Please try again.'}
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FaGithub className="w-6 h-6" />
          )}
          {loading ? 'Signing in...' : 'Sign in with GitHub'}
        </button>

        <div className="mt-6 text-center text-xs text-[#8b949e] border-t border-[#30363d] pt-4">
          <p>By signing in, you agree to our Terms of Service</p>
        </div>
      </div>
    </div>
  )
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="text-[#8b949e]">Loading...</div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
}
