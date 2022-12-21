import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ColorModeContext, useMode} from '../config/theme'
import {Provider} from 'react-redux';
import { CssBaseline, ThemeProvider} from "@mui/material";
import React, {useEffect} from "react";
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import {AppState, wrapper} from "../store/store";
import Box from '@mui/material/Box';
import {setupListeners} from "@reduxjs/toolkit/query";
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";
import {styled, Theme} from "@mui/material/styles";
import {logout, setAuthState} from "../store/slices/authSlice";
import MainLayout from "../shared/layout/MainLayout";
import {privateRoutes, publicRoutes} from "../config/routes";
import {AuthGuardHoc} from "../shared/hoc/AuthGuardHoc";
import {useProfileQuery} from "../modules/auth/api/authApi";


const clientSideEmotionCache = createEmotionCache()

function App({
                 Component,
                 pageProps,
                 emotionCache = clientSideEmotionCache,
                 ...appProps
             }: AppProps<{a:number}> & { emotionCache: EmotionCache, auth: boolean }) {
    const {store, props} = wrapper.useWrappedStore({pageProps});
    setupListeners(store.dispatch)
    const [theme, colorMode] = useMode();
    useEffect(() => {
        if (publicRoutes.includes(appProps.router.pathname)) {
            store.dispatch(logout())
        }else if (privateRoutes.includes(appProps.router.pathname)) {
            store.dispatch(setAuthState(true))
        }
    }, [])

    ////<Loader> <CircularProgress disableShrink /></Loader>
    return <PersistGate persistor={persistStore(store)} loading={null}><Provider store={store}>
        <ColorModeContext.Provider value={colorMode as any}>

            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme as any}>
                    <CssBaseline/>
                    <MainLayout disableLayout={(Component as any).disableLayout}>
                        <AuthGuardHoc>
                            <Component {...props.pageProps} />
                        </AuthGuardHoc>
                    </MainLayout>
                </ThemeProvider>
            </CacheProvider>

        </ColorModeContext.Provider>
    </Provider></PersistGate>
}

export default App;

