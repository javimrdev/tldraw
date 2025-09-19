import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/server/init";
import { documentsRouter } from "@/server/router";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: documentsRouter,
    createContext: createTRPCContext,
  });
};

export { handler as GET, handler as POST };
