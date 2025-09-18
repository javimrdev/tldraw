import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "./_trpc/client";

export const metadata: Metadata = {
  title: "Create whiteboard",
  description: "Generated with tldraw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <TRPCProvider>
          {children}
          </TRPCProvider>
      </body>
    </html>
  );
}
