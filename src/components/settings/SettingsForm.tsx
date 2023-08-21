import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firestore } from '../firebase/firebase';

interface SettingsFormProps {
  userId: string;
  currentUsername: string | null;
}

function SettingsForm({ userId, currentUsername }: SettingsFormProps) {
  const { register, handleSubmit, formState, reset } = useForm({ mode: 'onSubmit' }); // Set mode to 'onSubmit'
  const [suggestedUsername, setSuggestedUsername] = useState<string | null>(null);
  const [isFormEditable, setIsFormEditable] = useState<boolean>(true); // State to track if the form is editable

  const onSubmit = async (data: any) => {
    try {
      if (!currentUsername) {
        const isUsernameAvailable = await checkUsernameAvailability(data.username);
        
        if (isUsernameAvailable) {
          await firestore.collection('users').doc(userId).update({
            username: data.username,
          });
        } else {
          const suggested = generateSuggestedUsername(data.username);
          setSuggestedUsername(suggested);
        }
      }

      setIsFormEditable(false); // Disable form after submitting
      reset();
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <div className="bg-white rounded p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Username</h2>
      {suggestedUsername && (
        <p className="mb-4 text-red-500">The username is not available. You can try: {suggestedUsername}</p>
      )}
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
            disabled={!isFormEditable || !!currentUsername} // Disable when not editable or if already has a username
            className={`mt-1 p-2 w-full border rounded ${formState.errors.username ? 'border-red-500' : 'border-gray-300'} ${
                !isFormEditable || !!currentUsername ? 'cursor-not-allowed' : ''}`}
          />
          {formState.errors.username && <p className="text-red-500 text-xs mt-1">This field is required</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={formState.isSubmitting || !!currentUsername || !isFormEditable }
        >
          Update
        </button>
      </form>
    </div>
  );
}

async function checkUsernameAvailability(username: string): Promise<boolean> {
  try {
    const userRef = firestore.collection('users').where('username', '==', username);
    const snapshot = await userRef.get();
    return snapshot.empty; // True if username is available, false if not
  } catch (error) {
    console.error('Error checking username availability:', error);
    return false;
  }
}

function generateSuggestedUsername(username: string): string {
  return username + Math.floor(Math.random() * 1000); // Example: adding a random number
}

export default SettingsForm;
