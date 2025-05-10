import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export const createPost = async ({ title, content, user, tags }) => {
    try {
        const docRef = await addDoc(collection(db, "posts"),{
            title,
            content,
            tags,
            createdAt: serverTimestamp(),
            author: {
                uid: user.uid,
                name: user.displayName,
                email: user.email
            }
        });

        return docRef.id;
    } catch (error) {
        console.error("Erro ao criar post:", error);
        throw error;
    }
};