import { api } from '../../../store/services/api'

const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        GetUserProfile: build.query<
            GetUserProfileApiResponse,
            GetUserProfileApiArg
            >({
            query: () => ({ url: `/api/v1/auth/profile` }),
        }),
        Login: build.mutation<
            LoginApiResponse,
            LoginApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/login`,
                method: "POST",
                body: queryArg.loginUserDto,
            }),
        }),
        RefreshToken: build.mutation<
            RefreshTokenApiResponse,
            RefreshTokenApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/refresh`,
                method: "POST",
                body: queryArg.refreshTokenDto,
            }),
        }),
        Register: build.mutation<
            RegisterApiResponse,
            RegisterApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/register`,
                method: "POST",
                body: queryArg.registerUserDto,
            }),
        }),
        PasswordResetRequest: build.mutation<
            PasswordResetRequestApiResponse,
            PasswordResetRequestApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/password-reset-request`,
                method: "POST",
                body: queryArg.passwordResetRequestDto,
            }),
        }),
        PasswordReset: build.mutation<
            PasswordResetApiResponse,
            PasswordResetApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/password-reset`,
                method: "POST",
                body: queryArg.passwordResetDto,
            }),
        }),
        ChangePassword: build.mutation<
            ChangePasswordApiResponse,
            ChangePasswordApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/password-change`,
                method: "POST",
                body: queryArg.passwordChangeDto,
            }),
        }),
        EmailVerifyRequest: build.mutation<
            EmailVerifyRequestApiResponse,
            EmailVerifyRequestApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/email-verify-request`,
                method: "POST",
                body: queryArg.emailVerifyRequestDto,
            }),
        }),
        EmailVerify: build.mutation<
            EmailVerifyApiResponse,
            EmailVerifyApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/email-verify`,
                method: "POST",
                body: queryArg.emailVerifyDto,
            }),
        }),
        GoogleAuth: build.mutation<
            GoogleAuthApiResponse,
            GoogleAuthApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/google`,
                method: "POST",
                body: queryArg.googleAuthDto,
            }),
        }),
        FacebookAuth: build.mutation<
            FacebookAuthApiResponse,
            FacebookAuthApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/facebook`,
                method: "POST",
                body: queryArg.facebookAuthDto,
            }),
        }),
        CoinbaseAuth: build.mutation<
            CoinbaseAuthApiResponse,
            CoinbaseAuthApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/coinbase`,
                method: "POST",
                body: queryArg.coinbaseAuthDto,
            }),
        }),
        TelegramAuth: build.mutation<
            TelegramAuthApiResponse,
            TelegramAuthApiArg
            >({
            query: (queryArg) => ({
                url: `/api/v1/auth/telegram`,
                method: "POST",
                body: queryArg.telegramAuthDto,
            }),
        }),
    }),
    overrideExisting: false,
});
export { injectedRtkApi as petApi };
export type GetUserProfileApiResponse =
/** status 200 get user profile */ User;
export type GetUserProfileApiArg = void;
export type LoginApiResponse =
/** status 200 You are successfully logged in */
    | User
    | /** status 201  */ undefined;
export type LoginApiArg = {
    loginUserDto: LoginUserDto;
};
export type RefreshTokenApiResponse =
/** status 200 refreshToken was successfully refreshed */
    | User
    | /** status 201  */ undefined;
export type RefreshTokenApiArg = {
    refreshTokenDto: RefreshTokenDto;
};
export type RegisterApiResponse = unknown;
export type RegisterApiArg = {
    registerUserDto: RegisterUserDto;
};
export type PasswordResetRequestApiResponse = unknown;
export type PasswordResetRequestApiArg = {
    passwordResetRequestDto: PasswordResetRequestDto;
};
export type PasswordResetApiResponse = unknown;
export type PasswordResetApiArg = {
    passwordResetDto: PasswordResetDto;
};
export type ChangePasswordApiResponse = unknown;
export type ChangePasswordApiArg = {
    passwordChangeDto: PasswordChangeDto;
};
export type EmailVerifyRequestApiResponse = unknown;
export type EmailVerifyRequestApiArg = {
    emailVerifyRequestDto: EmailVerifyRequestDto;
};
export type EmailVerifyApiResponse = unknown;
export type EmailVerifyApiArg = {
    emailVerifyDto: EmailVerifyDto;
};
export type GoogleAuthApiResponse = unknown;
export type GoogleAuthApiArg = {
    googleAuthDto: GoogleAuthDto;
};
export type FacebookAuthApiResponse = unknown;
export type FacebookAuthApiArg = {
    facebookAuthDto: FacebookAuthDto;
};
export type CoinbaseAuthApiResponse = unknown;
export type CoinbaseAuthApiArg = {
    coinbaseAuthDto: CoinbaseAuthDto;
};
export type TelegramAuthApiResponse = unknown;
export type TelegramAuthApiArg = {
    telegramAuthDto: TelegramAuthDto;
};
export type UserEvent = {
    id: number;
    userId: number;
    user: User;
    type: "password_reset" | "email_verify";
    token: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type UserAdSourceMeta = {
    id: number;
    utmSource: string;
    utmCampaign: string;
    utmContent: string;
    utmTerm: string;
    wwclick: string;
    userId: number;
    user: User;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    translations?: string[];
    dtoClass: object;
};
export type AuthenticatedProvider = {
    id: number;
    key: string;
    userId: number;
    type: "facebook" | "google" | "coinbase" | "telegram";
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
    user: User;
};
export type TrackLogin = {
    id: string;
    userId: number;
    userAgent: string;
    userIp: string;
    loginCount: number;
    createdAt: string;
    updatedAt: string;
    user: User;
};
export type PlanPrice = {
    id: string;
    planId: string;
    price: number;
    type: "DAY" | "WEEK" | "MONTH" | "QUARTER" | "SEMIANNUAL" | "YEAR" | "CUSTOM";
    rank: number;
    duration: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    plan: Plan;
    translations?: string[];
    dtoClass: object;
};
export type Plan = {
    id: string;
    name: string;
    exchangeConnectionsLimit: number;
    walletConnectionsLimit: number;
    transactionsLimit: number;
    alertCombinationsLimit: number;
    personalAccountManager: boolean;
    monthlyPrice: number;
    yearlyPrice: number;
    portfolioUpdates: "daily" | "monthly" | "yearly";
    trialPeriod: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    subscribedUsers: PlanSubscription[];
    users: User[];
    prices: PlanPrice[];
    translations?: string[];
    dtoClass: object;
};
export type Coupon = {
    id: string;
    name: string;
    code: string;
    discount: number;
    type: number;
    isUsed: boolean;
    expiredAt: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    translations?: string[];
    dtoClass: object;
};
export type Invoice = {
    id: string;
    externalInvoiceId: string;
    invoiceNumber: string;
    amount: number;
    status: "processing" | "paid" | "failed" | "refunded";
    platform: "stripe";
    planId: string;
    userId: number;
    planPriceId: string;
    couponId: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    user: User;
    plan: Plan;
    planPrice: PlanPrice;
    coupon?: Coupon;
    planSubscription: PlanSubscription;
};
export type PlanSubscription = {
    id: string;
    planId: string;
    userId: number;
    invoiceId?: string;
    startAt: string;
    endAt: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    user: User;
    currentPlan: Plan;
    invoice?: Invoice;
};
export type ConnectionType = {
    id: string;
    name?: string;
    fields: object[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    translations?: string[];
    dtoClass: object;
};
export type Exchange = {
    id: string;
    slug: string;
    name: string;
    connectionInstruction: string;
    image: string;
    description: string;
    url: string;
    yearEstablished: number;
    country: string;
    hasTradingIncentive: boolean;
    trustScore: number;
    trustScoreRank: number;
    tradeVolume24hBtc: number;
    tradeVolume24hBtcNormalized: number;
    isReleased: boolean;
    portfolioExchanges: PortfolioExchange[];
    connectionType: ConnectionType;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    translations?: string[];
    dtoClass: object;
};
export type CoinExchangeAndWalletMapping = {
    id: string;
    symbol: string;
    slug: string;
    exchangeOrWalletId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type Coin = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice?: number;
    marketCap?: number;
    marketCapRank?: number;
    fullyDilutedValuation?: number;
    totalVolume?: number;
    high24H?: number;
    low24H?: number;
    priceChange24H?: number;
    priceChangePercentage24H?: number;
    marketCapChange24H?: number;
    marketCapChangePercentage24H?: number;
    circulatingSupply?: number;
    totalSupply?: number;
    maxSupply?: number;
    ath?: number;
    athChangePercentage: number;
    athDate: string;
    atl?: number;
    atlChangePercentage: number;
    atlDate: string;
    roi: {
        times?: number;
        currency?: string;
        percentage?: number;
    };
    lastUpdated: string;
    sparklineIn7D: {
        price?: number[];
    };
    priceChangePercentage14DInCurrency?: number;
    priceChangePercentage1HInCurrency?: number;
    priceChangePercentage1YInCurrency?: number;
    priceChangePercentage200DInCurrency?: number;
    priceChangePercentage24HInCurrency?: number;
    priceChangePercentage30DInCurrency?: number;
    priceChangePercentage7DInCurrency?: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    map: CoinExchangeAndWalletMapping;
    translations?: string[];
    dtoClass: object;
};
export type PortfolioExchangeHolding = {
    id: string;
    currency: string;
    slug: string;
    balance: number;
    metadata: object;
    portfolioExchangeItemId: string;
    portfolioExchangeItem: PortfolioExchangeItem;
    coin: Coin;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type PortfolioExchangeFuturePosition = {
    id: string;
    symbol: string;
    positionAmt: number;
    entryPrice: number;
    positionSide: string;
    unRealizedProfit: number;
    liquidationPrice: number;
    leverage: number;
    metadata: object;
    updateTime: string;
    portfolioExchangeItemId: string;
    portfolioExchangeItem: PortfolioExchangeItem;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type PortfolioExchangeTransaction = {
    id: string;
    type:
        | "dustConvert"
        | "InterestPaid"
        | "liquidation"
        | "buy"
        | "sell"
        | "deposit"
        | "approve"
        | "withdraw"
        | "fail"
        | "stake"
        | "interestEarn"
        | "fee"
        | "fill"
        | "rollIn"
        | "rollOut"
        | "realisedProfit"
        | "realisedLoss";
    currency: string;
    slug: string;
    amount: number;
    fee: number;
    transactionId: string;
    date: string;
    metadata: object;
    portfolioExchangeItemId: string;
    portfolioExchangeItem: PortfolioExchangeItem;
    coin: Coin;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type PortfolioExchangeItem = {
    id: string;
    itemName: string;
    name: string;
    portfolioExchangeId: string;
    portfolioExchange: PortfolioExchange;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    rates?: object;
    holdings: PortfolioExchangeHolding[];
    positions: PortfolioExchangeFuturePosition[];
    transactions: PortfolioExchangeTransaction[];
};
export type PortfolioExchange = {
    id: string;
    exchangeId: string;
    userId: number;
    name: string;
    apiKey: string;
    apiSecret: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    passphrase?: string;
    rates?: object;
    exchange: Exchange;
    user: User;
    items: PortfolioExchangeItem[];
};
export type WalletChain = {
    id: string;
    name: string;
    image: string;
    chainIdHex: string;
    decimals: number;
    type: "evm" | "pub" | "sol";
    wallets: Wallet[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type Wallet = {
    id: string;
    name: string;
    connectionInstruction: string;
    image: string;
    type: "evm" | "pub" | "sol";
    description: string;
    url: string;
    isReleased: boolean;
    portfolioWallets: PortfolioWallet[];
    chains: WalletChain[];
    coins: Coin[];
    connectionType: ConnectionType;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type PortfolioWalletHolding = {
    id: string;
    currency: string;
    slug: string;
    balance: number;
    token: string;
    metadata: object;
    portfolioWalletItemId: string;
    portfolioWalletItem: PortfolioWalletItem;
    coin: Coin;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type PortfolioWalletTransaction = {
    id: string;
    type:
        | "dustConvert"
        | "InterestPaid"
        | "liquidation"
        | "buy"
        | "sell"
        | "deposit"
        | "approve"
        | "withdraw"
        | "fail"
        | "stake"
        | "interestEarn"
        | "fee"
        | "fill"
        | "rollIn"
        | "rollOut"
        | "realisedProfit"
        | "realisedLoss";
    currency: string;
    slug: string;
    amount: number;
    fee: number;
    transactionId: string;
    date: string;
    metadata: object;
    portfolioWalletItemId: string;
    portfolioWalletItem: PortfolioWalletItem;
    coin: Coin;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type PortfolioWalletItem = {
    id: string;
    name: string;
    image: string;
    portfolioWalletId: string;
    walletChainId: string;
    portfolioWallet: PortfolioWallet;
    chain: WalletChain;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    rates?: object;
    holdings: PortfolioWalletHolding[];
    transactions: PortfolioWalletTransaction[];
};
export type PortfolioWallet = {
    id: string;
    walletId: string;
    userId: number;
    name: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    rates?: object;
    wallet: Wallet;
    user: User;
    items: PortfolioWalletItem[];
    translations?: string[];
    dtoClass: object;
};
export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    twoFactorAuthenticationSecret?: string;
    isTwoFactorAuthenticationEnabled: boolean;
    password: string;
    refreshToken: string;
    avatarUrl: string;
    roles: ("user" | "admin")[];
    events: UserEvent[];
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    userAdSource: UserAdSourceMeta[];
    authenticatedProviders: AuthenticatedProvider[];
    track?: TrackLogin;
    userPlan: PlanSubscription;
    portfolioExchange: PortfolioExchange[];
    portfolioWallet: PortfolioWallet[];
    plans: Plan[];
};
export type LoginUserDto = {
    email: string;
    password: string;
};
export type RefreshTokenDto = {
    refreshToken: string;
};
export type CreateAdSourceDto = {
    utm_source?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    wwclick?: string;
};
export type RegisterUserDto = {
    email: string;
    password: string;
    marketingSource?: CreateAdSourceDto;
};
export type PasswordResetRequestDto = {
    email: string;
};
export type PasswordResetDto = {
    password: string;
    passwordConfirm: string;
    token: string;
};
export type PasswordChangeDto = {
    oldPassword: string;
    newPassword: string;
};
export type EmailVerifyRequestDto = {
    email: string;
};
export type EmailVerifyDto = {
    token: string;
};
export type GoogleAuthDto = {
    providerId?: string;
    marketingSource?: CreateAdSourceDto;
    token: string;
    providerType: "facebook" | "google" | "coinbase" | "telegram";
};
export type FacebookAuthDto = {
    providerId?: string;
    marketingSource?: CreateAdSourceDto;
    token: string;
    providerType: "facebook" | "google" | "coinbase" | "telegram";
};
export type CoinbaseAuthDto = {
    providerId?: string;
    marketingSource?: CreateAdSourceDto;
    code: string;
    providerType: "facebook" | "google" | "coinbase" | "telegram";
};
export type TelegramAuthDto = {
    providerId?: string;
    marketingSource?: CreateAdSourceDto;
    id: number;
    auth_date: number;
    hash: string;
    first_name: string;
    last_name: string;
    photo_url?: string;
    username?: string;
    providerType: "facebook" | "google" | "coinbase" | "telegram";
};
export const {
    useGetUserProfileQuery,
    useLoginMutation,
    useRefreshTokenMutation,
    useRegisterMutation,
    usePasswordResetRequestMutation,
    usePasswordResetMutation,
    useChangePasswordMutation,
    useEmailVerifyRequestMutation,
    useEmailVerifyMutation,
    useGoogleAuthMutation,
    useFacebookAuthMutation,
    useCoinbaseAuthMutation,
    useTelegramAuthMutation,
} = injectedRtkApi;
