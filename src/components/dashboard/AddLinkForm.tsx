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
    <div>
      <h2>Aggiungi un nuovo link personalizzato</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Titolo</label>
          <input type="text" id="title" {...register('title', { required: true })} />
          {errors.title && <span>Questo campo è obbligatorio</span>}
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input type="url" id="url" {...register('url', { required: true })} />
          {errors.url && <span>Questo campo è obbligatorio</span>}
        </div>
        <button type="submit">Aggiungi Link</button>
      </form>
    </div>
  );
}

export default AddLinkForm;
