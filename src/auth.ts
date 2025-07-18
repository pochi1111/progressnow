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
    async signIn() {
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
    async session({ session }) {
      const email = session.user.email as string;
      const url = `http://${process.env.API_SERVER_URL}:8000/users/email/${email}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        session.user.id = userData.id;
        session.user.email = userData.email;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      return session;
    },
  },
  events: {
    async signOut() {
      // ログアウト時の処理をここに追加できます
    },
  },
});
