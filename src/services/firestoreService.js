import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

export const getPost = async () => {
    const postRef = collection(db, "posts");
    const q = query(postRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return posts;
};