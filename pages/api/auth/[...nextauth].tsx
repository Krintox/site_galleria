import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "16297cd162e0dc848ee4",
      clientSecret: "ce251afcac9126bec75f20026af043613f6386ab",
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)