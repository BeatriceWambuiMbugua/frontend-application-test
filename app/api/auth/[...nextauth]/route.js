import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("please provide process.env.NEXTAUTH_SECRET environment variable");
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "John Doe" },
        email: { label: "Email", type: "email", placeholder: "Enter your Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          // credentials.username === "john.wanyoike" &&
          credentials.email === "john.wanyoike@belvadigital.com" &&
          credentials.password === "12345678"
        ) {
          return { email: credentials.email};
        } else {
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, token }) {
  //     console.log("Session", session)
  //     session.user.name = token.name;
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.name = user.name;
  //     }
  //     return token;
  //   },
  // },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };