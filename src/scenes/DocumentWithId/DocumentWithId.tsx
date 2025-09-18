"use client";

import { TRPCProvider } from "@/app/_trpc/client";
import { TldrawPanel } from "@/components/TldrawPanel/TldrawPanel";
import { TLEditorSnapshot } from "tldraw";
import { ListenerInitializer } from "../Document/components/ListenerInitializer/ListenerInitializer";
import { Loading } from "./components/Loading/Loading";
import { SnapshotLoader } from "./components/SnapshotLoader/SnapshotLoader";
import { useHydrateDocumentWithId } from "./components/SnapshotLoader/useHydrateDocumentWithId";
import { TldrawPanelWrapper } from "./components/TldrawPanelWrapper/TldrawPanelWrapper";

type Props = {
  id: string;
};

export const DocumentWithId = ({ id }: Props) => {
  return (
    <TRPCProvider>
      <TldrawPanelWrapper id={id} />
    </TRPCProvider>
  );
};
