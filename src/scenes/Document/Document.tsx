'use client';

import { TRPCProvider } from "@/app/_trpc/client";
import { TldrawPanel } from "@/scenes/Document/components/TldrawPanel";
import { ListenerInitializer } from "./components/ListenerInitializer/ListenerInitializer";

export const Document = () => {

    return (
        <TRPCProvider>
            <TldrawPanel>
                <ListenerInitializer />
            </TldrawPanel>
        </TRPCProvider>
    );

}