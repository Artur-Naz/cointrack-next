import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ColorModeContext, useMode} from '../config/theme'
import {Provider} from 'react-redux';
import {CssBaseline, ThemeProvider} from "@mui/material";
import React, {useCallback, useState} from "react";
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import {wrapper} from "../store/store";
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DR from '../components/layout/Drawer'
import Image from "next/image";
import AppBar from "../components/layout/AppBar";
import {setupListeners} from "@reduxjs/toolkit/query";
import ResponsiveAppBar from "../components/layout/AppBar";
import Container from "@mui/material/Container";




const clientSideEmotionCache = createEmotionCache()

function App({Component, pageProps, emotionCache = clientSideEmotionCache, ...appProps}: AppProps & { emotionCache: EmotionCache }) {
    const {store, props} = wrapper.useWrappedStore({pageProps});
    setupListeners(store.dispatch)
    const [theme, colorMode] = useMode();
    // const [isSidebar, setIsSidebar] = useState(true);
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen =  useCallback(() => {
        setOpen(true);
    },[]);

    const handleDrawerClose = useCallback( () => {
        setOpen(false);
    },[]);

   // console.log(appProps, '+++++++');
    const pagesWithoutLayout = ['/login']
    if(['/dashboard'].includes(appProps.router.pathname) ){
        if(typeof window !== 'undefined'){
             appProps.router.push('/login')
        }else{
            Component.getInitialProps =  (context) => {
                console.log(context.req?.headers);
                context.res?.writeHead(302, {
                    Location: '/login',
                });
                context.res?.end();

            }
        }


    }



    return<React.StrictMode> <Provider store={store}>
        <ColorModeContext.Provider value={colorMode as any}>

            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme as any}>
                    <Box  display={'flex'} flexDirection={'column'} className="app" minHeight={'100vh'}>
                        <CssBaseline/>
                        {!pagesWithoutLayout.includes(appProps.router.pathname) && <ResponsiveAppBar />}

                        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth={'xl'}>

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
    </Provider></React.StrictMode>
}

export default App;

