import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import { auth } from "@/auth";
const NextProgress = dynamic(
  () => import("@/components/providers/next-progress"),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Application",
  description: "Event Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <NextProgress />
          {/* <ConfettiProvider /> */}
          <ToastProvider />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
