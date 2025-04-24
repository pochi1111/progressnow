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
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        console.log("lets fetch user data from API");
        const url = `http://${process.env.API_SERVER_URL}:8000/users/${token.id}`;
        const response = await fetch(url);
        if (response.status === 200) {
          const user = await response.json();
          session.user.email = user.email as string;
          session.user.name = user.name as string;
        } else if (response.status === 404) {
          //user not found , so redirect to signup page
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
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
