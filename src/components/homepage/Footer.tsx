import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 md:fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-center items-center">
        <div className="space-x-4">
          <a href="https://www.linkedin.com/in/IL_TUO_LINKEDIN" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </a>
          <a href="https://github.com/IL_TUO_GITHUB" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-500">
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
        </div>
      </div>
      <p className="text-center md:text-left text-gray-400 mt-4 mx-2">{currentYear} Moonbeam</p>
    </footer>
  );
}

export default Footer;