import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  
  // Redirect semua halaman ke root
  if (url.pathname !== '/') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/browse/:path*',
    '/upload/:path*', 
    '/editor/:path*',
    '/tracking/:path*',
    '/auth/:path*',
    '/api/:path*'
  ]
}
