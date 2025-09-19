import { revalidatePath } from "next/cache";
import { z } from "zod";
import { DatabaseClient } from "@/lib/database";
import type { Document, Session } from "@/logic/documents/types";
import { baseProcedure, createTRPCRouter } from "./init";

export const dbClient = new DatabaseClient();

export const documentsRouter = createTRPCRouter({
  saveDocument: baseProcedure
    .input((input: unknown) => input as Document)
    .mutation(async (opts) => {
      await dbClient.saveDocument(opts.input);
      return { ok: true };
    }),
  saveSession: baseProcedure
    .input((input: unknown) => input as Session)
    .mutation(async (opts) => {
      await dbClient.saveSession(opts.input);
      return { ok: true };
    }),
  getSession: baseProcedure
    .input(z.object({ documentId: z.string(), userId: z.string() }))
    .query(async (opts) => {
      const { userId, documentId } = opts.input;
      return await dbClient.getSession(documentId, userId);
    }),
  getDocument: baseProcedure.input(z.object({ id: z.string() })).query(async (opts) => {
    revalidatePath("");
    return await dbClient.getDocument(opts.input.id);
  }),
  getDocuments: baseProcedure.query(async () => await dbClient.getDocuments()),

  deleteDocument: baseProcedure.input(z.object({ id: z.string() })).mutation(async (opts) => {
    await dbClient.deleteDocument(opts.input.id);
    return { ok: true };
  }),

  deleteSession: baseProcedure
    .input(z.object({ documentId: z.string(), userId: z.string() }))
    .mutation(async (opts) => {
      const res = await fetch(
        `${dbClient.baseUrl}/sessions?documentId=${encodeURIComponent(opts.input.documentId)}&userId=${encodeURIComponent(opts.input.userId)}`,
      );
      if (res.ok) {
        const sessions = await res.json();
        for (const session of sessions) {
          await fetch(`${dbClient.baseUrl}/sessions/${session.id}`, {
            method: "DELETE",
          });
        }
      }
      return { ok: true };
    }),
});

export type DocumentsRouter = typeof documentsRouter;
