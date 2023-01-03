import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ColorModeContext, useMode} from '../config/theme'
import {Provider} from 'react-redux';
import {CssBaseline, ThemeProvider} from "@mui/material";
import React, {useEffect} from "react";
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import {wrapper} from "../store/store";
import {setupListeners} from "@reduxjs/toolkit/query";
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";
import MainLayout from "../shared/layout/MainLayout";
import {AuthGuardHoc} from "../shared/hoc/AuthGuardHoc";
import {SessionProvider} from "next-auth/react";


const clientSideEmotionCache = createEmotionCache()

function App({
                 Component,
                 pageProps,
                 emotionCache = clientSideEmotionCache,
                 ...appProps
             }: AppProps & { emotionCache: EmotionCache, auth: boolean }) {
    const {store, props} = wrapper.useWrappedStore({pageProps});
    setupListeners(store.dispatch)
    const [theme, colorMode] = useMode();
    useEffect(() => {
        // persistStore(store).dispatch({type: 'persist/REHYDRATE', payload: null, key:'s' })
    }, [])
    ////<Loader> <CircularProgress disableShrink /></Loader>
    return <Provider store={store}>
        <ColorModeContext.Provider value={colorMode as any}>

            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme as any}>
                    <CssBaseline/>
                    <SessionProvider session={pageProps.session}>
                        <MainLayout disableLayout={(Component as any).disableLayout}>
                            <AuthGuardHoc>
                                <Component {...props.pageProps} />
                            </AuthGuardHoc>
                        </MainLayout>
                    </SessionProvider>
                </ThemeProvider>
            </CacheProvider>

        </ColorModeContext.Provider>
    </Provider>
}

export default App;

