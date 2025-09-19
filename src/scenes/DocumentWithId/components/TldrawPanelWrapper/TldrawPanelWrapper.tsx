import { notFound } from "next/navigation";
import type { TLEditorSnapshot } from "tldraw";
import { TldrawPanel } from "@/components/TldrawPanel/TldrawPanel";
import { ListenerInitializer } from "@/scenes/Document/components/ListenerInitializer/ListenerInitializer";
import { Loading } from "../Loading/Loading";
import { SnapshotLoader } from "../SnapshotLoader/SnapshotLoader";
import { useHydrateDocumentWithId } from "../SnapshotLoader/useHydrateDocumentWithId";

export const TldrawPanelWrapper = ({ id }: { id: string }) => {
  const { isLoading, hasError, snapshot } = useHydrateDocumentWithId(id);

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    notFound();
  }

  return (
    <TldrawPanel>
      <SnapshotLoader snapshot={snapshot as TLEditorSnapshot} />
      <ListenerInitializer documentId={id} />
    </TldrawPanel>
  );
};
