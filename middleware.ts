import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'

export async function middleware(request: NextRequest) {
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/')
  const accessToken = request.cookies.get('accessToken')?.value

  // Try to verify access token first
  if (accessToken) {
    try {
      verifyAccessToken(accessToken)
      return NextResponse.next()
    } catch (error) {
      // Access token is invalid or expired (or Edge threw an error), continue to refresh logic
    }
  }

  // Missing or invalid access token. Try to refresh via internal fetch
  const cookieHeader = request.headers.get('cookie') || ''
  
  if (cookieHeader) {
    try {
      const refreshUrl = new URL('/api/auth/refresh', request.nextUrl.origin)
      const refreshRes = await fetch(refreshUrl.toString(), {
        method: 'POST',
        headers: {
          'cookie': cookieHeader
        }
      })

      if (refreshRes.ok) {
        // Refresh succeeded
        // Forward the request
        const res = NextResponse.next()
        
        // Append the new Set-Cookie headers from the refresh route to the outgoing response
        const setCookieHeaders = refreshRes.headers.getSetCookie()
        if (setCookieHeaders && setCookieHeaders.length > 0) {
          setCookieHeaders.forEach(cookie => {
            res.headers.append('Set-Cookie', cookie)
          })
        }
        return res
      }
    } catch (err) {
      console.error("Middleware internal refresh error:", err)
    }
  }

  // Refresh failed or no cookies at all
  if (isApiRoute) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/generate/:path*', '/api/history/:path*'],
}
