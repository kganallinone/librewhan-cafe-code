import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { REG } from "../config/commonConfig";

// Initialize Firebase
const app = initializeApp(REG.FIREBASE_CONFIG);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { db, realtimeDb };
