import Link from "next/link";
import Image from "next/image";
import classes from "./header.module.css";
import { UserButton } from "@/components/ui/user-button";

export function Header() {
  return (
    <header>
      <div className={classes.header}>
        <Image src="/icon/dark-full.svg" alt="icon" width={250} height={250} />
        <UserButton />
      </div>
    </header>
  );
}
