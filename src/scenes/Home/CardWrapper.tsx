'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Link from "next/link"
import { DeleteButton } from "./DeleteButton"
import { trpc } from "@/app/_trpc/client"
import { DocumentsContext } from "./DocumentsProvider"
import { useContext } from "react"

export const CardWrapper = () => {
    const {documents, deleteDocument} = useContext(DocumentsContext);
    const deleteDocumentMutation = trpc.deleteDocument.useMutation();
    const deleteSessionMutation = trpc.deleteSession.useMutation();

    const handleDelete = async (id: string) => {
            await deleteDocumentMutation.mutateAsync({ id });
            await deleteSessionMutation.mutateAsync({ documentId: id, userId: "user_123" });
            deleteDocument(id);
    };

    return <Card className="w-full max-w-sm">
        <CardHeader>
            {documents.length ?
                <>
                    <CardTitle>Tus Documentos</CardTitle>
                    <CardDescription>
                        Aquí tienes todos tus documentos disponibles
                    </CardDescription>
                </> :
                <>
                    <CardTitle>You have no documents yet, create a new one</CardTitle>
                </>
            }
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {
                    documents.map(({ id }) => 
                    <div className="flex" key={id}>
                        <Link href={`/document/${id}`} className="flex grow justify-between hover:bg-sky-500/50 px-5 py-2 rounded-sm "><span>{id}</span> →</Link>
                        <DeleteButton id={id} onDelete={() => handleDelete(id)} />
                    </div>)
                }
            </div>
        </CardContent>
        <CardFooter>
            <Button asChild className="w-full">
                <Link href="/document">Crear nuevo documento</Link>
            </Button>
        </CardFooter>
    </Card>
}