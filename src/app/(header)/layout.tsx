import React from "react";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
