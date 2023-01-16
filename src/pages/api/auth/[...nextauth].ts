import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { decodeJwt } from 'jose'
import { User } from '../../../store/slices/authSlice'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_COINTRACK_URL}/api/v1/auth/login`, {
            email: credentials?.email,
            password: credentials?.password
          })

          return data
        } catch (e) {
          console.log(e)

          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },

  //debug: true,
  callbacks: {
    async session({ session, token }) {
      session.user = (await getProfile(token.accessToken as string)) as any
      session.accessToken = token.accessToken as string
      session.error = token.error as string

      return session
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        const jwtPayload = decodeJwt((user as any).accessToken as string)
        const accessTokenExpires = (jwtPayload.exp || 0) * 1000

        return {
          accessToken: (user as any).accessToken,
          accessTokenExpires,
          refreshToken: (user as any).refreshToken,
          user: {
            id: (user as any).user.id,
            roles: (user as any).user.roles,
            plan: (user as any).user.userPlan?.currentPlan?.name
          }
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token?.accessTokenExpires as number)) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    }
  }
})

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
  try {
    const { data: refreshedTokens } = await axios.post(`${process.env.NEXT_PUBLIC_COINTRACK_URL}/api/v1/auth/refresh`, {
      refreshToken: token.refreshToken
    })
    const jwtPayload = decodeJwt((refreshedTokens as any).accessToken as string)
    const accessTokenExpires = (jwtPayload.exp || 0) * 1000

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    return {
      error: 'RefreshAccessTokenError'
    }
  }
}

async function getProfile(accessToken?: string) {
  if (!accessToken) return null

  try {
    const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_COINTRACK_URL}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const normalizedUser: User = {
      id: user.id,
      email: user.email,
      firstName: user.email,
      isEmailVerified: user.isEmailVerified,
      isTwoFactorAuthenticationEnabled: user.isTwoFactorAuthenticationEnabled,
      lastName: user.lastName,
      roles: user.roles,
      planId: user.userPlan?.planId,
      subscriptionId: user.userPlan?.id,
      subscriptionStartAt: user.userPlan?.startAt,
      subscriptionEndAt: user.userPlan?.endAt,
      planName: user.userPlan?.currentPlan.name,
      exchangeConnectionsLimit: user.userPlan?.currentPlan.exchangeConnectionsLimit,
      walletConnectionsLimit: user.userPlan?.currentPlan.walletConnectionsLimit,
      transactionsLimit: user.userPlan?.currentPlan.transactionsLimit,
      alertCombinationsLimit: user.userPlan?.currentPlan.alertCombinationsLimit,
      personalAccountManager: user.userPlan?.currentPlan.personalAccountManager,
      portfolioUpdates: user.userPlan?.currentPlan.portfolioUpdates,
      trialPeriod: user.userPlan?.currentPlan.trialPeriod
    }

    return normalizedUser
  } catch (e) {
    console.log(e)

    return null
  }
}
