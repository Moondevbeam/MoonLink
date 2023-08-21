import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userRef = firestore.collection('users').doc(auth.currentUser?.uid);
        const doc = await userRef.get();
        if (doc.exists) {
          setUsername(doc.data()?.username || null);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername(); // Call the function to fetch the username

    // Subscribe to changes in authentication state (user login/logout)
    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchUsername(); // Fetch username when authentication state changes
    });

    return () => {
      unsubscribe(); // Clean up the auth state change listener
    };
  }, []);

  return (
    <nav className="bg-gray-500 py-4">
      <div className="container mx-auto flex justify-start items-center space-x-3 font-semibold">
        {username && (
          <span className="text-white text-lg rounded bg-red-300 p-2">{username}</span>
        )}
        <div className="container mx-auto flex justify-end items-center space-x-3 font-semibold">
          <Link to="/dashboard" className="text-white text-lg font-semibold rounded bg-purple-600 hover:bg-purple-700 px-4 py-2">
            Dashboard
          </Link>
          <div className="flex items-center space-x-3">
            <Link to="/settings" className="text-white text-lg font-semibold rounded bg-blue-600 hover:bg-blue-700 px-4 py-2">
              Settings
            </Link>
            <button className="text-white text-lg rounded bg-blue-600 hover:bg-blue-700 px-4 py-2" onClick={handleSignOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
