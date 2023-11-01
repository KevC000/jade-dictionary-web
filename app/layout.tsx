import type { Metadata } from "next";
import { Murecho } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Navbar from "./ui/components/navbar/Navbar";

const murecho = Murecho({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jade Dictionary",
  description: "Chinese dictionary and language tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="image/jadeicon.ico" sizes="any" />
        <ColorSchemeScript />
      </head>
      <body className={`${murecho.className} antialiased`}>
        <MantineProvider>
          <Navbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
