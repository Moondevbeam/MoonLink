import React from 'react';
import { useForm } from 'react-hook-form';
import { firestore } from '../firebase/firebase';

interface SettingsFormProps {
  userId: string;
  currentUsername: string | null;
}

function SettingsForm({ userId, currentUsername }: SettingsFormProps) {
  const { register, handleSubmit, formState, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (!currentUsername) {
        await firestore.collection('users').doc(userId).update({
          username: data.username,
        });
      }

      reset();
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <div className="bg-white rounded p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Username</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
                type="text"
                id="username"
                {...register('username', { required: true })}
                defaultValue={currentUsername || ''}
                disabled={!!currentUsername}
                className={`mt-1 p-2 w-full border rounded ${formState.errors.username ? 'border-red-500' : 'border-gray-300'} ${
                    !!currentUsername ? 'cursor-not-allowed' : ''}`}
                />
          {formState.errors.username && <p className="text-red-500 text-xs mt-1">This field is required</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={formState.isSubmitting || !!currentUsername }
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default SettingsForm;
