import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../components/firebase/firebase';
import SettingsForm from '../components/settings/SettingsForm';
import Navbar from '../components/dashboard/Navbar';
import DeleteAccount from '../components/settings/DeleteAccount';

function Settings() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Get username of user
        const userRef = firestore.collection('users').doc(currentUser.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            setUsername(doc.data()?.username || null);
          }
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar />
      {user && (
        <>
          <SettingsForm userId={user.uid} currentUsername={username} />
          <DeleteAccount userId={user.uid}/>
        </>
      )}
    </div>
  );
}

export default Settings;
