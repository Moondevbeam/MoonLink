import React from 'react';
import { useForm } from 'react-hook-form';
import { firestore } from '../firebase/firebase';

interface AddLinkFormProps {
  userId: string | null;
}

function AddLinkForm({ userId }: AddLinkFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (userId) {
        // Aggiungi il link personalizzato a Firestore con l'ID dell'utente
        await firestore.collection('links').add({
          title: data.title,
          url: data.url,
          userId: userId,
        });

        // Resetta il form dopo aver aggiunto il link
        reset();
      }
    } catch (error) {
      console.error('Errore nell\'aggiunta del link:', error);
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
