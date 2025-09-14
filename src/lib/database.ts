import { Config, JsonDB } from 'node-json-db';
import { TLEditorSnapshot } from 'tldraw';

const config = new Config('documents', true, false, '/');

export class DatabaseClient {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(config);
  }
  
  private async initialize() {
    await this.db.push('/documents', [], false);
    console.log('inicializado')
  }

  private async checkIfDocuments() {
    try{
      await this.db.count('/documents');        
    }catch(error){
        this.initialize();
    }
  }

  async saveDocument(id: string, document: TLEditorSnapshot['document']): Promise<void> {
    try {
      await this.checkIfDocuments();
      const index = await this.db.getIndex('/documents', id)
      await this.db.push(`/documents[${index !== 0 ? index : ''}]`, {...document, id: id});
      console.log(`Documento ${id} guardado exitosamente`);
    } catch (error) {
      console.error(`Error al guardar documento ${id}:`, error);
      throw error;
    }
  }
  
  async getDocument(id: string): Promise<TLEditorSnapshot['document'] | null> {
    try {
      await this.checkIfDocuments();
      const document = await this.db.getData(`/documents[id=${id}]`);
      return document;
    } catch (error) {
      console.error(`Error al obtener documento`, error);
      throw error;
    }
  }

  async getDocuments(): Promise<TLEditorSnapshot['document'][]> {
    try {
      await this.checkIfDocuments();
      const documentos = await this.db.getData('/documents');
      return Object.values(documentos);
    } catch (error) {
      return [];
      console.error("Error al obtener la lista de documentos:", error);
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
