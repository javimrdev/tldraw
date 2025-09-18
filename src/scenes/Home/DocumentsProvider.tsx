"use client";

import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { Document } from "@/logic/documents/types";

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

  const deleteDocument = (id: string) => {
    setDocuments((docs) => docs.filter((doc) => doc.id !== id));
  };

  const value = useMemo(
    () => ({
      documents,
      deleteDocument,
    }),
    [documents],
  );

  return <DocumentsContext.Provider value={value}>{children}</DocumentsContext.Provider>;
}
