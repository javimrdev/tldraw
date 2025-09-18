"use client"

import { trpc } from "@/app/_trpc/client"

interface DeleteButtonProps {
  id: string
  onDelete?: () => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete}) => {
  const deleteDocumentMutation = trpc.deleteDocument.useMutation();
  const deleteSessionMutation = trpc.deleteSession.useMutation();

  const handleDelete = async () => {
    await deleteDocumentMutation.mutateAsync({ id });
    await deleteSessionMutation.mutateAsync({ documentId: id, userId: "user_123" });
    onDelete && onDelete();
  };

  return (
      <button
        className="ml-2 flex items-center justify-center rounded bg-white text-black transition-colors px-2 py-1 group hover:bg-red-600"
        onClick={handleDelete}
        aria-label="Eliminar documento"
      >
          🗑️
      </button>
  );
};
