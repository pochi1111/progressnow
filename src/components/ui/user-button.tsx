import { auth } from "@/auth";
import { LogIn, LogOut } from "@/components/auth-components";

export async function UserButton() {
  const session = await auth();
  if (!session?.user) return <LogIn />;
  return (
    <div className="flex items-center gap-2">
      {/* OPTIMIZE: This image is not optimized. */}
      <img
        src={session.user.image || ""}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <span>{session.user.name}</span>
      {/*TODO This button will put to menu of userbtn*/}
      <LogOut />
    </div>
  );
}
