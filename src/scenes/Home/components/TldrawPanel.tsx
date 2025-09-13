"use client";

import { getAssetUrlsByMetaUrl } from "@tldraw/assets/urls";
import { useEffect, useRef } from "react";
import { Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";

const ListenComponent = () => {
    const editor = useEditor()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const unsubscribe = editor.store.listen(() => {

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                const snapshot = editor.getSnapshot()
                console.log('Snapshot obtenido después de 400ms:', snapshot)
            }, 400)
        }, { scope: 'document', source: 'user' })

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            unsubscribe()
        }
    }, [editor])

    return <></>
}

export const TldrawPanel = () => {
    const assetUrls = getAssetUrlsByMetaUrl()


    return (
        <Tldraw assetUrls={assetUrls}>
            <ListenComponent />
        </Tldraw>
    );
};