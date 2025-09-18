"use client";
import { DocumentsRouter } from "@/server/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { PropsWithChildren } from "react";
import superjson from "superjson";
import { makeQueryClient } from "./query-client";

export const trpc = createTRPCReact<DocumentsRouter>();
let clientQueryClientSingleton: QueryClient;

const getQueryClient = () => {
	if (typeof window === "undefined") {
		return makeQueryClient();
	}

	return (clientQueryClientSingleton ??= makeQueryClient());
};
const getUrl = () => {
	const base = (() => {
		if (typeof window !== "undefined") return "";
		if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
		return "http://localhost:3000";
	})();
	return `${base}/api/trpc`;
};

const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			transformer: superjson,
			url: getUrl(),
		}),
	],
});

export const TRPCProvider = ({ children }: PropsWithChildren) => {
	const queryClient = getQueryClient();

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};
