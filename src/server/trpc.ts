import { makeQueryClient } from "@/app/_trpc/query-client";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import "server-only";
import { createCallerFactory, createTRPCContext } from "./init";
import { documentsRouter } from "./router";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(documentsRouter)(createTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<
	typeof documentsRouter
>(caller, getQueryClient);
