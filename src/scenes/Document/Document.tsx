"use client";

import { TRPCProvider } from "@/app/_trpc/client";
import { TldrawPanel } from "@/components/TldrawPanel/TldrawPanel";
import { ListenerInitializer } from "./components/ListenerInitializer/ListenerInitializer";

export const Document = () => {
	return (
		<TRPCProvider>
			<TldrawPanel>
				<ListenerInitializer />
			</TldrawPanel>
		</TRPCProvider>
	);
};
