import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { firestore, storage } from '../firebase/firebase';

interface EditLinkModalProps {
  open: boolean;
  onClose: () => void;
  linkId: string | null;
  linkTitle: string;
  linkUsername: string | null;
  linkImage: File | null;
}

function EditLink({
  open,
  onClose,
  linkId,
  linkTitle,
  linkUsername,
  linkImage,
}: EditLinkModalProps) {
  const [newLinkTitle, setNewLinkTitle] = useState(linkTitle);
  const [newLinkImage, setNewLinkImage] = useState<File | null>(linkImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setNewLinkImage(selectedFile);
    }
  };

  const handleUpdateLink = async () => {
    if (linkId && newLinkImage) {
      try {
        // Update the title of the link in 'links' collection
        await firestore.collection('links').doc(linkId).update({
          title: newLinkTitle,
        });
  
        // Update the image of the link in 'publiclinks' collection
        if (linkUsername) {
          // Upload the image to Firebase Storage
          const storageRef = storage.ref();
          const imageRef = storageRef.child(`${linkId}/${newLinkImage.name}`);
          await imageRef.put(newLinkImage);
  
          // Get the URL of the uploaded image
          const imageUrl = await imageRef.getDownloadURL();
  
          const publicLinksQuerySnapshot = await firestore.collection('publiclinks')
            .where('username', '==', linkUsername)
            .where('title', '==', newLinkTitle)
            .get();
  
          publicLinksQuerySnapshot.forEach(async doc => {
            // Update the image in the link's data object
            await doc.ref.update({
              image: imageUrl,
            });
          });
  
          // Update the image in 'links' collection as well
          await firestore.collection('links').doc(linkId).update({
            image: imageUrl,
          });
        }
  
        setNewLinkTitle('');
        setNewLinkImage(null);
        onClose();
      } catch (error) {
        console.error('Error updating link:', error);
      }
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white rounded-lg p-12 max-w-md border mx-4">
          <Dialog.Title className="text-lg font-medium mb-4">
            Edit Link
          </Dialog.Title>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newLinkTitle}
              onChange={e => setNewLinkTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded border-gray-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateLink}
            >
              Save
            </button>
            <button
              className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default EditLink;
