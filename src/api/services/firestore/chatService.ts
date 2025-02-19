import { FirestoreService } from "./firestoreService"; // Adjust path as needed
import { Order as Model } from "./../../../model/orderModel";

export const orderService = new FirestoreService<Model>("order");
