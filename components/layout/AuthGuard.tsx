import { useRouter } from "next/router"
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectAuthState, setAuthState} from "../../store/slices/authSlice";
import {NextShield} from "next-shield";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

const Loader = styled(Box)(({ theme }) => ({
    display:'flex',
    position:'absolute',
    top:0,
    left:0,
    width:'100vw',
    height:'100vh',
    zIndex:1200,
    backgroundColor: theme.palette.background.default,
    alignItems: 'center',
    justifyContent: 'center'
}));

export function AuthGuard({ children, auth }: { children: JSX.Element, auth: boolean }) {
    const authState = useAppSelector(selectAuthState)
    const router = useRouter()
    if(typeof window === 'undefined') {
        console.log('on server side guard', auth)

    }else{
        console.log('on client side guard', auth)
        useAppDispatch()(setAuthState(true))
    }
    //<Loader> <CircularProgress disableShrink /></Loader>
    return  <NextShield
        isAuth={auth || authState}
        isLoading={true}
        router={router}
        privateRoutes={['/dashboard', '/home']}
        publicRoutes={['/signin', '/login']}
        hybridRoutes={['/']}
        accessRoute="/dashboard"
        loginRoute="/login"
        LoadingComponent={null}
    >{children}</NextShield>
}
