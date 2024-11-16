import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { REG } from "../config/commonConfig";

// Initialize Firebase
const app = initializeApp(REG.FIREBASE_CONFIG);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
