"use client";

import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/app/components/ToastProvider";

interface DeleteButtonProps {
  id: string;
  onDelete?: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const { showToast } = useToast();
  const deleteDocumentMutation = trpc.deleteDocument.useMutation();
  const deleteSessionMutation = trpc.deleteSession.useMutation();

  const handleDelete = async () => {
    try {
      await deleteDocumentMutation.mutateAsync({ id });
      await deleteSessionMutation.mutateAsync({
        documentId: id,
        userId: "user_123",
      });
      onDelete?.();
      showToast("Documento eliminado", { type: "success" });
    } catch (error) {
      showToast("Error al eliminar el documento", { type: "error" });
    }
  };

  return (
    <button
      className="ml-2 flex cursor-pointer items-center justify-center rounded border border-white bg-white px-2 py-1 text-black transition-colors hover:border-red-600"
      onClick={handleDelete}
      aria-label="Eliminar documento"
      type="button"
    >
      🗑️
    </button>
  );
};
