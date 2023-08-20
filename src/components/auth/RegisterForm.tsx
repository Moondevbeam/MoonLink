import React from 'react';
import { useForm } from 'react-hook-form';
import { auth, firestore } from '../firebase/firebase';

interface RegisterFormData {
  email: string;
  password: string;
}

function RegisterForm() {
  const { register, handleSubmit, formState } = useForm<RegisterFormData>();
  const { errors } = formState;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(data.email, data.password);

      if (response.user) {
        // Creazione della collezione dell'utente nel Firestore
        await firestore.collection('users').doc(response.user.uid).set({
          email: data.email,
          // Altri campi che vuoi aggiungere
        });

        console.log('Registration successful');
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" {...register('email', { required: true })} className="mt-1 p-2 w-full border rounded" />
        {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" {...register('password', { required: true })} className="mt-1 p-2 w-full border rounded" />
        {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full" disabled={formState.isSubmitting}>
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
