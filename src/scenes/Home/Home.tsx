import { TldrawPanel } from "@/scenes/Home/components/TldrawPanel"
import { HydrateClient } from "@/trpc/server"

export const Home = () => {
    return <HydrateClient>
        <TldrawPanel />
    </HydrateClient>
}