import { trpc } from "@/app/_trpc/client";

export const useHydrateDocumentWithId = (id: string) => {
	const session = trpc.getSession.useQuery({
		documentId: id,
		userId: "user_123",
	});
	const document = trpc.getDocument.useQuery({ id });

	return {
		isLoading: session.isLoading || document.isLoading,
		hasError: session.isError || document.isError,
		snapshot: document.data &&
			session.data && {
				document: document.data,
				session: session.data,
			},
	};
};
