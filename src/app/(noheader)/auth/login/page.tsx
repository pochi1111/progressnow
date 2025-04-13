import Image from "next/image";
import { providerMap, signIn } from "@/auth";
import { Button } from "@mantine/core";
// import { AuthError } from "next-auth";
// import { redirect } from "next/navigation";

export default async function LoginPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const { callbackUrl } = (await props.searchParams) ?? "";
  // NOTE: be able to access from /login and /api/auth/signin . Is this correct?
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/icon/dark-full.svg"
        alt="icon"
        width={200}
        height={200}
        className="py-5"
      />
      <div className="p-8 border rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: callbackUrl,
                });
              } catch (error) {
                // NOTE: Is this needed?
                // if (error instanceof AuthError) {
                //   return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                // }
                throw error;
              }
            }}
          >
            <Button type="submit">
              <span>Sign in with {provider.name}</span>
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
