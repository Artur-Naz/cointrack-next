import { useMode } from '../configs/theme'
import { Provider } from 'react-redux'
import React, {ReactNode, useEffect} from 'react'
import { wrapper } from '../store/store'
import { setupListeners } from '@reduxjs/toolkit/query'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { AuthGuardHoc } from '../@core/hoc/AuthGuardHoc'
import {SessionProvider, useSession} from 'next-auth/react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { Gateway } from '../services/socket.io'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}
const SocketProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const {data} = useSession()
  useEffect(() => {
    if (data?.accessToken) {
      const gateway = Gateway.SocketFactory(
        'http://localhost:8000',
        data.accessToken
      )


      return () => gateway.unregisterHandlers()
    }
    //persistStore(store).dispatch({type: 'persist/REHYDRATE', payload: null, key:'s' })
  }, [data])
  return (<>{children}</>)
}
function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
  ...appProps
}: AppProps & { emotionCache: EmotionCache; auth: boolean }) {
  const { store } = wrapper.useWrappedStore({ pageProps })
  setupListeners(store.dispatch)

  // Variables
  // @ts-ignore
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  // useEffect(() => {
  //   //persistStore(store).dispatch({type: 'persist/REHYDRATE', payload: null, key:'s' })
  // }, [])
  ////<Loader> <CircularProgress disableShrink /></Loader>

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <SocketProvider>
          <AuthGuardHoc>
            <SettingsProvider>
              <ThemeComponent >{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            </SettingsProvider>
          </AuthGuardHoc>
          </SocketProvider>
        </SessionProvider>
      </Provider>
    </CacheProvider>
  )
}

export default App
