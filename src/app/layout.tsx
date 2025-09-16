import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
