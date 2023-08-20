import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 text-center">
      <div className="container mx-auto space-y-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to MoonLink!</h1>
        <p className="text-gray-200">A platform to share your links in a personalized way.</p>
      </div>
    </header>
  );
}

export default Header;
