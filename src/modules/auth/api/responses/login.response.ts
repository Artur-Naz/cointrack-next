export interface CurrentPlan {
  id: string
  name: string
  exchangeConnectionsLimit: number
  walletConnectionsLimit: number
  transactionsLimit: number
  alertCombinationsLimit: number
  personalAccountManager: boolean
  portfolioUpdates: string
  trialPeriod: number
  createdAt: Date
  updatedAt: Date
}

export interface UserPlan {
  id: string
  planId: string
  userId: number
  invoiceId: string
  startAt: Date
  endAt?: Date
  createdAt: Date
  updatedAt: Date
  currentPlan: CurrentPlan
}

export interface User {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
  twoFactorAuthenticationSecret: string
  isTwoFactorAuthenticationEnabled: boolean
  avatarUrl: string
  roles: string[]
  isEmailVerified: boolean
  userPlan?: UserPlan
  phone?: string
  updatedAt: Date
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}
