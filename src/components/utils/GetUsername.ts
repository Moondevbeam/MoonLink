import { firestore } from '../firebase/firebase';

interface UserData {
  username: string;
  // Aggiungi altri campi se necessario
}

export async function getUsernameForUserId(userId: string): Promise<string | null> {
  try {
    const userRef = firestore.collection('users').doc(userId);
    const doc = await userRef.get();
    
    if (doc.exists) {
      const userData = doc.data() as UserData;
      return userData.username || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
}
