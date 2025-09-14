import { trpc } from "@/app/_trpc/client"
import { useEffect, useRef } from "react"
import { useEditor } from "tldraw"

export const useListener = () => {
    const editor = useEditor()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const mutation = trpc.saveDocument.useMutation()

    useEffect(() => {
        const unsubscribe = editor.store.listen(() => {

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                const snapshot = editor.getSnapshot()
                const id = editor.id;
                mutation.mutate({ id, document: snapshot.document })
            }, 400)
        }, { scope: 'document', source: 'user' })

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            unsubscribe()
        }
    }, [editor])
}