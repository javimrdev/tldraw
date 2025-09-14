import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { trpc } from "@/server/trpc"
import Link from "next/link"

export const Home = async () => {
    const documents = await trpc.getDocuments()
    console.log('documents:', documents)

    if (!documents.length) {
        return <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>You have no documents yet, create a new one</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button asChild>
                    <Link href="/document">Create a new board</Link>
                </Button>
            </CardFooter>
        </Card>
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Tus Documentos</CardTitle>
                <CardDescription>
                    Aquí tienes todos tus documentos disponibles
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href="/document">Crear nuevo documento</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
