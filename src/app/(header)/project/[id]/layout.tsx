"use client";

import { IconHome, IconSettings } from "@tabler/icons-react";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const params = useParams();
  const projectId = params.id as string;

  const navLinks = [
    { link: `/project/${projectId}`, label: "Home", icon: IconHome },
    {
      link: `/project/${projectId}/settings`,
      label: "Settings",
      icon: IconSettings,
    },
  ];

  return (
    <div className="flex h-screen">
      <nav className="w-60 border-r border-zinc-500">
        <ul className="flex flex-col gap-2 p-4">
          {navLinks.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md w-full
                  transition-colors duration-200
                  ${
                    pathname === item.link
                      ? "bg-blue-500/50"
                      : "hover:bg-white/10"
                  }
                `}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </div>
  );
}
