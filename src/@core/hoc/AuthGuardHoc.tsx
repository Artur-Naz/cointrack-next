import { useRouter } from 'next/router'
import { privateRoutes, publicRoutes } from '../../configs/routes'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/slices/authSlice'

export function AuthGuardHoc({ children }: { children: JSX.Element }) {
  const { status, data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  useEffect(() => {
    if (status === 'authenticated') {
      const { accessToken, user } = data
      dispatch(login({ accessToken, user }))
    }
  }, [status, data, dispatch])

  if (status === 'authenticated' && data?.error) {
    signOut({ redirect: false })

    return null
  }

  if (status === 'unauthenticated' && privateRoutes.includes(router.pathname)) {
    router.replace('/auth/login')

    return null
  }
  if (status === 'authenticated' && publicRoutes.includes(router.pathname)) {
    router.replace('/dashboard')

    return null
  }

  return children
}
