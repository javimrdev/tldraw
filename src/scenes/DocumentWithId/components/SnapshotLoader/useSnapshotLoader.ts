import { trpc } from "@/app/_trpc/client";
import { useEffect } from "react";
import { loadSnapshot, TLEditorSnapshot, useEditor } from "tldraw";

export const useSnapshotLoader = (id: string) => {
    const editor = useEditor();
    const session = trpc.getSession.useQuery({
        documentId: id,
        userId: 'user_123'
    })
    const document = trpc.getDocument.useQuery({id})
    
    useEffect(() => {
		if (session.isSuccess && document.isSuccess) {
			const snapshot = {
				document: document.data,
				session: session.data
			};
            editor.setCurrentTool('select')

            loadSnapshot(editor.store, snapshot as TLEditorSnapshot );
		}
	}, [session.isSuccess, document.isSuccess])
}