import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { firestore} from '../firebase/firebase';
import EditLinkModal from './EditLink';

interface LinkListProps {
  links: any[];
}

function LinkList({ links }: LinkListProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [selectedLinkTitle, setSelectedLinkTitle] = useState<string>('');
  const [selectedLinkImage] = useState<File | null>(null);
  const [selectedLinkUsername, setSelectedLinkUsername] = useState<string | null>(null);

  const handleDeleteLink = async (linkId: string, username: string | null) => {
    try {
      // Delete the link from 'links' collection
      await firestore.collection('links').doc(linkId).delete();

      // Delete the link from 'publiclinks' collection based on the username
      if (username) {
        const publicLinksQuerySnapshot = await firestore.collection('publiclinks')
          .where('username', '==', username)
          .where('title', '==', links.find(link => link.id === linkId)?.title) // Match by title
          .get();

        publicLinksQuerySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      }

      console.log('Link deleted successfully');
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  const handleEditLink = (linkId: string, title: string, username: string | null) => {
    setSelectedLinkId(linkId);
    setSelectedLinkTitle(title);
    setSelectedLinkUsername(username);
    setOpenEditModal(true);
  };


  return (
    <div>
      <ul className='flex justify-center grid grid-col'>
        {links.map((link) => (
          <li key={link.id} className="mb-2">
            <div
              className="flex items-center space-x-2 rounded bg-purple-600 hover:bg-purple-700 px-2 md:w-96 w-72"
              style={{ backgroundImage: `url(${link.image})`, backgroundSize: 'cover' }}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white p-2 flex-grow">
                {link.title}
              </a>
              <button
                className="hover:text-red-500"
                onClick={() => handleDeleteLink(link.id, link.username)}
              >
                <FontAwesomeIcon icon={faTrash} className='text-white hover:text-red-600' />
              </button>
              <button
                className="hover:text-green-500"
                onClick={() => handleEditLink(link.id, link.title, link.username)}
              >
                <FontAwesomeIcon icon={faPenToSquare} className='text-white hover:text-blue-600' />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <EditLinkModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        linkId={selectedLinkId}
        linkTitle={selectedLinkTitle}
        linkUsername={selectedLinkUsername}
        linkImage={selectedLinkImage}
      />
    </div>
  );
}

export default LinkList;
