import FirestoreService from "./FirestoreService";

export class UserService extends FirestoreService {
  constructor() {
    super({
      projectId: "librewhan-cafe",
      apiKey: "AIzaSyByVHVJm80xP6XRZ-nfY9CBQIyBAnqRG6k",
      collection: "users",
    });
  }

  async GET_ALL() {
    try {
      const response = await this.get();
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async GET(documentId: string) {
    try {
      const response = await this.get(documentId);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async CREATE(document: object) {
    try {
      const response = await this.post(document);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async UPDATE(documentId: string, updatedFields: object) {
    try {
      const response = await this.put(documentId, updatedFields);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async DELETE(documentId: string) {
    try {
      await this.delete(documentId);
      console.log("Document deleted");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
