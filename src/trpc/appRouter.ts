import { TLEditorSnapshot } from 'tldraw';
import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from './init';
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input((input: unknown) => input as TLEditorSnapshot['document']
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;