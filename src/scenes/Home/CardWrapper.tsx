import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Document } from "@/logic/documents/types"
import Link from "next/link"

type Props = {
    documents: Document[];
}

export const CardWrapper = ({ documents }: Props) => {
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
                    documents.map(({ id }) => <Link key={id} href={`/document/${id}`} className="flex justify-between hover:bg-sky-500/50 px-5 py-2 rounded-sm "><span>{id}</span> →</Link>)
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