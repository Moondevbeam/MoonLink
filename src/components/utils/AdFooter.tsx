import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function AdFooter() {
  return (
    <footer className="bg-transparent text-white py-8 fixed bottom-0 left-0 w-full text-center">
      <div className="container mx-auto">
        <p className="text-lg font-semibold mb-4 text-black">powered by MoonLink</p>
        <button className="text-sm p-4">
          <a
            href="https://moon-link.vercel.app"
            className="text-black hover:underline flex items-center justify-center animate-bounce hover:animate-none"
          >
            Sign Up now!
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </button>
      </div>
    </footer>
  );
}

export default AdFooter;
