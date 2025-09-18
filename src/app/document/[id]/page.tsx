import { notFound } from "next/navigation";
import { DocumentWithId } from "@/scenes/DocumentWithId/DocumentWithId";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
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
