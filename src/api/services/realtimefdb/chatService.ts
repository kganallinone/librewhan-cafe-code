import { Chat as Model } from "./../../../model/chatModel";
import { RealtimeDbService } from "./firebaseRDBService";

export const chatService = (collectionName: string) =>
  new RealtimeDbService<Model>(collectionName);
