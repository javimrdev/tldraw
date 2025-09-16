import { DatabaseClient } from '@/lib/database';
import { Document, Session } from '@/logic/documents/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from './init';

export const dbClient = new DatabaseClient();


export const documentsRouter = createTRPCRouter({
    saveDocument: baseProcedure
        .input((input:unknown) => input as Document)
        .mutation(async (opts) => {
            await dbClient.saveDocument(opts.input)
            return { ok: true }
        }),
    saveSession: baseProcedure
        .input((input: unknown) => input as Session)
        .mutation(async(opts)=> {
            await dbClient.saveSession(opts.input)
        }),
    getSession: baseProcedure
        .input(z.object({ documentId: z.string(), userId: z.string() }))
        .query(async (opts) => {
            const { userId, documentId } = opts.input;
            return dbClient.getSession(documentId, userId);
        }),
    getDocument: baseProcedure
        .input(z.object({id: z.string()}))
        .query(async (opts) => {
            revalidatePath('')
            return dbClient.getDocument(opts.input.id)
    }),
    getDocuments: baseProcedure.query(async () => dbClient.getDocuments())
})

export type DocumentsRouter = typeof documentsRouter;