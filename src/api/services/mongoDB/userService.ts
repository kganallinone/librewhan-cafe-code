import MongoDBService from "./apiService";

// Define your configuration
const config = {
  apiKey: "AUrgTRZuVWmhf1qpEwEEn1mIB3qlqsbP9C4wTLSXhC22FEqTWhI5LVk96WcNfiuh",
  dataSource: "Cluster0",
  database: "test",
};

const Service = new MongoDBService(config);

export const UserService = {
  async getAll(): Promise<any> {
    return Service.getAll({ collection: "users" });
  },

  async get(id: string): Promise<any> {
    return Service.find({ collection: "users", filter: { id } });
  },

  async create(data: any): Promise<any> {
    return Service.insertOne({ collection: "users", document: data });
  },

  async update(filter: object, update: object): Promise<any> {
    return Service.updateOne({ collection: "users", filter, update });
  },

  async delete(filter: object): Promise<any> {
    return Service.deleteOne({ collection: "users", filter });
  },

  async search(query: object): Promise<any> {
    return Service.search({ collection: "users", query });
  },
};
