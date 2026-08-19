'use client'

import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { FaGithub, FaFolder, FaUpload, FaEdit } from 'react-icons/fa'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  const quickActions = [
    { href: '/browse', icon: <FaFolder className="w-5 h-5" />, label: 'Browse Files' },
    { href: '/upload', icon: <FaUpload className="w-5 h-5" />, label: 'Upload Files' },
    { href: '/editor', icon: <FaEdit className="w-5 h-5" />, label: 'Editor' },
  ]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#161b22] border border-[#30363d] rounded-full">
            <FaGithub className="w-8 h-8 text-[#238636]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">GitHub File Manager</h1>
            <p className="text-[#8b949e]">Manage your repository files directly from the browser</p>
          </div>
        </div>

        {session ? (
          <>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 p-4 bg-[#1f2937] rounded-lg hover:bg-[#238636] hover:text-white transition group"
                  >
                    <span className="text-[#8b949e] group-hover:text-white transition">{action.icon}</span>
                    <span className="font-medium">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
              <div className="flex items-center gap-4">
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-12 h-12 rounded-full border-2 border-[#30363d]"
                />
                <div>
                  <p className="text-lg font-medium text-white">Welcome back, {session.user.name}!</p>
                  <p className="text-sm text-[#8b949e]">{session.user.email}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-12 text-center">
            <FaGithub className="w-16 h-16 mx-auto mb-4 text-[#8b949e] opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
            <p className="text-[#8b949e] mb-6 max-w-md mx-auto">
              Sign in with GitHub to manage your repositories, upload files, and edit content directly from your browser.
            </p>
            <Link
              href="/auth/signin"
              className="inline-block px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg transition font-medium"
            >
              Sign in with GitHub
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
