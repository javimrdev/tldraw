import { useEffect, useRef } from "react";
import { useEditor } from "tldraw";
import { trpc } from "@/app/_trpc/client";

export const useListener = (documentId?: string) => {
  const editor = useEditor();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mutationSaveDocument = trpc.saveDocument.useMutation();
  const mutationSaveSession = trpc.saveSession.useMutation();
  const utils = trpc.useUtils();

  useEffect(() => {
    const unsubscribe = editor.store.listen(
      () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          const snapshot = editor.getSnapshot();
          console.log("documentId:", documentId, "editor.id:", editor.id);
          const id = documentId || editor.id;
          mutationSaveDocument.mutate(
            { id: id, ...snapshot.document },
            {
              onSuccess() {
                utils.getDocument;
              },
            },
          );
          mutationSaveSession.mutate({
            ...snapshot.session,
            userId: "user_123",
            documentId: id,
          });
        }, 400);
      },
      { scope: "document", source: "user" },
    );

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      unsubscribe();
    };
  }, [documentId, editor.getSnapshot, editor.id, editor.store.listen, mutationSaveDocument.mutate, mutationSaveSession.mutate, utils.getDocument]);
};
