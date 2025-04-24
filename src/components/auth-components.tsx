"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@mantine/core";

export function LogIn() {
  return <Button onClick={() => signIn()}>LogIn</Button>;
}

export function LogOut() {
  return <Button onClick={() => signOut({ callbackUrl: "/" })}>LogOut</Button>;
}
