import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase/firebase';
import LinkList from './LinkList';
import AddLinkForm from './AddLinkForm';

function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
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
      } else {
        setUser(null);
        setLinks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const [showAddLinkForm, setShowAddLinkForm] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Welcome to your User Dashboard, {user ? user.email : 'Guest'}!</h1>
      <h2 className="text-lg font-medium mb-2">Your Custom Links:</h2>
      <LinkList links={links} />

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowAddLinkForm(!showAddLinkForm)}
        >
          {showAddLinkForm ? 'Hide' : 'Add'} Link Form
        </button>
        {showAddLinkForm && <AddLinkForm userId={user?.uid} />}
      </div>
    </div>
  );
}

export default UserDashboard;
