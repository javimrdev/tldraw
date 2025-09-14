'use client';

import { TRPCProvider } from "@/app/_trpc/client";
import { TldrawPanel } from "@/scenes/Home/components/TldrawPanel";
import { getAssetUrlsByMetaUrl } from "@tldraw/assets/urls";

export const Home = () => {
    return (
        <TRPCProvider>
            <TldrawPanel />
        </TRPCProvider>
    );

}