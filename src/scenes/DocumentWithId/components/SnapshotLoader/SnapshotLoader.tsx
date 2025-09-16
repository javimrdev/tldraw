import { TLEditorSnapshot } from "tldraw";
import { useSnapshotLoader } from "./useSnapshotLoader";

export const SnapshotLoader = ({ snapshot }: { snapshot: TLEditorSnapshot }) => {
    const loadSnapshot = useSnapshotLoader();

    if (snapshot) {
        loadSnapshot(snapshot);
    }

    return null;
}