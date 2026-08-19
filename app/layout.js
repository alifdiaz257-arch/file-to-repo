import { AuthProvider } from '@/components/AuthProvider'
import './globals.css'

export const metadata = {
  title: 'GitHub File Manager',
  description: 'Manage your GitHub repositories with ease',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}