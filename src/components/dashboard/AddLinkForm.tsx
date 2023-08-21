import React from 'react';
import { useForm } from 'react-hook-form';
import { firestore } from '../firebase/firebase';

interface AddLinkFormProps {
  userId: string | null;
  username: string | null;
}

function AddLinkForm({ userId, username }: AddLinkFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
      <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-2'>
          <input placeholder='Title' className='rounded p-2 w-full bg-gray-300' type="text" id="title" {...register('title', { required: true })} />
          {errors.title && <span className='text-red-600'>A title is required</span>}
        </div>
        <div className='space-y-2'>
          <input placeholder='URL' className='rounded p-2 w-full bg-gray-300' type="url" id="url" {...register('url', { required: true })} />
          {errors.url && <span className='text-red-600'>Link is required</span>}
        </div>
        <button className='rounded bg-blue-600 p-2 w-full text-white' type="submit">Add Link</button>
      </form>
    </div>
  );
}

export default AddLinkForm;
