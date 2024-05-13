import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import Navbar from "./components/nav/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreedomChains",
  icons: {
    icon: "/favicon.png",
  },
  description:
    "Promovendo justiça e humanidade no sistema penal brasileiro, Freedom Chain oferece uma visão transparente, segura e anônima do histórico comportamental dos presos, fortalecendo o processo de ressocialização e garantindo os direitos da população carcerária.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <div className="flex mx-auto max-w-[1000px] px-4 w-full flex-col items-center justify-center gap-y-0">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
