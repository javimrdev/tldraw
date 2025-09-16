import { DefaultToolbar, DefaultToolbarContent, TldrawUiMenuItem, useIsToolSelected, useTools } from "tldraw"

export const CustomToolbar = () => {
    const tools = useTools()
    const isBikeStickerSelected = useIsToolSelected(tools['bikesticker'])

    return (
        <DefaultToolbar>
            <TldrawUiMenuItem {...tools['bikesticker']} isSelected={isBikeStickerSelected} />
            <DefaultToolbarContent />
        </DefaultToolbar>
    )
}