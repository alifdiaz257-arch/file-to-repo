'use client'

import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { FaGithub, FaFolder, FaUpload, FaEdit, FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  const stats = [
    { icon: <FaCodeBranch className="w-5 h-5" />, label: 'Branches', value: '0' },
    { icon: <FaStar className="w-5 h-5" />, label: 'Stars', value: '0' },
    { icon: <FaEye className="w-5 h-5" />, label: 'Watchers', value: '0' },
  ]

  const quickActions = [
    { href: '/browse', icon: <FaFolder className="w-5 h-5" />, label: 'Browse Files', color: 'blue' },
    { href: '/upload', icon: <FaUpload className="w-5 h-5" />, label: 'Upload Files', color: 'green' },
    { href: '/editor', icon: <FaEdit className="w-5 h-5" />, label: 'Editor', color: 'purple' },
  ]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-github-card border border-github-border rounded-full">
            <FaGithub className="w-8 h-8 text-github-button" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">GitHub File Manager</h1>
            <p className="text-github-secondary">Manage your repository files directly from the browser</p>
          </div>
        </div>

        {session ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-github-card border border-github-border rounded-lg p-6">
                  <div className="flex items-center gap-2 text-github-secondary mb-1">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-github-card border border-github-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 p-4 bg-github-hover rounded-lg hover:bg-github-button hover:text-white transition group"
                  >
                    <span className="text-github-secondary group-hover:text-white transition">
                      {action.icon}
                    </span>
                    <span className="font-medium">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Welcome */}
            <div className="bg-github-card border border-github-border rounded-lg p-6">
              <div className="flex items-center gap-4">
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-12 h-12 rounded-full border-2 border-github-border"
                />
                <div>
                  <p className="text-lg font-medium text-white">Welcome back, {session.user.name}!</p>
                  <p className="text-sm text-github-secondary">{session.user.email}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Not Logged In
          <div className="bg-github-card border border-github-border rounded-lg p-12 text-center">
            <FaGithub className="w-16 h-16 mx-auto mb-4 text-github-secondary opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
            <p className="text-github-secondary mb-6 max-w-md mx-auto">
              Sign in with GitHub to manage your repositories, upload files, and edit content directly from your browser.
            </p>
            <Link
              href="/auth/signin"
              className="inline-block px-6 py-3 bg-github-button hover:bg-github-buttonHover text-white rounded-lg transition font-medium"
            >
              Sign in with GitHub
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}