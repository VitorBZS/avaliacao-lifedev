import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB-ngz4Rb5A4ngMAJr3hZExeWHsM7PjoVY",
    authDomain: "devblog-vitorbzs.firebaseapp.com",
    projectId: "devblog-vitorbzs",
    storageBucket: "devblog-vitorbzs.firebasestorage.app",
    messagingSenderId: "1057249918393",
    appId: "1:1057249918393:web:4eb8054f4cb9a35a4b4a68",
    measurementId: "G-RF5X7YS3YL"
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }