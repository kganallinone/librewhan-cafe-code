import { FirestoreService } from "./firestoreService"; // Adjust path as needed
import { Franchising as Model } from "./../../../model/franchiseModel";

export const franchiseService = new FirestoreService<Model>("franchise");
