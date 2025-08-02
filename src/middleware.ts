import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = [
    '/api/login',
    '/api/signup',
    '/_next',
    '/favicon.ico',
  ]

  // Skip middleware for public routes
  if (publicRoutes.some(route =>
    request.nextUrl.pathname === route ||
    request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get('Token')?.value

  try {
    // If no token, redirect to login
    if (!token) {
      if (request.nextUrl.pathname !== '/login') {
        console.log('No token found, redirecting to login')
        return NextResponse.redirect(new URL('/login', request.url))
      }
      return NextResponse.next()
    }

    // Verify token
    const secret = new TextEncoder().encode(process.env.SECRET)
    const { payload } = await jwtVerify(token, secret)
    // Redirect authenticated users away from auth pages
    if (payload) {
      const pathname = request.nextUrl.pathname.replace(/\/$/, ''); // Remove trailing slash
      const authPages = ['/login', '/signup'];

      if (authPages.some(page => pathname === page.replace(/\/$/, ''))) {
        console.log('Authenticated user trying to access auth page, redirecting to home');
        const response = NextResponse.redirect(new URL('/', request.url));
        // Ensure we don't cache this redirect
        response.headers.set('Cache-Control', 'no-store');
        return response;
      }
    }

    // Add decoded payload to headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('decoded', JSON.stringify(payload))

    console.log('Token verified successfully:', payload)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

  } catch (err) {
    console.error('JWT verification failed:', err)
    // Clear invalid token and redirect
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('Token')
    return response
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}