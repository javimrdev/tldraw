"use client";

import { getAssetUrlsByMetaUrl } from "@tldraw/assets/urls";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export const TldrawPanel = () => {
    const assetUrls = getAssetUrlsByMetaUrl()

    return (
        <Tldraw assetUrls={assetUrls} />
    );
};