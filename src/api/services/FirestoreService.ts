interface FirestoreServiceConfig {
  projectId: string;
  apiKey: string;
  collection: string;
}
class FirestoreService {
  private baseUrl: string;
  private collection: string;
  private apiKey: string;

  constructor({ projectId, apiKey, collection }: FirestoreServiceConfig) {
    this.baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
    this.collection = collection;
    this.apiKey = apiKey;
  }

  // Helper method for creating full URL with API key
  private getUrl(documentId?: string): string {
    return documentId
      ? `${this.baseUrl}/${this.collection}/${documentId}?key=${this.apiKey}`
      : `${this.baseUrl}/${this.collection}?key=${this.apiKey}`;
  }

  // GET: Retrieve a document or a collection of documents
  async get(documentId?: string): Promise<Response> {
    const url = this.getUrl(documentId);
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Error retrieving data: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      throw new Error(`Error retrieving data: ${error}`);
    }
  }

  // POST: Create a new document
  async post(data: Record<string, any>): Promise<Response> {
    const url = this.getUrl();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error creating document: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      throw new Error(`Error creating document: ${error}`);
    }
  }

  // PUT: Update an existing document
  async put(documentId: string, data: Record<string, any>): Promise<Response> {
    const url = this.getUrl(documentId);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error updating document: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      throw new Error(`Error updating document: ${error}`);
    }
  }

  // DELETE: Delete an existing document
  async delete(documentId: string): Promise<Response> {
    const url = this.getUrl(documentId);
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting document: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
    }
  }

  // FIND: Retrieve a specific document by ID
  async find(documentId: string): Promise<Response> {
    return this.get(documentId);
  }

  // FIND OR CREATE: Find a document by ID, or create it if it doesn't exist
  async findOrCreate(
    documentId: string,
    data: Record<string, any>
  ): Promise<Response> {
    try {
      const response = await this.find(documentId);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      const err = error as Error; // Type assertion
      if (err.message.includes("Error retrieving data")) {
        // Document not found, create it
        return this.post({ ...data, id: documentId });
      }
      throw err;
    }

    throw new Error(
      "Unexpected error: document not found and no error thrown."
    );
  }

  // SEARCH: Search for documents based on a query
  async search(query: Record<string, any>): Promise<Response> {
    const url = `${this.baseUrl}:runQuery?key=${this.apiKey}`;
    const structuredQuery = {
      structuredQuery: {
        from: [{ collectionId: this.collection }],
        where: {
          compositeFilter: {
            op: "AND",
            filters: Object.entries(query).map(([field, value]) => ({
              fieldFilter: {
                field: { fieldPath: field },
                op: "EQUAL",
                value: { stringValue: value },
              },
            })),
          },
        },
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(structuredQuery),
      });
      if (!response.ok) {
        throw new Error(`Error searching documents: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      throw new Error(`Error searching documents: ${error}`);
    }
  }
}

export default FirestoreService;
