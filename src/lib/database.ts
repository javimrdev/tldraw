import { revalidatePath } from "next/cache";
import type { Document, Session } from "@/logic/documents/types";

export class DatabaseClient {
  public readonly baseUrl: string;

  constructor(baseUrl: string = process.env.JSON_SERVER_URL || "http://localhost:3001") {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private get documentsUrl(): string {
    return `${this.baseUrl}/documents`;
  }

  private async safeFetch(input: string, init?: RequestInit): Promise<Response> {
    const res = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      cache: "no-store",
    });
    return res;
  }

  async saveDocument(document: Document): Promise<void> {
    const { id } = document;
    console.log("id", id);
    try {
      const existingRes = await this.safeFetch(`${this.documentsUrl}/${encodeURIComponent(id)}`);

      if (existingRes.ok) {
        const putRes = await this.safeFetch(`${this.documentsUrl}/${encodeURIComponent(id)}`, {
          method: "PUT",
          body: JSON.stringify(document),
        });
        if (!putRes.ok) throw new Error(`PUT /documents/${id} ${putRes.status}`);
      } else if (existingRes.status === 404) {
        const postRes = await this.safeFetch(this.documentsUrl, {
          method: "POST",
          body: JSON.stringify(document),
        });
        revalidatePath("/");

        if (!postRes.ok) throw new Error(`POST /documents ${postRes.status}`);
      } else {
        throw new Error(`GET /documents/${id} ${existingRes.status}`);
      }
    } catch (error) {
      console.error(`Error al guardar documento ${id}:`, error);
      throw error;
    } finally {
      console.log("guardado el documento");
    }
  }

  async saveSession(session: Session): Promise<void> {
    const { userId, documentId } = session;
    try {
      const existingRes = await this.safeFetch(
        `${this.baseUrl}/sessions?userId=${encodeURIComponent(userId)}&documentId=${encodeURIComponent(documentId)}`,
      );

      if (existingRes.ok) {
        const existingSessions = await existingRes.json();
        if (Array.isArray(existingSessions) && existingSessions.length > 0) {
          const sessionId = existingSessions[0].id;
          const putRes = await this.safeFetch(`${this.baseUrl}/sessions/${sessionId}`, {
            method: "PUT",
            body: JSON.stringify({ ...session, userId, documentId }),
          });
          if (!putRes.ok) throw new Error(`PUT /sessions/${sessionId} ${putRes.status}`);
        } else {
          const postRes = await this.safeFetch(`${this.baseUrl}/sessions`, {
            method: "POST",
            body: JSON.stringify({ ...session, userId, documentId }),
          });
          if (!postRes.ok) throw new Error(`POST /sessions ${postRes.status}`);
        }
      } else {
        const postRes = await this.safeFetch(`${this.baseUrl}/sessions`, {
          method: "POST",
          body: JSON.stringify({ ...session, userId, documentId }),
        });
        if (!postRes.ok) throw new Error(`POST /sessions ${postRes.status}`);
      }
    } catch (error) {
      console.error("Error al guardar la sesión:", error);
      throw error;
    } finally {
      console.log("save session");
    }
  }

  async getSession(documentId: string, userId: string): Promise<Session | null> {
    try {
      const res = await this.safeFetch(
        `${this.baseUrl}/sessions?documentId=${encodeURIComponent(documentId)}&userId=${encodeURIComponent(userId)}`,
      );
      if (res.status === 404) return null;
      if (!res.ok)
        throw new Error(`GET /sessions?documentId=${documentId}&userId=${userId} ${res.status}`);

      const session = (await res.json())[0] as Session;
      return session;
    } catch (error) {
      console.error(
        `Error al obtener la sesión para documentId ${documentId} y userId ${userId}:`,
        error,
      );
      throw error;
    }
  }

  async getDocument(id: string): Promise<Document | null> {
    try {
      const res = await this.safeFetch(`${this.documentsUrl}/${encodeURIComponent(id)}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`GET /documents/${id} ${res.status}`);
      const doc = (await res.json()) as Document;
      return doc;
    } catch (error) {
      console.error("Error al obtener documento", error);
      throw error;
    }
  }

  async getDocuments(): Promise<Document[]> {
    try {
      const res = await this.safeFetch(this.documentsUrl);
      if (!res.ok) throw new Error(`GET /documents ${res.status}`);
      const docs = (await res.json()) as Document[];
      return Array.isArray(docs) ? docs : [];
    } catch (error) {
      console.error("Error al obtener la lista de documentos:", error);
      return [];
    }
  }

  async deleteDocument(id: string): Promise<void> {
    try {
      await this.safeFetch(`${this.documentsUrl}/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(`Error al eliminar documento ${id}:`, error);
      throw error;
    }
  }
}
