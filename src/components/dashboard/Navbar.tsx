import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-500 py-4">
      <div className="container mx-auto flex justify-end items-center space-x-3 font-semibold">
        <Link to="/dashboard" className="text-white text-lg font-semibold rounded bg-purple-600 hover:bg-purple-700 p-2">
          My Links
        </Link>
        <button className="text-white text-lg rounded bg-blue-600 hover:bg-blue-700 p-2" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
