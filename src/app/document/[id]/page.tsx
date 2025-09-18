import { DocumentWithId } from "@/scenes/DocumentWithId/DocumentWithId";
import { notFound, redirect } from "next/navigation";

export default async function ({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	if (typeof id !== "string" || id.length === 0) {
		notFound();
	}

	return (
		<main className="h-full w-full">
			<DocumentWithId id={id} />
		</main>
	);
}
