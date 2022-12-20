import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ColorModeContext, useMode} from '../config/theme'
import {Provider} from 'react-redux';
import {CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";
import React, {useCallback, useState} from "react";
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import {AppState, wrapper} from "../store/store";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {setupListeners} from "@reduxjs/toolkit/query";
import ResponsiveAppBar from "../components/layout/AppBar";
import Container from "@mui/material/Container";
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";
import {NextShield} from "next-shield";
import {useRouter} from "next/router";
import {selectAuthState} from "../store/slices/authSlice";
import {styled, Theme} from "@mui/material/styles";
import {useAppSelector} from "../store/hooks";
import {AuthGuard} from "../components/layout/AuthGuard";


const clientSideEmotionCache = createEmotionCache()
const Loader = styled(Box)(({theme}) => ({
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1200,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
}));

function App({
                 Component,
                 pageProps,
                 emotionCache = clientSideEmotionCache,
                 ...appProps
             }: AppProps & { emotionCache: EmotionCache }) {
    const {store, props} = wrapper.useWrappedStore({pageProps});
    setupListeners(store.dispatch)
    const [theme, colorMode] = useMode();

    const pagesWithoutLayout = ['/login']

    const router = useRouter()
    // const auth = useAppSelector(state => selectAuthState(state))
    return <PersistGate persistor={persistStore(store)} loading={<Loader> <CircularProgress disableShrink /></Loader>}>
        <Provider store={store}>
            <ColorModeContext.Provider value={colorMode as any}>

                <CacheProvider value={emotionCache}>
                    <ThemeProvider theme={theme as any}>
                        <Box display={'flex'} flexDirection={'column'} className="app" minHeight={'100vh'}>
                            <CssBaseline/>
                            {!pagesWithoutLayout.includes(appProps.router.pathname) && <ResponsiveAppBar/>}

                            <Container component="main" sx={{mt: 8, mb: 2}} maxWidth={'xl'}>
                                <AuthGuard>
                                    <span></span>
                                </AuthGuard>
                                <Component {...props.pageProps} />
                            </Container>
                            <Box
                                component="footer"
                                sx={{
                                    py: 3,
                                    px: 2,
                                    mt: 'auto',
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[200]
                                            : theme.palette.grey[800],
                                }}
                            >
                                <Container maxWidth="sm">
                                    <Typography variant="body1">
                                        My sticky footer can be found here.
                                    </Typography>
                                </Container>
                            </Box>
                        </Box>

                    </ThemeProvider>
                </CacheProvider>

            </ColorModeContext.Provider>
        </Provider>
        </PersistGate>
}

export default App;

