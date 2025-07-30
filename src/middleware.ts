import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/api/product')) {
  //   return NextResponse.json({
  //     message: "Product not found"})
  // }
 
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }
}