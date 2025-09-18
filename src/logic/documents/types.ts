import { TLSessionStateSnapshot, TLStoreSnapshot } from "tldraw";

export type Document = TLStoreSnapshot & { id: string };
export type Session = TLSessionStateSnapshot & {
	userId: string;
	documentId: string;
};
