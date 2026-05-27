import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY || "AIzaSyCDNASzWo7Ok_h7EFkQvYrowIn6KyEntqU",
  authDomain: FIREBASE_AUTH_DOMAIN || "coder-agent-54bb7.firebaseapp.com",
  projectId: FIREBASE_PROJECT_ID || "coder-agent-54bb7",
  storageBucket: FIREBASE_STORAGE_BUCKET || "coder-agent-54bb7.firebasestorage.app",
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID || "183486986354",
  appId: FIREBASE_APP_ID || "1:183486986354:android:df4ca798b7790aa232aaeb",
};

// Android Package Name: com.amkyaw.codeagent
export const androidPackageName = "com.amkyaw.codeagent";

export default firebaseConfig;
