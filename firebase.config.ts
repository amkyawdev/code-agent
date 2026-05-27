// Firebase Configuration for AmkyawDev
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY || "AIzaSyCcw0_7Pc4tIAapg-Hyvk4UtiQfo1USjU8",
  authDomain: FIREBASE_AUTH_DOMAIN || "amk-apk.firebaseapp.com",
  projectId: FIREBASE_PROJECT_ID || "amk-apk",
  storageBucket: FIREBASE_STORAGE_BUCKET || "amk-apk.firebasestorage.app",
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID || "267632318274",
  appId: FIREBASE_APP_ID || "1:267632318274:android:441e4b8cb66da60d04dadb",
};

// Android Package Name: com.aungmyokyaw.sever
export const androidPackageName = "com.aungmyokyaw.sever";

// Web Firebase URL for Realtime Database
export const firebaseUrl = "https://amk-apk-default-rtdb.firebaseio.com";

export default firebaseConfig;
