import { useCallback } from "react";
import { loadSnapshot, TLEditorSnapshot, useEditor } from "tldraw";

export const useSnapshotLoader = () => {
	const editor = useEditor();

	return useCallback(
		(snapshot: TLEditorSnapshot) => {
			editor.setCurrentTool("select");

			loadSnapshot(editor.store, snapshot);
		},
		[editor],
	);
};
