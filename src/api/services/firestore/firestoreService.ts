import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../connect";

export class FirestoreService<T> {
  private collectionName: string;
  private firestore = db;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getAll(): Promise<(T & { documentId: string })[]> {
    const col = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(col);
    return snapshot.docs.map(
      (doc) =>
        ({
          documentId: doc.id, // Add documentId
          ...doc.data(),
        } as T & { documentId: string })
    );
  }

  // Get a single document by ID
  async get(id: string): Promise<(T & { documentId: string }) | null> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists()
      ? ({ documentId: docSnap.id, ...docSnap.data() } as T & {
          documentId: string;
        })
      : null;
  }

  // Find documents with a query
  async find(
    field: string,
    value: any
  ): Promise<(T & { documentId: string })[]> {
    const col = collection(this.firestore, this.collectionName);
    const q = query(col, where(field, "==", value));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) =>
        ({
          documentId: doc.id, // Use 'documentId' for clarity
          ...doc.data(),
        } as T & { documentId: string })
    );
  }

  // Find road by coordinates (latitude & longitude)
  async findRoadByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<(T & { documentId: string })[]> {
    const col = collection(this.firestore, this.collectionName);

    // Query based on both latitude and longitude
    const q = query(
      col,
      where("location.latitude", "==", latitude),
      where("location.longitude", "==", longitude)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          documentId: doc.id,
          ...doc.data(),
        } as T & { documentId: string })
    );
  }

  // Create a new document
  async create(data: Omit<T, "id">, customId?: string): Promise<string> {
    const col = collection(this.firestore, this.collectionName);

    if (customId) {
      // If a custom ID is provided, create a document reference with the custom ID
      const docRef = doc(col, customId);
      await setDoc(docRef, { ...data, id: customId });
      return docRef.id;
    } else {
      // If no custom ID is provided, add a new document and generate an ID automatically
      const docRef = await addDoc(col, data);
      return docRef.id;
    }
  }

  // Update a document by ID
  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, data);
  }

  // Delete a document by ID
  async delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }

  // Login function (example)
  async login(
    usernameOrEmail: string,
    password: string
  ): Promise<{ success: boolean; userData?: any }> {
    // Validate inputs
    if (!usernameOrEmail || !password) {
      return { success: false }; // Return false if either input is missing
    }

    const col = collection(this.firestore, this.collectionName);

    const emailNoHashQuery = query(
      col,
      where("email", "==", usernameOrEmail),
      where("password", "==", password)
    );

    // Run the query
    const emailNoHashSnapshot = await getDocs(emailNoHashQuery);

    if (!emailNoHashSnapshot.empty) {
      // Assuming the document data is in the first document
      const userDoc = emailNoHashSnapshot.docs[0];
      const userId = userDoc.id;

      // Update the `isAuthenticated` field to true
      const userRef = doc(this.firestore, this.collectionName, userId);
      await updateDoc(userRef, { isAuthenticated: true });

      // Fetch the updated user document
      const updatedUserDoc = await getDoc(userRef);

      return {
        success: true,
        userData: { ...updatedUserDoc.data(), id: userId }, // Include the updated user data and ID
      };
    }

    return { success: false };
  }

  async signup(
    data: Omit<T, "id">,
    customId?: string,
    email?: string
  ): Promise<string> {
    const col = collection(this.firestore, this.collectionName);

    // Check if a user with the same email already exists
    const q = query(col, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Email already exists");
    }

    if (customId) {
      // If a custom ID is provided, create a document reference with the custom ID
      const docRef = doc(col, customId);
      await setDoc(docRef, { ...data, id: customId });
      return docRef.id;
    } else {
      // If no custom ID is provided, add a new document and generate an ID automatically
      const docRef = await addDoc(col, data);
      return docRef.id;
    }
  }
}
