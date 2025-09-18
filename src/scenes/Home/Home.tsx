import { trpc } from "@/server/trpc"
import { CardWrapper } from "./CardWrapper"
import { DocumentsProvider } from "./DocumentsProvider"

export const Home = async () => {
    const documents = await trpc.getDocuments()

    return <DocumentsProvider documents={documents}><CardWrapper /></DocumentsProvider>
}
