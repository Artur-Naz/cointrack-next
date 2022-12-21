import { useRouter } from "next/router"
import {NextShield} from "next-shield";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import {hybridRoutes, privateRoutes, publicRoutes} from "../../config/routes";
import {useAppSelector} from "../../store/hooks";
import {selectAuthState} from "../../store/slices/authSlice";
import {useProfileQuery} from "../../modules/auth/api/authApi";

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

export function AuthGuardHoc({ children }: { children: JSX.Element }) {
    const {data, isLoading, error} = useProfileQuery(undefined)
    const authState = useAppSelector(selectAuthState)
    const router = useRouter()
    if(typeof window === 'undefined') {
        console.log('on server side guard',)

    }else{
        console.log('on client side guard',)

    }
    //<Loader> <CircularProgress disableShrink /></Loader>
    return  <NextShield
        isAuth={Boolean(authState)}
        isLoading={authState === null}
        router={router}
        privateRoutes={privateRoutes}
        publicRoutes={publicRoutes}
        hybridRoutes={hybridRoutes}
        accessRoute="/dashboard"
        loginRoute="/login"
        LoadingComponent={null}
    >{children}</NextShield>
}
