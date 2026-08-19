'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages = {
    'OAuthSignin': 'Error starting OAuth sign in. Please try again.',
    'OAuthCallback': 'Error during OAuth callback. Please try again.',
    'OAuthCreateAccount': 'Error creating account. Please try again.',
    'EmailCreateAccount': 'Error creating email account. Please try again.',
    'Callback': 'Error during callback. Please try again.',
    'OAuthAccountNotLinked': 'This GitHub account is already linked to another user.',
    'EmailSignin': 'Error signing in with email. Please try again.',
    'CredentialsSignin': 'Invalid credentials. Please try again.',
    'SessionRequired': 'Session required. Please sign in.',
    'AccessDenied': 'Access denied. You do not have permission.',
    'Configuration': 'Configuration error. Please contact support.',
    'Default': 'An error occurred during authentication.',
  }

  const message = error ? errorMessages[error] || errorMessages.Default : 'Unknown error occurred.'

  return (
    <div className="min-h-screen flex items-center justify-center bg-github-bg p-4">
      <div className="bg-github-card border border-github-border rounded-lg p-8 max-w-md w-full fade-in">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <FaExclamationTriangle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Authentication Error</h1>
          <p className="text-github-secondary mb-6">{message}</p>

          {error && (
            <div className="mb-6 p-3 bg-github-bg border border-github-border rounded text-xs text-github-secondary font-mono overflow-x-auto">
              Error: {error}
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full px-4 py-2.5 bg-github-button hover:bg-github-buttonHover text-white rounded-lg transition text-center font-medium"
            >
              Try Again
            </Link>
            
            <Link
              href="/"
              className="block w-full px-4 py-2.5 bg-github-border hover:bg-github-hover text-white rounded-lg transition text-center flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}