import { Config, JsonDB } from 'node-json-db';
import { TLEditorSnapshot } from 'tldraw';

const config = new Config('documents', true, false, '/');

class DatabaseClient {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(config);
  }

  async saveDocument(id: string, document: TLEditorSnapshot['document']): Promise<void> {
    try {
      await this.db.push(`/documents/${id}`, document);
      console.log(`Documento ${id} guardado exitosamente`);
    } catch (error) {
      console.error(`Error al guardar documento ${id}:`, error);
      throw error;
    }
  }
  
  async getDocument(): Promise<TLEditorSnapshot['document'] | null> {
    try {
      const document = await this.db.getData(`/documents/`);
      return document;
    } catch (error) {
      console.error(`Error al obtener documento`, error);
      throw error;
    }
  }

  async deleteDocument(id: string): Promise<void> {
    try {
      await this.db.delete(`/documents/${id}`);
      console.log(`Documento ${id} eliminado exitosamente`);
    } catch (error) {
      console.error(`Error al eliminar documento ${id}:`, error);
      throw error;
    }
  }
}

export const dbClient = new DatabaseClient();
