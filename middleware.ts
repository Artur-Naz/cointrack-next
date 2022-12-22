import {privateRoutes, publicRoutes} from "./config/routes";
import {withAuth} from "next-auth/middleware";
import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";



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
export default async function (req: NextRequest){
    const token = await getToken({ req })
    if(token && publicRoutes.includes(req.nextUrl.pathname)){
        req.nextUrl.pathname = '/dashboard'
       return  NextResponse.redirect(req.nextUrl)
    }
    //req.
    return AuthMiddleware(req)
}
export const config = { matcher: [
        ...privateRoutes,
        ... publicRoutes,
    ] }
