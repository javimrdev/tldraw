import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "./_trpc/client";
import { ToastProvider } from "./components/ToastProvider";

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
				<ToastProvider>
					<TRPCProvider>{children}</TRPCProvider>
				</ToastProvider>
			</body>
		</html>
	);
}
