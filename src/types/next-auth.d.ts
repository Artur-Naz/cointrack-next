import {User} from "../store/slices/authSlice";

declare module "next-auth" {

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        user: User
        accessToken: string,
        error?: string
    }
}
