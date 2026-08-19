import './globals.css'

export const metadata = {
  title: 'GitHub File Manager • Website Berhenti',
  description: 'Pengembangan dihentikan sementara. Dev stress.',
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
