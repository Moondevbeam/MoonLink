import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase/firebase';

function DeleteAccount({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      // Delete all user's links from Firestore
      const userLinksRef = firestore.collection('links').where('userId', '==', userId);
      const userLinksSnapshot = await userLinksRef.get();
      userLinksSnapshot.forEach((doc) => {
        doc.ref.delete();
      });

      // Delete the user from Firestore
      await firestore.collection('users').doc(userId).delete();

      // Delete the user account
      await auth.currentUser?.delete();

      console.log('Account deleted');
      navigate('/'); // Redirect to homepage after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="bg-white rounded p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
      <p className="text-red-600 mb-4">
        Warning: Deleting your account will also delete all your custom links. This action is irreversible.
      </p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Delete Account
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-red-600 mb-4">
              Are you sure you want to delete your account? This action is irreversible.
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteAccount}
              >
                Confirm Delete
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
