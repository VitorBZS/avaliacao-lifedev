import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

export const createPost = async ({ title, content, user }) => {
    try {
        const docRef = await addDoc(collection(db, "posts"),{
            title,
            content,
            createdAt: Timestamp.now(),
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