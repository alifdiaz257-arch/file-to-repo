import { NextResponse } from 'next/server'

export function middleware(request) {
  // Redirect semua halaman ke root
  const url = request.nextUrl.clone()
  url.pathname = '/'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/browse/:path*', 
    '/upload/:path*', 
    '/editor/:path*', 
    '/tracking/:path*',
    '/api/:path*'
  ]
}
