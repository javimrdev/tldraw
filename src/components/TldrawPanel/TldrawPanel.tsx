"use client";

import { AddBikeSticker } from "@/logic/tools/AddBikeSticker";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { TLComponents, Tldraw, TLUiAssetUrlOverrides, TLUiOverrides } from "tldraw";
import "tldraw/tldraw.css";
import { Button } from "../ui/button";
import { CustomToolbar } from "./CustomToolbar";

const customComponents: TLComponents = {
    Toolbar: CustomToolbar,
}

const customAssetUrls: TLUiAssetUrlOverrides = {
    icons: {
        'bikesticker': '/vercel.svg',
    },
}

const customUiOverrides: TLUiOverrides = {
    tools: (editor, tools) => {
        return {
            ...tools,
            bikesticker: {
                id: 'bikesticker',
                label: 'bikesticker',
                icon: 'bikesticker',
                kbd: 'j',
                onSelect() {
                    editor.setCurrentTool('bikesticker')
                },
            },
        }
    },
}

export const TldrawPanel = ({ children }: PropsWithChildren) => {
    const customTools = [AddBikeSticker]

    return (
        <Tldraw
            tools={customTools}
            overrides={customUiOverrides}
            assetUrls={customAssetUrls}
            components={customComponents}
        >
            <Button asChild color="black" className="absolute z-[999] top-13 left-3">
                <Link href="/">Go home</Link>
            </Button>
            {children}
        </Tldraw>
    );
};