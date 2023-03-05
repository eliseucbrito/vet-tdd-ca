import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req ? req.cookies.get('vet.token')?.value : null
  const { pathname } = req.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token && !pathname.includes('/login')) {
    // if is logged and page not is login
    return NextResponse.next()
  }

  // if is logged and is trying access login page
  if (pathname.includes('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // if token not exists and is trying access login
  if (!token && pathname.includes('/login')) {
    return NextResponse.next()
  }

  // is no is logged and is trying access page different of login
  if (
    token === undefined &&
    pathname !== '/login' &&
    !pathname.includes('_next')
  ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
