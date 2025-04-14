import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [GitHub];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return {
        id: providerData.id,
        name: providerData.name,
      };
    } else {
      return {
        id: provider.id,
        name: provider.name,
      };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user }) {
      const id = user.id;
      // userを変更すれば後々のsessionにも適用できるけど、後々変更されたときにそれが適用されない可能性があるから毎回毎回取ってきた方がいいかも
      //ここでアカウントが存在するかどうかを確認して、ないならば作成させる
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});
