import { dbClient } from '@/lib/database';
import { TLEditorSnapshot } from 'tldraw';
import z from 'zod';
import { baseProcedure, createTRPCRouter } from './init';


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
        
            dbClient.getDocument();
        })
})

export type DocumentsRouter = typeof documentsRouter;