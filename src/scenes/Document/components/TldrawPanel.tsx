"use client";

import { getAssetUrlsByMetaUrl } from "@tldraw/assets/urls";
import { PropsWithChildren } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export const TldrawPanel = ({ children }: PropsWithChildren) => {
    const assetUrls = getAssetUrlsByMetaUrl()

    return (
        <Tldraw assetUrls={assetUrls}>
            {children}
        </Tldraw>
    );
};