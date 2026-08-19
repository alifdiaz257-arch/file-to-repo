import './globals.css'

export const metadata = {
  title: 'GitHub File Manager • Permanently Discontinued',
  description: 'Website telah berhenti permanen. Developer stres.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  )
}
