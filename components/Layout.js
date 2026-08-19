'use client'

import { useSidebar } from '@/hooks/useSidebar'
import { Sidebar } from './Sidebar'
import { FaBars } from 'react-icons/fa'
import { useSession } from 'next-auth/react'

export default function Layout({ children }) {
  const { data: session } = useSession()
  const { isOpen, isMobile, toggle, close } = useSidebar()

  return (
    <div className="flex min-h-screen bg-github-bg">
      <Sidebar 
        isOpen={isOpen}
        isMobile={isMobile}
        toggle={toggle}
        onItemClick={close}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        {isMobile && (
          <header className="bg-github-card border-b border-github-border p-4 flex items-center gap-4 sticky top-0 z-30">
            <button
              onClick={toggle}
              className="text-github-secondary hover:text-white transition"
            >
              <FaBars className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-white">GitHub Manager</h1>
            {session && (
              <div className="ml-auto">
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-8 h-8 rounded-full border border-github-border"
                />
              </div>
            )}
          </header>
        )}

        {/* Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}