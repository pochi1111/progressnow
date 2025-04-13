import Image from "next/image";
import { providerMap, signIn } from "@/auth";
import { Button } from "@mantine/core";
import { Icons } from "@/components/icons";
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
        width={250}
        height={250}
        className="py-5"
      />
      <div className="py-8 px-20 rounded-2xl shadow-lg shadow-white bg-dark-900">
        <h1 className="text-3xl font-bold mb-7 text-center text-white">
          Login
        </h1>
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
            <Button
              leftSection={<Icons IconName={provider.name} />}
              type="submit"
              className="w-full my-2 bg-dark-900 hover:bg-dark-800 border border-white shadow-lg shadow-white"
            >
              <span>Login with {provider.name}</span>
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
