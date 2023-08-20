import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { firestore } from '../firebase/firebase';

interface LinkListProps {
  links: any[];
}

function LinkList({ links }: LinkListProps) {
  const handleDeleteLink = async (linkId: string) => {
    try {
      await firestore.collection('links').doc(linkId).delete();
      console.log('Link deleted successfully');
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  return (
    <ul className='flex space-x-4'>
      {links.map((link) => (
        <li key={link.id} className="mb-2">
          <div className="flex items-center space-x-2 rounded bg-purple-600 hover:bg-purple-700 px-2">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white p-3 flex-grow">
              {link.title}
            </a>
            <button
              className="hover:text-red-500"
              onClick={() => handleDeleteLink(link.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LinkList;
