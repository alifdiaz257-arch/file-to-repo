'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaGithub, 
  FaFolder, 
  FaUpload, 
  FaSignOutAlt, 
  FaSignInAlt,
  FaEdit,
  FaTimes,
  FaHome
} from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

export function Sidebar({ isOpen, isMobile, toggle, onItemClick }) {
  const { data: session } = useSession()
  const pathname = usePathname()

  const menuItems = [
    { href: '/', icon: <MdDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { href: '/browse', icon: <FaFolder className="w-5 h-5" />, label: 'Browse Files' },
    { href: '/upload', icon: <FaUpload className="w-5 h-5" />, label: 'Upload' },
    { href: '/editor', icon: <FaEdit className="w-5 h-5" />, label: 'Editor' },
  ]

  const handleLinkClick = () => {
    if (isMobile && onItemClick) {
      onItemClick()
    }
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-github-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaGithub className="w-8 h-8 text-white" />
          <span className="text-xl font-bold text-white">GitHub Manager</span>
        </div>
        {isMobile && (
          <button
            onClick={toggle}
            className="text-github-secondary hover:text-white transition"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              pathname === item.href
                ? 'bg-github-button text-white'
                : 'text-github-secondary hover:bg-github-hover hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-github-border">
        {session ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-8 h-8 rounded-full border border-github-border"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-github-secondary truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-github-hover text-github-secondary hover:text-white transition"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('github')}
            className="flex items-center justify-center gap-2 w-full p-2 bg-github-button hover:bg-github-buttonHover text-white rounded-lg transition"
          >
            <FaSignInAlt className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </div>
  )

  // Desktop
  if (!isMobile) {
    return (
      <aside className="w-64 bg-github-card border-r border-github-border flex-shrink-0 h-screen sticky top-0 overflow-y-auto">
        {sidebarContent}
      </aside>
    )
  }

  // Mobile
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={toggle} />
          <div className="absolute top-0 left-0 w-80 h-full bg-github-card shadow-2xl sidebar-enter">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}