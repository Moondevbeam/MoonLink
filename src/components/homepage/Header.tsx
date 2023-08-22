import React from 'react';

function Header() {
  return (
    <header className="text-center bg2">
      <div className="mx-auto space-y-4 text-white backdrop-blur-md py-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to MoonLink!</h1>
        <p className='font-semibold '>A platform to share your links in a personalized way.</p>
      </div>
    </header>
  );
}

export default Header;
