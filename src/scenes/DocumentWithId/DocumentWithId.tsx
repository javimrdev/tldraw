'use client';

import { TRPCProvider } from "@/app/_trpc/client";
import { TldrawPanel } from "@/scenes/Document/components/TldrawPanel";
import { ListenerInitializer } from "../Document/components/ListenerInitializer/ListenerInitializer";
import { SnapshotLoader } from "./components/SnapshotLoader/SnapshotLoader";

type Props = {
    id: string;
}

export const DocumentWithId = ({ id }: Props) => {
    return (
        <TRPCProvider>
            <TldrawPanel>
                <SnapshotLoader id={id} />
                <ListenerInitializer documentId={id} />
            </TldrawPanel>
        </TRPCProvider>
    );

}