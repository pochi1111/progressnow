import type { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import theme from "./theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Progress now",
  description: "project progress management tool",
  icons: {
    icon: "/icon/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        {/* NOTE: Temporarily,theme is dark only. I'll add theme change btn. */}
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
