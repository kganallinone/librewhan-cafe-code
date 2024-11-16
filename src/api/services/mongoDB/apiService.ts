// services/MongoDBService.ts

interface MongoDBConfig {
  apiKey: string;
  dataSource: string;
  database: string;
}

interface InsertOnePayload {
  collection: string;
  document: object;
}

interface FindPayload {
  collection: string;
  filter: object;
}

interface UpdateOnePayload {
  collection: string;
  filter: object;
  update: object;
}

interface DeleteOnePayload {
  collection: string;
  filter: object;
}

interface GetAllPayload {
  collection: string;
}

interface SearchPayload {
  collection: string;
  query: object;
}

export default class MongoDBService {
  private config: MongoDBConfig;
  private baseURL: string;

  constructor(config: MongoDBConfig) {
    this.config = config;
    this.baseURL = `https://ap-southeast-1.aws.data.mongodb-api.com/app/data-nlnuzxv/endpoint/data/v1/action/`;
  }

  private async request(endpoint: string, body: object): Promise<any> {
    try {
      console.log("Request Payload:", body);
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": this.config.apiKey,
        },
        body: JSON.stringify({
          ...body,
          dataSource: this.config.dataSource,
          database: this.config.database,
        }),
      });
      console.log("Response Status:", response.status);
      const responseBody = await response.json();
      console.log("Response Body:", responseBody);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return responseBody;
    } catch (error) {
      console.error("Error during request:", error);
      throw error;
    }
  }

  public async insertOne(payload: InsertOnePayload): Promise<any> {
    return this.request("insertOne", {
      collection: payload.collection,
      document: payload.document,
    });
  }

  public async find(payload: FindPayload): Promise<any> {
    return this.request("find", {
      collection: payload.collection,
      filter: payload.filter,
    });
  }

  public async updateOne(payload: UpdateOnePayload): Promise<any> {
    return this.request("updateOne", {
      collection: payload.collection,
      filter: payload.filter,
      update: payload.update,
    });
  }

  public async deleteOne(payload: DeleteOnePayload): Promise<any> {
    return this.request("deleteOne", {
      collection: payload.collection,
      filter: payload.filter,
    });
  }

  public async getAll(payload: GetAllPayload): Promise<any> {
    return this.request("find", {
      collection: payload.collection,
      filter: {}, // No filter to get all documents
    });
  }

  public async search(payload: SearchPayload): Promise<any> {
    return this.request("find", {
      collection: payload.collection,
      filter: payload.query,
    });
  }
}
