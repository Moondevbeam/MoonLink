import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firestore } from '../firebase/firebase';
import { Dialog } from '@headlessui/react';

interface AddLinkFormProps {
  userId: string | null;
  username: string | null;
}

function AddLinkForm({ userId, username }: AddLinkFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const linkData = {
        title: data.title,
        url: data.url,
        userId: userId,
        username: username,
      };

      // Add the link to 'links' collection with a generated ID
      const linkRef = await firestore.collection('links').add(linkData);

      // Add the link to 'publiclinks' collection without userId using the same ID
      const publicLinkData = {
        title: data.title,
        url: data.url,
        username: username,
      };
      await firestore.collection('publiclinks').doc(linkRef.id).set(publicLinkData);

      // Reset the form after adding the link
      reset();
    } catch (error) {
      console.error('Error adding the link:', error);
    }
  };

  return (
    <div className='mt-4'>
      <button
        className='rounded bg-blue-600 p-2 w-full text-white'
        onClick={() => setIsOpen(true)}
      >
        Add Link
      </button>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-16 border">
            <h2 className="text-xl font-semibold mb-4">Add a New Link</h2>
            <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <label htmlFor="title" className="block text-md font-medium text-gray-700">
                  Title
                </label>
                <input
                  placeholder='Title'
                  className='rounded p-2 md:w-96 w-64 bg-gray-300'
                  type="text"
                  id="title"
                  {...register('title', { required: true })}
                />
                {errors.title && <span className='text-red-600'>A title is required</span>}
              </div>
              <div className='grid gap-2'>
                <label htmlFor="url" className="block text-md font-medium text-gray-700">
                  URL
                </label>
                <input
                  placeholder='URL'
                  className='rounded p-2 w-auto bg-gray-300'
                  type="url"
                  id="url"
                  {...register('url', { required: true })}
                />
                {errors.url && <span className='text-red-600'>Link is required</span>}
              </div>
              <div className="flex justify-end space-x-2">
                <button className='rounded bg-blue-600 p-2 w-full text-white' type="submit">
                  Add Link
                </button>
                <button className='rounded bg-gray-300 p-2 w-1/2 text-gray-700' type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );  
}

export default AddLinkForm;
