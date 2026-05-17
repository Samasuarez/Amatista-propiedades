import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin/login')) return NextResponse.next()

  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('admin_token')?.value
    const expected = btoa(process.env.ADMIN_PASSWORD ?? '')

    if (!token || token !== expected) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
