import { User } from "../../../model/userModel";
import { FirestoreService } from "./firestoreService"; // Adjust path as needed

export const userService = new FirestoreService<User>("users");
