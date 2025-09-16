import { trpc } from "@/server/trpc"
import { CardWrapper } from "./CardWrapper"

export const Home = async () => {
    const documents = await trpc.getDocuments()

    return <CardWrapper documents={documents} />
}
