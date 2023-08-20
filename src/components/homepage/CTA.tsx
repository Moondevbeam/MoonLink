import React from 'react';
import { Link } from 'react-router-dom';

function CTA() {
  return (
    <section className="bg-blue-600 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 md:animate-bounce animate-bounce lg:animate-none">Ready to get started?</h2>
        <p className="text-gray-300">Join MoonLink now and start sharing your links in style!</p>
        <button className="mt-6 bg-white text-blue-600 rounded-full py-2 px-6 font-semibold hover:bg-blue-100 hover:text-blue-800 transition duration-300"><Link to='/auth/register'>Sign Up</Link></button>
      </div>
    </section>
  );
}

export default CTA;
