import { useRouter } from "next/router"
import { privateRoutes, publicRoutes} from "../../config/routes";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks";
import {login, logout} from "../../store/slices/authSlice";


export function AuthGuardHoc({ children }: { children: JSX.Element }) {
    const { status, data } = useSession()
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        if(status === "unauthenticated" && privateRoutes.includes(router.pathname)){
            router.replace('/login')
        }
        if(status === "authenticated" && publicRoutes.includes(router.pathname)){
            router.replace('/dashboard')
        }
        if(status === "authenticated"){
            const { user, accessToken } = data
            dispatch(login({accessToken, user}));
        }else if(status === "unauthenticated") {
            dispatch(logout())
        }

    }, [status])

    return  children
}
