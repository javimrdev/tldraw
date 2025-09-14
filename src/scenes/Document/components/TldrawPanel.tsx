"use client";

import { getAssetUrlsByMetaUrl } from "@tldraw/assets/urls";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { ListenerInitializer } from "./ListenerInitializer/ListenerInitializer";

export const TldrawPanel = () => {
    const assetUrls = getAssetUrlsByMetaUrl()

    return (
        <Tldraw assetUrls={assetUrls}>
            <ListenerInitializer />
        </Tldraw>
    );
};