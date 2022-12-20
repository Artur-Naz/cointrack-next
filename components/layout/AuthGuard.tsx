import { useRouter } from "next/router"
import {useAppSelector} from "../../store/hooks";
import {selectAuthState} from "../../store/slices/authSlice";
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

export function AuthGuard({ children }: { children: JSX.Element }) {
    const authState = useAppSelector(selectAuthState)
    const router = useRouter()
    if(typeof window === 'undefined') {
        console.log('on server side guard')

    }
    return  <NextShield
        isAuth={authState}
        isLoading={false}
        router={router}
        privateRoutes={['/dashboard', '/home']}
        publicRoutes={['/signin', '/login']}
        hybridRoutes={['/']}
        accessRoute="/dashboard"
        loginRoute="/login"
        LoadingComponent={<Loader> <CircularProgress disableShrink /></Loader>}
    >{children}</NextShield>
}
