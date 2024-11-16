import { FirestoreService } from "./firestoreService"; // Adjust path as needed
import { Product } from "./../../../model/productsModel";

export const productService = new FirestoreService<Product>("products");
