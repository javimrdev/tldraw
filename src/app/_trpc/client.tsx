import { DocumentsRouter } from "@/server/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import superjson from 'superjson';
import { makeQueryClient } from "./query-client";


export const trpc = createTRPCReact<DocumentsRouter>();
let clientQueryClientSingleton: QueryClient;

function getQueryClient() {
    if (typeof window === 'undefined') {
        return makeQueryClient();
    }

    return (clientQueryClientSingleton ??= makeQueryClient());
}
function getUrl() {
    const base = (() => {
        if (typeof window !== 'undefined') return '';
        if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
        return 'http://localhost:3000';
    })();
    return `${base}/api/trpc`;
}
export function TRPCProvider(
    props: Readonly<{
        children: React.ReactNode;
    }>,
) {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    transformer: superjson,
                    url: getUrl(),
                }),
            ],
        }),
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}