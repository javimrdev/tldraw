import { DocumentWithId } from "@/scenes/DocumentWithId/DocumentWithId";
import { redirect } from "next/navigation";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (typeof id !== 'string') {
        redirect('/document');
    }

    return (<main className="h-full w-full">
        <DocumentWithId id={id} />
    </main>
    );
}