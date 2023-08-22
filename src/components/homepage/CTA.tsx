import React from 'react';
import { Link } from 'react-router-dom';

function CTA() {
  return (
    <section className="bg-blue-600 text-white bg2">
      <div className='backdrop-blur-sm py-10'>
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className='mx-2 text-sm'>Join MoonLink now and start sharing your links in style!</p>
        <button className="mt-6 bg-white text-blue-600 rounded-full py-2 px-6 font-semibold hover:bg-blue-100 hover:text-blue-800 transition duration-300">
          <Link to='/auth/register'><p className='text-md'>Sign Up</p></Link>
          </button>
          <p className='font-semibold text-4xl animate-bounce mt-4'>&#8593;</p>
      </div>
      </div>
    </section>
  );
}

export default CTA;
