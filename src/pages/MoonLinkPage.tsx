import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../components/firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import AdFooter from '../components/utils/AdFooter';

interface LinkData {
  id: string;
  title: string;
  url: string;
  image: string; // Aggiungi questa proprietà per l'URL dell'immagine
}

function MoonLinkPage() {
  const { username } = useParams<{ username: string }>();
  const [links, setLinks] = useState<LinkData[]>([]);

  useEffect(() => {
    const fetchUserLinks = async () => {
      try {
        const userLinksRef = firestore.collection('publiclinks').where('username', '==', username);
        const snapshot = await userLinksRef.get();
        const linksData: LinkData[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LinkData));
        setLinks(linksData);
      } catch (error) {
        console.error('Error fetching user links:', error);
      }
    };

    fetchUserLinks();
  }, [username]);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-semibold mb-4">Welcome to {username}'s Page!</h1>
      {links.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-medium mb-2">Links:</h2>
          <ul className="list-disc list-inside space-y-2">
            {links.map(link => (
              <li key={link.id} className="flex items-center justify-center space-x-2">
                <div
                  className='border p-2 rounded-3xl space-x-1 w-96'
                  style={{ backgroundImage: `url(${link.image})`, backgroundSize: 'cover' }}
                >
                  <div className='rounded rounded-3xl backdrop-blur-md mx-auto'>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {link.title} <FontAwesomeIcon icon={faExternalLinkAlt} className="text-blue-500" size='sm' />
                  </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg">No links available.</p>
      )}
      <AdFooter/>
    </div>
  );
}

export default MoonLinkPage;
