"use client";

import { IconHome, IconSettings } from "@tabler/icons-react";
import React from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { link: "/project/", label: "Home", icon: IconHome },
  //{ link: "/project/users", label: "Users", icon: IconHome },
  { link: "/project/settings", label: "Settings", icon: IconSettings },

];

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen">
      <nav className="h-200 w-60 flex flex-col border-r border-zinc-500">
        <ul className="flex flex-col gap-2 p-4">
          {navLinks.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md w-full
                  transition-colors duration-200
                  ${
                    pathname.startsWith(item.link)
                      ? "bg-blue-500/50" // 薄い水色（選択状態）
                      : "hover:bg-white/10" // 薄い白色（ホバー時）
                  }
                `}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
