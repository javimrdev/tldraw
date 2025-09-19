/// <reference types="vitest" />

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteButton } from "../DeleteButton";

const mockMutateAsyncDocument = vi.fn();
const mockMutateAsyncSession = vi.fn();
const mockUseToast = { showToast: vi.fn() };

vi.mock("@/app/_trpc/client", () => {
  return {
    trpc: {
      deleteDocument: {
        useMutation: () => ({ mutateAsync: mockMutateAsyncDocument }),
      },
      deleteSession: {
        useMutation: () => ({ mutateAsync: mockMutateAsyncSession }),
      },
    },
  };
});

vi.mock("@/app/components/ToastProvider", () => {
  return {
    useToast: () => mockUseToast,
  };
});

describe("DeleteButton", () => {
  beforeEach(() => {
    mockMutateAsyncDocument.mockReset();
    mockMutateAsyncSession.mockReset();
    mockUseToast.showToast.mockReset();
  });

  it("should call mutations and show success toast on successful delete", async () => {
    mockMutateAsyncDocument.mockResolvedValue({});
    mockMutateAsyncSession.mockResolvedValue({});

    const onDelete = vi.fn();
    const id = "test-id";
    render(<DeleteButton id={id} onDelete={onDelete} />);

    const button = screen.getByRole("button", { name: /eliminar documento/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutateAsyncDocument).toHaveBeenCalledWith({ id: "test-id" });
    });
    await waitFor(() => {
      expect(mockMutateAsyncSession).toHaveBeenCalledWith({
        documentId: id,
        userId: "user_123",
      });
    });

    expect(onDelete).toHaveBeenCalled();
    expect(mockUseToast.showToast).toHaveBeenCalledWith("Documento eliminado", { type: "success" });
  });

  it("should show error toast on failed delete", async () => {
    mockMutateAsyncDocument.mockRejectedValue(new Error("fail"));
    const onDelete = vi.fn();
    const id = "test-id";
    render(<DeleteButton id={id} onDelete={onDelete} />);

    const button = screen.getByRole("button", { name: /eliminar documento/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockUseToast.showToast).toHaveBeenCalledWith("Error al eliminar el documento", {
        type: "error",
      });
    });
    expect(onDelete).not.toHaveBeenCalled();
  });
});
