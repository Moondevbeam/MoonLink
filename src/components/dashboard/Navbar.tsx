import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';

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

    fetchUsername();

    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchUsername();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-gray-500 py-4 mx-2 my-1 rounded-2xl">
      <div className="container mx-auto flex justify-between items-center space-x-3 font-semibold">
        {username && (
          <span className="text-white text-lg p-2 mx-2">{username}</span>
        )}
        <div className="container mx-auto hidden md:block md:flex justify-end space-x-3 font-semibold">
          <Link to="/dashboard" className="text-white text-lg font-semibold rounded bg-purple-600 hover:bg-purple-700 px-4 py-2">
            Dashboard
          </Link>
          <Link to={`/moonlink/${username}`} className="text-white text-lg font-semibold rounded bg-yellow-600 hover:bg-yellow-700 px-4 py-2">
            MoonLink
          </Link>
          {/* Add other links here */}
          <Link to="/settings" className="text-white text-lg font-semibold rounded bg-blue-600 hover:bg-blue-700 px-4 py-2">
            Settings
          </Link>
          <button className="text-white text-lg rounded bg-blue-600 hover:bg-blue-700 px-4 py-2" onClick={handleSignOut}>
            Log Out
          </button>
        </div>
        <div className="md:hidden">
          <Menu>
            {({ open }) => (
              <>
                <span>
                  <Menu.Button className="text-white text-lg font-semibold rounded px-4 py-2 mx-2">
                  <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 6H4M20 12H10M20 18H6"
                          />
                  </svg>
                  </Menu.Button>
                </span>
                <Menu.Items className={`${open ? 'block' : 'hidden'} absolute right-2 mt-2 mx-6 bg-white p-2 shadow-lg rounded`}>
                  <Link to="/dashboard" className="block text-gray-800 hover:bg-gray-200 px-4 py-2">
                    Dashboard
                  </Link>
                  <Link to={`/moonlink/${username}`} className="block text-gray-800 hover:bg-gray-200 px-4 py-2">
                    MoonLink
                  </Link>
                  {/* Add other links here */}
                  <Link to="/settings" className="block text-gray-800 hover:bg-gray-200 px-4 py-2">
                    Settings
                  </Link>
                  <button className="block text-gray-800 hover:bg-gray-200 px-4 py-2" onClick={handleSignOut}>
                    Log Out
                  </button>
                </Menu.Items>
              </>
            )}
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
