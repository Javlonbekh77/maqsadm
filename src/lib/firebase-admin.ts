
import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

let db: admin.firestore.Firestore | null = null;
let auth: admin.auth.Auth | null = null;

try {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!serviceAccountString) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set.");
  }

  if (admin.apps.length === 0) {
    const serviceAccount: ServiceAccount = JSON.parse(serviceAccountString);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  }
  
  db = admin.firestore();
  auth = admin.auth();

} catch (error: any) {
  console.error('Error parsing FIREBASE_SERVICE_ACCOUNT or initializing Firebase Admin:', error.message);
  console.warn("Firestore will not be available. The app will run without database persistence.");
}

export { db, auth };
