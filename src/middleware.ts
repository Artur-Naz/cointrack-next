import { privateRoutes, publicRoutes } from './configs/routes'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const AuthMiddleware = withAuth(function middleware(req) {
  return;
}, {
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    authorized: ({ token }) => !!token
  }
}) as any
async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  if (token && publicRoutes.includes(request.nextUrl.pathname)) {
    request.nextUrl.pathname = '/dashboard'

return NextResponse.redirect(request.nextUrl)
  }

return AuthMiddleware(request)
}

const route = privateRoutes.concat(publicRoutes)
const config = { matcher: route }

module.exports = {
  config,
  default: middleware,
}
