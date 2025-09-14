import { DatabaseClient } from '@/lib/database';
import { TLEditorSnapshot } from 'tldraw';
import { baseProcedure, createTRPCRouter } from './init';

export const dbClient = new DatabaseClient();


export const documentsRouter = createTRPCRouter({
    saveDocument: baseProcedure
    .input((input:unknown) => input as { id: string, document: TLEditorSnapshot['document'] })
    .mutation((opts) => {
        const { id, document } = opts.input
        console.log('lo guardo')
        dbClient.saveDocument(id, document)
    }),
    getDocument: baseProcedure
        .query((opts) => {
        
        }),
    getDocuments: baseProcedure.query(() => dbClient.getDocuments())
})

export type DocumentsRouter = typeof documentsRouter;