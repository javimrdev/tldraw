"use client";

import { createContext, type PropsWithChildren, useCallback, useMemo, useState } from "react";
import type { Document } from "@/logic/documents/types";

interface DocumentsContextType {
  documents: Document[];
  deleteDocument: (id: string) => void;
}

export const DocumentsContext = createContext<DocumentsContextType>({} as DocumentsContextType);

interface DocumentsProviderProps {
  documents: Document[];
}

export function DocumentsProvider({
  documents: initialDocuments,
  children,
}: PropsWithChildren<DocumentsProviderProps>) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const deleteDocument = useCallback((id: string) =>
  setDocuments((docs) => docs.filter((doc) => doc.id !== id))
  ,[])

  const value = useMemo(
    () => ({
      documents,
      deleteDocument,
    }),
    [documents, deleteDocument],
  );

  return <DocumentsContext.Provider value={value}>{children}</DocumentsContext.Provider>;
}
