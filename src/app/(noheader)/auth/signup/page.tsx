import Image from "next/image";
import { Button, TextInput, FileInput } from "@mantine/core";
import { auth } from "@/auth";
import { IconAt } from "@tabler/icons-react";
import { redirect } from "next/navigation";

async function signUp(formData: FormData) {
  "use server";

  const uid = formData.get("uid") as string;
  const name = formData.get("name") as string;
  // const icon = formData.get("icon") as File;
  const session = await auth();
  const email = session?.user?.email as string;
  //call api to register user
  const url = `http://${process.env.API_SERVER_URL}:8000/users/`;
  const parameter = {
    uid: uid,
    name: name,
    email: email,
  };
  console.log("parameter", parameter);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameter),
    });
  } catch (error) {
    console.log("error", error);
  }

  redirect(formData.get("callbackUrl") as string);
}

export default async function SignUpPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const { callbackUrl } = (await props.searchParams) ?? "";
  const session = await auth();
  const name = session?.user?.name || "";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-20 mt-8">
      <Image
        src="/icon/dark-full.svg"
        alt="icon"
        width={250}
        height={250}
        className="py-5"
      />
      <div className="py-8 px-16 rounded-2xl shadow-lg shadow-white bg-dark-900">
        <h1 className="text-3xl font-bold mb-7 text-center text-white">
          SignUp
        </h1>
        <form action={signUp} className="space-y-6 w-80">
          <div>
            <TextInput
              leftSection={<IconAt size={16} color="white" />}
              label="user id"
              name="uid"
              required
            />
          </div>
          <div>
            <TextInput label="name" name="name" defaultValue={name} required />
          </div>
          <div>
            <FileInput
              id="icon"
              name="icon"
              label="Icon"
              accept="image/*"
              className="w-full"
              classNames={{
                input: "bg-dark-800 text-white border-gray-600",
                label: "text-gray-200",
              }}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
          >
            Sign Up
          </Button>
          <input type="hidden" name="callbackUrl" value={callbackUrl || "/"} />
        </form>
      </div>
    </div>
  );
}
