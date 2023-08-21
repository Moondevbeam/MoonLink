import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase/firebase';
import { getUsernameForUserId } from '../utils/GetUsername';
import LinkList from './LinkList';
import AddLinkForm from './AddLinkForm';

function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userLinksRef = firestore.collection('links').where('userId', '==', currentUser.uid);
        userLinksRef.onSnapshot((snapshot) => {
          const userLinks: any[] = [];
          snapshot.forEach((doc) => {
            userLinks.push({ id: doc.id, ...doc.data() });
          });
          setLinks(userLinks);
        });

        const userUsername = await getUsernameForUserId(currentUser.uid);
        setUsername(userUsername);
      } else {
        setUser(null);
        setLinks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Welcome {user ? username : 'Guest'}!
        </h1>
        <h2 className="text-lg font-medium text-center my-6">Your Custom Links:</h2>
        <LinkList links={links} />
        <div className="flex justify-center my-2">
        <AddLinkForm userId={user?.uid} username={username} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
