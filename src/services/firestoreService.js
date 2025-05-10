import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const searchPostsByTag = async (tag) => {
    const q =query(
        collection(db,'posts'),
        where('tagsArray', 'array-contains', tag.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};