// middleware.ts
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {privateRoutes, publicRoutes} from "./config/routes";


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   // return NextResponse.next()
    if(request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/static')){
        return NextResponse.next()
    }

    const isAuthorized = request.cookies.has('accessToken')
    console.log(request.nextUrl.pathname);
    (request as any).user = 'user'

    if (privateRoutes.includes(request.nextUrl.pathname)){
        if(!isAuthorized){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if (publicRoutes.includes(request.nextUrl.pathname)){
        console.log(request.nextUrl.pathname, ' is public route', isAuthorized, 'redirect to', '/dashboard');
        if(isAuthorized){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

     return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*',
}
