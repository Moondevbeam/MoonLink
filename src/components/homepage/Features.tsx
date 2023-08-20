import React from 'react';

function Features() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Features 🚀</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-center">Custom Links ✨</h3>
            <p className="text-gray-600">Create and customize your own branded short links.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-center">Analytics 📊</h3>
            <p className="text-gray-600">Track clicks and monitor link performance with built-in analytics.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md shadow-md md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-2 text-center">Easy Sharing 🌐</h3>
            <p className="text-gray-600 lg:text-left md:text-center">Share your links easily on social media and other platforms.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
