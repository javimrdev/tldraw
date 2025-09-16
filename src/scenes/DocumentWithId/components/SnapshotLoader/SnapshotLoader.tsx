import { useSnapshotLoader } from "./useSnapshotLoader";

export const SnapshotLoader = ({ id }: { id: string }) => {
    useSnapshotLoader(id);

    return null;
}