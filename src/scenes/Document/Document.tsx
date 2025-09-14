'use client';

import { TRPCProvider } from "@/app/_trpc/client";
import { TldrawPanel } from "@/scenes/Document/components/TldrawPanel";

export const Document = () => {
    return (
        <TRPCProvider>
            <TldrawPanel />
        </TRPCProvider>
    );

}