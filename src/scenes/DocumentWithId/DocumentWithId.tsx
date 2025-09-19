"use client";

import { TRPCProvider } from "@/app/_trpc/client";
import { TldrawPanelWrapper } from "./components/TldrawPanelWrapper/TldrawPanelWrapper";

type Props = {
  id: string;
};

export const DocumentWithId = ({ id }: Props) => {
  return (
    <TRPCProvider>
      <TldrawPanelWrapper id={id} />
    </TRPCProvider>
  );
};
