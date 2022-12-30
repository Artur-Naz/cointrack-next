import {privateRoutes, publicRoutes} from "./config/routes";
import {withAuth} from "next-auth/middleware";
import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {decodeJwt} from "jose";



const AuthMiddleware = withAuth(
    function middleware(req) {

    },
    {

        pages: {
            signIn:'/login',
        },
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }) as any
export default async function (request: NextRequest){
    const token = await getToken({ req: request })

    if(token && publicRoutes.includes(request.nextUrl.pathname)){
        request.nextUrl.pathname = '/dashboard'
       return  NextResponse.redirect(request.nextUrl)
    }
    //req.
    return AuthMiddleware(request)
}
export const config = { matcher: [
        ...privateRoutes,
        ... publicRoutes,
    ] }
